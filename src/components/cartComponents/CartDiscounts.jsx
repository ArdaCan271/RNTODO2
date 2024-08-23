import { StyleSheet, Text, View, TextInput } from 'react-native';
import React, { useMemo, useState } from 'react';

import { useTheme } from '../../constants/colors';

const CartDiscounts = ({ cartDiscounts, cartDiscountStates, ratioInPercent }) => {
  const theme = useTheme();
  const styles = useMemo(() => getStyles(theme), [theme]);

  const localDiscountStates = cartDiscounts.map((discount) => {
    const [localDiscountValue, setLocalDiscountValue] = useState(discount);
    return { localDiscount: localDiscountValue, setLocalDiscount: setLocalDiscountValue };
  });
  
  const handleDiscountChange = (value, index, ratioInPercent) => {
    if ((value.endsWith('.') && value.length > 1)) {
      localDiscountStates[index].setLocalDiscount(value);
      cartDiscountStates[index].setCartDiscount(parseFloat(value));
      return;
    }
    if (value === '') {
      localDiscountStates[index].setLocalDiscount(value);
      return;
    }

    let numericValue = parseFloat(value);

    if (isNaN(numericValue)) {
      localDiscountStates[index].setLocalDiscount(cartDiscounts[index]);
      cartDiscountStates[index].setCartDiscount(cartDiscounts[index]);
      return;
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
    localDiscountStates[index].setLocalDiscount(numericValue);
    cartDiscountStates[index].setCartDiscount(parseFloat(numericValue));
  };

  const handleDiscountBlur = (value, index, ratioInPercent) => {
    if (value === '') {
      localDiscountStates[index].setLocalDiscount(cartDiscounts[index]);
      cartDiscountStates[index].setCartDiscount(cartDiscounts[index]);
      return;
    }
    if (typeof value === 'string' && value.endsWith('.')) {
      let numericValue = parseFloat(value);

      if (ratioInPercent) {
        if (numericValue < 0) {
          numericValue = 0;
        } else if (numericValue > 1) {
          numericValue = 1;
        }
      } else {
        if (numericValue < 1) {
          numericValue = 1;
        } else if (numericValue > 2) {
          numericValue = 2;
        }
      }
      localDiscountStates[index].setLocalDiscount(numericValue);
      cartDiscountStates[index].setCartDiscount(parseFloat(numericValue));
    }
  };

  return (
    <View style={styles.discountSection}>
      <View style={styles.discountsContainer}>
        <Text style={styles.discountSectionTitle}>Oranlar:</Text>
        <View style={styles.discountInputsContainer}>
          {localDiscountStates.map((discountInfo, index) => (
            <View key={index} style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
              <TextInput
                style={styles.discountInput}
                value={discountInfo.localDiscount.toString()}
                onChangeText={(value) => handleDiscountChange(value, index, false)}
                onBlur={() => handleDiscountBlur(localDiscountStates[index].localDiscount, index, ratioInPercent)}
                selectTextOnFocus
                selectionColor={theme.textSelection}
                keyboardType='numeric'
                autoCapitalize='none'
                disableFullscreenUI
              />
              {index !== localDiscountStates.length - 1 && <Text style={{ color: theme.text, fontSize: 35, fontWeight: '200' }}>/</Text>}
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
    width: 44,
    height: 44,
    marginHorizontal: 5,
    textAlign: 'center',
    color: theme.text,
    fontSize: 18,
    padding: 0,
    backgroundColor: theme.background,
    borderWidth: 1,
    borderColor: theme.text,
    borderRadius: 5,
  },
});

export default CartDiscounts;