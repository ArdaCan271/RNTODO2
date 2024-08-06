import { StyleSheet, Text, View, BackHandler } from 'react-native';
import React, { useEffect } from 'react';
import { useTheme } from '../constants/colors'; // Import useTheme for theme integration

import CustomHeader from '../components/CustomHeader';

const PageNotFoundScreen = ({ navigation, route }) => {
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

  const routeName = route.params.title;

  return (
    <View style={styles.container}>
      <CustomHeader
        title={routeName}
        navigation={navigation}
      />
      <Text style={styles.text}>Sayfa bulunamadı...</Text>
    </View>
  );
};

const getStyles = (theme) => StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.background,
    paddingTop: theme.padding.header,
  },
  text: {
    fontSize: 18,
    color: theme.text,
  },
});

export default PageNotFoundScreen;
