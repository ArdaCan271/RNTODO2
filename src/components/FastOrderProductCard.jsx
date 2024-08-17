import { Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View, Keyboard } from 'react-native';
import React, { useState, useMemo } from 'react';
import { useTheme } from '../constants/colors';

import { useSelector } from 'react-redux';

import { formattedCurrency } from '../utils/formatData';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FastOrderProductEditCartModal from './FastOrderProductEditCartModal';

const FastOrderProductCard = ({ setEditModalVisible, setSelectedEditProduct, handleOpenBottomSheet, setSelectedProduct, productInfo, dynamicColors }) => {

  const theme = useTheme();
  const styles = useMemo(() => getStyles(theme), [theme]);

  const userData = useSelector((state) => state.userData.data);

  const userList = useSelector((state) => state.fastOrderCart.userList);
  const user = userList.find((user) => user.userEmail === userData.email);
  const productList = user ? user.productsList : [];
  const product = productList.find((product) => product.stockCode === productInfo.StockCode);
  const productCartQuantity = product ? product.quantity : 0;

  const handleCartEditPress = () => {
    setSelectedEditProduct(productInfo);
    setEditModalVisible(true);
  };

  return (
    <View style={[styles.container, {borderColor: dynamicColors.accent, backgroundColor: dynamicColors.backgroundColor}]}>
      <View style={[styles.productInfoSection, {borderColor: dynamicColors.accent}]}>
        <View style={styles.productCodeInfoContainer}>
          <View style={styles.productBarcodeContainer}>
            <FontAwesome name="barcode" size={15} color={theme.textAlt} style={{ marginLeft: 8 }} />
            <Text style={styles.productBarcodeText}>{productInfo.StockBarcode}</Text>
          </View>
          <View style={styles.productStockCodeContainer}>
            <FontAwesome name="archive" size={15} color={theme.textAlt} style={{ marginRight: 8 }} />
            <Text style={styles.productStockCodeText}>{productInfo.StockCode}</Text>
          </View>
        </View>
        <TouchableOpacity 
          style={styles.productNameInfoContainer}
          onPress={() => {
            setSelectedProduct(productInfo);
            handleOpenBottomSheet();
            Keyboard.dismiss();
          }}
        >
          <Text style={styles.productNameText} numberOfLines={2}>{productInfo.StockName}</Text>
        </TouchableOpacity>
        <View style={styles.productStockInfoContainer}>
          <View style={styles.productStockAmountContainer}>
            <FontAwesome name="cube" size={15} color={productInfo.ActualStock > 0 ? theme.textAlt : theme.paleRed} style={{ marginLeft: 8 }} />
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={[styles.productStockAmountText, {color: productInfo.ActualStock > 0 ? theme.textAlt : theme.paleRed}]}>{productInfo.ActualStock}</Text>
              <Text style={[styles.productStockAmountUnitText, {color: productInfo.ActualStock > 0 ? theme.textAlt : theme.paleRed}]}>{productInfo.StockUnit}</Text>
            </View>
          </View>
          <View style={styles.productStockPriceContainer}>
            <FontAwesome name="tag" size={15} color={theme.textAlt} style={{ marginLeft: 8 }} />
            <Text style={styles.productStockPriceText}>₺{formattedCurrency(productInfo.StockPrice)}</Text>
          </View>
        </View>
      </View>
      <View style={styles.productCartAmountSection}>
        <View style={styles.cartAmountContainer}>
          <FontAwesome name="shopping-cart" size={15} color={productCartQuantity > 0 ? dynamicColors.accent : theme.textAlt} />
          <Text style={{color: productCartQuantity > 0 ? theme.text : theme.textAlt, textAlign: 'center'}}>{productCartQuantity}</Text>
        </View>
        <TouchableOpacity style={[styles.cartEditButton, {borderColor: dynamicColors.accent}]} onPress={handleCartEditPress}>
          <FontAwesome name="cart-plus" size={24} color={dynamicColors.accent} />
        </TouchableOpacity>
      </View>
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
    flex: 5,
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
    fontSize: 12,
    marginLeft: 8
  },
  productStockAmountUnitText: {
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
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
  },
  cartAmountContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    columnGap: 6,
  },
  cartEditButton: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: theme.primary,
  },
});

export default FastOrderProductCard;