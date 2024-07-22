import { StyleSheet, View, BackHandler } from 'react-native';
import React, { useEffect } from 'react';

import Ionicons from 'react-native-vector-icons/Ionicons';

import { useSelector, useDispatch } from 'react-redux';
import { setMenuBJSON } from '../features/userMenuBJSON/userMenuBJSONSlice';
import axios from 'axios';
import colors from '../constants/colors';

const LandingScreen = ({navigation}) => {

  useEffect(() => {
    const backAction = () => {
      BackHandler.exitApp();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    return () => backHandler.remove();
  }, []);

  const savedEmail = useSelector((state) => state.loginData.email);
  const savedPassword = useSelector((state) => state.loginData.password);

  const dispatch = useDispatch();
  
  const handleLogin = async () => {
    const apiUrl = 'https://duyu.alter.net.tr/api/getTokenAndModulesOfUser';
    try {
      const response = await axios.post(apiUrl, {
        email: savedEmail,
        password: savedPassword,
      });
      dispatch(setMenuBJSON(response.data.menu_bjson));
      navigation.navigate('Menu');
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (savedEmail !== '' && savedPassword !== '') {
      handleLogin();
    } else {
      navigation.navigate('Login');
    }
  }, [navigation]);


  return (
    <View style={styles.container}>
      <Ionicons name="logo-react" size={150} color={colors.primary} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default LandingScreen;