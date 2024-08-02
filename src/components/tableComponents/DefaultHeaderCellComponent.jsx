import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useTheme } from '../../constants/colors';

const DefaultHeaderCellComponent = ({ title, item, fieldFilters, setFilterModalInfo, sortInfo, setSortInfo, selectedHeaderFields, setSelectedHeaderFields }) => {
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
      return theme.orange;
    } else if (fieldFilters && (fieldFilters[`${item.Field}End`] || fieldFilters[`${item.Field}Start`]) && (fieldFilters[`${item.Field}Start`].length > 0 || fieldFilters[`${item.Field}End`].length > 0)) {
      return theme.orange;
    }
    return theme.white;
  }

  const handleSortPress = () => {
    setSortInfo({
      sortByField: item.Field,
      sortDirection: sortInfo.sortByField !== item.Field ? 'asc' : (sortInfo.sortDirection === 'asc' ? 'desc' : (sortInfo.sortDirection === 'desc' ? null : 'asc')),
    });
  };

  const getSortIcon = () => {
    if (item.Field === sortInfo.sortByField) {
      if (sortInfo.sortDirection === 'asc') {
        return 'sort-asc';
      } else if (sortInfo.sortDirection === 'desc') {
        return 'sort-desc';
      }
    }
    return 'sort';
  }

  const getSortIconColor = () => {
    if (item.Field === sortInfo.sortByField && (sortInfo.sortDirection === 'asc' || sortInfo.sortDirection === 'desc')) {
      return theme.orange;
    }
    return theme.white;
  }

  const handleTitlePress = () => {
    if (selectedHeaderFields.includes(item.Field)) {
      setSelectedHeaderFields(selectedHeaderFields.filter(field => field !== item.Field));
    } else {
      setSelectedHeaderFields([...selectedHeaderFields, item.Field]);
    }
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
      <TouchableOpacity
        onPress={handleTitlePress}
        style={styles.headerCellTextWrapper}
      >
        <Text style={styles.headerCellText} numberOfLines={2}>
          {title}
        </Text>
      </TouchableOpacity>
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
  headerCellTextWrapper: {
    flex: 2,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerCellText: {
    color: theme.white,
    textAlign: 'center',
    fontSize: 12,
    marginHorizontal: 5,
  },
});

export default DefaultHeaderCellComponent;
