import { StyleSheet, ActivityIndicator, View, Text, BackHandler } from 'react-native';
import React, { forwardRef, useEffect, useMemo, useState } from 'react';

import { useTheme } from '../constants/colors';

import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';

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

  const snapPoints = useMemo(() => ['25%', '65%'], []);

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
        <Text style={styles.itemValue}>{item.value}</Text>
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
        backgroundColor: theme.backgroundAlt,
        elevation: 5,
        shadowColor: theme.text,
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        borderWidth: 2,
        borderColor: theme.text,
        borderRadius: 40,
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
        <BottomSheetScrollView contentContainerStyle={{ paddingHorizontal: 20 }}>
          {
            isLoading ?
              <ActivityIndicator size="large" color={theme.primary} /> :
              productDetailsList.map((item, index) => (renderItem({ item, index })))
          }
        </BottomSheetScrollView>
        :
        <ActivityIndicator size="large" color={theme.primary} />
      }
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
    paddingVertical: 10,
  },
  itemLabel: {
    fontWeight: 'bold',
    color: theme.text,
  },
  itemValue: {
    color: theme.text,
  },
});

export default CustomBottomSheet;