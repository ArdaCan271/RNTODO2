// CurrentScreen.js
import { StyleSheet, Text, View, BackHandler, FlatList, Dimensions, TextInput } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import colors from '../constants/colors';
import CustomHeader from '../components/CustomHeader';
import CustomerCard from '../components/CustomerCard';
import CustomerCardSkeleton from '../components/CustomerCardSkeleton'; // Import the skeleton component

const CurrentScreen = ({ navigation, route }) => {
  const { childrenOfMenuItem } = route.params;
  const userToken = useSelector((state) => state.userData.data.token);

  const [customerList, setCustomerList] = useState([]);
  const [filteredCustomerList, setFilteredCustomerList] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true); // Add loading state
  const searchTimeout = useRef(null);

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

  const getCustomerList = async () => {
    const apiUrl = 'https://duyu.alter.net.tr/api/getCustomerList';
    try {
      const response = await axios.post(apiUrl, {
        token: 'RasyoIoToken2021',
        user_token: userToken,
      });
      setCustomerList(response.data);
      setFilteredCustomerList(response.data); // Initialize the filtered list
      setLoading(false); // Set loading to false after fetching data
    } catch (error) {
      console.log(error);
      setLoading(false); // Set loading to false in case of an error
    }
  };

  const handleOnCustomerPress = (customer) => () => {
    navigation.navigate('CustomerDetail', { customer, childrenOfMenuItem });
  }

  const renderItem = ({ item }) => (
    <CustomerCard onPress={handleOnCustomerPress(item)} cariKod={item.CariKod} isim={item.Isim} alacak={item.Alacak} il={item.Il} />
  );

  const renderSkeletonItem = () => <CustomerCardSkeleton />;

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
          customer.CariKod.toLowerCase().includes(query.toLowerCase())
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
      <TextInput
        style={styles.searchInput}
        placeholder="Cari Kod Ara"
        placeholderTextColor={colors.black}
        value={searchQuery}
        onChangeText={handleSearch}
        onSubmitEditing={handleInputSubmit}
      />
      <FlatList
        data={loading ? Array(10).fill({}) : filteredCustomerList} // Show skeleton loaders if loading
        renderItem={loading ? renderSkeletonItem : renderItem}
        keyExtractor={(item, index) => (loading ? index.toString() : item.CariKod)}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: colors.white,
    paddingTop: 56,
  },
  listContainer: {
    width: Dimensions.get('window').width,
    alignItems: 'center',
  },
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 10,
    width: '90%',
    color: colors.black,
  },
});

export default CurrentScreen;
