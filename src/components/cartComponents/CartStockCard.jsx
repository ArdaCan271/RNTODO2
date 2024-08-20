import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useMemo } from 'react';

import { useTheme } from '../../constants/colors';

import { useSelector, useDispatch } from 'react-redux';

import FontAwesome from 'react-native-vector-icons/FontAwesome';

import { formattedCurrency } from '../../utils/formatData';

import { setAmountOfProduct } from '../../features/fastOrderCart/fastOrderCartSlice';

const CartStockCard = ({ productInfo }) => {
  const theme = useTheme();
  const styles = useMemo(() => getStyles(theme), [theme]);
  const dispatch = useDispatch();

  const userData = useSelector((state) => state.userData.data);
    
  return (
    <TouchableOpacity onPress={() => console.log('hellooo')} style={styles.cartStockCard}>
      <View style={styles.cardHeader}>
        <View style={styles.stockNameContainer}>
          <Text numberOfLines={2} style={styles.stockNameText}>{productInfo.stockName}</Text>
        </View>
        <TouchableOpacity style={styles.stockRemoveContainer} onPress={() => dispatch(setAmountOfProduct({ userEmail: userData.email, stockCode: productInfo.stockCode, quantity: 0 }))}>
          <FontAwesome name="trash" size={24} color={theme.background} />
        </TouchableOpacity>
      </View>
      <View style={styles.cardBody}>
        <View style={styles.stockProductInfoContainer}>
          <View style={styles.stockPriceContainer}>
            <Text style={styles.stockPriceTitle}>Stok Birim Fiyat:</Text>
            <Text style={styles.stockPriceValue}>₺{formattedCurrency(productInfo.stockPrice)}</Text>
          </View>
          <View style={styles.unitPriceContainer}>
            <Text style={styles.unitPriceTitle}>Birim Fiyat:</Text>
            <Text style={styles.unitPriceValue}>₺{formattedCurrency(productInfo.unitPrice)}</Text>
          </View>
          <View style={styles.discountPriceContainer}>
            <Text style={styles.discountPriceTitle}>İskonto Fiyat:</Text>
            <Text style={styles.discountPriceValue}>₺{formattedCurrency(productInfo.unitPrice)}</Text>
          </View>
        </View>
        <View style={styles.stockCartInfoContainer}>
          <View style={styles.stockCartQuantityContainer}>
            <FontAwesome name="shopping-cart" size={20} color={theme.primary} style={{marginLeft: 5}}/>
            <Text style={styles.cartQuantity}>{productInfo.quantity}</Text>
            <Text style={styles.cartQuantityUnit}>{productInfo.unitType}</Text>
          </View>
          <View style={styles.stockCartTotalPriceContainer}>
            <Text style={styles.stockCartTotalPrice}>₺{formattedCurrency(productInfo.unitPrice * productInfo.quantity)}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const getStyles = (theme) => StyleSheet.create({    
  cartStockCard: {
    width: '97%',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: theme.primary,
    height: 130,
    overflow: 'hidden',
  },
  cardHeader: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: theme.primary,
  },
  stockNameContainer: {
    paddingVertical: 10,
    justifyContent: 'center',
    paddingLeft: 5,
    width: '90%',
  },
  stockNameText: {
    color: theme.background,
    fontSize: 16,
    fontWeight: 'bold',
  },
  stockRemoveContainer: {
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardBody: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  stockProductInfoContainer: {
    flex: 1,
  },
  stockPriceContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 4,
  },
  stockPriceTitle: {
    fontSize: 14,
    color: theme.text,
    fontWeight: 'bold',
  },
  stockPriceValue: {
    fontSize: 14,
    color: theme.text,
    marginLeft: 4,
  },
  unitPriceContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 4,
  },
  unitPriceTitle: {
    fontSize: 14,
    color: theme.text,
    fontWeight: 'bold',
  },
  unitPriceValue: {
    fontSize: 14,
    color: theme.text,
    marginLeft: 4,
  },
  discountPriceContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 4,
  },
  discountPriceTitle: {
    fontSize: 14,
    color: theme.text,
    fontWeight: 'bold',
  },
  discountPriceValue: {
    fontSize: 14,
    color: theme.text,
    marginLeft: 4,
  },
  stockCartInfoContainer: {
    height: '100%',
  },
  stockCartQuantityContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartQuantity: {
    fontSize: 16,
    color: theme.text,
    marginLeft: 8,
  },
  cartQuantityUnit: {
    fontSize: 16,
    color: theme.text,
    marginLeft: 5,
    marginRight: 5,
  },
  stockCartTotalPriceContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    textAlign: 'right',
  },
  stockCartTotalPrice: {
    fontSize: 16,
    color: theme.primary,
    fontWeight: 'bold',
    marginRight: 5,
    marginBottom: 2,
    marginLeft: 5,
  },
});

export default CartStockCard;