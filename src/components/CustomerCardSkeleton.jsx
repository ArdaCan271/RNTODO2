import React, { useMemo } from 'react';
import ContentLoader, { Rect } from 'react-content-loader/native';
import { Dimensions, StyleSheet, View, useWindowDimensions } from 'react-native';
import { useTheme } from '../constants/colors';

const CustomerCardSkeleton = ({ backgroundColor, dynamicColors }) => {
  const theme = useTheme();
  const styles = useMemo(() => getStyles(theme), [theme]);

  return (
    <View style={[styles.cardWrapper, {width: '100%', backgroundColor: dynamicColors.backgroundColor, borderColor: dynamicColors.accent}]}>
      <ContentLoader
        width={'100%'}
        height={100}
        backgroundColor={theme.separator}
        foregroundColor={theme.backgroundAlt}
      >
        <Rect x="10" y="10" rx="20" ry="20" width="40" height="40" />
        <Rect x="60" y="15" rx="4" ry="4" width="120" height="10" />
        <Rect x="60" y="35" rx="4" ry="4" width="80" height="10" />
        <Rect x="25" y="75" rx="4" ry="4" width="100" height="10" />
        <Rect x='70%' y="70" rx="4" ry="4" width="25%" height="20" />
      </ContentLoader>
    </View>
  );
};

const getStyles = (theme) => StyleSheet.create({
  cardWrapper: {
    height: 100,
    borderLeftWidth: 15,
  },
});

export default CustomerCardSkeleton;
