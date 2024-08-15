import React, { useEffect, useState, useRef, useMemo } from 'react';
import { ScrollView, View, StyleSheet, useWindowDimensions, ActivityIndicator, TouchableOpacity, StatusBar, Text } from 'react-native';
import { useTheme } from '../../constants/colors';

import HeaderRow from './HeaderRow';
import DataRow from './DataRow';
import Pagination from './Pagination';

import axios from 'axios';

import { clearAllFilters } from '../../utils/clearAllFieldFilters';

import { useSelector } from 'react-redux';

import { SyncedScrollViewContext, syncedScrollViewState } from '../../contexts/SyncedScrollViewContext';
import { SyncedScrollView } from './SyncedScrollView';

import StickyDataRow from './StickyDataRow';
import StickyHeaderRow from './StickyHeaderRow';

const Table = ({ fieldWidths, detailFieldWidths, customHeaderComponent, customDataComponent, requestUrl, detailRequestUrl, paginationEnabled, itemsPerPage = 1, fieldFilters, setFieldFilters, subDocumentConnectionId, navigation }) => {

  const userToken = useSelector((state) => state.userData.data.token);
  const baseRequestURL = useSelector((state) => state.baseRequestURL.value);

  const statusBarHeight = StatusBar.currentHeight;

  const windowWidth = useWindowDimensions().width;
  const windowHeight = useWindowDimensions().height;

  const theme = useTheme();
  const styles = useMemo(() => getStyles(theme), [theme]);

  const [isLoading, setIsLoading] = useState(true);

  const [tableHeaderList, setTableHeaderList] = useState([]);
  const [tableRowList, setTableRowList] = useState([]);

  const [tableCurrentPage, setTableCurrentPage] = useState(1);
  const [tableTotalPages, setTableTotalPages] = useState(1);


  const [rowsPerPage, setRowsPerPage] = useState(itemsPerPage);

  const fetchTableData = async (requestPageNumber = 1, requestPageSize = 10) => {
    const apiUrl = `${baseRequestURL}/${requestUrl}`;
    
    try {
      setIsLoading(true);
      const response = await axios.post(apiUrl, {
        token: 'RasyoIoToken2021',
        user_token: userToken,
        PageSize: requestPageSize,
        PageNumber: requestPageNumber,
        SortBy: sortInfo.sortByField,
        SortDirection: sortInfo.sortDirection,
        SubDocumentConnectionId: subDocumentConnectionId,
        ...fieldFilters,
      });
      setTableHeaderList(response.data[0]);
      setTableTotalPages(response.data[1][0].PageCount);
      setTableRowList(response.data[2]);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

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

  const [selectedRowIndex, setSelectedRowIndex] = useState(null);
  const lastTap = useRef({ time: 0, index: null });
  const timer = useRef(null);

  const handleRowClick = (item, index) => {
    const now = Date.now();
    const DOUBLE_PRESS_DELAY = 300;

    if (lastTap.current.time && (now - lastTap.current.time) < DOUBLE_PRESS_DELAY && lastTap.current.index === index) {
      if (navigation) {
        navigation.navigate('DetailTable', { subDocumentConnectionId: item.SubDocumentConnectionId, detailRequestUrl: detailRequestUrl, detailFieldWidths: detailFieldWidths });
      }
      clearTimeout(timer.current);
    } else {
      lastTap.current = { time: now, index };
      timer.current = setTimeout(() => {
        if (selectedRowIndex === index) {
          setSelectedRowIndex(null);
        } else {
          setSelectedRowIndex(index);
        }
      }, DOUBLE_PRESS_DELAY);
    }
  };

  const [sortInfo, setSortInfo] = useState({
    sortByField: null,
    sortDirection: null,
  });

  useEffect(() => {
    if (tableCurrentPage !== 1) {
      setTableCurrentPage(1);
    } else {
      fetchTableData(1, rowsPerPage);
      setSelectedRowIndex(null);
    }
  }, [rowsPerPage, sortInfo.sortByField, sortInfo.sortDirection, fieldFilters])

  useEffect(() => {
    if (!isLoading) {
      fetchTableData(tableCurrentPage, rowsPerPage);
      setSelectedRowIndex(null);
    }
  }, [tableCurrentPage]);

  useEffect(() => {
    setSortInfo({
      sortByField: sortInfo.sortByField,
      sortDirection: 'asc',
    });
  }, [sortInfo.sortByField]);

  const [filterModalInfo, setFilterModalInfo] = useState({
    visible: false,
    type: null,
    field: null,
    title: null,
  });

  const [selectedHeaderFields, setSelectedHeaderFields] = useState([]);
  const [selectedHeaderFieldsTotalWidth, setSelectedHeaderFieldsTotalWidth] = useState(0);

  useEffect(() => {
    setSelectedHeaderFieldsTotalWidth(selectedHeaderFields.reduce((acc, item) => acc + (fieldWidths[item] ? fieldWidths[item] : 100), 0));
  }, [selectedHeaderFields]);

  return (
    <View style={[styles.tableContainer, { width: windowWidth, height: windowHeight - (theme.padding.header + (windowWidth > windowHeight ? statusBarHeight + 20 : statusBarHeight - 1)) }]}>
      {paginationEnabled &&
        <Pagination
          currentPage={tableCurrentPage}
          totalPages={tableTotalPages}
          handleNextPage={handleNextPage}
          handlePreviousPage={handlePreviousPage}
          handleGoToPage={handleGoToPage}
          rowsPerPage={rowsPerPage}
          changeRowsPerPage={changeRowsPerPage}
          clearAllFilters={() => clearAllFilters(setFieldFilters)}
          isLoading={isLoading}
        />
      }
      {isLoading ?
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color={theme.primary} />
        </View>
        :
        <View style={{
          width: "100%",
          height: "100%",
        }}>
          <SyncedScrollViewContext.Provider value={syncedScrollViewState}>
            <View style={{ zIndex: 1, position: 'absolute', top: 0, left: 0, flexDirection: 'row' }}>
              <StickyHeaderRow
                headerList={tableHeaderList}
                fieldWidths={fieldWidths}
                fieldFilters={fieldFilters}
                setFieldFilters={setFieldFilters}
                filterModalInfo={filterModalInfo}
                setFilterModalInfo={setFilterModalInfo}
                sortInfo={sortInfo}
                setSortInfo={setSortInfo}
                selectedHeaderFields={selectedHeaderFields}
                setSelectedHeaderFields={setSelectedHeaderFields}
              />
            </View>
            <View style={{ width: windowWidth - selectedHeaderFieldsTotalWidth, marginLeft: selectedHeaderFieldsTotalWidth }}>
              <SyncedScrollView isLoading={isLoading} selectedHeaderFields={selectedHeaderFields} selectedRowIndex={selectedRowIndex} id={0} horizontal showsHorizontalScrollIndicator={false}>
                <HeaderRow
                  headerList={tableHeaderList}
                  fieldWidths={fieldWidths}
                  fieldFilters={fieldFilters}
                  setFieldFilters={setFieldFilters}
                  filterModalInfo={filterModalInfo}
                  setFilterModalInfo={setFilterModalInfo}
                  sortInfo={sortInfo}
                  setSortInfo={setSortInfo}
                  selectedHeaderFields={selectedHeaderFields}
                  setSelectedHeaderFields={setSelectedHeaderFields}
                />
              </SyncedScrollView>
            </View>
            {tableRowList && tableRowList.length > 0 ?

              <ScrollView>
                <View style={{ width: '100%', height: '100%', flexDirection: 'row' }}>
                  <View style={{ width: selectedHeaderFieldsTotalWidth }}>
                    <View>
                      {tableRowList.map((item, index) => (
                        <TouchableOpacity key={index} style={{ flexDirection: 'row' }} onPress={() => handleRowClick(item, index)}>
                          <StickyDataRow
                            item={item}
                            headerList={tableHeaderList}
                            fieldWidths={fieldWidths}
                            backgroundColor={index === selectedRowIndex ? theme.tableHighlight : (index % 2 === 0 ? theme.background : theme.backgroundAlt)}
                            selectedHeaderFields={selectedHeaderFields}
                          />
                        </TouchableOpacity>
                      ))}
                    </View>
                  </View>
                  <View style={{ width: windowWidth - selectedHeaderFieldsTotalWidth }}>
                    <SyncedScrollView id={1} horizontal>
                      <View>
                        {tableRowList.map((item, index) => (
                          <TouchableOpacity key={index} style={{ flexDirection: 'row' }} onPress={() => handleRowClick(item, index)}>
                            <DataRow
                              item={item}
                              headerList={tableHeaderList}
                              fieldWidths={fieldWidths}
                              backgroundColor={index === selectedRowIndex ? theme.tableHighlight : (index % 2 === 0 ? theme.background : theme.backgroundAlt)}
                              selectedHeaderFields={selectedHeaderFields}
                            />
                          </TouchableOpacity>
                        ))}
                      </View>
                    </SyncedScrollView>
                  </View>
                </View>
              </ScrollView>
              :
              <View style={styles.noDataFoundContainer}>
                <Text style={styles.noDataFoundText}>Veri Bulunamadı</Text>
              </View>
            }
          </SyncedScrollViewContext.Provider>
        </View>

      }
    </View>
  );
};

const getStyles = (theme) => StyleSheet.create({
  tableContainer: {
    backgroundColor: theme.background,
  },
  tableContainerView: {
    flexDirection: 'column',
  },
  stickyColumnsContainer: {
    position: 'absolute',
    left: 0,
    zIndex: 1,
    height: '100%',
    width: 200,
    backgroundColor: theme.background,
    borderRightWidth: 1,
    borderRightColor: theme.red,
  },
  freeColumnsContainer: {
    height: '100%',
    backgroundColor: theme.background,
  },
  noDataFoundContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noDataFoundText: {
    color: theme.text,
    fontSize: 20,
  },
});

export default Table;