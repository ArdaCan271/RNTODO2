import React, { useState, useMemo } from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { useTheme } from '../constants/colors';

import Ionicons from 'react-native-vector-icons/Ionicons';
import DrawerMenu from './DrawerMenu';

const CustomHeader = ({ navigation, title, noBack }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const theme = useTheme();
  const styles = useMemo(() => getStyles(theme), [theme]);

  const openDrawer = () => {
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      {noBack ? 
        <View style={{ width: 42, height: 42 }}></View> 
        :
        <Pressable
          style={styles.button}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={30} color={theme.primary} />
        </Pressable>
      }
      <Text style={styles.title}>{title}</Text>
      <Pressable 
        style={styles.button}
        onPress={openDrawer}
      >
        <Ionicons name="menu" size={30} color={theme.primary} />
      </Pressable>
      <DrawerMenu modalVisible={modalVisible} setModalVisible={setModalVisible} navigation={navigation} />
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
});

export default CustomHeader;
