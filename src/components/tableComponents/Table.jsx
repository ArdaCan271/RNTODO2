import React, { useState } from 'react';
import { ScrollView, View, FlatList, StyleSheet } from 'react-native';
import { useTheme } from '../../constants/colors';
import HeaderRow from './HeaderRow';
import DataRow from './DataRow';
import Pagination from './Pagination';

const Table = ({ headerList, rowList, fieldWidths, customHeaderComponent, customDataComponent, paginationEnabled, itemsPerPage = 1 }) => {
  const theme = useTheme();
  const styles = getStyles(theme);

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(itemsPerPage);
  const [selectedRowIndex, setSelectedRowIndex] = useState(null); // State to track the selected row index
  
  const totalPages = Math.ceil(rowList.length / (rowsPerPage === 'Hepsi' ? rowList.length : rowsPerPage));
  const paginatedData = rowList.slice((currentPage - 1) * (rowsPerPage === 'Hepsi' ? rowList.length : rowsPerPage), currentPage * (rowsPerPage === 'Hepsi' ? rowList.length : rowsPerPage));
  
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
      {paginationEnabled &&
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          handleNextPage={handleNextPage}
          handlePreviousPage={handlePreviousPage}
          handleGoToPage={handleGoToPage}
          rowsPerPage={rowsPerPage}
          setRowsPerPage={setRowsPerPage}
        />
      }
      <ScrollView horizontal bounces={false}>
        <View style={styles.tableContainerView}>
          <HeaderRow
            headerList={headerList}
            customHeaderComponent={customHeaderComponent}
            fieldWidths={fieldWidths}
          />
          <FlatList
            data={paginationEnabled ? paginatedData : rowList}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => (
              <DataRow
                item={item}
                headerList={headerList}
                customDataComponent={customDataComponent}
                dataRowIndex={index}
                fieldWidths={fieldWidths}
                selectedRowIndex={selectedRowIndex}
                setSelectedRowIndex={setSelectedRowIndex}
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
});

export default Table;
