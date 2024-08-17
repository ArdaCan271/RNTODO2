import { StyleSheet, Text, View, BackHandler, Pressable, TouchableOpacity } from 'react-native';
import React, {useEffect, useMemo} from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { useTheme } from '../constants/colors';

import CustomHeader from '../components/CustomHeader';

import FontAwesome from 'react-native-vector-icons/FontAwesome';

const FastOrderCartScreen = ({ navigation, route }) => {
  const theme = useTheme();
  const styles = useMemo(() => getStyles(theme), [theme]);

  useEffect(() => {
    const backAction = () => {
      navigation.goBack();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    return () => backHandler.remove();
  }, [navigation]);

  return (
    <View style={styles.container}>
      <CustomHeader navigation={navigation} title='Hızlı Sipariş Sepet' />
      <View style={styles.cariSection}>
        <View style={styles.cariSelectSection}>
          <View style={styles.cariPreviewSection}>
            <Text style={styles.cariPreviewTitle}>Cari İsmi:</Text>
            <View style={styles.cariPreviewValueContainer}>
              <Text numberOfLines={2} style={styles.cariPreviewValue}>MÜŞTERİ 005</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.cariGoToListButton}>
            <FontAwesome name='play-circle-o' size={24} color={theme.background} />
            <Text style={styles.cariGoToListButtonText}>Seç</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const getStyles = (theme) => StyleSheet.create({
  container : {
    flex: 1,
    backgroundColor: theme.background,
    paddingTop: theme.padding.header,
  },
  cariSection: {
    height: 150,
    width: '100%',
    padding: 20,
  },
  cariSelectSection: {
    alignSelf: 'center',
    marginTop: 20,
    height: 50,
    backgroundColor: theme.backgroundAlt,
    borderRadius: 10,
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


export default FastOrderCartScreen;