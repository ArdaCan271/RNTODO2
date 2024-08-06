import './gesture-handler';
import React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { store } from './src/store/store';
import { Provider } from 'react-redux';
import { persistor } from './src/store/store';
import { PersistGate } from 'redux-persist/integration/react';

import StackNavigator from './src/navigation/StackNavigator';
import HomeDrawerNavigator from './src/navigation/HomeDrawerNavigator';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <NavigationContainer>
          <StackNavigator drawerNavigator={HomeDrawerNavigator}/>
        </NavigationContainer>
      </Provider>
    </QueryClientProvider>
    // <PersistGate loading={null} persistor={persistor}>
    //   <Provider store={store}>
    //     <NavigationContainer>
    //       <StackNavigator drawerNavigator={HomeDrawerNavigator}/>
    //     </NavigationContainer>
    //   </Provider>
    // </PersistGate>
  );
}

export default App;