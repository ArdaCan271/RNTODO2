import { StyleSheet, Text, View, TextInput } from 'react-native';
import React, { useMemo, useState } from 'react';

import { useTheme } from '../../constants/colors';

const CartDiscounts = ({ cartDiscountsInfo }) => {
  const theme = useTheme();
  const styles = useMemo(() => getStyles(theme), [theme]);

  const handleDiscountChange = (value, index, ratioInPercent) => {
    if ((value.endsWith('.') && value.length > 1)) {
      cartDiscountsInfo[index].setCartDiscount(value);
      return;
    }
    
    let numericValue = parseFloat(value);
    if (isNaN(numericValue)) {
      numericValue = ratioInPercent ? 0 : 1;
    }
    
    if (ratioInPercent) {
      // Clamp value between 0 and 1
      if (numericValue < 0) {
        numericValue = 0;
      } else if (numericValue > 1) {
        numericValue = 1;
      }
    } else {
      // Clamp value between 1 and 2
      if (numericValue < 1) {
        numericValue = 1;
      } else if (numericValue > 2) {
        numericValue = 2;
      }
    }
  
    cartDiscountsInfo[index].setCartDiscount(numericValue);
  };
  

  return (
    <View style={styles.discountSection}>
      <View style={styles.discountsContainer}>
        <Text style={styles.discountSectionTitle}>Oranlar:</Text>
        <View style={styles.discountInputsContainer}>
          {cartDiscountsInfo.map((discountInfo, index) => (
            <View key={index} style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
              <TextInput
                style={styles.discountInput}
                value={discountInfo.cartDiscount.toString()}
                onChangeText={(value) => handleDiscountChange(value, index)}
                selectTextOnFocus
                selectionColor={theme.textSelection}
                keyboardType='numeric'
                autoCapitalize='none'
                disableFullscreenUI
              />
              {index !== cartDiscountsInfo.length - 1 && <Text style={{ color: theme.text, fontSize: 35, fontWeight: '200' }}>/</Text>}
            </View>
          ))
          }
        </View>

      </View>
    </View>
  );
}

const getStyles = (theme) => StyleSheet.create({
  discountSection: {
    paddingHorizontal: 20,
    width: '100%',
    marginTop: 14,
  },
  discountsContainer: {
    width: '100%',
    justifyContent: 'flex-start',
    borderWidth: 1,
    borderColor: theme.primary,
    borderRadius: 5,
  },
  discountSectionTitle: {
    color: theme.primary,
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
    marginTop: 13,
  },
  discountInputsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 10,
    paddingBottom: 13,
    alignItems: 'center',
  },
  discountInput: {
    width: 50,
    height: 50,
    marginHorizontal: 5,
    textAlign: 'center',
    color: theme.text,
    fontSize: 18,
    padding: 0,
    backgroundColor: theme.backgroundAlt,
    borderWidth: 1,
    borderColor: theme.text,
    borderRadius: 5,
  },
});

export default CartDiscounts;