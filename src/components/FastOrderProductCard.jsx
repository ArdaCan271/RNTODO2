import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { useTheme } from '../constants/colors';

import { useSelector, useDispatch } from 'react-redux';
import { addOneOfProduct, removeOneOfProduct, setAmountOfProduct } from '../features/fastOrderCart/fastOrderCartSlice';

import FontAwesome from 'react-native-vector-icons/FontAwesome';

const FastOrderProductCard = ({ productName, productBarcode, productStockCode, productStockAmount, productStockPrice }) => {

  const theme = useTheme();
  const styles = getStyles(theme);

  const productList = useSelector((state) => state.fastOrderCart.productList);
  const productAmount = productList.filter((product) => product.stockCode === productStockCode).quantity;

  const [inputValue, setInputValue] = useState(productAmount || 0);

  const handleInputChange = (value) => {
    setInputValue(value);
  };

  return (
    <View style={styles.container}>
      <View style={styles.productInfoSection}>
        <View style={styles.productCodeInfoContainer}>
          <View style={styles.productBarcodeContainer}>
            <FontAwesome name="barcode" size={20} color={theme.textAlt} style={{ marginLeft: 8 }} />
            <Text style={{ color: theme.textAlt, fontSize: 12, marginBottom: 2, marginLeft: 8 }}>1231231231231</Text>
          </View>
          <View style={styles.productStockCodeContainer}>
            <FontAwesome
              name="archive"
              size={20} color={theme.textAlt} style={{ marginRight: 8 }} />
            <Text style={{ color: theme.textAlt, fontSize: 12, marginRight: 6 }}>12312312312312</Text>
          </View>
        </View>
        <View style={styles.productNameInfoContainer}>
          <Text style={{ color: theme.text, fontSize: 18, fontWeight: 'bold', marginLeft: 8, marginRight: 8, }} numberOfLines={2}>CB 2 LI ARMURLU HAVLU SETI SHINY MERCAN 50X90*2</Text>
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
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ color: theme.textAlt, fontSize: 14, marginLeft: 10 }}>1150,32</Text>
              <Text style={{ color: theme.textAlt, fontSize: 14, marginLeft: 6, marginRight: 8 }}>TL</Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.productCartAmountSection}>
        <View style={{ flex: 3 }}>
          <View style={{ flex: 2}}>
            <TextInput
              style={{ flex: 1, borderColor: theme.primary, borderTopWidth: 1, borderBottomWidth: 1}}
              onChangeText={handleInputChange}
              value={inputValue}
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
  productStockCodeContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  productNameInfoContainer: {
    flex: 2,
    justifyContent: 'center',
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
  productCartAmountSection: {
    flex: 2,
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
    borderColor: theme.primary
  }
});

export default FastOrderProductCard;