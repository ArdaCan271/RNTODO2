import { StyleSheet, Text, View, BackHandler, ScrollView } from 'react-native';
import React, { useEffect } from 'react';
import { useTheme } from '../constants/colors';

import CustomHeader from '../components/CustomHeader';

import FastOrderProductCard from '../components/FastOrderProductCard';

const FastOrderScreen = ({ navigation, route }) => {
  const theme = useTheme();
  const styles = getStyles(theme);

  useEffect(() => {
    const backAction = () => {
      navigation.goBack();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    return () => backHandler.remove();
  }, [navigation]);

  return (
    <View style={styles.container}>
      <CustomHeader title={route.params.title} navigation={navigation} />
      <FastOrderProductCard />
    </View>
  );
};

const getStyles = (theme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
    paddingTop: theme.padding.header,
  },

  text: {
    fontSize: 18,
    color: theme.text,
  },
});

export default FastOrderScreen;
