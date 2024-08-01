import React from 'react';
import { Modal, View, StyleSheet, Pressable } from 'react-native';
import { useTheme } from '../../constants/colors';

import Table from './Table';

const DetailTableModal = ({ visible, requestUrl, subDocumentConnectionId, paginationEnabled = false, itemsPerPage = 10, onClose }) => {
  const theme = useTheme();
  const styles = getStyles(theme);

  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View 
        style={styles.overlay}
      >
        <View style={styles.modalContainer}>
          <Table
            requestUrl={requestUrl}
            paginationEnabled={paginationEnabled}
            itemsPerPage={itemsPerPage}
            onClose={onClose}
            subDocumentConnectionId={subDocumentConnectionId}
          />
        </View>
      </View>
    </Modal>
  );
};

const getStyles = (theme) => StyleSheet.create({
  overlay: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: theme.backgroundAlt,
    borderRadius: 10,
    width: '95%',
    height: '95%',
    alignItems: 'center',
  },
});

export default DetailTableModal;
