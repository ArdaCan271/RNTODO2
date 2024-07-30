import { StyleSheet, Text, View, Pressable, Modal } from 'react-native';
import React from 'react';

import { useTheme } from '../constants/colors';

import FilterSingle from './FilterSingle';
import FilterRange from './FilterRange';

const FilterModal = ({ filterModalVisible, filterModalType, filterModalField, onClose }) => {

  const theme = useTheme();
  const styles = getStyles(theme);

  return (
    <Modal
      transparent={true}
      visible={filterModalVisible}
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable 
        style={styles.overlay}
        onPress={onClose}
      >
        <Pressable 
          style={styles.modalContainer}
          android_disableSound
        >
          {filterModalType === 'Single' && 
            <FilterSingle
              field={filterModalField}
            />
          }
          {filterModalType === 'Range' && 
            <FilterRange
              field={filterModalField}
            />
          }
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
    width: '70%',
    height: '70%',
    alignItems: 'center',
  },
});

export default FilterModal;