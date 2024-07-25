import React, { useState, useMemo } from 'react';
import { StyleSheet, Text, View, Pressable, TouchableOpacity } from 'react-native';
import { useTheme } from '../constants/colors';

import Ionicons from 'react-native-vector-icons/Ionicons';
import DrawerMenu from './DrawerMenu';

const CustomHeader = ({ navigation, title, hasDrawer }) => {
  const theme = useTheme();
  const styles = useMemo(() => getStyles(theme), [theme]);


  const handleButtonPress = () => {
    if (hasDrawer) {
      navigation.openDrawer();
    } else {
      navigation.goBack();
    }
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={handleButtonPress}
      >
        <Ionicons name={hasDrawer ? 'menu' : 'arrow-back'} size={30} color={theme.primary} />
      </TouchableOpacity>

      <Text style={styles.title}>{title}</Text>
      <View style={styles.emptyRightButton}/>
    </View>
  );
};

const getStyles = (theme) => StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    backgroundColor: theme.backgroundAlt,
    position: 'absolute',
    top: 0,
    width: '100%',
    height: 54,
    elevation: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.primary,
  },
  button: {
    padding: 6,
  },
  emptyRightButton: {
    width: 42,
    height: 42,
  }
});

export default CustomHeader;
