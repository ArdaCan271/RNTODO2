// CustomerCardSkeleton.jsx
import React from 'react';
import ContentLoader, { Rect } from 'react-content-loader/native';
import { Dimensions, StyleSheet, View } from 'react-native';
import colors from '../constants/colors';

const CustomerCardSkeleton = () => {
  return (
    <View style={styles.cardWrapper}>
      <ContentLoader
        width={Dimensions.get('window').width - 20}
        height={100}
        backgroundColor={colors.primaryLight}
        foregroundColor={colors.primary}
      >
        <Rect x="10" y="10" rx="20" ry="20" width="40" height="40" />
        <Rect x="60" y="15" rx="4" ry="4" width="120" height="10" />
        <Rect x="60" y="35" rx="4" ry="4" width="80" height="10" />
        <Rect x="40" y="75" rx="4" ry="4" width="100" height="10" />
        {/* <Rect x="10" y="90" rx="4" ry="4" width="150" height="10" /> */}
        <Rect x="220" y="70" rx="4" ry="4" width="110" height="20" />
      </ContentLoader>
    </View>
  );
};

const styles = StyleSheet.create({
  cardWrapper: {
    backgroundColor: colors.white,
    width: Dimensions.get('window').width - 20,
    height: 100,
    marginTop: 12,
    borderWidth: 1,
    borderColor: colors.primaryDark,
    borderRadius: 6,
    elevation: 4,
    overflow: 'hidden',
  },
});

export default CustomerCardSkeleton;
