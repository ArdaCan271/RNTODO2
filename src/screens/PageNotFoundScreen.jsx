import { StyleSheet, Text, View, BackHandler, Pressable } from 'react-native';
import React, { useEffect, useMemo, useRef } from 'react';
import { useTheme } from '../constants/colors'; // Import useTheme for theme integration

import CustomHeader from '../components/CustomHeader';
import CustomBottomSheet from '../components/CustomBottomSheet';

const PageNotFoundScreen = ({ navigation, route }) => {
  const theme = useTheme();
  const styles = useMemo(() => getStyles(theme), [theme]);

  const bottomSheetRef = useRef(null);

  const handleOpenPress = () => {
    bottomSheetRef.current?.expand();
  };

  const handleClosePress = () => {
    bottomSheetRef.current?.close();
  };

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
      <Pressable
        style={{ padding: 10, backgroundColor: theme.primary, borderRadius: 5 }}
        onPress={handleOpenPress}
      >
        <Text style={styles.text}>Open Bottom Sheet</Text>
      </Pressable>
      <Pressable
        style={{ padding: 10, backgroundColor: theme.primary, borderRadius: 5, marginTop: 10 }}
        onPress={handleClosePress}
      >
        <Text style={styles.text}>Close Bottom Sheet</Text>
      </Pressable>
      <CustomBottomSheet
        title={'So Cool Bottom Sheet'}
        ref={bottomSheetRef}
      />
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
