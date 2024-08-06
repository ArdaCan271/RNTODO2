import React, {useMemo} from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';

import { useTheme } from '../../constants/colors';

import HeaderCell from './HeaderCell';

import FilterModal from '../FilterModal';

const StickyHeaderRow = ({ headerList, customHeaderComponent, fieldWidths, fieldFilters, setFieldFilters, filterModalInfo, setFilterModalInfo, sortInfo, setSortInfo, selectedHeaderFields, setSelectedHeaderFields }) => {

  const theme = useTheme();
  const styles = useMemo(() => getStyles(theme), [theme]);

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
        header.Visibility && selectedHeaderFields.includes(header.Field) && 
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
      ))}
    </View>
  );
};

const getStyles = (theme) => StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
  },
});

export default StickyHeaderRow;
