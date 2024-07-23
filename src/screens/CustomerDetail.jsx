import { StyleSheet, Text, View, FlatList } from 'react-native';
import React, { useState } from 'react';

import CustomHeader from '../components/CustomHeader';
import MenuItem from '../components/MenuItem';
import CustomerDetailSummary from '../components/CustomerDetailSummary';

import colors from '../constants/colors';

const formatCurrency = (value) => {
  const isNegative = value < 0;
  const absoluteValue = Math.abs(value);
  const parts = absoluteValue.toFixed(2).split('.');
  const lira = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  const kurus = parts[1];
  
  return `${isNegative ? '-' : ''}₺${lira},${kurus}`;
};

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
      <View style={styles.summariesWrapper}>
        <CustomerDetailSummary
          topCircleColor={colors.primary}
          topTitle="Bakiye"
          topValue={route.params.customer.Bakiye}
          listElements={[
            { title: 'Borç', value: route.params.customer.Borc, color: 'dodgerblue' },
            { title: 'Alacak', value: route.params.customer.Alacak, color: 'darkblue' },
          ]}
        />
        <CustomerDetailSummary
          topTitle="Toplam Risk"
          topValue={route.params.customer.CariRisk}
          listElements={[
            { title: 'Çek Bakiye', value: route.params.customer.CekBakiye, color: 'red' },
            { title: 'Senet Bakiye', value: route.params.customer.SenetBakiye, color: 'orange' },
            { title: 'Bakiye', value: route.params.customer.Bakiye, color: 'purple' },
          ]}
        />
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
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderColor: colors.primaryDark,
    borderWidth: 2,
    padding: 10,
  },
  topWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 0,
    marginBottom: 10,
  },
  topCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 5,
    borderColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2
  },
  topContent: {
    alignItems: 'center',
    marginLeft: 10,
  },
  topTitle: {
    fontSize: 14,
    color: 'rgb(100, 100, 100)',
  },
  topValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    marginTop: 6,
  },
  listItemColorCircle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.primary,
    marginTop: 1,
  },
  listItemTitle: {
    fontSize: 14,
    color: 'rgb(100, 100, 100)',
    marginLeft: 6,
    fontWeight: 'bold',
  },
  listItemValue: {
    fontSize: 15,
    color: 'black',
    marginLeft: 3,
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