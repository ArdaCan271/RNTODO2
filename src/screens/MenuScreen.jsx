import { StyleSheet, View, FlatList, BackHandler } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import MenuItem from '../components/MenuItem';
import { useTheme } from '../constants/colors';

import CustomHeader from '../components/CustomHeader';
import CustomBottomTab from '../components/CustomBottomTab';

const MenuScreen = ({ navigation, route }) => {
  const theme = useTheme();
  const styles = getStyles(theme);

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
              navigation={navigation}
              routeNames={route.params.routeNames}
            />
        )}
        ListFooterComponent={lastViewVisible && <View style={{height: 18, alignSelf: 'flex-start', width: 10, backgroundColor: theme.primary}} />}
        ItemSeparatorComponent={<View style={{width: '100%', height: 1, backgroundColor: theme.separator}} />}
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
    flex: 1,
    backgroundColor: theme.background,
    paddingTop: theme.padding.header,
    paddingBottom: theme.padding.bottomBar,
  },
});

export default MenuScreen;
