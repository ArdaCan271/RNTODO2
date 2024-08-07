import { StyleSheet, Text, View, BackHandler } from 'react-native';
import React, {useEffect, useMemo} from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { useTheme } from '../constants/colors';

import CustomHeader from '../components/CustomHeader';

const FastOrderCartScreen = ({ navigation, route }) => {
  const theme = useTheme();
  const styles = useMemo(() => getStyles(theme), [theme]);

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
      <CustomHeader navigation={navigation} title='Hızlı Sipariş Sepet' />
      <Text style={styles.text}>Fast Order Cart Screen</Text>
    </View>
  );
}

const getStyles = (theme) => StyleSheet.create({
  container : {
    flex: 1,
    backgroundColor: theme.backgroundColor,
    paddingTop: theme.padding.header,
  },
  text: {
    color: theme.text,
  }
});


export default FastOrderCartScreen;