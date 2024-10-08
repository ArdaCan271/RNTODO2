import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, {useMemo, useState} from 'react';

import { useTheme } from '../../constants/colors';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import CartCariSelectionModal from '../../screens/CartCariSelectionModal';

const CariSelection = ({navigation, selectedCari, setSelectedCari}) => {
  const theme = useTheme();
  const styles = useMemo(() => getStyles(theme), [theme]);

  const [modalVisible, setModalVisible] = useState(false);

  const selectedCariName = selectedCari ? selectedCari.Isim : 'Cari Seçiniz...';

  return (
    <TouchableOpacity style={styles.cariSection} onPress={() => setModalVisible(true)}>
    <CartCariSelectionModal modalVisible={modalVisible} setModalVisible={setModalVisible} setSelectedCari={setSelectedCari} />
      <View style={styles.cariSelectSection}>
        <View style={styles.cariPreviewSection}>
          <Text style={styles.cariPreviewTitle}>Cari İsmi:</Text>
          <View style={styles.cariPreviewValueContainer}>
            <Text numberOfLines={2} style={styles.cariPreviewValue}>{selectedCariName}</Text>
          </View>
        </View>
        <View style={styles.cariGoToListButton}>
          <FontAwesome name='play-circle-o' size={24} color={theme.background} />
          <Text style={styles.cariGoToListButtonText}>Seç</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const getStyles = (theme) => StyleSheet.create({
  cariSection: {
    width: '100%',
    paddingHorizontal: 20,
    marginTop: 20,
  },
  cariSelectSection: {
    alignSelf: 'center',
    height: 50,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: theme.primary,
    width: '100%',
    flexDirection: 'row',
    overflow: 'hidden',
  },
  cariPreviewSection: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  cariPreviewTitle: {
    color: theme.primary,
    fontSize: 16,
    marginLeft: 10,
    fontWeight: 'bold',
  },
  cariPreviewValueContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  cariPreviewValue: {
    color: theme.text,
    fontSize: 16,
    marginLeft: 10,
    lineHeight: 22,
  },
  cariGoToListButton: {
    paddingHorizontal: 8,
    borderLeftColor: theme.primary,
    borderLeftWidth: 1,
    backgroundColor: theme.primary,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    columnGap: 4,
  },
  cariGoToListButtonCircle: {
    width: 24,
    height: 24,
    borderRadius: 24,
    backgroundColor: theme.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cariGoToListButtonText: {
    color: theme.background,
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default CariSelection;