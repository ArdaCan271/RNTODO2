import React, { useRef, useMemo } from 'react';
import { StyleSheet, FlatList, View } from 'react-native';
import DataCell from './DataCell';
import { useTheme } from '../../constants/colors';

import { FlashList } from '@shopify/flash-list';

const StickyDataRow = ({ item, headerList, customDataComponent, fieldWidths, backgroundColor, selectedHeaderFields }) => {
  const theme = useTheme();
  const styles = useMemo(() => getStyles(theme), [theme]);

  const renderDataCell = ({ item: header, index }) => (
    header.Visibility && selectedHeaderFields.includes(header.Field) && (
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
      {/* <FlatList
        data={headerList}
        horizontal
        scrollEnabled={false}
        renderItem={renderDataCell}
        keyExtractor={(header, index) => index.toString()}
      /> */}
      {headerList.map((header, index) => (
        header.Visibility && selectedHeaderFields.includes(header.Field) && (
          <DataCell
            key={index}
            fieldWidth={fieldWidths && fieldWidths[header.Field] ? fieldWidths[header.Field] : 100}
            customDataComponent={customDataComponent}
            data={item[header.Field]}
            itemHeader={header}
            item={item}
          />
        )
      ))}
    </View>
  );
};

const getStyles = (theme) => StyleSheet.create({
  rowContainer: {
    flexDirection: 'row',
  },
});

export default StickyDataRow;
