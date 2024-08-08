import { StyleSheet, Text, View, Modal, ScrollView, ActivityIndicator, useWindowDimensions, Pressable } from 'react-native';
import React, { useState, useMemo, useEffect } from 'react';
import { useTheme } from '../constants/colors';
import { useSelector } from 'react-redux';
import axios from 'axios';


const FastOrderProductDetailModal = ({ modalVisible, setModalVisible, stockCode }) => {
  const theme = useTheme();
  const styles = useMemo(() => getStyles(theme), [theme]);

  const baseRequestURL = useSelector((state) => state.baseRequestURL.value);
  const userToken = useSelector((state) => state.userData.data.token);

  const windowWidth = useWindowDimensions().width;

  const [productDetail, setProductDetail] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  const getProductDetail = async () => {
    const apiUrl = `${baseRequestURL}/getProductDetail`;
    try {
      setIsLoading(true);
      const response = await axios.post(apiUrl, {
        token: 'RasyoIoToken2021',
        user_token: userToken,
        productId: stockCode,
      });
      setProductDetail(response.data[0]);

    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const renderItem = ({ item, index }) => (
    <View key={index}>
      <View style={styles.itemContainer}>
        <Text style={styles.itemLabel}>{item.label}</Text>
        <Text style={styles.itemValue}>{item.value}</Text>
      </View>
      <View
        style={{
          borderBottomColor: theme.text,
          borderBottomWidth: 1,
          opacity: 0.2,
        }}
      />
    </View>
  );

  const productDetailsList = useMemo(() => {
    if (!productDetail) return [];
    return Object.entries(productDetail).map(([key, value]) => ({
      label: key,
      value: value !== null ? value.toString() : 'N/A'
    }));
  }, [productDetail]);

  useEffect(() => {
    if (modalVisible) {
      getProductDetail();
    }
  }, [modalVisible]);

  return (
    <Modal
      animationType="none"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={styles.overlay}>
        <Pressable style={{ flex: 1 }} onPress={() => setModalVisible(false)} />
        <View style={[styles.modalContainer, { width: windowWidth }]}>
          <Text style={{ color: theme.primary, fontSize: 20, fontWeight: 'bold', marginLeft: 20 }}>Stok Detayları</Text>
          {productDetailsList.length > 0 ?
            <ScrollView contentContainerStyle={{ paddingHorizontal: 20 }}>
              {
                isLoading ?
                  <ActivityIndicator size="large" color={theme.primary} /> :
                  productDetailsList.map((item, index) => (renderItem({ item, index })))
              }
            </ScrollView>
            :
            <ActivityIndicator size="large" color={theme.primary} />
          }
        </View>
      </View>
    </Modal>
  );
};

const getStyles = (theme) => StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: theme.backgroundAlt,
    paddingVertical: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: '80%',
    elevation: 5,
    shadowColor: theme.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  itemLabel: {
    fontWeight: 'bold',
    color: theme.text,
  },
  itemValue: {
    color: theme.text,
  },
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: 'grey',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
});

export default FastOrderProductDetailModal;
