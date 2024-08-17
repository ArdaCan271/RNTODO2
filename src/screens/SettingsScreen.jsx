import { StyleSheet, Text, View, BackHandler } from 'react-native';
import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeTheme } from '../features/themeData/themeSlice';
import CustomHeader from '../components/CustomHeader';
import { useTheme } from '../constants/colors';

const SettingsScreen = ({ navigation }) => {

  useEffect(() => {
    const backAction = () => {
      navigation.navigate('Home');
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    return () => backHandler.remove();
  }, [navigation]);

  const theme = useTheme();
  const styles = useMemo(() => getStyles(theme), [theme]);

  return (
    <View style={styles.container}>
      <CustomHeader
        title="Settings"
        navigation={navigation}
        hasDrawer
      />
    </View>
  );
};

const getStyles = (theme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: theme.padding.header,
  },
  text: {
    fontSize: 18,
    color: theme.text,
  },
});

export default SettingsScreen;
