import React, { useState, useEffect } from 'react';
import { StyleSheet, View, BackHandler, Text, ScrollView, FlatList} from 'react-native';
import { useTheme } from '../constants/colors';

import axios from 'axios';
import { useSelector } from 'react-redux';

import CustomHeader from '../components/CustomHeader';

import Table from '../components/tableComponents/Table';

const ExtractReportScreen = ({ navigation }) => {

  const theme = useTheme();
  const styles = getStyles(theme);

  useEffect(() => {
    getHeaders();
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


  const userToken = useSelector((state) => state.userData.data.token);
  const baseRequestURL = useSelector((state) => state.baseRequestURL.value);

  const [headerList, setHeaderList] = useState([]);
  const [rowList, setRowList] = useState([]);

  const getHeaders = async () => {
    const apiUrl = `${baseRequestURL}/DuyuII/CustomerExtract/GetListPaging`;
    try {
      const response = await axios.post(apiUrl, {
        token: 'RasyoIoToken2021',
        user_token: userToken,
      });
      setHeaderList(response.data[0]);
      setRowList(response.data[2]);
    } catch (error) {
      console.log(error);
    }
  };

  const sampleFields = {
      "CurrentCode": "100 01 001",
      "CurrentName": "MÜŞTERİ 005",
      "CurrentCity": "",
      "SalesmanCode": "90",
      "IncNo": 13235,
      "Date": "2022-01-28T00:00:00",
      "ReceiptNo": "MS39",
      "Description": "ACIKLAMA SATIRI",
      "TermDate": "2022-01-28T00:00:00",
      "Debit": 0.00000000,
      "Credit": 320.25000000,
      "DebitBalance": 0.00000000,
      "CreditBalance": -5707466.90260000,
      "SubDocumentConnectionId": "MS39"
  };

  const fieldWidths = {
    CurrentCode: 100,
    CurrentName: 200,
    CurrentCity: 100,
    SalesmanCode: 100,
    IncNo: 0,
    Date: 100,
    ReceiptNo: 100,
    Description: 250,
    TermDate: 100,
    Debit: 120,
    Credit: 120,
    DebitBalance: 120,
    CreditBalance: 120,
    SubDocumentConnectionId: 0,
  };


  return (
    <View style={styles.container}>
      <CustomHeader
        title="Genel Ekstre Raporu"
        navigation={navigation}
      />
      <Table
        headerList={headerList}
        rowList={rowList}
        fieldWidths={fieldWidths}
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
  tableContainer: {
  },
  tableContainerView: {
    flex: 1,
    flexDirection: 'column',
  },
  headerContainer: {
    flexDirection: 'row',
    height: 40,
  },
  headerCell: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 6,
    backgroundColor: theme.primary,
    borderWidth: 1,
    borderColor: theme.black,
    width: 100,
  },
  headerText: {
    color: theme.white,
    textAlign: 'center',
  },
  rowContainer: {
    flexDirection: 'row',
    height: 40,
  },
  rowCell: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 6,
    backgroundColor: theme.background,
    borderWidth: 1,
    borderColor: theme.red,
    width: 100,
  },
  rowText: {
    color: theme.black,
    textAlign: 'center',
  },
});

export default ExtractReportScreen;
