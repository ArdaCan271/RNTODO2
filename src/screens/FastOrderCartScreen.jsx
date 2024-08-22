import { StyleSheet, Text, View, BackHandler, TextInput, ScrollView } from 'react-native';
import React, { useEffect, useMemo, useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { useTheme } from '../constants/colors';

import CustomHeader from '../components/CustomHeader';

import CariSelection from '../components/cartComponents/CariSelection';
import CariDescription from '../components/cartComponents/CariDescription';
import VadeSelection from '../components/cartComponents/VadeSelection';
import DeliveryDateSelection from '../components/cartComponents/DeliveryDateSelection';
import CartDiscounts from '../components/cartComponents/CartDiscounts';
import CartStocks from '../components/cartComponents/CartStocks';
import CartSummary from '../components/cartComponents/CartSummary';

const FastOrderCartScreen = ({ navigation, route }) => {
  const theme = useTheme();
  const styles = useMemo(() => getStyles(theme), [theme]);

  const userData = useSelector((state) => state.userData.data);
  const userList = useSelector((state) => state.fastOrderCart.userList);
  const user = userList.find((user) => user.userEmail === userData.email);
  const productList = user ? user.productsList : [];

  useEffect(() => {
    const backAction = () => {
      navigation.goBack();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    return () => backHandler.remove();
  }, [navigation]);

  const [description, setDescription] = useState('');

  const cartDiscounts = [1, 1, 1, 1];

  const cartDiscountsInfo = cartDiscounts.map((discount) => {
    const [discountValue, setDiscountValue] = useState(discount);
    return { cartDiscount: discountValue, setCartDiscount: setDiscountValue };
  });

  return (
    <View style={styles.container}>
      <CustomHeader navigation={navigation} title='Hızlı Sipariş Sepet' />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 50 }}
      >
        <CariSelection navigation={navigation} />
        <CariDescription description={description} setDescription={setDescription} />
        <VadeSelection />
        <DeliveryDateSelection />
        <CartDiscounts cartDiscountsInfo={cartDiscountsInfo} />
        <CartStocks navigation={navigation} productList={productList}/>
      </ScrollView>
      <CartSummary cartProductsList={productList} />
    </View>
  );
}

const getStyles = (theme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
    paddingTop: theme.padding.header,
  },
});


export default FastOrderCartScreen;