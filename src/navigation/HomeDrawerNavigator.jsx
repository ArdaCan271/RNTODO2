import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { createDrawerNavigator } from '@react-navigation/drawer';

import MenuScreen from '../screens/MenuScreen';
import SettingsScreen from '../screens/SettingsScreen';

import { useNavigationState } from '@react-navigation/native';

import { useTheme } from '../constants/colors';
import { StyleSheet } from 'react-native';

const Drawer = createDrawerNavigator();


const HomeDrawerNavigator = () => {
  const theme = useTheme();
  const styles = getStyles(theme);

  const routeNames = useNavigationState((state) => state.routeNames);

  return (
    <Drawer.Navigator>
      <Drawer.Screen 
        name="Home" 
        component={MenuScreen}
        initialParams={{ routeNames: routeNames }}
        options={{ 
          headerShown: false,
          title: 'Ana Menü',
        }}
      />
      <Drawer.Screen 
        name="Settings" 
        component={SettingsScreen} 
        options={{ headerShown: false, title: 'Ayarlar' }}
      />
    </Drawer.Navigator>
  );
}

const getStyles = (theme) => StyleSheet.create({});

export default HomeDrawerNavigator;