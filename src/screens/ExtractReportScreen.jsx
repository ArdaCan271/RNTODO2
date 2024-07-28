import React, { useState, useEffect } from 'react';
import { StyleSheet, View, BackHandler, Text, ScrollView, FlatList, TouchableOpacity} from 'react-native';
import { useTheme } from '../constants/colors';

import axios from 'axios';
import { useSelector } from 'react-redux';

import CustomHeader from '../components/CustomHeader';

import Table from '../components/tableComponents/Table';

import FontAwesome from 'react-native-vector-icons/FontAwesome';

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

  const headerComponent = (title, item, defaultStyle) => {
    return (
      <View style={[defaultStyle.headerCellComponent, styles.headerCellComponent]}>
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
          style={[defaultStyle.headerCellText, styles.headerCellText]}
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
  };

  const dataComponent = (data, itemHeader, item, formatter, defaultStyle) => {
    return (
      <View style={[defaultStyle.dataCellComponent, styles.dataCellComponent]}>
        <Text 
          style={[defaultStyle.dataCellText, styles.dataCellText]}
          numberOfLines={1}
        >
          {formatter(data, itemHeader.Type)}
        </Text>
      </View>
    );
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
        customDataComponent={dataComponent}
        itemsPerPage={30}
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
});

export default ExtractReportScreen;
