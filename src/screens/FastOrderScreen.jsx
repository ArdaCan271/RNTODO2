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

  const userToken = useSelector((state) => state.userData.data.token);
  const baseRequestURL = useSelector((state) => state.baseRequestURL.value);

  const [productList, setProductList] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [pageNumber, setPageNumber] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const [searchFilter, setSearchFilter] = useState('');

  const searchTimeout = useRef(null);
  const searchInputRef = useRef(null);



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
  }, []);

  useEffect(() => {
    searchInputRef.current?.focus();
  }, [navigation]);

  const [infiniteLoaderHidden, setInfiniteLoaderHidden] = useState(true);

  const getProductList = async () => {
    setIsLoading(true);
    const apiUrl = `${baseRequestURL}/DuyuII/Stock/GetList`;

    console.log('sending request with page number: ', pageNumber);
    console.log('search filter: ', searchFilter);
    
    
    try {
      const response = await axios.post(apiUrl, {
        token: 'RasyoIoToken2021',
        user_token: userToken,
        pageNumber: pageNumber,
        pageSize: 15,
        stockName: searchFilter,
      });

      if (response.data && response.data.length > 0 && response.data[2] && response.data[2].length > 0) {
        setProductList(prevProducts => [...prevProducts, ...response.data[2]]);
        setPageNumber(prevPageNumber => prevPageNumber + 1);
        setInfiniteLoaderHidden(false);
      } else if (response.data && response.data.length > 0 && !response.data[2]) {
        setInfiniteLoaderHidden(true);
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
      handleOpenBottomSheet={handleOpenBottomSheet}
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
    const timeOutId = setTimeout(() => {
      setPageNumber(1);
      setSearchFilter(searchQuery);
      setProductList([]);
    }, 500);
    return () => clearTimeout(timeOutId);
  }, [searchQuery]);

  useEffect(() => {
    if (searchFilter !== '' && pageNumber === 1) {
      getProductList();
    }
  }, [searchFilter]);


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
          ref={searchInputRef}
          placeholder="Stok Ara"
          placeholderTextColor={theme.textAlt}
          value={searchQuery}
          onChangeText={setSearchQuery}
          autoCapitalize='none'
        />
      </View>
      {productList.length !== 0 ?
        <FlashList
          data={productList}
          renderItem={renderProduct}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          onEndReached={handleEndReached}
          onEndReachedThreshold={0.1}
          ListFooterComponent={!infiniteLoaderHidden && productList.length >= 15 &&
            <View style={{ height: 50, justifyContent: 'center', alignItems: 'center'}} >
              <ActivityIndicator size="small" color={theme.primary} />
            </View>
          }
          estimatedItemSize={120}
        />
        :
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <ActivityIndicator size="large" color={theme.primary} />
        </View>
      }
      {selectedProduct &&
        <CustomBottomSheet
          title={'Stok Detaylar'}
          ref={bottomSheetRef}
          stockCode={selectedProduct}
          navigation={navigation}
        />
      }
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
