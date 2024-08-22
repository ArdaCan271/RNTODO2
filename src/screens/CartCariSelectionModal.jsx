import React, { useState, useEffect, useRef, useMemo } from 'react';
import { StyleSheet, Text, View, BackHandler, TextInput, Modal, Pressable } from 'react-native';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useTheme } from '../constants/colors';

import CustomHeader from '../components/CustomHeader';
import CustomerCard from '../components/CustomerCard';
import CustomerCardSkeleton from '../components/CustomerCardSkeleton';
import { FlashList } from '@shopify/flash-list';

const CartCariSelectionModal = ({ modalVisible, setModalVisible, setSelectedCari }) => {
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

  useEffect(() => {
    if (modalVisible) {
      getCustomerList();
      setSearchQuery('');
    }
  }, [modalVisible]);

  const getCustomerList = async () => {
    setLoading(true);
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

  const handleCariSelection = (cari) => {
    setSelectedCari(cari);
  };

  const renderItem = ({ item, index }) => (
    <CustomerCard
      onPress={() => {
        handleCariSelection(item);
        setModalVisible(false);
      }}
      cariKod={item.CariKod}
      isim={item.Isim}
      alacak={item.Alacak}
      il={item.Il}
      dynamicColors={{
        backgroundColor: index % 2 === 0 ? theme.background : theme.backgroundAlt,
        borderMain: index % 2 === 0 ? theme.primary : theme.primaryAlt,
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
    }, 500);
  };

  const handleInputSubmit = () => {
    clearTimeout(searchTimeout.current);
    handleSearch(searchQuery);
  };

  return (
    <Modal
      animationType='fade'
      transparent
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <Pressable 
        style={styles.overlay}
        onPress={() => setModalVisible(false)}
      >
        <Pressable style={styles.container}>
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
        </Pressable>
      </Pressable>
    </Modal>
  );
};

const getStyles = (theme) => StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '90%',
    height: '90%',
    borderRadius: 10,
    backgroundColor: theme.background,
    elevation: 5,
    overflow: 'hidden',
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

export default CartCariSelectionModal;