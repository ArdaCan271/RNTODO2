import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useMemo, useState } from 'react';

import { useTheme } from '../../constants/colors';

import FontAwesome from 'react-native-vector-icons/FontAwesome';

import { useSelector, useDispatch } from 'react-redux';
import { clearCart } from '../../features/fastOrderCart/fastOrderCartSlice';

import CartStockCard from './CartStockCard';
import CartEditProductModal from './CartEditProductModal';

const CartStocks = ({ navigation, productList, cartDiscountStates }) => {
  const theme = useTheme();
  const styles = useMemo(() => getStyles(theme), [theme]);
  const dispatch = useDispatch();

  const userData = useSelector((state) => state.userData.data);

  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedEditProduct, setSelectedEditProduct] = useState(null);

  const cartDiscountsArray = cartDiscountStates.map((discountState) => discountState.cartDiscount);

  return (
    <View style={styles.cartStocksSection}>
      {editModalVisible && selectedEditProduct &&
        <CartEditProductModal
          modalVisible={editModalVisible}
          setModalVisible={setEditModalVisible}
          productInfo={selectedEditProduct}
          cartDiscountsArray={cartDiscountsArray}
        />
      }
      <View style={styles.cartStocksContainer}>
        <View style={styles.cartButtonsContainer}>
          <TouchableOpacity
            style={styles.addStockButton}
            onPress={() => navigation.replace('FastOrder')}
          >
            <FontAwesome name="plus" size={20} color={theme.background} />
            <Text style={styles.addStockButtonText}>Stok Ekle</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.clearCartButton}
            onPress={() => dispatch(clearCart(userData.email))}
          >
            <FontAwesome name="trash" size={20} color={theme.textAlt} />
            <Text style={styles.clearCartButtonText}>Sepeti Temizle</Text>
          </TouchableOpacity>
        </View>
        {productList.map((productInfo, index) => (
          <CartStockCard key={index} productInfo={productInfo} setEditModalVisible={setEditModalVisible} setSelectedEditProduct={setSelectedEditProduct} cartDiscountsArray={cartDiscountsArray}/>
        ))}
      </View>
    </View>
  );
}

const getStyles = (theme) => StyleSheet.create({
  cartStocksSection: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginTop: 14,
    paddingHorizontal: 6,
  },
  cartStocksContainer: {
    borderTopWidth: 1,
    borderTopColor: theme.separator,
    width: '100%',
    alignItems: 'center',
    paddingVertical: 10,
    rowGap: 14,
  },
  cartButtonsContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    paddingHorizontal: 14,
  },
  addStockButton: {
    height: 40,
    backgroundColor: theme.primary,
    borderWidth: 1,
    borderColor: theme.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    flexDirection: 'row',
    columnGap: 8,
    paddingHorizontal: 10,
  },
  addStockButtonText: {
    fontSize: 15,
    color: theme.background,
    fontWeight: 'bold',
  },
  clearCartButton: {
    height: 40,
    borderWidth: 1,
    borderColor: theme.textAlt,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    flexDirection: 'row',
    columnGap: 8,
    paddingHorizontal: 10,
  },
  clearCartButtonText: {
    fontSize: 15,
    color: theme.textAlt,
    fontWeight: 'bold',
  },
});

export default CartStocks;