import { StyleSheet, Text, View, BackHandler, ScrollView } from 'react-native';
import React, { useEffect, useMemo } from 'react';
import { useTheme } from '../constants/colors';

import { useSelector } from 'react-redux';

import axios from 'axios';

import CustomHeader from '../components/CustomHeader';

import FastOrderProductCard from '../components/FastOrderProductCard';

const FastOrderScreen = ({ navigation, route }) => {
  const theme = useTheme();
  const styles = useMemo(() => getStyles(theme), [theme]);

  const userToken = useSelector((state) => state.userData.data.token);
  const baseRequestURL = useSelector((state) => state.baseRequestURL.value);

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
  }, [navigation]);

  const getCustomerList = async () => {
    const apiUrl = `${baseRequestURL}/getCustomerList`;
    try {
      const response = await axios.post(apiUrl, {
        token: 'RasyoIoToken2021',
        user_token: userToken,
      });
      setCustomerList(response.data);
      setFilteredCustomerList(response.data); // Initialize the filtered list
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <CustomHeader title={route.params.title} navigation={navigation} />
      <FastOrderProductCard />
    </View>
  );
};

const getStyles = (theme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
    paddingTop: theme.padding.header,
  },

  text: {
    fontSize: 18,
    color: theme.text,
  },
});

export default FastOrderScreen;
