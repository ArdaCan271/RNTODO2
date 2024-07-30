import React, { useRef } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import DataCell from './DataCell';
import { useTheme } from '../../constants/colors';

import { FlashList } from '@shopify/flash-list';

const DataRow = ({ item, headerList, customDataComponent, fieldWidths, backgroundColor }) => {
  const theme = useTheme();
  const styles = getStyles(theme);

  const lastTap = useRef(0);

  const handleTap = () => {
    const now = Date.now();
    const DOUBLE_PRESS_DELAY = 300;

    if (lastTap.current && (now - lastTap.current) < DOUBLE_PRESS_DELAY) {
      console.log('double tapped');
    } else {
      lastTap.current = now;
    }
  };

  const renderDataCell = ({ item: header, index }) => (
    header.Visibility && (
      <DataCell
        key={index}
        fieldWidth={fieldWidths && fieldWidths[header.Field] ? fieldWidths[header.Field] : 100}
        customDataComponent={customDataComponent}
        data={item[header.Field]}
        itemHeader={header}
        item={item}
      />
    )
  );

  return (
    <View
      style={[styles.rowContainer, { backgroundColor: backgroundColor }]}
    >
      <FlashList
        data={headerList}
        horizontal
        renderItem={renderDataCell}
        keyExtractor={(header, index) => index.toString()}
        estimatedItemSize={80}
      />
    </View>
  );
};

const getStyles = (theme) => StyleSheet.create({
  rowContainer: {
    flexDirection: 'row',
  },
});

export default DataRow;
