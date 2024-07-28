import React, { useState } from 'react';
import { ScrollView, View, FlatList, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';

import FontAwesome from 'react-native-vector-icons/FontAwesome';

import { useTheme } from '../../constants/colors';

import HeaderRow from './HeaderRow';
import DataRow from './DataRow';
import Pagination from './Pagination';

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

const Table = ({ headerList, rowList, fieldWidths, customHeaderComponent, customDataComponent, itemsPerPage }) => {
  const theme = useTheme();
  const styles = getStyles(theme);

  const tableHeaderComponent = (title, item) => {
    if (customHeaderComponent) {
      return customHeaderComponent(title, item, styles);
    } else {
      return (
        <View style={styles.headerCellComponent}>
        {item.IsFilter &&
          <TouchableOpacity
            onPress={() => {
              console.log('Filter pressed');
            }}
            style={styles.filterButton}
          >
            <FontAwesome name="filter" size={20} color={theme.white} />
          </TouchableOpacity>
        }
        <Text 
          style={styles.headerCellText}
          numberOfLines={2}
        >
          {title}
        </Text>
        {item.Sortable &&
          <TouchableOpacity
            onPress={() => {
              console.log('Sort pressed');
            }}
            style={styles.sortButton}
          >
            <FontAwesome name="sort" size={20} color={theme.white} />
          </TouchableOpacity>
        }
      </View>
      );
    }
  };

  const tableDataComponent = (data, itemHeader, item) => {
    if (customDataComponent) {
      return customDataComponent(data, itemHeader, item, formatData, styles);
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

  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(rowList.length / itemsPerPage);
  const paginatedData = rowList.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleGoToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <View style={styles.tableContainer}>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        handleNextPage={handleNextPage}
        handlePreviousPage={handlePreviousPage}
        handleGoToPage={handleGoToPage}
      />
      <ScrollView horizontal bounces={false}>
        <View style={styles.tableContainerView}>
          <HeaderRow
            headerList={headerList}
            customHeaderComponent={tableHeaderComponent}
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
            data={paginatedData}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => (
              <DataRow
                item={item}
                headerList={headerList}
                customDataComponent={tableDataComponent}
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
    </View>
  );
};

const getStyles = (theme) => StyleSheet.create({
  tableContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: theme.background,
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
  dataCellComponent: {
    flex: 1,
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
