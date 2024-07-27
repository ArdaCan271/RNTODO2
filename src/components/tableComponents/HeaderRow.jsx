import React from 'react';
import { View, StyleSheet } from 'react-native';

import { useTheme } from '../../constants/colors';

import HeaderCell from './HeaderCell';

const HeaderRow = ({ headerList, headerComponent, headerCellStyle, fieldWidths }) => {

  const theme = useTheme();
  const styles = getStyles(theme);

  return (
    <View style={styles.headerContainer}>
      {headerList.map((header, index) => (
        header.Visibility &&
        <HeaderCell 
          key={index} 
          visible={header.Visibility} 
          cellStyle={headerCellStyle}
          fieldWidth={fieldWidths && fieldWidths[header.Field] ? fieldWidths[header.Field] : 100}
        >
          {headerComponent(header.Title, header)}
        </HeaderCell>
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
