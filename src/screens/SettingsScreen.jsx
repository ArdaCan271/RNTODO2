import { StyleSheet, Text, View, BackHandler } from 'react-native';
import React, { useEffect, useMemo } from 'react';
import colors from '../constants/colors';
import { useTheme } from '../constants/colors';

import CustomHeader from '../components/CustomHeader';

const SettingsScreen = ({ navigation }) => {

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
  }, []);

  const theme = useTheme();
  const styles = useMemo(() => getStyles(theme), [theme]);

  return (
    <View style={styles.container}>
      <CustomHeader
        title='Settings'
        navigation={navigation}
      />
      <Text style={styles.text}>Settings Screen</Text>
    </View>
  );
}

const getStyles = (theme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 56,
  },
  text: {
    fontSize: 18,
    color: colors.black,
  },
});

export default SettingsScreen;