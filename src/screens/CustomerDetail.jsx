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
      <Text style={styles.customerName}>{route.params.customer.Isim}</Text>
      <View
        style={styles.summariesWrapper}
      >
        <View
          style={styles.bakiyeSummary}
        >
          
        </View>
        <View
          style={styles.riskSummary}
        >

        </View>
      </View>
      <FlatList
        data={menuItems}
        keyExtractor={(item) => item.mobile}
        renderItem={({ item, index }) => (
          <MenuItem
            item={item}
            expandedItems={expandedItems}
            onToggle={handleToggle}
            navigation={navigation}
            style={{ borderTopWidth: index === 0 ? 0 : 0, borderTopColor: 'rgb(180, 180, 180)' }}
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
  customerName: {
    marginTop: 4,
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.black,
    textAlign: 'center',
  },
  summariesWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    columnGap: 6,
    paddingVertical: 10,
    height: 164,
    borderBottomWidth: 2,
    borderBottomColor: colors.primaryDark,
    
  },
  bakiyeSummary: {
    width: '48%',
    height: 144,
    backgroundColor: colors.white,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: colors.primaryDark,
    borderWidth: 2,
  },
  riskSummary: {
    width: '48%',
    height: 144,
    backgroundColor: colors.white,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: colors.primaryDark,
    borderWidth: 2,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
});

export default CustomerDetail;