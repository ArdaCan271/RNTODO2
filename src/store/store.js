import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';

import loginDataReducer from '../features/loginData/loginDataSlice';
import userMenuBJSONReducer from '../features/userMenuBJSON/userMenuBJSONSlice';
import userDataReducer from '../features/userData/userDataSlice';
import themeDataReducer from '../features/themeData/themeSlice';
import baseRequestURLReducer from '../features/baseRequestURL/baseRequestURLSlice';
import fastOrderCartReducer from '../features/fastOrderCart/fastOrderCartSlice';

import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from '@react-native-async-storage/async-storage';

const persistConfig = (key) => ({
  key,
  storage,
});

export const store = configureStore({
  reducer: {
    loginData: persistReducer(persistConfig('loginData'), loginDataReducer),
    userMenuBJSON: persistReducer(persistConfig('menuBJSON'), userMenuBJSONReducer),
    userData: persistReducer(persistConfig('userData'), userDataReducer),
    themeData: persistReducer(persistConfig('themeData'), themeDataReducer),
    baseRequestURL: persistReducer(persistConfig('baseRequestURL'), baseRequestURLReducer),
    fastOrderCart: persistReducer(persistConfig('fastOrderCart'), fastOrderCartReducer),
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);