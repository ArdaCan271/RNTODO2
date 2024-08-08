import { Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useState, useMemo } from 'react';
import { useTheme } from '../constants/colors';

import { useSelector, useDispatch } from 'react-redux';
import { addOneOfProduct, removeOneOfProduct, setAmountOfProduct } from '../features/fastOrderCart/fastOrderCartSlice';

import { formattedCurrency } from '../utils/formatData';

import FastOrderProductDetailModal from './FastOrderProductDetailModal';

import FontAwesome from 'react-native-vector-icons/FontAwesome';

const FastOrderProductCard = ({ setSelectedProduct, productName, productBarcode, productStockCode, productStockAmount, productStockAmountUnit, productStockPrice, dynamicColors }) => {

  const theme = useTheme();
  const styles = useMemo(() => getStyles(theme), [theme]);

  const dispatch = useDispatch();

  const productList = useSelector((state) => state.fastOrderCart.productList);
  const product = productList.find((product) => product.stockCode === productStockCode);
  const productCartQuantity = product ? product.quantity : 0;
  
  const handleInputChange = (value) => {
    if (value === '') {
      value = 0;
    };
    dispatch(setAmountOfProduct({ stockCode: productStockCode, stockPrice: productStockPrice, quantity: parseInt(value) }));
  };

  const handleRemoveProduct = () => {
    dispatch(removeOneOfProduct({ stockCode: productStockCode, stockPrice: productStockPrice }));
  };

  const handleAddProduct = () => {
    dispatch(addOneOfProduct({ stockCode: productStockCode, stockPrice: productStockPrice }));
  };

  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={[styles.container, {borderColor: dynamicColors.accent, backgroundColor: dynamicColors.backgroundColor}]}>
      <Pressable 
        style={[styles.productInfoSection, {borderColor: dynamicColors.accent}]}
        onPress={() => setSelectedProduct(productStockCode)}
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
      <View style={styles.productCartAmountSection}>
        <View style={styles.amountTextInputContainer}>
          <Text style={styles.amountTextTitle}>Adet:</Text>
          <TextInput
            style={styles.amountTextInput}
            onChangeText={handleInputChange}
            value={String(productCartQuantity)}
            keyboardType="numeric"
          />
        </View>
        <View style={styles.productButtonsContainer}>
          <TouchableOpacity style={[styles.removeProductButton, {backgroundColor: dynamicColors.accent}]} onPress={handleRemoveProduct}>
            <FontAwesome name="minus" size={24} color={theme.white} />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.addProductButton, {backgroundColor: dynamicColors.accent}]} onPress={handleAddProduct}>
            <FontAwesome name="plus" size={24} color={theme.white} />
          </TouchableOpacity>
        </View>
        <View style={styles.productTotalCartPriceContainer}>
          <Text style={[styles.productTotalCartPriceText, {color: productCartQuantity > 0 ? theme.text : theme.separator}]}>₺{formattedCurrency(productStockPrice * productCartQuantity)}</Text>
        </View>
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
    flex: 2,
  },
  amountTextInputContainer: {
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: 4,
    alignItems: 'center',
  },
  amountTextTitle: {
    color: theme.textAlt,
    fontSize: 12,
    flex: 2,
  },
  amountTextInput: {
    padding: 0,
    flex: 3,
    color: theme.text,
    fontSize: 14,
  },
  productButtonsContainer: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  removeProductButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.primary,
  },
  addProductButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderLeftWidth: 1,
    borderColor: theme.separator,
    backgroundColor: theme.primary
  },
  productTotalCartPriceContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  productTotalCartPriceText: {
    color: theme.text,
    fontSize: 14,
    textAlign: 'center'
  }
});

export default FastOrderProductCard;