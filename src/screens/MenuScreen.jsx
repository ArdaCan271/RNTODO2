import { StyleSheet, View, FlatList, BackHandler, useWindowDimensions } from 'react-native';
import React, { useEffect, useState, useMemo } from 'react';
import { useSelector } from 'react-redux';

import MenuItem from '../components/MenuItem';
import { useTheme } from '../constants/colors';

import CustomHeader from '../components/CustomHeader';
import CustomBottomTab from '../components/CustomBottomTab';

import { useIsFocused } from '@react-navigation/native';

const MenuScreen = ({ navigation, route }) => {
  const theme = useTheme();
  const styles = useMemo(() => getStyles(theme), [theme]);

  const windowWidth = useWindowDimensions().width;
  const windowHeight = useWindowDimensions().height;

  const isFocused = useIsFocused();

  useEffect(() => {
    const backAction = () => {
      BackHandler.exitApp();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    return () => backHandler.remove();
  }, []);

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
              borderBottom={index === menuBJSON.length - 1 ? 0 : 2}
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
      />
      <CustomBottomTab 
        navigation={navigation} 
      />
    </View>
  );
};

const getStyles = (theme) => StyleSheet.create({
  container: {
    backgroundColor: theme.background,
    paddingTop: theme.padding.header,
    paddingBottom: theme.padding.bottomBar,
  },
});

export default MenuScreen;
