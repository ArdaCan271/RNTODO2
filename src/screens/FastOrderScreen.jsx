import { StyleSheet, Text, View, BackHandler, FlatList, useWindowDimensions, TextInput, ActivityIndicator } from 'react-native';
import React, { useEffect, useState, useMemo, useCallback, useRef } from 'react';
import { useTheme } from '../constants/colors';
import { useSelector } from 'react-redux';
import axios from 'axios';
import CustomHeader from '../components/CustomHeader';
import FastOrderProductCard from '../components/FastOrderProductCard';
import { FlashList } from '@shopify/flash-list';

import CustomBottomSheet from '../components/CustomBottomSheet';
import FastOrderProductEditCartModal from '../components/FastOrderProductEditCartModal';
import FastOrderCartSummary from '../components/FastOrderCartSummary';

const FastOrderScreen = ({ navigation, route }) => {
  const theme = useTheme();
  const styles = useMemo(() => getStyles(theme), [theme]);

  const userData = useSelector((state) => state.userData.data);

  const userToken = userData.token;
  const baseRequestURL = useSelector((state) => state.baseRequestURL.value);

  const [productList, setProductList] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [pageNumber, setPageNumber] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const [searchFilter, setSearchFilter] = useState('');

  const searchInputRef = useRef(null);

  useEffect(() => {
    if (productList.length === 0) {
      console.log('fetching product list');
      getProductList();
    }

    const backAction = () => {
      navigation.goBack();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    return () => backHandler.remove();
    //I added productList to the dependencies array to make the filtering search work
    //I forgot why I needed to do this but it definitely needs to be changed
    //it causes the app to send the post request twice
  }, [productList]);

  useEffect(() => {
    searchInputRef.current?.focus();
  }, [navigation]);

  const [infiniteLoaderHidden, setInfiniteLoaderHidden] = useState(true);

  const getProductList = async () => {
    setIsLoading(true);
    const apiUrl = `${baseRequestURL}/DuyuII/Stock/GetList`;

    try {
      const response = await axios.post(apiUrl, {
        token: 'RasyoIoToken2021',
        user_token: userToken,
        pageNumber: pageNumber,
        pageSize: 15,
        stockName: searchFilter,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      }
      );
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
      setSelectedEditProduct={setSelectedEditProduct}
      setEditModalVisible={setEditModalVisible}
      handleOpenBottomSheet={handleOpenBottomSheet}
      productInfo={product}
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
      setSearchFilter(searchQuery);
    }, 500);
    return () => clearTimeout(timeOutId);
  }, [searchQuery]);

  useEffect(() => {
    setPageNumber(1);
    setProductList([]);
  }, [searchFilter]);

  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedEditProduct, setSelectedEditProduct] = useState(null);

  const cartUserList = useSelector((state) => state.fastOrderCart.userList);
  const user = cartUserList.find((user) => user.userEmail === userData.email);
  const cartProductsList = user ? user.productsList : [];


  return (
    <View style={styles.container}>
      <CustomHeader 
        title={route.params.title} 
        navigation={navigation}
      />
      {editModalVisible && selectedEditProduct &&
        <FastOrderProductEditCartModal
          modalVisible={editModalVisible}
          setModalVisible={setEditModalVisible}
          productInfo={selectedEditProduct}
        />
      }
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
          keyExtractor={(item, index) => index}
          showsVerticalScrollIndicator={false}
          onEndReached={handleEndReached}
          onEndReachedThreshold={0.1}
          ListFooterComponent={!infiniteLoaderHidden && productList.length >= 15 &&
            <View style={{ height: 50, justifyContent: 'center', alignItems: 'center'}} >
              <ActivityIndicator size="small" color={theme.primary} />
            </View>
          }
          estimatedItemSize={120}
          keyboardShouldPersistTaps='handled'
        />
        :
        isLoading ?
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color={theme.primary} />
        </View>
        :
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={styles.text}>Sonuç bulunamadı.</Text>
        </View>
      }
      <FastOrderCartSummary
        cartProductsList={cartProductsList}
      />
      {selectedProduct &&
        <CustomBottomSheet
          ref={bottomSheetRef}
          stockCode={selectedProduct.StockCode}
          stockName={selectedProduct.StockName}
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
