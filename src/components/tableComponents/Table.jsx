import React, { useState } from 'react';
import { ScrollView, View, FlatList, Text, StyleSheet, Button } from 'react-native';

import { useTheme } from '../../constants/colors';

import HeaderRow from './HeaderRow';
import DataRow from './DataRow';

const Table = ({ headerList, rowList, fieldWidths, headerComponent, dataComponent }) => {
  const theme = useTheme();
  const styles = getStyles(theme);

  const formattedDate = (date) => {
    const dateObj = new Date(date);

    if (isNaN(dateObj.getTime())) {
      return '';
    }

    const day = String(dateObj.getDate()).padStart(2, '0');
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const year = dateObj.getFullYear();

    return `${day}.${month}.${year}`;
  };

  const formattedCurrency = (currency) => {
    if (isNaN(currency)) {
      return '';
    }

    const formattedNumber = Number(currency).toFixed(2);
    const [integerPart, decimalPart] = formattedNumber.split('.');
    const integerPartWithSeparators = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

    return `${integerPartWithSeparators},${decimalPart}`;
  };

  const formatData = (data, type) => {
    if (type === 'date') {
      return formattedDate(data);
    } else if (type === 'currency') {
      return formattedCurrency(data);
    } else {
      return data;
    }
  };

  const tableHeaderComponent = (title, item) => {
    if (headerComponent) {
      return headerComponent(title, item, styles);
    } else {
      return (
        <View 
          style={styles.headerCellComponent}
        >
          <Text 
            style={styles.headerCellText}
            numberOfLines={2}
          >
            {title}
          </Text>
        </View>
      );
    }
  };

  const tableDataComponent = (data, itemHeader, item) => {
    if (dataComponent) {
      return dataComponent(data, itemHeader, item, formatData, styles);
    } else {
      return (
        <View 
          style={styles.dataCellComponent}
        >
          <Text 
            style={styles.dataCellText}
            numberOfLines={1}
          >
            {formatData(data, itemHeader.Type)}
          </Text>
        </View>
      );
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.tableContainer} horizontal bounces={false}>
      <View style={styles.tableContainerView}>
        <HeaderRow
          headerList={headerList}
          headerComponent={tableHeaderComponent}
          headerCellStyle={{
            width: 100,
            height: 34,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: theme.primary,
          }}
          fieldWidths={fieldWidths}
        />
        <FlatList
          data={rowList}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <DataRow
              item={item}
              headerList={headerList}
              dataComponent={tableDataComponent}
              dataCellStyle={{
                width: 100,
                height: 32,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: index % 2 === 0 ? theme.background : theme.backgroundAlt,
                borderColor: theme.primary,
              }}
              fieldWidths={fieldWidths}
            />
          )}
        />
      </View>
    </ScrollView>
  );
};

const getStyles = (theme) => StyleSheet.create({
  tableContainer: {
  },
  tableContainerView: {
    flex: 1,
    flexDirection: 'column',
  },
  headerCellComponent: {
    width: '100%',
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
  dataCellComponent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  dataCellText: {
    color: theme.text,
    textAlign: 'center',
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  pageIndicator: {
    marginHorizontal: 10,
  },
});

export default Table;
