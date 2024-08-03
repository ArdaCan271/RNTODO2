import { createContext } from 'react';
import { Animated } from 'react-native';

export const syncedFlatListState = {
  activeFlatList: new Animated.Value(0),
  offsetPercent: new Animated.Value(0)
};

export const SyncedFlatListContext = createContext(syncedFlatListState);
