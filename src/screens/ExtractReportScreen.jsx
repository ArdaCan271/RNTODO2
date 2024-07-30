import React, { useEffect, useState } from 'react';
import { StyleSheet, View, BackHandler } from 'react-native';
import { useTheme } from '../constants/colors';

import CustomHeader from '../components/CustomHeader';

import Table from '../components/tableComponents/Table';

const ExtractReportScreen = ({ navigation }) => {

  const theme = useTheme();
  const styles = getStyles(theme);

  useEffect(() => {
    const backAction = () => {
      navigation.goBack();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    return () => backHandler.remove();
  }, []);

  const fieldWidths = {
    CurrentCode: 120,
    CurrentName: 200,
    CurrentCity: 120,
    SalesmanCode: 150,
    IncNo: 0,
    Date: 120,
    ReceiptNo: 150,
    Description: 250,
    TermDate: 120,
    Debit: 120,
    Credit: 120,
    DebitBalance: 120,
    CreditBalance: 120,
    SubDocumentConnectionId: 0,
  };

  const [fieldFilters, setFieldFilters] = useState({
    DateStart: '',
    DateEnd: '',
    TermDateStart: '',
    TermDateEnd: '',
    CurrentName: '',
    CurrentCity: '',
    ReceiptNo: '',
    SalesmanCode: '',
    CurrentCode: '',
  });

  return (
    <View style={styles.container}>
      <CustomHeader
        title="Genel Ekstre Raporu"
        navigation={navigation}
      />
      <Table
        fieldWidths={fieldWidths}
        requestUrl="DuyuII/CustomerExtract/GetListPaging"
        paginationEnabled
        itemsPerPage={10}
        fieldFilters={fieldFilters}
        setFieldFilters={setFieldFilters}
      />
    </View>
  );
};

const getStyles = (theme) => StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: theme.background,
    paddingTop: theme.padding.header,
  },
});

export default ExtractReportScreen;
