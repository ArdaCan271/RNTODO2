import React, { useState, useMemo } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { useTheme } from '../constants/colors';
import CustomHeader from '../components/CustomHeader';
import MenuItem from '../components/MenuItem';
import CustomerDetailSummary from '../components/CustomerDetailSummary';

const formatCurrency = (value) => {
  const isNegative = value < 0;
  const absoluteValue = Math.abs(value);
  const parts = absoluteValue.toFixed(2).split('.');
  const lira = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  const kurus = parts[1];
  
  return `${isNegative ? '-' : ''}₺${lira},${kurus}`;
};

const CustomerDetailScreen = ({ navigation, route }) => {
  const theme = useTheme();
  const styles = useMemo(() => getStyles(theme), [theme]);

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

  const sampleSummaryData = [
    {
      topCircleColor: theme.primary,
      topTitle: "Bakiye",
      topValue: route.params.customer.Bakiye,
      listElements: [
        { title: 'Borç', value: route.params.customer.Borc, color: 'red' },
        { title: 'Alacak', value: route.params.customer.Alacak, color: 'purple' },
      ]
    },
    {
      topCircleColor: null,
      topTitle: "Toplam Risk",
      topValue: route.params.customer.CariRisk,
      listElements: [
        { title: 'Çek Bakiye', value: route.params.customer.CekBakiye, color: 'red' },
        { title: 'Senet Bakiye', value: route.params.customer.SenetBakiye, color: 'orange' },
        { title: 'Bakiye', value: route.params.customer.Bakiye, color: 'purple' },
      ]
    }
  ];

  return (
    <View style={styles.container}>
      <CustomHeader navigation={navigation} title="Müşteri Detayı" />
      <Text style={styles.customerName}>{route.params.customer.Isim}</Text>
      <View style={styles.summariesWrapper}>
        {sampleSummaryData.map((summaryData, index) => (
          <CustomerDetailSummary
            key={index}
            topCircleColor={summaryData.topCircleColor}
            topTitle={summaryData.topTitle}
            topValue={summaryData.topValue}
            listElements={summaryData.listElements}
            style={{ borderTopWidth: index === 0 ? 2 : 0, borderTopColor: theme.primary }}
          />
        ))}
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

const getStyles = (theme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
    paddingTop: 50,
  },
  customerName: {
    marginTop: 4,
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.text,
    textAlign: 'center',
  },
  summariesWrapper: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    paddingTop: 4,
  },
});

export default CustomerDetailScreen;