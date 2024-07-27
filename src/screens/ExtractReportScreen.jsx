import React, { useState, useEffect } from 'react';
import { StyleSheet, View, BackHandler, ScrollView} from 'react-native';
import { useTheme } from '../constants/colors';

import axios from 'axios';

import CustomHeader from '../components/CustomHeader';

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

  return (
    <View style={styles.container}>
      <CustomHeader
        title="Genel Ekstre Raporu"
        navigation={navigation}
      />
    </View>
  );
};

const getStyles = (theme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
    paddingTop: theme.padding.header,
  },
});

export default ExtractReportScreen;
