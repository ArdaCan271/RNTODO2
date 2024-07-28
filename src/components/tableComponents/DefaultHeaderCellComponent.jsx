import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';

import FontAwesome from 'react-native-vector-icons/FontAwesome';

import { useTheme } from '../../constants/colors';


const DefaultHeaderCellComponent = ({ title, item }) => {

  const theme = useTheme();
  const styles = getStyles(theme);

  return (
    <View style={styles.headerCellComponent}>
      {item.IsFilter &&
        <TouchableOpacity
          onPress={() => {
            console.log('Filter pressed on ' + item.Field);
          }}
          style={styles.filterButton}
        >
          <FontAwesome name="filter" size={20} color={theme.white} />
        </TouchableOpacity>
      }
      <Text style={styles.headerCellText} numberOfLines={2}>
        {title}
      </Text>
      {item.Sortable &&
        <TouchableOpacity
          onPress={() => {
            console.log('Sort pressed on ' + item.Field);
          }}
          style={styles.sortButton}
        >
          <FontAwesome name="sort" size={20} color={theme.white} />
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