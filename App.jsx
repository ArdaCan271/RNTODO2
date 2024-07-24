import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { store } from './src/store/store';
import { Provider } from 'react-redux';
import { persistor } from './src/store/store';
import { PersistGate } from 'redux-persist/integration/react';

import LoginScreen from './src/screens/LoginScreen';
import MenuScreen from './src/screens/MenuScreen';
import LandingScreen from './src/screens/LandingScreen';
import CurrentScreen from './src/screens/CurrentScreen';
import CustomerDetailScreen from './src/screens/CustomerDetailScreen';
import PageNotFoundScreen from './src/screens/PageNotFoundScreen';
import MenuChildrenScreen from './src/screens/MenuChildrenScreen';
import SettingsScreen from './src/screens/SettingsScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <PersistGate loading={null} persistor={persistor}>
      <Provider store={store}>
        <NavigationContainer>
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
              component={MenuScreen}
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
              name="Settings"
              component={SettingsScreen}
              options={{
                headerShown: false,
                animation: 'ios',
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
        </NavigationContainer>
      </Provider>
    </PersistGate>
  );
}

const styles = StyleSheet.create({});

export default App;