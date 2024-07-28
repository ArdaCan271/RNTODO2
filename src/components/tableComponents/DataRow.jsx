import React, { useRef } from 'react';
import { StyleSheet, TouchableOpacity} from 'react-native';
import DataCell from './DataCell';
import { useTheme } from '../../constants/colors';

const DataRow = ({ item, headerList, customDataComponent, fieldWidths, dataRowIndex, selectedRowIndex, setSelectedRowIndex }) => {
  const theme = useTheme();
  const styles = getStyles(theme);

  const lastTap = useRef(0);

  const handleTap = () => {
    const now = Date.now();
    const DOUBLE_PRESS_DELAY = 300; // milliseconds

    if (lastTap.current && (now - lastTap.current) < DOUBLE_PRESS_DELAY) {
      console.log('double tapped');
      // Add any additional logic for double tap here
    } else {
      lastTap.current = now;
      setSelectedRowIndex(prevIndex => (prevIndex === dataRowIndex ? null : dataRowIndex));
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.rowContainer,
        {
          backgroundColor: selectedRowIndex === dataRowIndex ? 'yellow' : (dataRowIndex % 2 === 0 ? theme.background : theme.backgroundAlt),
        },
      ]}
      onPress={handleTap}
    >
      {headerList.map((header, index) => (
        header.Visibility &&
        <DataCell
          key={index}
          fieldWidth={fieldWidths && fieldWidths[header.Field] ? fieldWidths[header.Field] : 100}
          customDataComponent={customDataComponent}
          data={item[header.Field]}
          itemHeader={header}
          item={item}
        />
      ))}
    </TouchableOpacity>
  );
};

const getStyles = (theme) => StyleSheet.create({
  rowContainer: {
    flexDirection: 'row',
  },
});

export default DataRow;
