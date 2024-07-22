import { StyleSheet, Text, View, FlatList } from 'react-native';
import React, { useState } from 'react';

import CustomHeader from '../components/CustomHeader';
import MenuItem from '../components/MenuItem';

import colors from '../constants/colors';

const CustomerDetail = ({ navigation, route }) => {

  const menuItems = route.params.childrenOfMenuItem;

  const [expandedItems, setExpandedItems] = useState({});

  const handleToggle = (mobile, hasChildren) => {
    if (hasChildren) {
      setExpandedItems((prevExpandedItems) => ({
        ...prevExpandedItems,
        [mobile]: !prevExpandedItems[mobile],
      }));
    }
  };

  return (
    <View
      style={styles.container}
    >
      <CustomHeader navigation={navigation} title="Müşteri Detayı" />
      <FlatList
        data={menuItems}
        keyExtractor={(item) => item.mobile}
        renderItem={({ item }) => (
          <MenuItem
            item={item}
            expandedItems={expandedItems}
            onToggle={handleToggle}
            navigation={navigation}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingTop: 56,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
});

export default CustomerDetail;