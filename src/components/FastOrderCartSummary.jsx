import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Pressable } from 'react-native';

import { useTheme } from '../constants/colors';

import { formattedCurrency } from '../utils/formatData';

import FontAwesome from 'react-native-vector-icons/FontAwesome';

import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';

const getTotalPrice = (products) => {
  return products.reduce((total, product) => total + (product.stockPrice * product.quantity), 0);
};

const FastOrderCartSummary = ({ cartProductsList }) => {
  const theme = useTheme();
  const styles = useMemo(() => getStyles(theme), [theme]);

  const totalPrice = getTotalPrice(cartProductsList);

  const [isExpanded, setIsExpanded] = useState(false);

  const animatedStyle = useAnimatedStyle(() => {
    const animatedHeight = isExpanded ? withTiming(100) : withTiming(0);
    return {
      height: animatedHeight,
    };
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.summaryBody, animatedStyle, {borderBottomWidth: isExpanded ? 1 : 0, borderTopWidth: isExpanded ? 1 : 0}]}>
        <View>

        </View>
      </Animated.View>
      <View style={[styles.summaryFooter, {borderTopWidth: isExpanded ? 0 : 1}]}>
        <Pressable
          style={styles.summaryExpandButton}
          onPress={() => setIsExpanded(!isExpanded)}
        >
          <FontAwesome name={isExpanded ? 'chevron-up' : 'chevron-down'} size={20} color={theme.primary} />
        </Pressable>
        <View>
          <Text style={styles.summaryTitle}>Toplam Sepet Fiyatı</Text>
          <Text style={styles.summaryValue}>₺{formattedCurrency(totalPrice)}</Text>
        </View>
      </View>
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
    borderColor: theme.textAlt,
  },
  summaryFooter: {
    height: 60,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderColor: theme.textAlt,
    backgroundColor: theme.background,
  },
  summaryExpandButton: {
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  summaryTitle: {
    fontSize: 16,
    color: theme.text,
  },
  summaryValue: {
    fontSize: 17,
    color: theme.text,
    fontWeight: 'bold',
  },
});

export default FastOrderCartSummary;
