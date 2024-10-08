import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from '../screens/LoginScreen';
import MenuScreen from '../screens/MenuScreen';
import LandingScreen from '../screens/LandingScreen';
import CurrentScreen from '../screens/CurrentScreen';
import CustomerDetailScreen from '../screens/CustomerDetailScreen';
import PageNotFoundScreen from '../screens/PageNotFoundScreen';
import MenuChildrenScreen from '../screens/MenuChildrenScreen';
import SettingsScreen from '../screens/SettingsScreen';
import UploadDataScreen from '../screens/UploadDataScreen';
import ExtractReportScreen from '../screens/ExtractReportScreen';
import WarehouseStockReportScreen from '../screens/WarehouseStockReportScreen';
import DetailTableScreen from '../screens/DetailTableScreen';
import FastOrderScreen from '../screens/FastOrderScreen';
import FastOrderCartScreen from '../screens/FastOrderCartScreen';

const Stack = createNativeStackNavigator();

const StackNavigator = ({ drawerNavigator }) => {
  return (
    <Stack.Navigator initialRouteName='Landing'>
      <Stack.Screen
        name="Landing"
        component={LandingScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Menu"
        component={drawerNavigator}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="FastOrderCart"
        component={FastOrderCartScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Current"
        component={CurrentScreen}
        options={{
          headerShown: false,
          animation: 'ios',
        }}
      />
      <Stack.Screen
        name="CustomerDetail"
        component={CustomerDetailScreen}
        options={{
          headerShown: false,
          animation: 'ios',
        }}
      />
      <Stack.Screen
        name="MenuChildren"
        component={MenuChildrenScreen}
        options={{
          headerShown: false,
          animation: 'ios',
        }}
      />
      <Stack.Screen
        name="FastOrder"
        component={FastOrderScreen}
        options={{
          headerShown: false,
          animation: 'ios',
        }}
      />
      <Stack.Screen
        name="ExtractReport"
        component={ExtractReportScreen}
        options={{
          headerShown: false,
          animation: 'ios',
        }}
      />
      <Stack.Screen
        name="WarehouseStockReport"
        component={WarehouseStockReportScreen}
        options={{
          headerShown: false,
          animation: 'ios',
        }}
      />
      <Stack.Screen
        name="DetailTable"
        component={DetailTableScreen}
        options={{
          headerShown: false,
          animation: 'ios',
        }}
      />
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          headerShown: false,
          animation: 'ios',
        }}
      />
      <Stack.Screen
        name="UploadData"
        component={UploadDataScreen}
        options={{
          headerShown: false,
          animation: 'slide_from_bottom',
        }}
      />
      <Stack.Screen
        name="PageNotFound"
        component={PageNotFoundScreen}
        options={{
          headerShown: false,
          animation: 'ios',
        }}
      />
    </Stack.Navigator>
  );
}

export default StackNavigator;