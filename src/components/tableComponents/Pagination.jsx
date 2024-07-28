import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';

import FontAwesome from 'react-native-vector-icons/FontAwesome';

import { useTheme } from '../../constants/colors';

const Pagination = ({currentPage, totalPages, handleNextPage, handlePreviousPage, handleGoToPage}) => {

  const theme = useTheme();
  const styles = getStyles(theme);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => console.log('pressed goto page')}
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
    </View>
  );
}

const getStyles = (theme) => StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '100%',
    paddingRight: 40,
  },
  pageIndicatorText: {
    color: theme.text,
    marginHorizontal: 10,
  },
  changePageButton: {
    paddingVertical: 6,
    paddingHorizontal: 9,
    backgroundColor: theme.primaryAlt,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: theme.text,
  },
  goToPageButton: {
    paddingVertical: 6,
    paddingHorizontal: 8,
    backgroundColor: theme.primaryAlt,
    borderRadius: 5,
    marginRight: 25,
    borderWidth: 1,
    borderColor: theme.text,
  },
});

export default Pagination;