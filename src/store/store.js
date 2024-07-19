import { configureStore } from '@reduxjs/toolkit';
import loginDataReducer from '../features/loginData/loginDataSlice';
import { persistReducer, persistStore } from 'redux-persist';
import storage from '@react-native-async-storage/async-storage';

const persistConfig = {
  key: "root",
  storage,
};

export const store = configureStore({
  reducer: {
    loginData: persistReducer(persistConfig, loginDataReducer),
  },
});

export const persistor = persistStore(store);