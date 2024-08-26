import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useTheme } from '../../constants/colors';
import { formattedCurrency } from '../../utils/formatData';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { calculateDiscountedUnitPrice } from '../../utils/calculateDiscounts';

const getTotalPrice = (products) => {
  return products.reduce((total, product) => total + (product.discountedPrice * product.quantity), 0);
};

const getTotalQuantity = (products) => {
  return products.reduce((total, product) => total + product.quantity, 0);
};

const getTotalDifferentProducts = (products) => {
  return products.length;
};

const CartSummary = ({ cartProductsList, cartDiscounts, userData }) => {
  const theme = useTheme();
  const styles = useMemo(() => getStyles(theme), [theme]);

  const totalPrice = getTotalPrice(cartProductsList);
  const totalQuantity = getTotalQuantity(cartProductsList);
  const totalDifferentProducts = getTotalDifferentProducts(cartProductsList);

  const [isExpanded, setIsExpanded] = useState(false);

  const animatedStyle = useAnimatedStyle(() => {
    const animatedHeight = isExpanded ? withTiming(100) : withTiming(0);
    return {
      height: animatedHeight,
    };
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.summaryBody, animatedStyle, { borderBottomWidth: isExpanded ? 1 : 0 }]}>
        <View style={styles.cartInfoWrapper}>
          <Text style={styles.cartInfoTitle}>Sepet Toplam Fiyat</Text>
          <Text style={styles.cartInfoValue}>₺{formattedCurrency(calculateDiscountedUnitPrice(totalPrice, cartDiscounts, userData['ratio-in-percent']))}</Text>
        </View>
        <View style={styles.separator} />
        <View style={styles.cartInfoWrapper}>
          <Text style={styles.cartInfoTitle}>Toplam Ürün Miktarı</Text>
          <Text style={styles.cartInfoValue}>{totalQuantity}</Text>
        </View>
        <View style={styles.separator} />
        <View style={styles.cartInfoWrapper}>
          <Text style={styles.cartInfoTitle}>Ürün Çeşidi</Text>
          <Text style={styles.cartInfoValue}>{totalDifferentProducts}</Text>
        </View>
      </Animated.View>
      <Pressable onPress={() => setIsExpanded(!isExpanded)} style={styles.summaryFooter}>
        <View style={{flexDirection: 'row'}}>
          <View style={styles.summaryExpandButton}>
            <FontAwesome name={isExpanded ? 'chevron-up' : 'chevron-down'} size={20} color={theme.primary} />
          </View>
          <View>
            <Text style={styles.summaryTitle}>Sepet Son Toplam</Text>
            <Text style={styles.summaryValue}>₺{formattedCurrency(calculateDiscountedUnitPrice(totalPrice, cartDiscounts, userData['ratio-in-percent']))}</Text>
          </View>
        </View>
        <Pressable style={styles.goToCartButton}>
          <Text style={styles.goToCartTitle}>Sepeti Kaydet</Text>
        </Pressable>
      </Pressable>
    </View>
  );
};

const getStyles = (theme) => StyleSheet.create({
  container: {
    height: 60,
    width: '100%',
    justifyContent: 'flex-end',
  },
  summaryBody: {
    width: '100%',
    backgroundColor: theme.background,
    borderColor: theme.separator,
    borderTopWidth: 1,
  },
  summaryFooter: {
    height: 60,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: theme.separator,
    backgroundColor: theme.background,
    paddingRight: 10,
    elevation: 5,
  },
  summaryExpandButton: {
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  summaryTitle: {
    fontSize: 18,
    color: theme.text,
  },
  summaryValue: {
    fontSize: 19,
    color: theme.text,
    fontWeight: 'bold',
  },
  goToCartButton: {
    height: 50,
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.primary,
    borderRadius: 5,
  },
  goToCartTitle: {
    fontSize: 18,
    color: theme.background,
    fontWeight: 'bold',
  },
  cartInfoWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  cartInfoTitle: {
    fontSize: 16,
    color: theme.text,
    fontWeight: 'bold',
  },
  cartInfoValue: {
    fontSize: 16,
    color: theme.text,
  },
  separator: {
    height: 1,
    width: '100%',
    backgroundColor: theme.separator,
  },
});

export default CartSummary;
