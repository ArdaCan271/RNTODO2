import { StyleSheet, View, FlatList, BackHandler, useWindowDimensions, TouchableOpacity } from 'react-native';
import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { useSelector } from 'react-redux';

import MenuItem from '../components/MenuItem';
import { useTheme } from '../constants/colors';

import CustomHeader from '../components/CustomHeader';
import CustomBottomTab from '../components/CustomBottomTab';

import { useFocusEffect } from '@react-navigation/native';

import FontAwesome from 'react-native-vector-icons/FontAwesome';

const MenuScreen = ({ navigation, route }) => {
  const theme = useTheme();
  const styles = useMemo(() => getStyles(theme), [theme]);

  // write a backhandler for this screen using useFocusEffect and useCallBack and backHandler

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        BackHandler.exitApp();
        return true;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [])
  );

  const menuBJSON = useSelector((state) => state.userMenuBJSON.menuBJSON);

  const [lastViewVisible, setLastViewVisible] = useState(false);

  return (
    <View style={styles.container}>
      <FlatList
        data={menuBJSON}
        keyExtractor={(item) => item.mobile}
        renderItem={({ item, index }) => (
            <MenuItem
              item={item}
              navigation={navigation}
              routeNames={route.params.routeNames}
            />
        )}
        ListFooterComponent={lastViewVisible && <View style={{height: 18, alignSelf: 'flex-start', width: 10, backgroundColor: theme.primary}} />}
        onScrollBeginDrag={() => {
          if (!lastViewVisible){
            setLastViewVisible(true);
          }
        }}
      />
      <CustomHeader
        title={'Menü'}
        navigation={navigation}
        hasDrawer
        customRightComponent={
          <TouchableOpacity
            style={{height: 35, width: 35, justifyContent: 'center', alignItems: 'center', backgroundColor: theme.background, borderRadius: 5, borderWidth: 1, borderColor: theme.primary}}
            onPress={() => navigation.navigate('FastOrderCart')}
          >
            <FontAwesome name={'shopping-cart'} size={24} color={theme.primary} />
          </TouchableOpacity>
        }
      />
      <CustomBottomTab 
        navigation={navigation} 
      />
    </View>
  );
};

const getStyles = (theme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
    paddingTop: theme.padding.header,
    paddingBottom: theme.padding.bottomBar,
  },
});

export default MenuScreen;
