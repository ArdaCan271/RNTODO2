import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createDrawerNavigator } from '@react-navigation/drawer';
import MenuScreen from '../screens/MenuScreen';
import SettingsScreen from '../screens/SettingsScreen';
import { useNavigationState } from '@react-navigation/native';
import { useTheme } from '../constants/colors';
import { StyleSheet, View, Text } from 'react-native';

import CustomDrawerContent from '../components/CustomDrawerContent';

const Drawer = createDrawerNavigator();

const HomeDrawerNavigator = () => {
  const theme = useTheme();
  const styles = getStyles(theme);

  const routeNames = useNavigationState((state) => state.routeNames);

  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerType: 'slide',
      }}
      drawerContent={props => <CustomDrawerContent {...props}/>}
      
    >
      <Drawer.Screen 
        name="Home" 
        component={MenuScreen}
        initialParams={{ routeNames: routeNames }}
        options={{ title: 'Ana Menü' }}
      />
      <Drawer.Screen 
        name="Settings" 
        component={SettingsScreen} 
        options={{ title: 'Ayarlar' }}
      />
    </Drawer.Navigator>
  );
}

const getStyles = (theme) => StyleSheet.create({
  drawerStyle: {
    backgroundColor: theme.background,
    width: 250,
  },
  labelStyle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemStyle: {
    marginVertical: 5,
  },
});

export default HomeDrawerNavigator;
