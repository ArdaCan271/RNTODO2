import { StyleSheet, Text, View, Modal, Pressable, useWindowDimensions, Keyboard } from 'react-native';
import React, { useState, useMemo } from 'react';

import { useTheme } from '../constants/colors';

import { useSelector } from 'react-redux';

const FastOrderProductEditCartModal = ({ modalVisible, setModalVisible }) => {
  const theme = useTheme();
  const styles = useMemo(() => getStyles(theme), [theme]);

  const windowWidth = useWindowDimensions().width;
  const windowHeight = useWindowDimensions().height;

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
    >
      <Pressable style={styles.overlay} onPress={() => {
        setModalVisible(!modalVisible);
        Keyboard.dismiss();
      }}>
        <Pressable 
          style={[
            styles.modalContainer,
            {
              width: windowWidth > windowHeight ? '50%' : '80%',
              height: windowWidth > windowHeight ? '60%' : '30%',
            }
          ]} 
          android_disableSound
        >
          <View>

          </View>
        </Pressable>
      </Pressable>      
    </Modal>
  );
}

const getStyles = (theme) => StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: theme.background,
    borderRadius: 10,
    padding: 20,
    elevation: 5,
    shadowColor: 'black',
  },
});

export default FastOrderProductEditCartModal;