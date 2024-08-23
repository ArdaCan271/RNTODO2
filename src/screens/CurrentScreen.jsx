// CurrentScreen.js
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { StyleSheet, Text, View, BackHandler, FlatList, Dimensions, TextInput, useWindowDimensions } from 'react-native';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useTheme } from '../constants/colors';

import CustomHeader from '../components/CustomHeader';
import CustomerCard from '../components/CustomerCard';
import CustomerCardSkeleton from '../components/CustomerCardSkeleton';
import { FlashList } from '@shopify/flash-list';

const CurrentScreen = ({ navigation, route }) => {
  const { childrenOfMenuItem } = route.params;

  const userToken = useSelector((state) => state.userData.data.token);
  const baseRequestURL = useSelector((state) => state.baseRequestURL.value);

  const theme = useTheme();
  const styles = useMemo(() => getStyles(theme), [theme]);

  const [customerList, setCustomerList] = useState([]);
  const [filteredCustomerList, setFilteredCustomerList] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  const searchTimeout = useRef(null);
  const searchInputRef = useRef(null);

  const windowWidth = useWindowDimensions().width;

  useEffect(() => {
    getCustomerList();

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

  const getCustomerList = async () => {
    console.log('Getting customer list');
    
    const apiUrl = `${baseRequestURL}/getCustomerList`;
    try {
      const response = await axios.post(apiUrl, {
        token: 'RasyoIoToken2021',
        user_token: userToken,
      });
      setCustomerList(response.data);
      setFilteredCustomerList(response.data); // Initialize the filtered list
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleOnCustomerPress = (customer) => () => {
    navigation.navigate('CustomerDetail', { customer, childrenOfMenuItem });
  }

  const renderItem = ({ item, index }) => (
    <CustomerCard
      onPress={handleOnCustomerPress(item)}
      cariCode={item.CariKod}
      name={item.Isim}
      due={item.Alacak}
      city={item.Il}
      dynamicColors={{
        backgroundColor: index % 2 === 0 ? theme.background : theme.backgroundAlt,
        accent: index % 2 === 0 ? theme.primaryAlt : theme.primary,
      }}
    />
  );

  const renderSkeletonItem = ({ index }) => 
  <CustomerCardSkeleton 
    dynamicColors={{
      backgroundColor: index % 2 === 0 ? theme.background : theme.backgroundAlt,
      accent: index % 2 === 0 ? theme.primaryAlt : theme.primary,
    }}
  />;

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (searchTimeout.current) {
      clearTimeout(searchTimeout.current);
    }
    searchTimeout.current = setTimeout(() => {
      if (query === '') {
        setFilteredCustomerList(customerList);
      } else {
        const filteredList = customerList.filter((customer) =>
          customer.Isim.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredCustomerList(filteredList);
      }
    }, 500);
  };

  const handleInputSubmit = () => {
    clearTimeout(searchTimeout.current);
    handleSearch(searchQuery);
  };

  return (
    <View style={[styles.container, {width: windowWidth}]}>
      <CustomHeader navigation={navigation} title={route.params.title} />
      <View style={styles.searchInputWrapper}>
        <TextInput
          style={styles.searchInput}
          placeholder="Cari Ara"
          placeholderTextColor={theme.textAlt}
          value={searchQuery}
          onChangeText={handleSearch}
          onSubmitEditing={handleInputSubmit}
          ref={searchInputRef}
          autoCapitalize='none'
        />
      </View>
      <FlashList
        data={loading ? Array(10).fill({}) : filteredCustomerList}
        renderItem={loading ? renderSkeletonItem : renderItem}
        estimatedItemSize={100}
        keyboardShouldPersistTaps='handled'
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
});

export default CurrentScreen;
