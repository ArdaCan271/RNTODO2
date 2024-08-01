import React, { useEffect, useState } from 'react';
import { StyleSheet, View, BackHandler } from 'react-native';
import { useTheme } from '../constants/colors';

import CustomHeader from '../components/CustomHeader';

import Table from '../components/tableComponents/Table';

const DetailTableScreen = ({ navigation, route }) => {

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

  return (
    <View style={styles.container}>
      <CustomHeader
        title="Detay Tablosu"
        navigation={navigation}
      />
      <Table
        requestUrl={route.params.detailRequestUrl}
        subDocumentConnectionId={route.params.subDocumentConnectionId}
        fieldWidths={route.params.detailFieldWidths}
        itemsPerPage={10}
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

export default DetailTableScreen;
