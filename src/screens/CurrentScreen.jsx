// CurrentScreen.js
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { StyleSheet, Text, View, BackHandler, FlatList, Dimensions, TextInput, useWindowDimensions } from 'react-native';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useTheme } from '../constants/colors';


import CustomHeader from '../components/CustomHeader';
import CustomerCard from '../components/CustomerCard';
import CustomerCardSkeleton from '../components/CustomerCardSkeleton';

const CurrentScreen = ({ navigation, route }) => {
  const { childrenOfMenuItem } = route.params;

  const userToken = useSelector((state) => state.userData.data.token);
  const baseRequestURL = useSelector((state) => state.baseRequestURL.value);

  const theme = useTheme();
  const styles = useMemo(() => getStyles(theme), [theme]);

  const [customerList, setCustomerList] = useState([]);
  const [filteredCustomerList, setFilteredCustomerList] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true); // Add loading state

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
    const apiUrl = `${baseRequestURL}/getCustomerList`;
    try {
      const response = await axios.post(apiUrl, {
        token: 'RasyoIoToken2021',
        user_token: userToken,
      });
      setCustomerList(response.data);
      setFilteredCustomerList(response.data); // Initialize the filtered list
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleOnCustomerPress = (customer) => () => {
    navigation.navigate('CustomerDetail', { customer, childrenOfMenuItem });
  }

  const renderItem = ({ item, index }) => (
    <CustomerCard
      onPress={handleOnCustomerPress(item)}
      cariKod={item.CariKod}
      isim={item.Isim}
      alacak={item.Alacak}
      il={item.Il}
      dynamicColors={{
        backgroundColor: index % 2 === 0 ? theme.background : theme.backgroundAlt,
        borderMain: index % 2 === 0 ? theme.primary : theme.primaryAlt,
        borderExtension1: index % 2 === 0 ? theme.primary_100 : theme.primaryAlt_100,
        borderExtension2: index % 2 === 0 ? theme.primary_200 : theme.primaryAlt_200,
        initialsWrapper: index % 2 === 0 ? theme.primary : theme.primaryAlt,
      }}
    />
  );

  const renderSkeletonItem = ({ index }) => <CustomerCardSkeleton backgroundColor={index % 2 === 0 ? theme.backgroundAlt : theme.background} />;

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
    }, 1500);
  };

  const handleInputSubmit = () => {
    clearTimeout(searchTimeout.current);
    handleSearch(searchQuery);
  };

  return (
    <View style={styles.container}>
      <CustomHeader navigation={navigation} title="Cari" />
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
      <FlatList
        data={loading ? Array(10).fill({}) : filteredCustomerList} // Show skeleton loaders if loading
        renderItem={loading ? renderSkeletonItem : renderItem}
        keyExtractor={(item, index) => (loading ? index.toString() : item.CariKod)}
        contentContainerStyle={[styles.listContainer, { width: windowWidth}]}
        ItemSeparatorComponent={<View style={{height: 1, backgroundColor: theme.separator }} />}
        keyboardShouldPersistTaps='handled'
      />
    </View>
  );
};

const getStyles = (theme) => StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: theme.background,
    paddingTop: theme.padding.header,
  },
  listContainer: {
    alignItems: 'center',
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
});

export default CurrentScreen;
