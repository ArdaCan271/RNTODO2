import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

import { useTheme } from '../constants/colors';

import FilterRangeDate from './FilterRangeDate';

const FilterRange = ({ fieldFilters, setFieldFilters, filterModalInfo, onClose }) => {

  const theme = useTheme();
  const styles = getStyles(theme);

  return (
    <View style={styles.container}>
      {filterModalInfo.field.toLowerCase().includes('date') &&
        <FilterRangeDate
          fieldFilters={fieldFilters}
          setFieldFilters={setFieldFilters}
          filterModalInfo={filterModalInfo}
          onClose={onClose}
        />
      }
    </View>
  );
}

const getStyles = (theme) => StyleSheet.create({
  container: {
    width: '100%',
  },
  text: {
    color: theme.text,
  },
});

export default FilterRange;