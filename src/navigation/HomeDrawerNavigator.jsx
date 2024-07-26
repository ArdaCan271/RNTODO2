import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useNavigationState } from '@react-navigation/native';
import { useTheme } from '../constants/colors';
import { StyleSheet, View, Text } from 'react-native';

import CustomDrawerContent from '../components/CustomDrawerContent';

import MenuScreen from '../screens/MenuScreen';
import SettingsScreen from '../screens/SettingsScreen';
import AboutScreen from '../screens/AboutScreen';
import ContactUsScreen from '../screens/ContactUsScreen';
import DownloadDataScreen from '../screens/DownloadDataScreen';

const Drawer = createDrawerNavigator();

const HomeDrawerNavigator = () => {
  const theme = useTheme();

  const routeNames = useNavigationState((state) => state.routeNames);

  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerType: 'slide',
        drawerLabelStyle: {
          color: theme.textAlt,
          marginLeft: -20,
        },
        drawerActiveTintColor: theme.primary,
        drawerInactiveTintColor: theme.textAlt,
      }}
      drawerContent={props => <CustomDrawerContent {...props}/>}
    >
      <Drawer.Screen 
        name="Home" 
        component={MenuScreen}
        initialParams={{ routeNames: routeNames }}
        options={{ 
          title: 'Ana Menü',
          drawerIcon: ({ color }) => (
            <Ionicons name="home-outline" size={20} color={color} />
          ),
        }}
      />
      <Drawer.Screen 
        name="About" 
        component={AboutScreen} 
        options={{ 
          title: 'Hakkımızda', 
          drawerIcon: ({ color }) => (
            <Ionicons name="information-circle-outline" size={20} color={color} />
          ),
        }}
      />
      <Drawer.Screen 
        name="Contact" 
        component={ContactUsScreen} 
        options={{ 
          title: 'İletişim', 
          drawerIcon: ({ color }) => (
            <Ionicons name="call-outline" size={20} color={color} />
          ),
        }}
      />
      <Drawer.Screen 
        name="Download" 
        component={DownloadDataScreen} 
        options={{
          title: 'İndir', 
          drawerIcon: ({ color }) => (
            <Ionicons name="cloud-download-outline" size={20} color={color} />
          ),
        }}
      />
      <Drawer.Screen 
        name="Settings" 
        component={SettingsScreen} 
        options={{ 
          title: 'Ayarlar', 
          drawerIcon: ({ color }) => (
            <Ionicons name="settings-outline" size={20} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

export default HomeDrawerNavigator;
