import { StyleSheet, Text, View, BackHandler, FlatList, useWindowDimensions, TextInput, ActivityIndicator } from 'react-native';
import React, { useEffect, useState, useMemo, useCallback, useRef } from 'react';
import { useTheme } from '../constants/colors';
import { useSelector } from 'react-redux';
import axios from 'axios';
import CustomHeader from '../components/CustomHeader';
import FastOrderProductCard from '../components/FastOrderProductCard';
import { FlashList } from '@shopify/flash-list';

import CustomBottomSheet from '../components/CustomBottomSheet';

const FastOrderScreen = ({ navigation, route }) => {
  const theme = useTheme();
  const styles = useMemo(() => getStyles(theme), [theme]);

  const windowWidth = useWindowDimensions().width;
  const windowHeight = useWindowDimensions().height;

  const userToken = useSelector((state) => state.userData.data.token);
  const baseRequestURL = useSelector((state) => state.baseRequestURL.value);

  const [productList, setProductList] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [pageNumber, setPageNumber] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const cartProducts = useSelector((state) => state.fastOrderCart.productList);

  useEffect(() => {
    getProductList();

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

  const getProductList = async () => {
    setIsLoading(true);
    const apiUrl = `${baseRequestURL}/DuyuII/Stock/GetList`;
    try {
      const response = await axios.post(apiUrl, {
        token: 'RasyoIoToken2021',
        user_token: userToken,
        pageNumber: pageNumber,
        pageSize: 10,
      });

      if (response.data && response.data.length > 0) {
        setProductList(prevProducts => [...prevProducts, ...response.data[2]]);
        setPageNumber(prevPageNumber => prevPageNumber + 1);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEndReached = () => {
    if (!isLoading) {
      getProductList();
    }
  };

  const renderProduct = useCallback(({ item, index }) => (
    <MemoizedProductCard
      product={item}
      index={index}
      theme={theme}
    />
  ), []);

  const MemoizedProductCard = React.memo(({ product, index, theme }) => (
    <FastOrderProductCard
      setSelectedProduct={setSelectedProduct}
      productName={product.StockName}
      productBarcode={product.StockBarcode}
      productStockCode={product.StockCode}
      productStockAmount={product.ActualStock}
      productStockAmountUnit={product.StockUnit}
      productStockPrice={product.StockPrice}
      dynamicColors={{
        backgroundColor: index % 2 === 0 ? theme.background : theme.backgroundAlt,
        accent: index % 2 === 0 ? theme.primary : theme.primaryAlt,
      }}
    />
  ));

  const bottomSheetRef = useRef(null);
  
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleOpenBottomSheet = () => {
    bottomSheetRef.current?.expand();
  };

  useEffect(() => {
    if (selectedProduct) {
      console.log(selectedProduct);
      handleOpenBottomSheet();
    }
  }, [selectedProduct]);


  return (
    <View style={styles.container}>
      <CustomHeader 
        title={route.params.title} 
        navigation={navigation} 
        rightButtonIcon={'cart'}
        rightButtonOnPress={() => navigation.navigate('FastOrderCart')}
      />
      <View style={styles.searchInputWrapper}>
        <TextInput
          style={styles.searchInput}
          placeholder="Stok Ara"
          placeholderTextColor={theme.textAlt}
          value={searchQuery}
          onChangeText={setSearchQuery}
          autoCapitalize='none'
        />
      </View>
      {productList.length !== 0 &&
        <FlashList
          data={productList}
          renderItem={renderProduct}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          onEndReached={handleEndReached}
          onEndReachedThreshold={0.1}
          ListFooterComponent={
            <View style={{ height: 50, justifyContent: 'center', alignItems: 'center', }} >
              <View style={{ height: 1, width: '100%', backgroundColor: theme.separator, position: 'absolute', top: 0 }} />
              <ActivityIndicator size="small" color={theme.primary} />
            </View>
          }
          estimatedItemSize={120}
        />
      }
      <CustomBottomSheet
        title={'Stok Detaylar'}
        ref={bottomSheetRef}
      />
    </View>
  );
};

const getStyles = (theme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
    paddingTop: theme.padding.header,
  },
  searchInputWrapper: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomColor: theme.textAlt,
    borderBottomWidth: 1,
  },
  searchInput: {
    height: 40,
    borderColor: theme.textAlt,
    borderWidth: 1,
    borderRadius: 3,
    paddingHorizontal: 10,
    backgroundColor: theme.backgroundAlt,
    width: '90%',
    color: theme.text,
    fontSize: 16,
  },
  text: {
    fontSize: 18,
    color: theme.text,
  },
});

export default FastOrderScreen;
