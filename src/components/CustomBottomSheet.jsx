import { StyleSheet, ActivityIndicator, View, Text, BackHandler, TextInput, TouchableOpacity } from 'react-native';
import React, { forwardRef, useEffect, useMemo, useState } from 'react';

import { useTheme } from '../constants/colors';

import BottomSheet, { BottomSheetScrollView, BottomSheetTextInput } from '@gorhom/bottom-sheet';

import FontAwesome from 'react-native-vector-icons/FontAwesome';

import { useSelector } from 'react-redux';
import axios from 'axios';


const CustomBottomSheet = forwardRef((props, ref) => {

  const [currentIndex, setCurrentIndex] = useState(-1);


  const onBackPress = () => {
    if (ref !== null) {
      ref.current?.close();
      return true;
    }
  };

  useEffect(() => {
    if (currentIndex !== -1) {
      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }
  }, [currentIndex]);

  const theme = useTheme();
  const styles = useMemo(() => getStyles(theme), [theme]);

  const snapPoints = useMemo(() => ['65%'], []);

  const userToken = useSelector((state) => state.userData.data.token);
  const baseRequestURL = useSelector((state) => state.baseRequestURL.value);

  const [productDetail, setProductDetail] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const getProductDetail = async () => {
    const apiUrl = `${baseRequestURL}/getProductDetail`;
    try {
      setIsLoading(true);
      const response = await axios.post(apiUrl, {
        token: 'RasyoIoToken2021',
        user_token: userToken,
        productId: props.stockCode,
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
        <Text numberOfLines={2} style={styles.itemValue}>{item.value}</Text>
      </View>
      {index !== productDetailsList.length - 1 &&
        <View
        style={{
          borderBottomColor: theme.text,
          borderBottomWidth: 1,
          opacity: 0.2,
        }}
        />
      }
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
    if (props.stockCode){
      getProductDetail();
    }
  }, [props.stockCode]);

  return (
    <BottomSheet
      onChange={(index) => setCurrentIndex(index)}
      index={0}
      snapPoints={snapPoints}
      ref={ref}
      backgroundStyle={{
        backgroundColor: theme.background,
        elevation: 5,
        shadowColor: theme.text,
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        borderWidth: 2,
        borderColor: theme.text,
        borderRadius: 40,
      }}
      style={{
        paddingHorizontal: 5,
        justifyContent: 'space-between'
      }}
      handleIndicatorStyle={{ backgroundColor: theme.text }}
      enablePanDownToClose
    >
      <View 
        style={{
          paddingBottom: 10,
        }}
      >
        <Text style={styles.title}>{props.title}</Text>
      </View>
      {productDetailsList.length > 0 ?
        <BottomSheetScrollView contentContainerStyle={{ paddingHorizontal: 15 }}>
          {
            isLoading ?
              <ActivityIndicator size="large" color={theme.primary} /> :
              productDetailsList.map((item, index) => (renderItem({ item, index })))
          }
        </BottomSheetScrollView>
        :
        <ActivityIndicator size="large" color={theme.primary} />
      }
      <View style={{ flexDirection: 'row', height: 70, borderTopColor: theme.text, borderTopWidth: 1 , justifyContent: 'space-between', alignItems: 'center'}}>
        <View style={{flex: 1, rowGap: 2}}>
          <Text style={{color: theme.text, textAlign: 'center', fontWeight: 'bold'}}>Birim Fiyat</Text>
          <Text style={{color: theme.text, textAlign: 'center'}}>
            ₺1314,20
          </Text>
        </View>
        <View style={{flex: 1.5, justifyContent: 'center', alignItems: 'center'}}>
          <View style={{flexDirection: 'row', height: 50, justifyContent: 'center', alignItems: 'center'}}>
            <TouchableOpacity style={{width: 50, height: 50, backgroundColor: theme.primary, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderRightWidth: 0, borderColor: theme.text, borderTopLeftRadius: 10, borderBottomLeftRadius: 10}}>
              <FontAwesome name="minus" size={24} color={theme.white} />
            </TouchableOpacity>
            <TextInput
              style={{width: 50, height: 50, textAlign: 'center', borderWidth: 1, borderColor: theme.text, color: theme.text, fontSize: 16, padding: 0}}
              value="5"
              keyboardType="numeric"
            />
            <TouchableOpacity style={{width: 50, height: 50, backgroundColor: theme.primary, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderLeftWidth: 0, borderColor: theme.text, borderTopRightRadius: 10, borderBottomRightRadius: 10}}>
              <FontAwesome name="plus" size={24} color={theme.white} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{flex: 1, rowGap: 2}}>
          <Text style={{color: theme.text, textAlign: 'center', fontWeight: 'bold'}}>Toplam Fiyat</Text>
          <Text style={{color: theme.text, textAlign: 'center'}}>
            ₺6571,00
          </Text>
        </View>
      </View>
    </BottomSheet>
  );
});

const getStyles = (theme) => StyleSheet.create({
  title: {
    color: theme.primary,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  itemLabel: {
    fontWeight: 'bold',
    color: theme.text,
    width: '40%',
  },
  itemValue: {
    color: theme.text,
    width: '60%',
    textAlign: 'right',
  },
});

export default CustomBottomSheet;