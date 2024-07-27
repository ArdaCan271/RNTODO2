import React from 'react';
import { ScrollView, View, FlatList, Text, StyleSheet } from 'react-native';

import { useTheme } from '../../constants/colors';

import HeaderRow from './HeaderRow';
import DataRow from './DataRow';

const Table = ({ headerList, rowList, fieldWidths }) => {
  const theme = useTheme();
  const styles = getStyles(theme);

  const headerComponent = (title, item) => {
    return (
      <View style={styles.headerCellComponent}>
        <Text style={styles.headerCellText}>{title}</Text>
      </View>
    );
  };

  const dataComponent = (data, itemHeader, item) => {

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

    if (itemHeader.Type === 'date') {
      return (
        <View style={styles.dataCellComponent}>
          <Text style={styles.dataCellText}>{formattedDate(data)}</Text>
        </View>
      );
    } else if (itemHeader.Type === 'currency') {
      return (
        <View style={styles.dataCellComponent}>
          <Text style={styles.dataCellText}>{formattedCurrency(data)}</Text>
        </View>
      );
    } else {
      return (
        <View style={styles.dataCellComponent}>
          <Text numberOfLines={2} style={styles.dataCellText}>{data}</Text>
        </View>
      );
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.tableContainer} horizontal>
      <View style={styles.tableContainerView}>
        <HeaderRow
          headerList={headerList}
          headerComponent={headerComponent}
          headerCellStyle={{
            width: 100,
            height: 40,
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
              dataComponent={dataComponent}
              dataCellStyle={{
                width: 100,
                height: 40,
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
  },
  dataCellComponent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  dataCellText: {
    color: theme.text,
    textAlign: 'center',
  },
});

export default Table;
