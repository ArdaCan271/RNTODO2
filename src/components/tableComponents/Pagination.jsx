import { StyleSheet, Text, View, TouchableOpacity, TextInput, Pressable, Keyboard } from 'react-native';
import React, { useState } from 'react';

import FontAwesome from 'react-native-vector-icons/FontAwesome';

import { useTheme } from '../../constants/colors';

import PickerModal from '../PickerModal';

const Pagination = ({currentPage, totalPages, handleNextPage, handlePreviousPage, handleGoToPage, rowsPerPage, changeRowsPerPage}) => {

  const theme = useTheme();
  const styles = getStyles(theme);

  const [goToInput, setGoToInput] = useState('');
  
  const handleInputChange = (text) => {
    let value = parseInt(text, 10);
    
    if (isNaN(value)) {
      value = '';
    } else if (value < 1) {
      value = 1;
    } else if (value > totalPages) {
      value = totalPages;
    }

    setGoToInput(value.toString());
  };

  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleSelectRowsPerPage = (option) => {
    changeRowsPerPage(option);
    setIsModalVisible(false);
  };

  return (
    <Pressable style={styles.container} android_disableSound onPress={() => Keyboard.dismiss()}>
      <PickerModal
        visible={isModalVisible}
        options={[10, 30, 60]}
        selectedOption={rowsPerPage} // Pass the selectedOption prop
        onSelect={handleSelectRowsPerPage}
        onClose={() => setIsModalVisible(false)}
      />
      <TouchableOpacity onPress={() => setIsModalVisible(true)} style={styles.rowsPerPageButton}>
        <Text style={styles.rowsPerPageButtonText}>{`Satır: ${rowsPerPage}`}</Text>
      </TouchableOpacity>
      <TextInput
        style={styles.goToPageInput}
        placeholder="Sayfa No."
        keyboardType="numeric"
        value={goToInput}
        onChangeText={handleInputChange}
        placeholderTextColor={theme.textAlt}
        numberOfLines={2}
        onSubmitEditing={() => handleGoToPage(parseInt(goToInput, 10))}
      />
      <TouchableOpacity
        onPress={() => handleGoToPage(parseInt(goToInput, 10))}
        style={styles.goToPageButton}
      >
        <FontAwesome name="external-link-square" size={20} color={theme.white} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={handlePreviousPage}
        style={styles.changePageButton}
      > 
        <FontAwesome name="chevron-left" size={20} color={theme.white} />
      </TouchableOpacity>
      <Text style={styles.pageIndicatorText}>{`${currentPage} / ${totalPages}`}</Text>
      <TouchableOpacity
        onPress={handleNextPage}
        style={styles.changePageButton}
      >
        <FontAwesome name="chevron-right" size={20} color={theme.white} />
      </TouchableOpacity>
    </Pressable>
  );
}

const getStyles = (theme) => StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '100%',
    paddingRight: 20,
    height: 32,
  },
  rowsPerPageButton: {
    height: 34,
    paddingVertical: 6,
    paddingHorizontal: 8,
    backgroundColor: theme.primaryAlt,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: theme.text,
    marginRight: 10,
  },
  rowsPerPageButtonText: {
    color: theme.white,
  },
  goToPageInput: {
    height: 34,
    width: 60,
    backgroundColor: theme.backgroundAlt,
    borderColor: theme.text,
    borderWidth: 1,
    borderRadius: 5,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    fontSize: 12,
    textAlign: 'center',
    padding: 0,
    color: theme.text,
  },
  goToPageButton: {
    height: 34,
    paddingVertical: 6,
    paddingHorizontal: 8,
    backgroundColor: theme.primaryAlt,
    borderRadius: 5,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    marginRight: 10,
    borderWidth: 1,
    borderLeftWidth: 0,
    borderColor: theme.text,
  },
  pageIndicatorText: {
    color: theme.text,
    marginHorizontal: 10,
  },
  changePageButton: {
    height: 34,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 9,
    backgroundColor: theme.primaryAlt,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: theme.text,
  },
});

export default Pagination;