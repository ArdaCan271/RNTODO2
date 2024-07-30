import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useTheme } from '../../constants/colors';

const DefaultHeaderCellComponent = ({ title, item, sortByField, setSortByField, sortDirection, setSortDirection, fieldFilters, setFilterModalInfo }) => {
  const theme = useTheme();
  const styles = getStyles(theme);

  const handleFilterPress = () => {
    setFilterModalInfo({
      visible: true,
      type: item.FilterType,
      field: item.Field,
      title: item.Title,
    });
  };

  const getFilterIconColor = () => {
    if (fieldFilters && fieldFilters[item.Field] && fieldFilters[item.Field].length > 0) {
      return theme.tableHighlight;
    }
    return theme.white;
  }

  const handleSortPress = () => {
    setSortByField(item.Field);
    if (sortDirection === 'asc') {
      setSortDirection('desc');
    } else if (sortDirection === 'desc') {
      setSortDirection(null);
    } else {
      setSortDirection('asc');
    }
  };

  const getSortIcon = () => {
    if (item.Field === sortByField) {
      if (sortDirection === 'asc') {
        return 'sort-asc';
      } else if (sortDirection === 'desc') {
        return 'sort-desc';
      }
    }
    return 'sort';
  }

  const getSortIconColor = () => {
    if (item.Field === sortByField && (sortDirection === 'asc' || sortDirection === 'desc')) {
      return theme.tableHighlight;
    }
    return theme.white;
  }

  return (
    <View style={styles.headerCellComponent}>
      {item.IsFilter &&
        <TouchableOpacity
          onPress={handleFilterPress}
          style={styles.filterButton}
        >
          <FontAwesome
            name="filter" 
            size={20}
            color={getFilterIconColor()} 
          />
        </TouchableOpacity>
      }
      <Text style={styles.headerCellText} numberOfLines={2}>
        {title}
      </Text>
      {item.Sortable &&
        <TouchableOpacity
          onPress={handleSortPress}
          style={styles.sortButton}
        >
          <FontAwesome 
            name={getSortIcon()} 
            size={20} 
            color={getSortIconColor()}
          />
        </TouchableOpacity>
      }
    </View>
  );
}

const getStyles = (theme) => StyleSheet.create({
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

export default DefaultHeaderCellComponent;
