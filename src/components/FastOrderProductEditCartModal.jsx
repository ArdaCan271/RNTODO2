import { StyleSheet, Text, View, Modal, Pressable } from 'react-native';
import React, { useState, useMemo } from 'react';

import { useTheme } from '../constants/colors';

import { useSelector } from 'react-redux';

const FastOrderProductEditCartModal = ({ modalVisible, setModalVisible, }) => {

  const theme = useTheme();
  const styles = useMemo(() => getStyles(theme), [theme]);

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
    >
      <Pressable style={styles.overlay} onPress={() => setModalVisible(!modalVisible)}>
        <Pressable style={styles.modalContainer} android_disableSound>
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
    backgroundColor: theme.backgroundAlt,
    borderRadius: 10,
    padding: 20,
  },
});

export default FastOrderProductEditCartModal;