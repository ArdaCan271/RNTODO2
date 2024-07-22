// CurrentScreen.js
import { StyleSheet, Text, View, BackHandler, FlatList, Dimensions } from 'react-native';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { useSelector } from 'react-redux';
import colors from '../constants/colors';
import CustomHeader from '../components/CustomHeader';
import CustomerCard from '../components/CustomerCard';

const CurrentScreen = ({ navigation, route }) => {
  const { childrenOfMenuItem } = route.params;
  
  const userToken = useSelector((state) => state.userData.data.token);
  
  useEffect(() => {
    getCustomerList();

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

  const handleOnCustomerPress = (customer) => () => {
    navigation.navigate('CustomerDetail', { customer, childrenOfMenuItem });
  }

  const renderItem = ({ item }) => (
    <CustomerCard onPress={handleOnCustomerPress(item)} cariKod={item.CariKod} isim={item.Isim} alacak={item.Alacak} il={item.Il} />
  );

  return (
    <View style={styles.container}>
      <CustomHeader navigation={navigation} title="Cari" />
      <FlatList
        data={customerList}
        renderItem={renderItem}
        keyExtractor={(item) => item.CariKod}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: colors.white,
    paddingTop: 56,
  },
  listContainer: {
    width: Dimensions.get('window').width,
    alignItems: 'center',
  },
});

export default CurrentScreen;
