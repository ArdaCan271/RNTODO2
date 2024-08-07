import React, { useEffect, useState, useMemo } from 'react';
import { StyleSheet, View, BackHandler } from 'react-native';
import { useTheme } from '../constants/colors';

import CustomHeader from '../components/CustomHeader';

import Table from '../components/tableComponents/Table';

const WarehouseStockReportScreen = ({ navigation, route }) => {

  const theme = useTheme();
  const styles = useMemo(() => getStyles(theme), [theme]);

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
  };

  const detailTableFieldWidths = {
  };

  const [fieldFilters, setFieldFilters] = useState({
    GroupCode: '',
  });

  return (
    <View style={styles.container}>
      <CustomHeader
        title={route.params.title}
        navigation={navigation}
      />
      <Table
        fieldWidths={fieldWidths}
        detailFieldWidths={detailTableFieldWidths}
        requestUrl="DuyuII/Stock/GetList"
        paginationEnabled
        itemsPerPage={10}
        fieldFilters={fieldFilters}
        setFieldFilters={setFieldFilters}
        navigation={navigation}
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

export default WarehouseStockReportScreen;
