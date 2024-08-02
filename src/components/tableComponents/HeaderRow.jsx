import React from 'react';
import { View, StyleSheet, TouchableOpacity, FlatList } from 'react-native';

import { useTheme } from '../../constants/colors';

import HeaderCell from './HeaderCell';

import FilterModal from '../FilterModal';

const HeaderRow = ({ headerList, customHeaderComponent, fieldWidths, fieldFilters, setFieldFilters, filterModalInfo, setFilterModalInfo, sortInfo, setSortInfo, selectedHeaderFields, setSelectedHeaderFields }) => {

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
      {/* {headerList.map((header, index) => (
        header.Visibility && !selectedHeaderFields.includes(header.Field) && 
        <HeaderCell 
          key={index}
          fieldWidth={fieldWidths && fieldWidths[header.Field] ? fieldWidths[header.Field] : 100}
          customHeaderComponent={customHeaderComponent}
          header={header}
          fieldFilters={fieldFilters}
          setFilterModalInfo={setFilterModalInfo}
          sortInfo={sortInfo}
          setSortInfo={setSortInfo}
          selectedHeaderFields={selectedHeaderFields}
          setSelectedHeaderFields={setSelectedHeaderFields}
        />
      ))} */}
      <FlatList
        data={headerList}
        horizontal
        scrollEnabled={false}
        renderItem={({ item, index }) => (
          item.Visibility && !selectedHeaderFields.includes(item.Field) && 
          <HeaderCell 
            key={index}
            fieldWidth={fieldWidths && fieldWidths[item.Field] ? fieldWidths[item.Field] : 100}
            customHeaderComponent={customHeaderComponent}
            header={item}
            fieldFilters={fieldFilters}
            setFilterModalInfo={setFilterModalInfo}
            sortInfo={sortInfo}
            setSortInfo={setSortInfo}
            selectedHeaderFields={selectedHeaderFields}
            setSelectedHeaderFields={setSelectedHeaderFields}
          />
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const getStyles = (theme) => StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
  },
});

export default HeaderRow;
