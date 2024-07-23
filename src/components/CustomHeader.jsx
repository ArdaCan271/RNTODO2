import { StyleSheet, Text, View, Pressable } from 'react-native';
import React, { useState } from 'react';
import colors from '../constants/colors';

import Ionicons from 'react-native-vector-icons/Ionicons';
import DrawerMenu from './DrawerMenu';

const CustomHeader = ({ navigation, title, noBack }) => {

  const [modalVisible, setModalVisible] = useState(false);

  const openDrawer = () => {
    setModalVisible(true);
  }

  return (
    <View style={styles.container}>
      {noBack ? 
        <View style={{width: 42, height: 42}}></View> 
        :
        <Pressable
          style={styles.button}
          onPress={() => navigation.goBack()}
        >
          
          <Ionicons name="arrow-back" size={30} color={colors.primaryDark} />
        </Pressable>
      }
      <Text style={styles.title}>{title}</Text>
      <Pressable 
        style={styles.button}
        onPress={openDrawer}
      >
        <Ionicons name="menu" size={30} color={colors.primaryDark} />
      </Pressable>
      <DrawerMenu modalVisible={modalVisible} setModalVisible={setModalVisible} navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    backgroundColor: colors.white,
    borderBottomWidth: 2,
    borderColor: colors.primaryDark,
    position: 'absolute',
    top: 0,
    width: '100%',
    height: 56,
    elevation: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.primaryDark,
  },
  button: {
    backgroundColor: colors.white,
    padding: 6,
    borderRadius: 5,
  },
  buttonText: {
    color: colors.white,
  },
});

export default CustomHeader;