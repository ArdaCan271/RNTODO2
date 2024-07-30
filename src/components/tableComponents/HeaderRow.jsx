import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';

import { useTheme } from '../../constants/colors';

import HeaderCell from './HeaderCell';

import FilterModal from '../FilterModal';

const HeaderRow = ({ headerList, customHeaderComponent, fieldWidths, sortByField, setSortByField, sortDirection, setSortDirection, fieldFilters, setFieldFilters, filterModalVisible, setFilterModalVisible, filterModalType, setFilterModalType, filterModalField, setFilterModalField }) => {

  const theme = useTheme();
  const styles = getStyles(theme);

  return (
    <View style={styles.headerContainer}>
      <FilterModal
        filterModalVisible={filterModalVisible}
        filterModalType={filterModalType}
        fieldFilters={fieldFilters}
        setFieldFilters={setFieldFilters}
        onClose={() => setFilterModalVisible(false)}
      />
      {headerList.map((header, index) => (
        header.Visibility &&
        <HeaderCell 
          key={index}
          fieldWidth={fieldWidths && fieldWidths[header.Field] ? fieldWidths[header.Field] : 100}
          customHeaderComponent={customHeaderComponent}
          header={header}
          sortByField={sortByField}
          setSortByField={setSortByField}
          sortDirection={sortDirection}
          setSortDirection={setSortDirection}
          fieldFilters={fieldFilters}
          setFilterModalVisible={setFilterModalVisible}
          setFilterModalType={setFilterModalType}
          setFilterModalField={setFilterModalField}
        />
      ))}
    </View>
  );
};

const getStyles = (theme) => StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
  },
});

export default HeaderRow;
