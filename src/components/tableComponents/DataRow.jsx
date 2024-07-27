import React from 'react';
import { View, StyleSheet } from 'react-native';
import DataCell from './DataCell';

import { useTheme } from '../../constants/colors';

const DataRow = ({ item, headerList, dataComponent, dataCellStyle, fieldWidths }) => {

  const theme = useTheme();
  const styles = getStyles(theme);

  return (
    <View style={styles.rowContainer}>
      {headerList.map((header, index) => (
        <DataCell 
          key={index} 
          visible={header.Visibility} 
          cellStyle={dataCellStyle}
          fieldWidth={fieldWidths && fieldWidths[header.Field] ? fieldWidths[header.Field] : 100}
        >
          {dataComponent(item[header.Field], header, item)}
        </DataCell>
      ))}
    </View>
  );
};

const getStyles = (theme) => StyleSheet.create({
  rowContainer: {
    flexDirection: 'row',
  },
});

export default DataRow;
