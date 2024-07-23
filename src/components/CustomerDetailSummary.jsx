import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

import colors from '../constants/colors';

const formatCurrency = (value) => {
  const isNegative = value < 0;
  const absoluteValue = Math.abs(value);
  const parts = absoluteValue.toFixed(2).split('.');
  const lira = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  const kurus = parts[1];
  
  return `${isNegative ? '-' : ''}₺${lira},${kurus}`;
};

const CustomerDetailSummary = ({topCircleColor, topTitle, topValue, listElements}) => {
  return (
    <View style={styles.summary}>
      <View style={styles.topWrapper}>
        {topCircleColor ? <View style={[styles.topCircle, {borderColor: topCircleColor}]} /> : null}
        <View style={styles.topContent}>
          <Text style={styles.topTitle}>{topTitle}</Text>
          <Text style={styles.topValue}>{formatCurrency(topValue)}</Text>
        </View>
      </View>
      {
        listElements.map((element, index) => (
          <View style={styles.listItem} key={index}>
            <View style={[styles.listItemColorCircle, {backgroundColor: element.color}]} />
            <Text style={styles.listItemTitle}>{element.title}:</Text>
            <Text style={styles.listItemValue}>{formatCurrency(element.value)}</Text>
          </View>
        ))
      }
    </View>
  );
}

const styles = StyleSheet.create({
  summary: {
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
    elevation: 2,
    marginRight: 10,
  },
  topContent: {
    alignItems: 'center',
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
});

export default CustomerDetailSummary;