import React, { useState, useRef } from 'react';
import { View, Text, TextInput, Button, StyleSheet, BackHandler, Pressable, Keyboard, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setEmail, setPassword } from '../features/loginData/loginDataSlice';
import { setMenuBJSON } from '../features/userMenuBJSON/userMenuBJSONSlice';
import { setUserData } from '../features/userData/userDataSlice';
import axios from 'axios';
import colors from '../constants/colors';
import Icon from 'react-native-vector-icons/Ionicons';

const LoginScreen = ({ navigation }) => {
  const [inputEmail, setInputEmail] = useState('');
  const [inputPassword, setInputPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const savedEmail = useSelector((state) => state.loginData.email);
  const savedPassword = useSelector((state) => state.loginData.password);

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
      console.log(response.data.token);
      dispatch(setEmail(inputEmail));
      dispatch(setPassword(inputPassword));
      dispatch(setMenuBJSON(response.data.menu_bjson));
      dispatch(setUserData(response.data));
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
        placeholderTextColor={"gray"}
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
          placeholderTextColor={"gray"}
          value={inputPassword}
          onChangeText={setInputPassword}
          secureTextEntry={!showPassword}
          autoCapitalize='none'
          keyboardType='default'
          onSubmitEditing={handleLogin}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.showPassword}>
          <Icon name={showPassword ? "eye-off" : "eye"} size={24} color='gray' />
        </TouchableOpacity>
      </View>
      <Button
        title="GİRİŞ YAP"
        onPress={handleLogin}
        color={colors.primary}
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 16,
    backgroundColor: colors.white,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
    color: colors.black,
  },
  warningText: {
    color: 'red',
    marginBottom: 12,
    textAlign: 'center',
    fontSize: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 3,
    marginBottom: 12,
    paddingHorizontal: 8,
    color: "black",
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 3,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  passwordInput: {
    flex: 1,
    height: 40,
    color: "black",
  },
  showPassword: {
    padding: 7,
  },
});

export default LoginScreen;
