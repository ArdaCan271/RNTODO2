import { StyleSheet, Text, View, BackHandler, Pressable } from 'react-native';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { useSelector } from 'react-redux';
import colors from '../constants/colors';
import CustomHeader from '../components/CustomHeader';

const CurrentScreen = ({navigation}) => {

  const userToken = useSelector((state) => state.userData.data.token);

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

  const [customerList, setCustomerList] = useState([]);

  const getCustomerList = async () => {
    const apiUrl = 'https://duyu.alter.net.tr/api/getCustomerList';
    try {
      const response = await axios.post(apiUrl, {
        token: 'RasyoIoToken2021',
        user_token: userToken,
      });
      setCustomerList(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCustomerList();
  }, [navigation]);

  return (
    <View style={styles.container}>
      <CustomHeader navigation={navigation} title='Cari' />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: colors.white,
  },
});

export default CurrentScreen;