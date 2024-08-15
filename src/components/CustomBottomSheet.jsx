import { StyleSheet, ActivityIndicator, View, Text, BackHandler, TextInput, TouchableOpacity, useWindowDimensions } from 'react-native';
import React, { forwardRef, useCallback, useEffect, useMemo, useState } from 'react';

import { useTheme } from '../constants/colors';

import BottomSheet, { BottomSheetScrollView, BottomSheetBackdrop } from '@gorhom/bottom-sheet';

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

  const windowWidth = useWindowDimensions().width;
  const windowHeight = useWindowDimensions().height;

  const snapPoints = useMemo(() => [windowWidth > windowHeight ? '80%' : '65%'], [windowHeight]);

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

  const renderBackdrop = useCallback((props) => (
    <BottomSheetBackdrop 
      {...props}
      opacity={0.5}
      appearsOnIndex={0}
      disappearsOnIndex={-1}
    />
  ), []);

  const renderItem = ({ item, index }) => (
    <View key={index}>
      <View style={styles.itemContainer}>
        <Text style={styles.itemLabel}>{item.label}</Text>
        <Text numberOfLines={2} style={styles.itemValue}>{item.value}</Text>
      </View>
      {index !== productDetailsList.length - 1 &&
        <View style={{ borderBottomColor: theme.text, borderBottomWidth: 1, opacity: 0.2 }}/>
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
      backdropComponent={renderBackdrop}
      backgroundStyle={styles.bottomSheetBackground}
      style={{ paddingHorizontal: 5 }}
      handleIndicatorStyle={{ backgroundColor: theme.textAlt }}
      enablePanDownToClose
    >
      <View style={{ paddingBottom: 15, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', borderBottomWidth: 1, borderColor: theme.separator }}>
        <Text style={styles.title}>{props.stockName}</Text>
        <TouchableOpacity style={{padding: 2, position: 'absolute', right: 20, top: 0}} onPress={() => ref.current?.close()}>
          <FontAwesome name="times" size={26} color={theme.textAlt} style={{ textAlign: 'right' }} />
        </TouchableOpacity>
      </View>
      <BottomSheetScrollView contentContainerStyle={{ paddingHorizontal: 15 }}>
        {isLoading ?
          <ActivityIndicator size="large" color={theme.primary} /> 
          :
          productDetailsList.map((item, index) => (renderItem({ item, index })))
        }
      </BottomSheetScrollView>
    </BottomSheet>
  );
});

const getStyles = (theme) => StyleSheet.create({
  title: {
    color: theme.primary,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
  },
  bottomSheetBackground: {
    flex: 1,
    backgroundColor: theme.background,
    elevation: 5,
    shadowColor: theme.text,
    borderWidth: 2,
    borderColor: theme.textAlt,
    borderRadius: 40,
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