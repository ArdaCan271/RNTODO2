import React, {useMemo} from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, Pressable } from 'react-native';
import { useTheme } from '../constants/colors';

const PickerModal = ({ visible, options, selectedOption, onSelect, onClose }) => {
  const theme = useTheme();
  const styles = useMemo(() => getStyles(theme), [theme]);

  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable 
        style={styles.overlay}
        onPress={onClose}
      >
        <Pressable android_disableSound style={styles.modalContainer}>
          {options.map((option, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => onSelect(option)}
              style={styles.option}
            >
              <Text style={styles.optionText}>{option}</Text>
              <View style={styles.radioContainer}>
                <View style={styles.radioCircle}>
                  {option === selectedOption && <View style={styles.radioCircleInner} />}
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </Pressable>
      </Pressable>
    </Modal>
  );
};

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
    width: '70%',
    maxHeight: '70%',
    alignItems: 'center',
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: theme.backgroundAlt,
    width: '100%',
    paddingHorizontal: 20,
    marginTop: 5,
    borderRadius: 5,
    borderColor: theme.primary,
    borderWidth: 1,
  },
  optionText: {
    color: theme.text,
    fontSize: 16,
    flex: 1,
  },
  radioContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: theme.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioCircleInner: {
    height: 10,
    width: 10,
    borderRadius: 6,
    backgroundColor: theme.primaryAlt,
  },
});

export default PickerModal;
