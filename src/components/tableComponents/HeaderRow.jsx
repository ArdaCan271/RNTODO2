import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';

import { useTheme } from '../../constants/colors';

import HeaderCell from './HeaderCell';

const HeaderRow = ({ headerList, customHeaderComponent, fieldWidths, setSortByField }) => {

  const theme = useTheme();
  const styles = getStyles(theme);

  return (
    <View style={styles.headerContainer}>
      {headerList.map((header, index) => (
        header.Visibility &&
        <HeaderCell 
          key={index}
          fieldWidth={fieldWidths && fieldWidths[header.Field] ? fieldWidths[header.Field] : 100}
          customHeaderComponent={customHeaderComponent}
          header={header}
          setSortByField={setSortByField}
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
