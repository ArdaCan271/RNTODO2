import React from 'react';
import { View, StyleSheet } from 'react-native';

import { useTheme } from '../../constants/colors';

const DataCell = ({children, visible, cellStyle, fieldWidth}) => {

  const theme = useTheme();
  const styles = getStyles(theme);

  return (
    <View style={[cellStyle, {
        width: visible ? fieldWidth : 0,
        borderRightWidth: visible ? 1 : 0,
        borderBottomWidth: visible ? 1 : 0,
    }]}>
      {children}
    </View>
  );
};

const getStyles = (theme) => StyleSheet.create({

});

export default DataCell;
