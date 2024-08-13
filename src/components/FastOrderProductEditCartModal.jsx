import { StyleSheet, Text, View, Modal, Pressable, useWindowDimensions, Keyboard, TouchableOpacity, TextInput, KeyboardAvoidingView } from 'react-native';
import React, { useState, useMemo } from 'react';

import { useTheme } from '../constants/colors';

import { useSelector, useDispatch } from 'react-redux';
import { setAmountOfProduct, addOneOfProduct, removeOneOfProduct } from '../features/fastOrderCart/fastOrderCartSlice';

import FontAwesome from 'react-native-vector-icons/FontAwesome';

import { formattedCurrency } from '../utils/formatData';

const FastOrderProductEditCartModal = ({ modalVisible, setModalVisible, productInfo }) => {
  const theme = useTheme();
  const styles = useMemo(() => getStyles(theme), [theme]);

  const dispatch = useDispatch();

  const windowWidth = useWindowDimensions().width;
  const windowHeight = useWindowDimensions().height;

  const productList = useSelector((state) => state.fastOrderCart.productList);
  const product = productList.find((product) => product.stockCode === productInfo.StockCode);
  const productCartQuantity = product ? product.quantity : 0;

  const productCartPrice = product ? product.stockPrice : productInfo.StockPrice;

  const [stockPriceState, setStockPriceState] = useState(productCartPrice);

  const [stockPriceInputFocused, setStockPriceInputFocused] = useState(false);

  const handleStockPriceInputChange = (value) => {
    // Update the state as a string to preserve the decimal point
    setStockPriceState(value);
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
    dispatch(setAmountOfProduct({ stockCode: productInfo.StockCode, stockPrice: stockPriceState, quantity: parseInt(value) }));
  };

  const handleRemoveProduct = () => {
    dispatch(removeOneOfProduct({ stockCode: productInfo.StockCode, stockPrice: stockPriceState }));
  };

  const handleAddProduct = () => {
    dispatch(addOneOfProduct({ stockCode: productInfo.StockCode, stockPrice: stockPriceState }));
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
          <Text style={styles.modalTitle}>Ürün Ekle</Text>
        <Pressable 
          style={[styles.modalContainer, { width: windowWidth > windowHeight ? windowWidth * 0.5 : windowWidth * 0.9, height: windowWidth > windowHeight ? windowHeight * 0.55 : windowHeight * 0.4 }]}
          android_disableSound
          onPress={() => Keyboard.dismiss()}
        >
          <View style={styles.modalHeader}>
            <Text style={styles.productName}>{productInfo.StockName}</Text>
            <TouchableOpacity style={styles.closeButton} onPress={() => {setModalVisible(!modalVisible); Keyboard.dismiss(); setStockPriceInputFocused(false); }}>
              <FontAwesome name="times" size={24} color={theme.textAlt} />
            </TouchableOpacity>
          </View>
          <View style={styles.modalBody}>
            <View style={styles.stockInfoContainer}>
              <View style={styles.stockInfoTextWrapper}>
                <Text style={styles.stockInfoTitle}>Aktüel Stok</Text>
                <View style={{flexDirection: 'row'}}>
                  <Text style={styles.stockInfoValue}>{productInfo.ActualStock}</Text>
                  <Text style={styles.stockInfoValue}>{productInfo.StockUnit}</Text>
                </View>
              </View>
              <View style={styles.stockInfoTextWrapper}>
                <Text style={styles.stockInfoTitle}>Stok Birim Fiyat</Text>
                <Text style={styles.stockInfoValue}>₺{formattedCurrency(productInfo.StockPrice)}</Text>
              </View>
              <View style={styles.stockInfoTextWrapper}>
                <Text style={styles.stockInfoTitle}>Birim Fiyat</Text>
                <TextInput
                  style={[styles.stockPriceInput, {color: stockPriceState === productInfo.StockPrice ? theme.text : theme.primary}] }
                  value={stockPriceInputFocused ? stockPriceState.toString() : `₺${formattedCurrency(stockPriceState)}`}
                  onFocus={() => setStockPriceInputFocused(true)}
                  onBlur={() => {setStockPriceInputFocused(false); handleStockPriceBlur();}}
                  onEndEditing={() => setStockPriceInputFocused(false)}
                  onChangeText={handleStockPriceInputChange}
                  keyboardType='numeric'
                />
              </View>
              <View style={styles.stockInfoTextWrapper}>
                <Text style={styles.stockInfoTitle}>Toplam Fiyat</Text>
                <Text style={styles.stockInfoValue}>₺{formattedCurrency(stockPriceState * productCartQuantity)}</Text>
              </View>
            </View>
            <View style={styles.modalActionsContainer}>
              <View style={styles.ratesContainer}>
                <Text style={{position: 'absolute', top: 0, left: 0, color: theme.text, fontSize: 14, fontWeight: 'bold'}}>Oranlar:</Text>
                <View>
                  <View>
                    <Text style={{color: theme.text}}>Oran 1</Text>
                  </View>
                  <View>
                    <Text style={{color: theme.text}}>Oran 2</Text>
                  </View>
                </View>
                <View>
                  <View>
                    <Text style={{color: theme.text}}>Oran 3</Text>
                  </View>
                  <View>
                    <Text style={{color: theme.text}}>Oran 4</Text>
                  </View>
                </View>
              </View>
              <KeyboardAvoidingView style={styles.modalButtonsContainer}>
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
                  />
                  <TouchableOpacity style={styles.cartModifyButton} onPress={handleAddProduct}>
                    <FontAwesome name="plus" size={24} color={theme.white} />
                  </TouchableOpacity>
                </View>
              </KeyboardAvoidingView>
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
  modalTitle: {
    color: theme.white,
    fontSize: 20,
    marginBottom: 10,
    fontWeight: 'bold',
    textShadowColor: 'black',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 1,
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
    fontSize: 18,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  closeButton: {
    borderRadius: 5,
    padding: 1,
  },
  modalBody: {
    flex: 4,
    flexDirection: 'row',
  },
  stockInfoContainer: {
    flex: 1.5,
    justifyContent: 'space-evenly',
  },
  stockInfoTextWrapper: {
  },
  stockInfoTitle: {
    color: theme.text,
    fontSize: 15,
    fontWeight: 'bold',
  },
  stockInfoValue: {
    color: theme.text,
    fontSize: 13,
    marginLeft: 4,
  },
  stockPriceInput: {
    height: 16,
    width: 100,
    borderColor: theme.textAlt,
    borderBottomWidth: 1,
    padding: 0,
    backgroundColor: theme.background,
    color: theme.text,
    fontSize: 13,
    marginLeft: 4,
  },
  modalActionsContainer: {
    flex: 3,
  },
  ratesContainer: {
    flex: 2.5,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  modalButtonsContainer: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
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
  }
});

export default FastOrderProductEditCartModal;