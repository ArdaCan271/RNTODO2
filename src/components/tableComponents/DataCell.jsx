import React from 'react';
import { View, StyleSheet } from 'react-native';

import { useTheme } from '../../constants/colors';
import { formatData } from '../../utils/formatData';

import DefaultDataCellComponent from './DefaultDataCellComponent';

const DataCell = ({fieldWidth, customDataComponent, data, itemHeader, item}) => {

  const theme = useTheme();
  const styles = getStyles(theme);

  return (
    <View style={[styles.cellStyle, {width: fieldWidth}]}>
      {customDataComponent ?
        customDataComponent(data, itemHeader, formatData, item)
        :
        <DefaultDataCellComponent data={data} itemHeader={itemHeader} formatData={formatData} item={item}/>
      }
    </View>
  );
};

const getStyles = (theme) => StyleSheet.create({
  cellStyle: {
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: theme.primary,
    borderBottomWidth: 1,
    borderRightWidth: 1,
  },
});

export default DataCell;
