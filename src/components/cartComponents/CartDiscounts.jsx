import { StyleSheet, Text, View, TextInput } from 'react-native';
import React, { useMemo, useState } from 'react';

import { useTheme } from '../../constants/colors';

const CartDiscounts = () => {
  const theme = useTheme();
  const styles = useMemo(() => getStyles(theme), [theme]);


  const [discount1, setDiscount1] = useState(1);
  const [discount2, setDiscount2] = useState(1);
  const [discount3, setDiscount3] = useState(1);
  const [discount4, setDiscount4] = useState(1);

  const discountsInfo = [
    { discount: discount1, setDiscount: setDiscount1 },
    { discount: discount2, setDiscount: setDiscount2 },
    { discount: discount3, setDiscount: setDiscount3 },
    { discount: discount4, setDiscount: setDiscount4 },
  ];

  const handleDiscountChange = (value, index) => {
    if (value === '') {
      value = 0;
    };
    discountsInfo[index].setDiscount(parseFloat(value));
  };

  return (
    <View style={styles.discountSection}>
      <View style={styles.discountsContainer}>
        <Text style={styles.discountSectionTitle}>Oranlar:</Text>
        <View style={styles.discountInputsContainer}>
          {discountsInfo.map((discountInfo, index) => (
            <View key={index} style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
              <TextInput
                style={styles.discountInput}
                value={discountInfo.discount.toString()}
                onChangeText={(value) => handleDiscountChange(value, index)}
                selectTextOnFocus
                selectionColor={theme.textSelection}
                keyboardType='numeric'
                autoCapitalize='none'
                disableFullscreenUI
              />
              {index !== discountsInfo.length - 1 && <Text style={{ color: theme.text, fontSize: 35, fontWeight: '200' }}>/</Text>}
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