import React, { useEffect, useState, useRef } from 'react';
import { ScrollView, View, FlatList, StyleSheet, useWindowDimensions, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useTheme } from '../../constants/colors';
import HeaderRow from './HeaderRow';
import DataRow from './DataRow';
import Pagination from './Pagination';

import axios from 'axios';

import { FlashList } from '@shopify/flash-list';

import { useSelector } from 'react-redux';

const Table = ({ fieldWidths, customHeaderComponent, customDataComponent, requestUrl, paginationEnabled, itemsPerPage = 1 }) => {

  const userToken = useSelector((state) => state.userData.data.token);
  const baseRequestURL = useSelector((state) => state.baseRequestURL.value);

  const windowWidth = useWindowDimensions().width;
  const windowHeight = useWindowDimensions().height;

  const theme = useTheme();
  const styles = getStyles(theme);

  const [rowsPerPage, setRowsPerPage] = useState(itemsPerPage);
  
  const fetchTableData = async (requestPageNumber = 1, requestPageSize = 10) => {
    const apiUrl = `${baseRequestURL}/${requestUrl}`;
    try {
      setIsLoading(true);
      console.log('sending request with requestPageNumber: ' + requestPageNumber);
      console.log('sending request with requestPageSize: ' + requestPageSize);
      const response = await axios.post(apiUrl, {
        token: 'RasyoIoToken2021',
        user_token: userToken,
        pageSize: requestPageSize,
        pageNumber: requestPageNumber,
      });
      setTableHeaderList(response.data[0]);
      setTableCurrentPage(response.data[1][0].PageNumber);
      setTableTotalPages(response.data[1][0].PageCount);
      setTableRowList(response.data[2]);
      console.log('received response with PageNumber: ' + response.data[1][0].PageNumber);
      console.log('received response with PageCount: ' + response.data[1][0].PageCount);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const [isLoading, setIsLoading] = useState(true);

  const [tableHeaderList, setTableHeaderList] = useState([]);
  const [tableRowList, setTableRowList] = useState([]);

  const [tableCurrentPage, setTableCurrentPage] = useState(1);
  const [tableTotalPages, setTableTotalPages] = useState(1);
  
  useEffect(() => {
    setTableCurrentPage(0);
  }, [rowsPerPage]);

  useEffect(() => {
    if (tableCurrentPage === 0) {
      fetchTableData(1, rowsPerPage);
    } else {
      fetchTableData(tableCurrentPage, rowsPerPage);
    }
  }, [tableCurrentPage]);

  const changeRowsPerPage = (newRowsPerPage) => {
    setRowsPerPage(newRowsPerPage);
  };

  const handleNextPage = () => {
    if (tableCurrentPage < tableTotalPages && !isLoading) {
      setTableCurrentPage(tableCurrentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (tableCurrentPage > 1 && !isLoading) {
      setTableCurrentPage(tableCurrentPage - 1);
    }
  };

  const handleGoToPage = (page) => {
    if (page >= 1 && page <= tableTotalPages && !isLoading) {
      setTableCurrentPage(page);
    }
  };

  return (
    <View style={styles.tableContainer}>
      {paginationEnabled &&
        <Pagination
          currentPage={tableCurrentPage}
          totalPages={tableTotalPages}
          handleNextPage={handleNextPage}
          handlePreviousPage={handlePreviousPage}
          handleGoToPage={handleGoToPage}
          rowsPerPage={rowsPerPage}
          changeRowsPerPage={changeRowsPerPage}
          isLoading={isLoading}
        />
      }
      {
        isLoading ?
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" color={theme.primary} />
          </View>
          :
          <ScrollView horizontal>
            <View style={[styles.tableContainerView, { height: windowHeight - (theme.padding.header + 32), minWidth: windowWidth }]}>
              <HeaderRow
                headerList={tableHeaderList}
                customHeaderComponent={customHeaderComponent}
                fieldWidths={fieldWidths}
              />
              <FlashList
                data={tableRowList}
                keyExtractor={(item, index) => index.toString()}
                estimatedItemSize={32}
                renderItem={({ item, index }) => (
                  <TouchableOpacity
                    key={index}
                    style={{ flexDirection: 'row' }}
                  >
                    <DataRow
                      item={item}
                      headerList={tableHeaderList}
                      customDataComponent={customDataComponent}
                      dataRowIndex={index}
                      fieldWidths={fieldWidths}
                      backgroundColor={index % 2 === 0 ? theme.background : theme.backgroundAlt}
                      />
                  </TouchableOpacity>
                )}
              />
            </View>
          </ScrollView>
      }
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
});

export default Table;