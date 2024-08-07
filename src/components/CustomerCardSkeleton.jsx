import React, { useMemo } from 'react';
import ContentLoader, { Rect } from 'react-content-loader/native';
import { Dimensions, StyleSheet, View, useWindowDimensions } from 'react-native';
import { useTheme } from '../constants/colors';

const CustomerCardSkeleton = ({backgroundColor}) => {
  const theme = useTheme();
  const styles = useMemo(() => getStyles(theme), [theme]);

  const windowWidth = useWindowDimensions().width;

  return (
    <View style={[styles.cardWrapper, {width: windowWidth, backgroundColor: backgroundColor}]}>
      <ContentLoader
        width={windowWidth}
        height={100}
        backgroundColor={theme.primary}
        foregroundColor={theme.primaryAlt}
      >
        <Rect x="10" y="10" rx="20" ry="20" width="40" height="40" />
        <Rect x="60" y="15" rx="4" ry="4" width="120" height="10" />
        <Rect x="60" y="35" rx="4" ry="4" width="80" height="10" />
        <Rect x="40" y="75" rx="4" ry="4" width="100" height="10" />
        <Rect x={windowWidth - 140} y="70" rx="4" ry="4" width="110" height="20" />
      </ContentLoader>
    </View>
  );
};

const getStyles = (theme) => StyleSheet.create({
  cardWrapper: {
    backgroundColor: theme.white,
    height: 100,
    borderTopWidth: 1,
    borderTopColor: theme.primary,
    borderLeftWidth: 15,
    borderLeftColor: theme.primary,
  },
});

export default CustomerCardSkeleton;
