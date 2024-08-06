import React, { useState, useRef, useMemo } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Pressable, Keyboard, TouchableOpacity } from 'react-native';


import { useDispatch, useSelector } from 'react-redux';
import { setEmail, setPassword } from '../features/loginData/loginDataSlice';
import { setMenuBJSON } from '../features/userMenuBJSON/userMenuBJSONSlice';
import { setUserData } from '../features/userData/userDataSlice';
import { setBaseRequestURL } from '../features/baseRequestURL/baseRequestURLSlice';

import axios from 'axios';
import { useTheme } from '../constants/colors';
import Icon from 'react-native-vector-icons/Ionicons';

const LoginScreen = ({ navigation }) => {
  const theme = useTheme();
  const styles = useMemo(() => getStyles(theme), [theme]);

  const [inputEmail, setInputEmail] = useState('');
  const [inputPassword, setInputPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [inputWarning, setInputWarning] = useState('');

  const passwordRef = useRef(null);

  const dispatch = useDispatch();

  const handlePressOutside = () => {
    Keyboard.dismiss();
  };

  const handleLogin = async () => {
    const apiUrl = 'https://duyu.alter.net.tr/api/getTokenAndModulesOfUser';
    try {
      const response = await axios.post(apiUrl, {
        email: inputEmail,
        password: inputPassword,
      });
      dispatch(setEmail(inputEmail));
      dispatch(setPassword(inputPassword));
      dispatch(setMenuBJSON(response.data.menu_bjson));
      dispatch(setUserData(response.data));
      dispatch(setBaseRequestURL(response.data['target-url']));
      setInputPassword('');
      setInputWarning('');
      setShowPassword(false);
      navigation.navigate('Menu');
    } catch (error) {
      console.log(error);
      setInputWarning('Geçersiz e-posta veya şifre');
    }
  };

  return (
    <Pressable style={styles.container} onPress={handlePressOutside} android_disableSound>
      <Text style={styles.title}>Giriş Yap</Text>
      {inputWarning !== '' && <Text style={styles.warningText}>{inputWarning}</Text>}
      <TextInput
        style={styles.input}
        placeholder="E-posta"
        value={inputEmail}
        onChangeText={setInputEmail}
        placeholderTextColor={theme.textAlt}
        keyboardType="email-address"
        autoCapitalize="none"
        onSubmitEditing={() => { passwordRef.current?.focus(); }}
        blurOnSubmit={false}
      />
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          ref={passwordRef}
          placeholder="Şifre"
          placeholderTextColor={theme.textAlt}
          value={inputPassword}
          onChangeText={setInputPassword}
          secureTextEntry={!showPassword}
          autoCapitalize='none'
          keyboardType='default'
          onSubmitEditing={handleLogin}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.showPassword}>
          <Icon name={showPassword ? "eye-off" : "eye"} size={24} color={theme.textAlt} />
        </TouchableOpacity>
      </View>
      <Button
        title="GİRİŞ YAP"
        onPress={handleLogin}
        color={theme.primary}
      />
    </Pressable>
  );
};

const getStyles = (theme) => StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 16,
    backgroundColor: theme.background,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
    color: theme.text,
  },
  warningText: {
    color: theme.red,
    marginBottom: 12,
    textAlign: 'center',
    fontSize: 16,
  },
  input: {
    height: 40,
    borderColor: theme.text,
    borderWidth: 1,
    borderRadius: 3,
    marginBottom: 12,
    paddingHorizontal: 8,
    color: theme.text,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: theme.text,
    borderWidth: 1,
    borderRadius: 3,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  passwordInput: {
    flex: 1,
    height: 40,
    color: theme.text,
  },
  showPassword: {
    padding: 7,
  },
});

export default LoginScreen;
