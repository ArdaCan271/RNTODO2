import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useTheme } from '../constants/colors';

import { useSelector } from 'react-redux';

import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';

const CustomDrawerContent = (props) => {

  const userData = useSelector((state) => state.userData.data);

  console.log(userData);

  const theme = useTheme();
  const styles = getStyles(theme);

  return (
    <View style={styles.container}>
      <DrawerContentScrollView 
        {...props}
        contentContainerStyle={styles.contentContainer}
      >
        <DrawerItemList 
          {...props} 
        />
      </DrawerContentScrollView>
    </View>
  );
}

const getStyles = (theme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
  },
  contentContainer: {
  },
});

export default CustomDrawerContent;