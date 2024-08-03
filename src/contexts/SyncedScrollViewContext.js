import { createContext } from 'react';
import { Animated } from 'react-native';

// ------------------------------------------------------------

export const syncedScrollViewState = {
  activeScrollView: new Animated.Value(0),
  offsetPercent: new Animated.Value(0),
  scrollPositions: {}  // Add this line to store scroll positions
};

export const SyncedScrollViewContext = createContext(syncedScrollViewState);
