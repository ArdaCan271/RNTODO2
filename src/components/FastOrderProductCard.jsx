import { Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View, Keyboard } from 'react-native';
import React, { useState, useMemo } from 'react';
import { useTheme } from '../constants/colors';

import { useSelector } from 'react-redux';

import { formattedCurrency } from '../utils/formatData';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FastOrderProductEditCartModal from './FastOrderProductEditCartModal';

const FastOrderProductCard = ({ handleOpenBottomSheet, setSelectedProduct, productName, productBarcode, productStockCode, productStockAmount, productStockAmountUnit, productStockPrice, dynamicColors }) => {

  const theme = useTheme();
  const styles = useMemo(() => getStyles(theme), [theme]);

  const productList = useSelector((state) => state.fastOrderCart.productList);
  const product = productList.find((product) => product.stockCode === productStockCode);
  const productCartQuantity = product ? product.quantity : 0;
  
  const [modalVisible, setModalVisible] = useState(false);

  const handleCartEditPress = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <View style={[styles.container, {borderColor: dynamicColors.accent, backgroundColor: dynamicColors.backgroundColor}]}>
      <FastOrderProductEditCartModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
      <Pressable 
        style={[styles.productInfoSection, {borderColor: dynamicColors.accent}]}
        onPress={() => {
          setSelectedProduct(productStockCode);
          handleOpenBottomSheet();
          Keyboard.dismiss();
        }}
        android_ripple={{ color: theme.primary }}
        unstable_pressDelay={20}
      >
        <View style={styles.productCodeInfoContainer}>
          <View style={styles.productBarcodeContainer}>
            <FontAwesome name="barcode" size={15} color={theme.textAlt} style={{ marginLeft: 8 }} />
            <Text style={styles.productBarcodeText}>{productBarcode}</Text>
          </View>
          <View style={styles.productStockCodeContainer}>
            <FontAwesome name="archive" size={15} color={theme.textAlt} style={{ marginRight: 8 }} />
            <Text style={styles.productStockCodeText}>{productStockCode}</Text>
          </View>
        </View>
        <View style={styles.productNameInfoContainer}>
          <Text style={styles.productNameText} numberOfLines={2}>{productName}</Text>
        </View>
        <View style={styles.productStockInfoContainer}>
          <View style={styles.productStockAmountContainer}>
            <FontAwesome name="cube" size={15} color={theme.textAlt} style={{ marginLeft: 8 }} />
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={styles.productStockAmountText}>{productStockAmount}</Text>
              <Text style={styles.productStockAmountUnitText}>{productStockAmountUnit}</Text>
            </View>
          </View>
          <View style={styles.productStockPriceContainer}>
            <FontAwesome name="tag" size={15} color={theme.textAlt} style={{ marginLeft: 8 }} />
            <Text style={styles.productStockPriceText}>₺{formattedCurrency(productStockPrice)}</Text>
          </View>
        </View>
      </Pressable>
    </View>
  );
}

const getStyles = (theme) => StyleSheet.create({
  container: {
    height: 120,
    borderLeftWidth: 15,
    flexDirection: 'row',
  },
  productInfoSection: {
    flex: 1,
    borderRightWidth: 1,
    borderRightColor: theme.primary,
    paddingVertical: 4,
  },
  productCodeInfoContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  productBarcodeContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  productBarcodeText: {
    color: theme.textAlt,
    fontSize: 12,
    marginBottom: 2,
    marginLeft: 8
  },
  productStockCodeContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  productStockCodeText: {
    color: theme.textAlt,
    fontSize: 12,
    marginRight: 6
  },
  productNameInfoContainer: {
    flex: 2,
    justifyContent: 'center',
  },
  productNameText: {
    color: theme.text,
    fontSize: 15,
    fontWeight: 'bold',
    marginLeft: 8,
    marginRight: 8,
  },
  productStockInfoContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  productStockAmountContainer: {
    flex: 3,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  productStockAmountText: {
    color: theme.textAlt,
    fontSize: 12,
    marginLeft: 8
  },
  productStockAmountUnitText: {
    color: theme.textAlt,
    fontSize: 12,
    marginLeft: 6,
    marginRight: 8
  },
  productStockPriceContainer: {
    flex: 4,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  productStockPriceText: {
    color: theme.textAlt,
    fontSize: 12,
    marginRight: 8,
    marginLeft: 8
  },
  productCartAmountSection: {
    flex: 1.6,
  },
  // amountTextInputContainer: {
  //   flex: 1,
  //   flexDirection: 'row',
  //   paddingHorizontal: 4,
  //   alignItems: 'center',
  // },
  // amountTextTitle: {
  //   color: theme.textAlt,
  //   fontSize: 12,
  //   flex: 2,
  // },
  // amountTextInput: {
  //   padding: 0,
  //   flex: 3,
  //   color: theme.text,
  //   fontSize: 14,
  // },
  // productButtonsContainer: {
  //   flex: 2,
  //   flexDirection: 'row',
  //   justifyContent: 'space-between'
  // },
  // removeProductButton: {
  //   flex: 1,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   backgroundColor: theme.primary,
  // },
  // addProductButton: {
  //   flex: 1,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   borderLeftWidth: 1,
  //   borderColor: theme.separator,
  //   backgroundColor: theme.primary
  // },
  // productTotalCartPriceContainer: {
  //   flex: 1,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  // },
  // productTotalCartPriceText: {
  //   color: theme.text,
  //   fontSize: 14,
  //   textAlign: 'center'
  // }
});

export default FastOrderProductCard;