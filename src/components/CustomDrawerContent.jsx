import { Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useTheme } from '../constants/colors';

import Icon from 'react-native-vector-icons/Ionicons';

import { useSelector, useDispatch } from 'react-redux';

import { setEmail, setPassword } from '../features/loginData/loginDataSlice';

import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { TouchableOpacity } from 'react-native-gesture-handler';

const CustomDrawerContent = (props) => {

  const userData = useSelector((state) => state.userData.data);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(setEmail(''));
    dispatch(setPassword(''));
    props.navigation.navigate('Login');
  }

  const theme = useTheme();
  const styles = getStyles(theme);

  return (
    <View style={styles.container}>
      <DrawerContentScrollView 
        {...props}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={styles.drawerHeader}>
          <Text style={styles.drawerHeaderUsername}>{userData['user-name']}</Text>
        </View> 
        <View style={styles.drawerHeaderSeparator}/>
        <DrawerItemList 
          {...props}
        />
      </DrawerContentScrollView>
      <Pressable
        style={styles.logoutButton}
        onPress={handleLogout}
        android_ripple={{ color: theme.redSupport }}
      >
        <Icon name="log-out-outline" size={20} color={theme.red} />
        <Text style={styles.logoutButtonText}>Çıkış Yap</Text>
      </Pressable>
      <View style={styles.drawerFooterSeparator}/>
      <View style={styles.drawerFooter}>
        <Text style={styles.drawerAppName}>RNTODO2</Text>
        <Text style={styles.drawerAppVersion}>v0.8</Text>
      </View>
    </View>
  );
}

const getStyles = (theme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.backgroundAlt,
    alignItems: 'center',
  },
  contentContainer: {
  },
  drawerHeader: {
    padding: 20,
  },
  drawerHeaderUsername: {
    color: theme.text,
    fontSize: 20,
  },
  drawerHeaderSeparator: {
    width: '100%',
    height: 1,
    backgroundColor: theme.separator,
  },
  logoutButton: {
    width: '86%',
    height: 40,
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderRadius: 4,
    position: 'absolute',
    bottom: 110,
    left: 18,
    columnGap: 10,
  },
  logoutButtonText: {
    color: theme.red,
    fontSize: 13,
    fontWeight: 'bold',
  },
  drawerFooterSeparator: {
    width: '95%',
    height: 1,
    backgroundColor: theme.separator,
    position: 'absolute',
    bottom: 100,
  },
  drawerFooter: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    height: 100,
    bottom: 0,
    width: '100%',
  },
  drawerAppName: {
    color: theme.textAlt,
    fontSize: 18,
  },
  drawerAppVersion: {
    color: theme.textAlt,
    fontSize: 12,
    position: 'absolute',
    bottom: 6,
    right: 6,
  },
});

export default CustomDrawerContent;