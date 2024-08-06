import { StyleSheet, Text, View, BackHandler, FlatList, useWindowDimensions, TextInput, ActivityIndicator } from 'react-native';
import React, { useEffect, useState, useMemo } from 'react';
import { useTheme } from '../constants/colors';

import { useSelector } from 'react-redux';

import axios from 'axios';

import CustomHeader from '../components/CustomHeader';

import FastOrderProductCard from '../components/FastOrderProductCard';

import { fetchProducts } from '../api/products';

const FastOrderScreen = ({ navigation, route }) => {
  const theme = useTheme();
  const styles = useMemo(() => getStyles(theme), [theme]);

  const windowWidth = useWindowDimensions().width;
  const windowHeight = useWindowDimensions().height;

  const userToken = useSelector((state) => state.userData.data.token);
  const baseRequestURL = useSelector((state) => state.baseRequestURL.value);

  const [productList, setProductList] = useState([]);
  const [filteredProductList, setFilteredProductList] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  const cartProductList = useSelector((state) => state.fastOrderCart.productList);

  useEffect(() => {
    console.log('button pressed, cartProductList:', cartProductList);
  }, [cartProductList]);
    
  
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
    const apiUrl = `${baseRequestURL}/GetWarehousesStocks`;
    try {
      const response = await axios.post(apiUrl, {
        token: 'RasyoIoToken2021',
        user_token: userToken,
      });
      setProductList(response.data);
      setFilteredProductList(response.data); // Initialize the filtered list
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const renderProduct = ({ product, index }) => (
    <FastOrderProductCard
      productName={product.StokAdi}
      productBarcode={product.StokBarkod1}
      productStockCode={product.StokKodu}
      productStockAmount={0}
      productStockPrice={product.StokFiyat}
      dynamicColors={{
        backgroundColor: index % 2 === 0 ? theme.background : theme.backgroundAlt,
        accent: index % 2 === 0 ? theme.primary : theme.primaryAlt,
      }}
    />
  );  

  return (
    <View style={styles.container}>
      <CustomHeader title={route.params.title} navigation={navigation} />
      <View style={styles.searchInputWrapper}>
        <TextInput
          style={styles.searchInput}
          placeholder="Stok Ara"
          placeholderTextColor={theme.textAlt}
          value={searchQuery}
          autoCapitalize='none'
        />
      </View>
      {/* <FlatList
        data={products}
        renderItem={({ item, index }) => (
          <View>
            <Text style={{color: theme.text}}>{item.StokAdi}</Text>
          </View>
        )}
      /> */}
      <FlatList
        data={filteredProductList}
        renderItem={({ item, index }) => renderProduct({ product: item, index })}
        keyExtractor={(item, index) => index.toString()}
        ItemSeparatorComponent={<View style={{height: 1, backgroundColor: theme.separator}} />}
        contentContainerStyle={{width: windowWidth}}
        showsVerticalScrollIndicator={false}
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
