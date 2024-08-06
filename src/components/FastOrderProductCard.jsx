import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useState, useMemo } from 'react';
import { useTheme } from '../constants/colors';

import { useSelector, useDispatch } from 'react-redux';
import { addOneOfProduct, removeOneOfProduct, setAmountOfProduct } from '../features/fastOrderCart/fastOrderCartSlice';

import FontAwesome from 'react-native-vector-icons/FontAwesome';

const FastOrderProductCard = ({ productName, productBarcode, productStockCode, productStockAmount, productStockPrice }) => {

  const theme = useTheme();
  const styles = useMemo(() => getStyles(theme), [theme]);

  const productList = useSelector((state) => state.fastOrderCart.productList);
  const productAmount = productList.filter((product) => product.stockCode === productStockCode).quantity;

  const [inputValue, setInputValue] = useState(productAmount || 0);
  
  const handleInputChange = (value) => {
    if (value === '') {
      value = 0;
    };
    setInputValue(parseInt(value));
  };

  return (
    <View style={styles.container}>
      <View style={styles.productInfoSection}>
        <View style={styles.productCodeInfoContainer}>
          <View style={styles.productBarcodeContainer}>
            <FontAwesome name="barcode" size={20} color={theme.textAlt} style={{ marginLeft: 8 }} />
            <Text style={styles.productBarcodeText}>1231231231231</Text>
          </View>
          <View style={styles.productStockCodeContainer}>
            <FontAwesome name="archive" size={20} color={theme.textAlt} style={{ marginRight: 8 }} />
            <Text style={styles.productStockCodeText}>12312312312312</Text>
          </View>
        </View>
        <View style={styles.productNameInfoContainer}>
          <Text style={styles.productNameText} numberOfLines={2}>CB 2 LI ARMURLU HAVLU SETI SHINY MERCAN 50X90*2</Text>
        </View>
        <View style={styles.productStockInfoContainer}>
          <View style={styles.productStockAmountContainer}>
            <FontAwesome name="cube" size={20} color={theme.textAlt} style={{ marginLeft: 8 }} />
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ color: theme.textAlt, fontSize: 14, marginLeft: 10 }}>12</Text>
              <Text style={{ color: theme.textAlt, fontSize: 14, marginLeft: 6, marginRight: 8 }}>AD</Text>
            </View>
          </View>
          <View style={styles.productStockPriceContainer}>
            <FontAwesome name="tag" size={20} color={theme.textAlt} style={{ marginLeft: 8 }} />
            <Text style={styles.productStockPriceText}>₺1150,32</Text>
          </View>
        </View>
      </View>
      <View style={styles.productCartAmountSection}>
        <View style={{ flex: 3 }}>
          <View style={{ flex: 2 }}>
            <TextInput
              style={styles.amountTextInput}
              onChangeText={handleInputChange}
              value={String(inputValue)}
              keyboardType="numeric"
            />
          </View>
          <View style={{ flex: 3, flexDirection: 'row', justifyContent: 'space-between' }}>
            <TouchableOpacity style={styles.removeProductButton}>
              <FontAwesome name="minus" size={24} color={theme.white} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.addProductButton}>
              <FontAwesome name="plus" size={24} color={theme.white} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.productTotalCartPriceContainer}>
          <Text style={styles.productTotalCartPriceText}>₺1150,32</Text>
        </View>
      </View>
    </View>
  );
}

const getStyles = (theme) => StyleSheet.create({
  container: {
    marginTop: 50,
    backgroundColor: theme.backgroundAlt,
    height: 110,
    borderLeftWidth: 15,
    borderRightWidth: 1,
    borderColor: theme.primary,
    flexDirection: 'row',
  },
  productInfoSection: {
    flex: 5,
    borderRightWidth: 1,
    borderRightColor: theme.primary
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
    fontSize: 18,
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
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderColor: theme.primary,
  },
  productStockPriceContainer: {
    flex: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: theme.primary,
  },
  productStockPriceText: {
    color: theme.textAlt,
    fontSize: 14,
    marginRight: 8
  },
  productCartAmountSection: {
    flex: 2,
  },
  amountTextInput: {
    flex: 1,
    padding: 0,
    borderColor: theme.primary,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    textAlign: 'center',
    color: theme.text,
    fontSize: 18,
    backgroundColor: theme.backgroundAlt,
  },
  productButtonsContainer: {
    flex: 3,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  removeProductButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.primary,
    borderLeftWidth: 1,
    borderColor: theme.primary
  },
  addProductButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderLeftWidth: 1,
    borderColor: theme.white,
    backgroundColor: theme.primary
  },
  productTotalCartPriceContainer: {
    flex: 1,
    borderBottomWidth: 1,
    borderColor: theme.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  productTotalCartPriceText: {
    color: theme.text,
    fontSize: 18,
    textAlign: 'center'
  }
});

export default FastOrderProductCard;