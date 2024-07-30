import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, Button, ScrollView, Pressable, TouchableOpacity } from 'react-native';
import { useTheme } from '../constants/colors';

const FilterSingle = ({ fieldFilters, setFieldFilters, filterModalInfo, onClose }) => {
  const theme = useTheme();
  const styles = getStyles(theme);

  const [inputValue, setInputValue] = useState(fieldFilters[filterModalInfo.field] || '');

  const handleAccept = () => {
    setFieldFilters(prevFilters => ({ ...prevFilters, [filterModalInfo.field]: inputValue.trim().toLowerCase()}));
    onClose();
  };

  const handleClear = () => {
    setFieldFilters(prevFilters => ({ ...prevFilters, [filterModalInfo.field]: '' }));
    onClose();
  };

  return (
    <ScrollView 
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.label}>{filterModalInfo.title}</Text>
      <TextInput
        style={styles.input}
        value={inputValue}
        onChangeText={setInputValue}
        placeholder={filterModalInfo.title}
        placeholderTextColor={theme.textAlt}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
          <Text style={styles.cancelButtonText}>İptal</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.clearButton} onPress={handleClear}>
          <Text style={styles.clearButtonText}>Kaldır</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.acceptButton} onPress={handleAccept}>
          <Text style={styles.acceptButtonText}>Onayla</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const getStyles = (theme) => StyleSheet.create({
  container: {
    padding: 20,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    marginBottom: 10,
    color: theme.text,
    fontSize: 18,
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: theme.text,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
    color: theme.text,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  acceptButton: {
    backgroundColor: theme.primary,
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: theme.text,
  },
  acceptButtonText: {
    color: theme.white,
  },
  clearButton: {
    backgroundColor: theme.tableHighlight,
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: theme.text,
  },
  clearButtonText: {
    color: theme.text,
  },
  cancelButton: {
    backgroundColor: theme.red,
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: theme.text,
  },
  cancelButtonText: {
    color: theme.white,
  },
});

export default FilterSingle;
