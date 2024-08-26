import { StyleSheet, Text, View, Modal, Pressable, useWindowDimensions, Keyboard, TouchableOpacity, TextInput } from 'react-native';
import React, { useState, useMemo } from 'react';

import { useTheme } from '../constants/colors';

import { useSelector, useDispatch } from 'react-redux';
import { setAmountOfProduct, addOneOfProduct, removeOneOfProduct, setPriceOfProduct, setDiscountOfProduct } from '../features/fastOrderCart/fastOrderCartSlice';

import FontAwesome from 'react-native-vector-icons/FontAwesome';

import { formattedCurrency } from '../utils/formatData';

import { useKeyboardVisible } from '../utils/useKeyboardCustomHook';

import { calculateDiscountedUnitPrice } from '../utils/calculateDiscounts';

const FastOrderProductEditCartModal = ({ modalVisible, setModalVisible, productInfo }) => {
  const theme = useTheme();
  const styles = useMemo(() => getStyles(theme), [theme]);

  const dispatch = useDispatch();

  const { StockName, StockCode, StockPrice, ActualStock, StockUnit } = productInfo;

  const windowWidth = useWindowDimensions().width;
  const windowHeight = useWindowDimensions().height;

  const isLandscape = windowWidth > windowHeight;

  const userData = useSelector((state) => state.userData.data);
  
  const userList = useSelector((state) => state.fastOrderCart.userList);
  

  const user = userList.find((user) => user.userEmail === userData.email);
  const productList = user ? user.productsList : [];
  const product = productList.find((product) => product.stockCode === StockCode);
  
  
  const productCartQuantity = product ? product.quantity : 0;
  const productDiscounts = product ? product.discounts : (userData['ratio-per-stock'] ? Array(userData.parameters['line-discount']).fill(userData['ratio-in-percent'] ? 0 : 1) : Array(userData.parameters['line-discount']).fill(userData['ratio-in-percent'] ? 0 : 1));
  const productCartPrice = product ? product.unitPrice : StockPrice;
  const productCartDiscountedPrice = product ? product.discountedPrice : StockPrice;
  
  const discountsInfo = productDiscounts.map((discount) => {
    const [discountValue, setDiscountValue] = useState(discount);
    return { discount: discountValue, setDiscount: setDiscountValue };
  });
  
  const [unitPriceState, setUnitPriceState] = useState(productCartPrice);
  const [stockPriceInputFocused, setStockPriceInputFocused] = useState(false);

  const handleStockPriceBlur = () => {
    const floatValue = parseFloat(unitPriceState);
    setUnitPriceState(isNaN(floatValue) ? '' : floatValue.toString());
  };

  const handleStockPriceInputChange = (value) => {
    if (value === '') {
      value = 0;
    } else if (value.length > 0 && value.startsWith('0')) {
      value = value.slice(1);
    }
    setUnitPriceState(value);
    dispatch(setPriceOfProduct({
      userEmail: userData.email,
      ratioInPercent: userData['ratio-in-percent'],
      stockCode: StockCode,
      unitPrice: parseFloat(value),
      discounts: discountsInfo.map((discountInfo) => discountInfo.discount),
    }));
  };

  const handleQuantityInputChange = (value) => {
    if (value === '') {
      value = 0;
    };
    dispatch(setAmountOfProduct({
      userEmail: userData.email,
      ratioInPercent: userData['ratio-in-percent'],
      stockName: StockName,
      stockCode: StockCode,
      stockPrice: StockPrice,
      unitPrice: parseFloat(unitPriceState),
      unitType: StockUnit,
      actualStock: ActualStock,
      quantity: parseInt(value),
      discounts: discountsInfo.map((discountInfo) => discountInfo.discount),
    }));
  };

  const handleRemoveProduct = () => {
    dispatch(removeOneOfProduct({
      userEmail: userData.email,
      stockCode: StockCode,
    }));
  };

  const handleAddProduct = () => {
    dispatch(addOneOfProduct({
      userEmail: userData.email,
      ratioInPercent: userData['ratio-in-percent'],
      stockName: StockName,
      stockCode: StockCode,
      stockPrice: StockPrice,
      unitPrice: parseFloat(unitPriceState),
      unitType: StockUnit,
      actualStock: ActualStock,
      discounts: discountsInfo.map((discountInfo) => parseFloat(discountInfo.discount)),
    }));
  };
  

  const handleDiscountChange = (value, index, ratioInPercent) => {
    if ((value.endsWith('.') && value.length > 1)) {
      discountsInfo[index].setDiscount(value);
      dispatch(setDiscountOfProduct({
        userEmail: userData.email,
        ratioInPercent: userData['ratio-in-percent'],
        stockCode: StockCode,
        discount: { discountIndex: index, discountValue: parseFloat(value) },
      }));
      return;
    }

    if (value === '') {
      discountsInfo[index].setDiscount(value);
      return;
    }
    
    let numericValue = parseFloat(value);

    if (isNaN(numericValue)) {
      discountsInfo[index].setDiscount('');
      dispatch(setDiscountOfProduct({
        userEmail: userData.email,
        ratioInPercent: userData['ratio-in-percent'],
        stockCode: StockCode,
        discount: { discountIndex: index, discountValue: 0 },
      }));
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
  
    discountsInfo[index].setDiscount(numericValue);
    dispatch(setDiscountOfProduct({
      userEmail: userData.email,
      ratioInPercent: userData['ratio-in-percent'],
      stockCode: StockCode,
      discount: { discountIndex: index, discountValue: numericValue },
    }));
  };
  

  const handleDiscountBlur = (value, index, ratioInPercent) => {
    if (value === '') {
      discountsInfo[index].setDiscount(productDiscounts[index]);
      dispatch(setDiscountOfProduct({
        userEmail: userData.email,
        ratioInPercent: userData['ratio-in-percent'],
        stockCode: StockCode,
        discount: { discountIndex: index, discountValue: productDiscounts[index] },
      }));
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

      discountsInfo[index].setDiscount(numericValue);
      dispatch(setDiscountOfProduct({
        userEmail: userData.email,
        ratioInPercent: userData['ratio-in-percent'],
        stockCode: StockCode,
        discount: { discountIndex: index, discountValue: numericValue },
      }));
    }
  };

  const handleResetUnitPrice = () => {
    setUnitPriceState(StockPrice);
    dispatch(setPriceOfProduct({
      userEmail: userData.email,
      ratioInPercent: userData['ratio-in-percent'],
      stockCode: StockCode,
      stockPrice: StockPrice,
      unitPrice: StockPrice,
      unitType: StockUnit,
      discounts: discountsInfo.map((discountInfo) => discountInfo.discount),
    }));
  };

  const handleResetDiscounts = () => {
    discountsInfo.forEach((discountInfo, index) => {
      discountInfo.setDiscount(userData['ratio-in-percent'] ? 0 : 1);
      dispatch(setDiscountOfProduct({
        userEmail: userData.email,
        ratioInPercent: userData['ratio-in-percent'],
        stockCode: StockCode,
        discount: { discountIndex: index, discountValue: 1 },
      }));
    });
  };

  const handleRemoveProductFromCart = () => {
    discountsInfo.forEach((discountInfo, index) => {
      discountInfo.setDiscount(userData['ratio-in-percent'] ? 0 : 1);
    });

    setUnitPriceState(StockPrice);

    dispatch(setAmountOfProduct({
      userEmail: userData.email,
      ratioInPercent: userData['ratio-in-percent'],
      stockName: StockName,
      stockCode: StockCode,
      stockPrice: StockPrice,
      unitPrice: StockPrice,
      unitType: StockUnit,
      actualStock: ActualStock,
      quantity: 0,
      discounts: discountsInfo.map((discountInfo) => discountInfo.discount),
    }));
  };

  const lineDiscountedUnitPrice = calculateDiscountedUnitPrice(parseFloat(unitPriceState), discountsInfo.map(info => info.discount), userData['ratio-in-percent']);

  const isKeyboardVisible = useKeyboardVisible();

  return (
    <Modal
      animationType="fade"
      transparent
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
        setStockPriceInputFocused(false);
        Keyboard.dismiss();
      }}
    >
      <Pressable style={[styles.overlay, { justifyContent: isKeyboardVisible ? 'flex-end' : 'center' }]} onPress={() => { setModalVisible(!modalVisible); Keyboard.dismiss(); setStockPriceInputFocused(false); }}>
        <Pressable
          style={[styles.modalContainer, { width: isLandscape ? windowWidth * 0.8 : windowWidth * 0.9, height: isLandscape ? windowHeight * 0.65 : windowHeight * 0.55 }]}
          android_disableSound
          onPress={() => Keyboard.dismiss()}
        >
          <View style={styles.modalHeader}>
            <Text style={styles.productName}>{StockName}</Text>
            <TouchableOpacity style={styles.closeButton} onPress={() => { setModalVisible(!modalVisible); Keyboard.dismiss(); setStockPriceInputFocused(false); }}>
              <FontAwesome name="times" size={24} color={theme.textAlt} />
            </TouchableOpacity>
          </View>
          <View style={styles.modalBody}>
            {!isLandscape ?
              <View style={styles.stockInfoContainer}>
                <View style={styles.stockInfoTextWrapper}>
                  <Text style={styles.stockInfoTitle}>Aktüel Stok</Text>
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={[styles.stockInfoValue, {color: ActualStock > 0 ? theme.text : theme.paleRed}]}>{ActualStock}</Text>
                    <Text style={[styles.stockInfoValue, {color: ActualStock > 0 ? theme.text : theme.paleRed}]}>{StockUnit}</Text>
                  </View>
                </View>
                <View style={styles.stockInfoTextWrapper}>
                  <Text style={styles.stockInfoTitle}>Stok Br. Fiyat</Text>
                  <Text style={styles.stockInfoValue}>₺{formattedCurrency(StockPrice)}</Text>
                </View>
                <View style={[styles.stockInfoTextWrapper, { paddingVertical: 2, paddingHorizontal: 5 }]}>
                  <Text style={styles.stockInfoTitle}>Birim Fiyat</Text>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <TouchableOpacity onPress={handleResetUnitPrice} style={{marginRight: 6}}>
                      <FontAwesome name="undo" size={20} color={theme.textAlt} />
                    </TouchableOpacity>
                    <TextInput
                      style={[styles.stockPriceInput, { color: unitPriceState == StockPrice ? theme.text : 'teal' }] }
                      value={stockPriceInputFocused ? unitPriceState.toString() : `₺${formattedCurrency(unitPriceState)}`}
                      onFocus={() => setStockPriceInputFocused(true)}
                      onBlur={() => { setStockPriceInputFocused(false); handleStockPriceBlur(); }}
                      onEndEditing={() => setStockPriceInputFocused(false)}
                      selectTextOnFocus
                      selectionColor={theme.textSelection}
                      onChangeText={handleStockPriceInputChange}
                      keyboardType='numeric'
                      autoCapitalize='none'
                      disableFullscreenUI
                    />
                  </View>
                </View>
                <View style={styles.stockInfoTextWrapper}>
                  <Text style={styles.stockInfoTitle}>İsk. Br. Fiyat</Text>
                  <Text style={[styles.stockInfoValue, {color: parseFloat(lineDiscountedUnitPrice) == parseFloat(unitPriceState) ? theme.text : 'darkorange'}]}>₺{formattedCurrency(lineDiscountedUnitPrice)}</Text>
                </View>
                <View style={styles.stockInfoTextWrapper}>
                  <Text style={styles.stockInfoTitle}>Toplam Fiyat</Text>
                  <Text style={styles.stockInfoValue}>₺{formattedCurrency(productCartDiscountedPrice * productCartQuantity)}</Text>
                </View>
              </View>
              :
              <View style={{width: '100%'}}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                  <View style={{width: '48%', height: 38, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Text style={styles.stockInfoTitle}>Aktüel Stok</Text>
                    <Text style={styles.stockInfoValue}>{ActualStock}</Text>
                  </View>
                  <View style={{width: 1, height: 35, backgroundColor: theme.textAlt}}/>
                  <View style={{width: '48%', height: 38, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Text style={styles.stockInfoTitle}>Stok Br. Fiyat</Text>
                    <Text style={styles.stockInfoValue}>₺{formattedCurrency(StockPrice)}</Text>
                  </View>
                </View>
                <View style={{width: '100%', height: 1, backgroundColor: theme.textAlt, marginTop: 4, marginBottom: 4}}/>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                  <View style={{width: '48%', height: 38, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Text style={styles.stockInfoTitle}>Birim Fiyat</Text>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <TouchableOpacity onPress={handleResetUnitPrice} style={{marginRight: 6}}>
                        <FontAwesome name="undo" size={20} color={theme.textAlt} />
                      </TouchableOpacity>
                      <TextInput
                        style={[styles.stockPriceInput, { marginRight: 0, color: unitPriceState == StockPrice ? theme.text : 'teal' }] }
                        value={stockPriceInputFocused ? unitPriceState.toString() : `₺${formattedCurrency(unitPriceState)}`}
                        onFocus={() => setStockPriceInputFocused(true)}
                        onBlur={() => { setStockPriceInputFocused(false); handleStockPriceBlur(); }}
                        onEndEditing={() => setStockPriceInputFocused(false)}
                        selectTextOnFocus
                        selectionColor={theme.textSelection}
                        onChangeText={handleStockPriceInputChange}
                        keyboardType='numeric'
                        autoCapitalize='none'
                        disableFullscreenUI
                      />
                    </View>
                  </View>
                  <View style={{width: 1, height: 35, backgroundColor: theme.textAlt}}/>
                  <View style={{width: '48%', height: 38, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Text style={styles.stockInfoTitle}>İsk. Br. Fiyat</Text>
                    <Text style={[styles.stockInfoValue, {color: parseFloat(lineDiscountedUnitPrice) == parseFloat(unitPriceState) ? theme.text : 'darkorange'}]}>₺{formattedCurrency(lineDiscountedUnitPrice)}</Text>
                  </View>
                </View>
                <View style={{width: '100%', height: 1, backgroundColor: theme.textAlt, marginTop: 4, marginBottom: 4}}/>
                <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                  <View style={{ width: '48%', height: 38, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Text style={styles.stockInfoTitle}>Toplam Fiyat</Text>
                    <Text style={styles.stockInfoValue}>₺{formattedCurrency(productCartDiscountedPrice * productCartQuantity)}</Text>
                  </View>
                  <View style={{width: 1, height: 35, backgroundColor: theme.textAlt, marginLeft: '2%'}}/>
                </View>
              </View>
            }
            <View style={[styles.modalActionsContainer, { flexDirection: isLandscape ? 'row' : 'column' }]}>
              {productDiscounts.length > 0 &&
                <View style={{ flex: 1, padding: isLandscape ? 0 : 20, rowGap: 10, justifyContent: isLandscape ? 'flex-end' : 'flex-start', alignItems: isLandscape ? 'flex-start' : 'center' }}>
                  <Text style={{ color: theme.text, fontSize: 18, fontWeight: 'bold', textDecorationLine: 'underline', alignSelf: 'flex-start' }}>İskonto:</Text>
                  <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }} >
                    <TouchableOpacity style={{ padding: 6, marginRight: 2 }} onPress={handleResetDiscounts}>
                      <FontAwesome name="undo" size={22} color={theme.textAlt} />
                    </TouchableOpacity>
                    {discountsInfo.map((discountInfo, index) => (
                      <View key={index} style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <TextInput
                          style={styles.discountInput}
                          value={discountInfo.discount.toString()}
                          onChangeText={(value) => handleDiscountChange(value, index)}
                          onBlur={() => handleDiscountBlur(discountsInfo[index].discount, index)}
                          selectTextOnFocus
                          selectionColor={theme.textSelection}
                          keyboardType='numeric'
                          autoCapitalize='none'
                          disableFullscreenUI
                        />
                        {index !== discountsInfo.length - 1 && <Text style={{ color: theme.text, fontSize: 35, fontWeight: '200' }}>/</Text>}
                      </View>
                    ))}
                  </View>
                </View>
              }
              <View style={styles.modalButtonsContainer}>
                <TouchableOpacity style={{ padding: 2 }} onPress={handleRemoveProductFromCart}>
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
                    selectTextOnFocus
                    selectionColor={theme.textSelection}
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
    fontSize: 18,
    fontWeight: 'bold',
  },
  stockInfoValue: {
    color: theme.text,
    fontSize: 16,
    marginLeft: 4,
  },
  stockPriceInput: {
    width: 130,
    textAlign: 'right',
    height: 36,
    padding: 0,
    marginRight: -5,
    paddingRight: 5,
    borderWidth: 1,
    borderColor: theme.textAlt,
    textDecorationLine: 'underline',
    borderRadius: 5,
    backgroundColor: theme.background,
    color: theme.text,
    fontSize: 16,
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
  modalActionsContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  modalButtonsContainer: {
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
    borderRadius: 5,
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
    backgroundColor: theme.background,
  }
});

export default FastOrderProductEditCartModal;