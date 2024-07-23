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
          <Ionicons name="arrow-back" size={30} color={theme.primaryDark} />
        </Pressable>
      }
      <Text style={styles.title}>{title}</Text>
      <Pressable 
        style={styles.button}
        onPress={openDrawer}
      >
        <Ionicons name="menu" size={30} color={theme.primaryDark} />
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
    backgroundColor: theme.white,
    borderBottomWidth: 2,
    borderColor: theme.primaryDark,
    position: 'absolute',
    top: 0,
    width: '100%',
    height: 56,
    elevation: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.primaryDark,
  },
  button: {
    backgroundColor: theme.white,
    padding: 6,
    borderRadius: 5,
  },
  buttonText: {
    color: theme.white,
  },
});

export default CustomHeader;
