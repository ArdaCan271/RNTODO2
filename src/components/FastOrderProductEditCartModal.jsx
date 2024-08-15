import { StyleSheet, Text, View, Modal, Pressable, useWindowDimensions, Keyboard, TouchableOpacity, TextInput, KeyboardAvoidingView } from 'react-native';
import React, { useState, useMemo } from 'react';

import { useTheme } from '../constants/colors';

import { useSelector, useDispatch } from 'react-redux';
import { setAmountOfProduct, addOneOfProduct, removeOneOfProduct, setPriceOfProduct, clearCart } from '../features/fastOrderCart/fastOrderCartSlice';

import FontAwesome from 'react-native-vector-icons/FontAwesome';

import { formattedCurrency } from '../utils/formatData';

const FastOrderProductEditCartModal = ({ modalVisible, setModalVisible, productInfo }) => {
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

  const dispatch = useDispatch();

  const windowWidth = useWindowDimensions().width;
  const windowHeight = useWindowDimensions().height;

  const isLandscape = windowWidth > windowHeight;

  const userData = useSelector((state) => state.userData.data);

  const userList = useSelector((state) => state.fastOrderCart.userList);
  const user = userList.find((user) => user.userEmail === userData.email);
  const productList = user ? user.productsList : [];
  const product = productList.find((product) => product.stockCode === productInfo.StockCode);
  const productCartQuantity = product ? product.quantity : 0;
  

  const productCartPrice = product ? product.stockPrice : productInfo.StockPrice;

  const [stockPriceState, setStockPriceState] = useState(productCartPrice);

  const [stockPriceInputFocused, setStockPriceInputFocused] = useState(false);

  const handleStockPriceInputChange = (value) => {
    // Update the state as a string to preserve the decimal point
    setStockPriceState(value);
    dispatch(setPriceOfProduct({ userEmail: userData.email, stockCode: productInfo.StockCode, stockPrice: parseFloat(value) }));
  };

  const handleStockPriceBlur = () => {
    // Convert the value to a float when the input loses focus
    const floatValue = parseFloat(stockPriceState);
    setStockPriceState(isNaN(floatValue) ? '' : floatValue.toString());
  };


  const handleQuantityInputChange = (value) => {
    if (value === '') {
      value = 0;
    };
    dispatch(setAmountOfProduct({ userEmail: userData.email, stockCode: productInfo.StockCode, stockPrice: parseFloat(stockPriceState), quantity: parseInt(value) }));
  };

  const handleRemoveProduct = () => {
    dispatch(removeOneOfProduct({ userEmail: userData.email, stockCode: productInfo.StockCode, stockPrice: parseFloat(stockPriceState) }));
  };

  const handleAddProduct = () => {
    dispatch(addOneOfProduct({ userEmail: userData.email, stockCode: productInfo.StockCode, stockPrice: parseFloat(stockPriceState) }));
  };



  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
        setStockPriceInputFocused(false);
      }}
    >
      <Pressable style={styles.overlay} onPress={() => { setModalVisible(!modalVisible); Keyboard.dismiss(); setStockPriceInputFocused(false); }}>
        <Pressable
          style={[styles.modalContainer, { width: isLandscape ? windowWidth * 0.7 : windowWidth * 0.9, height: isLandscape ? windowHeight * 0.6 : windowHeight * 0.5 }]}
          android_disableSound
          onPress={() => Keyboard.dismiss()}
        >
            <View style={styles.modalHeader}>
              <Text style={styles.productName}>{productInfo.StockName}</Text>
              <TouchableOpacity style={styles.closeButton} onPress={() => { setModalVisible(!modalVisible); Keyboard.dismiss(); setStockPriceInputFocused(false); }}>
                <FontAwesome name="times" size={24} color={theme.textAlt} />
              </TouchableOpacity>
            </View>
            <View style={styles.modalBody}>
              <View style={styles.stockInfoContainer}>
                <View style={styles.stockInfoTextWrapper}>
                  <Text style={styles.stockInfoTitle}>Aktüel Stok</Text>
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.stockInfoValue}>{productInfo.ActualStock}</Text>
                    <Text style={styles.stockInfoValue}>{productInfo.StockUnit}</Text>
                  </View>
                </View>
                <View style={styles.stockInfoTextWrapper}>
                  <Text style={styles.stockInfoTitle}>Stok Birim Fiyat</Text>
                  <Text style={styles.stockInfoValue}>₺{formattedCurrency(productInfo.StockPrice)}</Text>
                </View>
                <View style={[styles.stockInfoTextWrapper, { paddingVertical: 2, paddingHorizontal: 5 }]}>
                  <Text style={styles.stockInfoTitle}>Birim Fiyat</Text>
                  <TextInput
                    style={styles.stockPriceInput}
                    value={stockPriceInputFocused ? stockPriceState.toString() : `₺${formattedCurrency(stockPriceState)}`}
                    onFocus={() => setStockPriceInputFocused(true)}
                    onBlur={() => { setStockPriceInputFocused(false); handleStockPriceBlur(); }}
                    onEndEditing={() => setStockPriceInputFocused(false)}
                    onChangeText={handleStockPriceInputChange}
                    keyboardType='numeric'
                    autoCapitalize='none'
                    disableFullscreenUI
                  />
                </View>
                <View style={styles.stockInfoTextWrapper}>
                  <Text style={styles.stockInfoTitle}>Toplam Fiyat</Text>
                  <Text style={styles.stockInfoValue}>₺{formattedCurrency(stockPriceState * productCartQuantity)}</Text>
                </View>
              </View>
              {!isLandscape &&
                <View style={{ height: 60, width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 20, }} >
                  {discountsInfo.map((discountInfo, index) => (
                    <View key={index} style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                      <TextInput
                        style={styles.discountInput}
                        value={discountInfo.discount.toString()}
                        onChangeText={(value) => handleDiscountChange(value, index)}
                        keyboardType='numeric'
                        autoCapitalize='none'
                        disableFullscreenUI
                      />
                      {index !== discountsInfo.length - 1 && <Text style={{ color: theme.text, fontSize: 35, fontWeight: '200' }}>/</Text>}
                    </View>
                  ))
                  }
                </View>
              }
              <View style={styles.modalActionsContainer}>
                {isLandscape &&
                  <View style={{ height: 60, width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }} >
                    {discountsInfo.map((discountInfo, index) => (
                      <View key={index} style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <TextInput
                          style={styles.discountInput}
                          value={discountInfo.discount.toString()}
                          onChangeText={(value) => handleDiscountChange(value, index)}
                          keyboardType='numeric'
                          autoCapitalize='none'
                          disableFullscreenUI
                        />
                        {index !== discountsInfo.length - 1 && <Text style={{ color: theme.text, fontSize: 35, fontWeight: '200' }}>/</Text>}
                      </View>
                    ))
                    }
                  </View>
                }
                <View style={styles.modalButtonsContainer}>
                  <TouchableOpacity style={{ padding: 2 }} onPress={() => handleQuantityInputChange(0)}>
                    <FontAwesome name="trash-o" size={26} color={theme.textAlt} />
                  </TouchableOpacity>
                  <View style={styles.cartModifyComponentContainer}>
                    <TouchableOpacity style={styles.cartModifyButton} onPress={handleRemoveProduct}>
                      <FontAwesome name="minus" size={24} color={theme.white} />
                    </TouchableOpacity>
                    <TextInput
                      style={styles.cartTextInput}
                      onChangeText={handleQuantityInputChange}
                      value={productCartQuantity.toString()}
                      keyboardType="numeric"
                      autoCapitalize='none'
                      disableFullscreenUI
                    />
                    <TouchableOpacity style={styles.cartModifyButton} onPress={handleAddProduct}>
                      <FontAwesome name="plus" size={24} color={theme.white} />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const getStyles = (theme) => StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: theme.background,
    borderRadius: 10,
    padding: 10,
    elevation: 5,
    shadowColor: 'black',
  },
  modalHeader: {
    flex: 0.5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  productName: {
    color: theme.primary,
    fontSize: 16,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  closeButton: {
    borderRadius: 5,
    padding: 1,
  },
  modalBody: {
    flex: 4,
  },
  stockInfoContainer: {
    justifyContent: 'flex-start',
  },
  stockInfoTextWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: theme.separator,
    padding: 5,
  },
  stockInfoTitle: {
    color: theme.text,
    fontSize: 16,
    fontWeight: 'bold',
  },
  stockInfoValue: {
    color: theme.text,
    fontSize: 14,
    marginLeft: 4,
  },
  stockPriceInput: {
    width: 110,
    textAlign: 'right',
    height: 28,
    padding: 0,
    marginRight: -5,
    paddingRight: 5,
    borderWidth: 1,
    borderColor: theme.textAlt,
    borderRadius: 5,
    backgroundColor: theme.backgroundAlt,
    color: theme.text,
    fontSize: 14,
  },
  discountInput: {
    width: 40,
    height: 40,
    marginHorizontal: 5,
    textAlign: 'center',
    color: theme.text,
    fontSize: 16,
    padding: 0,
    backgroundColor: theme.backgroundAlt,
    borderWidth: 1,
    borderColor: theme.text,
    borderRadius: 5,
  },
  modalActionsContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: 20,
  },
  modalButtonsContainer: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    alignSelf: 'flex-end',
    columnGap: 10,
  },
  cartModifyComponentContainer: {
    flexDirection: 'row',
    height: 45,
    width: 135,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.text,
    borderRadius: 10,
    overflow: 'hidden',
  },
  cartModifyButton: {
    flex: 1,
    height: '100%',
    backgroundColor: theme.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartTextInput: {
    flex: 1,
    height: '100%',
    textAlign: 'center',
    color: theme.text,
    fontSize: 16,
    padding: 0,
    backgroundColor: theme.backgroundAlt,
  }
});

export default FastOrderProductEditCartModal;