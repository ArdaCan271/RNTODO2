import { StyleSheet, Text, View } from 'react-native';
import React, { useMemo } from 'react';
import { useTheme } from '../constants/colors';

const formatCurrency = (value) => {
  const isNegative = value < 0;
  const absoluteValue = Math.abs(value);
  const parts = absoluteValue.toFixed(2).split('.');
  const lira = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  const kurus = parts[1];
  
  return `${isNegative ? '-' : ''}₺${lira},${kurus}`;
};

const CustomerDetailSummary = ({topCircleColor, topTitle, topValue, listElements, style}) => {
  const theme = useTheme();
  const styles = useMemo(() => getStyles(theme), [theme]);

  return (
    <View style={[styles.summary, style]}>
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

const getStyles = (theme) => StyleSheet.create({
  summary: {
    width: '100%',
    backgroundColor: theme.background,
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderBottomColor: theme.primary,
    borderLeftColor: theme.primary,
    borderBottomWidth: 2,
    borderLeftWidth: 15,
    paddingLeft: 10,
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
    borderColor: theme.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topContent: {
    alignItems: 'center',
    marginLeft: 10,
  },
  topTitle: {
    fontSize: 14,
    color: theme.textAlt,
  },
  topValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.text,
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
    backgroundColor: theme.primary,
    marginTop: 1,
  },
  listItemTitle: {
    fontSize: 14,
    color: theme.textAlt,
    marginLeft: 6,
    fontWeight: 'bold',
  },
  listItemValue: {
    fontSize: 15,
    color: theme.text,
    marginLeft: 3,
  },
});

export default CustomerDetailSummary;
