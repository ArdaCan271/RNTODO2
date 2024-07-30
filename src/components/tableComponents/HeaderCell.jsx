import React from 'react';
import { View, StyleSheet } from 'react-native';

import { useTheme } from '../../constants/colors';

import DefaultHeaderCellComponent from './DefaultHeaderCellComponent';

const HeaderCell = ({fieldWidth, customHeaderComponent, header, setSortByField}) => {

  const theme = useTheme();
  const styles = getStyles(theme);

  return (
    <View style={[styles.cellStyle, {width: fieldWidth}]}>
      {customHeaderComponent ?
        customHeaderComponent(header.Title, header)
        :
        <DefaultHeaderCellComponent 
          title={header.Title} 
          item={header}
          setSortByField={setSortByField}
        />
      }
    </View>
  );
};

const getStyles = (theme) => StyleSheet.create({
  cellStyle: {
    height: 34,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.primary,
    borderColor: theme.text,
    borderWidth: 1,
    borderLeftWidth: 0,
  },
});

export default HeaderCell;
