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

const CustomerDetailSummary = ({topCircleColor, topTitle, topValue, listElements, style}) => {
  return (
    <View style={[styles.summary, style]}>
      <View style={styles.borderLeftExtension1}/>
      <View style={styles.borderLeftExtension2}/>
      <View style={styles.topWrapper}>
        {topCircleColor ? <View style={[styles.topCircle, {borderColor: topCircleColor}]} /> : null}
        <View style={styles.topContent}>
          <Text style={styles.topTitle}>{topTitle}</Text>
          <Text style={styles.topValue}>{formatCurrency(topValue)}</Text>
        </View>
      </View>
      <View style={styles.listWrapper}>
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
    </View>
  );
}

const styles = StyleSheet.create({
  summary: {
    width: '100%',
    backgroundColor: colors.white,
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderBottomColor: colors.primaryDark,
    borderLeftColor: '#24337a',
    borderBottomWidth: 2,
    borderLeftWidth: 10,
    paddingLeft: 20,
  },
  borderLeftExtension1: {
    position: 'absolute',
    top: 0,
    left: 0.5,
    width: 7,
    height: '100%',
    backgroundColor: '#3b52c4',
  },
  borderLeftExtension2: {
    position: 'absolute',
    top: 0,
    left: 8.5,
    width: 3,
    height: '100%',
    backgroundColor: colors.primary,
  },
  topWrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 0,
    marginBottom: 10,
    marginTop: 8,
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
    marginRight: 20,
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
  listWrapper: {
    width: '100%',
    paddingHorizontal: 0,
    marginBottom: 10,
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