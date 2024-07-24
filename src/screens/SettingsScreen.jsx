import { StyleSheet, Text, View, BackHandler, Switch } from 'react-native';
import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeTheme } from '../features/themeData/themeSlice';
import CustomHeader from '../components/CustomHeader';
import { useTheme } from '../constants/colors';

const SettingsScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const currentTheme = useSelector((state) => state.themeData.value);
  const [isDarkTheme, setIsDarkTheme] = useState(currentTheme === 'dark');

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

  useEffect(() => {
    setIsDarkTheme(currentTheme === 'dark');
  }, [currentTheme]);

  const theme = useTheme();
  const styles = useMemo(() => getStyles(theme), [theme]);

  const toggleTheme = () => {
    dispatch(changeTheme());
  };

  return (
    <View style={styles.container}>
      <CustomHeader
        title="Settings"
        navigation={navigation}
      />
      <Text style={styles.text}>Settings Screen</Text>
      <View style={styles.switchContainer}>
        <Text style={styles.text}>Dark Theme</Text>
        <Switch
          value={isDarkTheme}
          onValueChange={toggleTheme}
        />
      </View>
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
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
});

export default SettingsScreen;
