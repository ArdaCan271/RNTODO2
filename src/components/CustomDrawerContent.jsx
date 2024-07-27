import { Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useTheme } from '../constants/colors';

import Icon from 'react-native-vector-icons/Ionicons';

import { useSelector, useDispatch } from 'react-redux';

import { setEmail, setPassword } from '../features/loginData/loginDataSlice';

import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { TouchableOpacity } from 'react-native-gesture-handler';

const CustomDrawerContent = (props) => {

  const userData = useSelector((state) => state.userData.data);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(setEmail(''));
    dispatch(setPassword(''));
    props.navigation.navigate('Login');
    props.navigation.closeDrawer();
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
          <Text style={styles.drawerAppVersion}>v0.7</Text>
        </View> 
        <View style={styles.drawerHeaderSeparator}/>
        <DrawerItemList 
          {...props}
        />
        <DrawerItem
          label="Çıkış Yap"
          onPress={handleLogout}
          icon={() => (
            <Icon
              name="log-out-outline"
              size={20}
              color={theme.red}
            />
          )}
          labelStyle={styles.logoutButtonText}
          pressColor={theme.redSupport}
        />
      </DrawerContentScrollView>
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
    marginLeft: 8,
    marginTop: 10,
    columnGap: 10,
  },
  logoutButtonText: {
    color: theme.red,
    marginLeft: -20,
  },
  drawerAppVersion: {
    color: theme.textAlt,
    fontSize: 12,
    position: 'absolute',
    bottom: 2,
    right: 2,
  },
});

export default CustomDrawerContent;