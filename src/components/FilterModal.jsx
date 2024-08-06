import { StyleSheet, Text, View, Pressable, Modal } from 'react-native';
import React, {useMemo} from 'react';

import { useTheme } from '../constants/colors';

import FilterSingle from './FilterSingle';
import FilterRange from './FilterRange';

const FilterModal = ({ fieldFilters, setFieldFilters, filterModalInfo, setFilterModalInfo, onClose }) => {

  const theme = useTheme();
  const styles = useMemo(() => getStyles(theme), [theme]);

  return (
    <Modal
      transparent={true}
      visible={filterModalInfo.visible}
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable 
        style={styles.overlay}
        onPress={onClose}
      >
        <Pressable 
          style={[styles.modalContainer, { width: filterModalInfo.type === 'Single' ? '70%' : '85%' }]}
          android_disableSound
        >
          {filterModalInfo.type === 'Single' && 
            <FilterSingle
              fieldFilters={fieldFilters}
              setFieldFilters={setFieldFilters}
              filterModalInfo={filterModalInfo}
              onClose={onClose}
            />
          }
          {filterModalInfo.type === 'Range' && 
            <FilterRange
              fieldFilters={fieldFilters}
              setFieldFilters={setFieldFilters}
              filterModalInfo={filterModalInfo}
              onClose={onClose}
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
    backgroundColor: theme.backgroundAlt,
    borderRadius: 10,
    width: '70%',
  },
});

export default FilterModal;