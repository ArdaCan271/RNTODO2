import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';

import FontAwesome from 'react-native-vector-icons/FontAwesome';

import { useTheme } from '../../constants/colors';

import HeaderCell from './HeaderCell';

const HeaderRow = ({ headerList, customHeaderComponent, headerCellStyle, fieldWidths }) => {

  const theme = useTheme();
  const styles = getStyles(theme);

  defaultHeaderComponent = (title, item) => {
    return (
      <View style={styles.headerCellComponent}>
      {item.IsFilter &&
        <TouchableOpacity
          onPress={() => {
            console.log('Filter pressed');
          }}
          style={styles.filterButton}
        >
          <FontAwesome name="filter" size={20} color={theme.white} />
        </TouchableOpacity>
      }
      <Text 
        style={styles.headerCellText}
        numberOfLines={2}
      >
        {title}
      </Text>
      {item.Sortable &&
        <TouchableOpacity
          onPress={() => {
            console.log('Sort pressed');
          }}
          style={styles.sortButton}
        >
          <FontAwesome name="sort" size={20} color={theme.white} />
        </TouchableOpacity>
      }
    </View>
    );
  };

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
          {customHeaderComponent ? 
            customHeaderComponent(header.Title, header)
            :
            defaultHeaderComponent(header.Title, header)
          }
        </HeaderCell>
      ))}
    </View>
  );
};

const getStyles = (theme) => StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
  },
  headerCellComponent: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  filterButton: {
    flex: 1,
    padding: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sortButton: {
    flex: 1,
    padding: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerCellText: {
    color: theme.white,
    textAlign: 'center',
    fontSize: 12,
    marginHorizontal: 5,
    flex: 2,
  },
});

export default HeaderRow;
