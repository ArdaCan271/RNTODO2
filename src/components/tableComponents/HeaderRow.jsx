import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';

import { useTheme } from '../../constants/colors';

import HeaderCell from './HeaderCell';

import FilterModal from '../FilterModal';

const HeaderRow = ({ headerList, customHeaderComponent, fieldWidths, sortByField, setSortByField, sortDirection, setSortDirection, fieldFilters, setFieldFilters, filterModalInfo, setFilterModalInfo }) => {

  const theme = useTheme();
  const styles = getStyles(theme);

  return (
    <View style={styles.headerContainer}>
      <FilterModal
        fieldFilters={fieldFilters}
        setFieldFilters={setFieldFilters}
        filterModalInfo={filterModalInfo}
        onClose={() => setFilterModalInfo(
          {
            visible: false,
            type: null,
            field: null,
            title: null,
          }
        )}
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
          setFilterModalInfo={setFilterModalInfo}
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
