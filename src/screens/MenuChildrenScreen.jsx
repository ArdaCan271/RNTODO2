import { StyleSheet, View, FlatList, BackHandler } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import MenuItem from '../components/MenuItem';
import { useTheme } from '../constants/colors';
import CustomHeader from '../components/CustomHeader';
import CustomBottomTab from '../components/CustomBottomTab';

import { useNavigationState } from '@react-navigation/native';

const MenuChildrenScreen = ({ navigation, route }) => {
  const theme = useTheme();
  const styles = getStyles(theme);

  const routeNames = useNavigationState((state) => state.routeNames);

  useEffect(() => {
    const backAction = () => {
      navigation.goBack();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    return () => backHandler.remove();
  }, [navigation]);

  const parentItem = route.params.parent;

  const [lastViewVisible, setLastViewVisible] = useState(false);

  return (
    <View style={styles.container}>
      <FlatList
        data={parentItem.children}
        keyExtractor={(item) => item.mobile}
        renderItem={({ item, index }) => (
          <View
            style={{width: '100%'}}
          >
            <MenuItem
              item={item}
              navigation={navigation}
              routeNames={routeNames}
            />
          </View>
        )}
        onScrollBeginDrag={() => {
          if (!lastViewVisible){
            setLastViewVisible(true);
          }
        }}
        ListFooterComponent={lastViewVisible && <View style={{height: 18, alignSelf: 'flex-start', width: 10, backgroundColor: theme.primary}} />}
        ItemSeparatorComponent={<View style={{width: '100%', height: 1, backgroundColor: theme.separator}} />}
      />
      <CustomHeader
        title={parentItem.id}
        navigation={navigation}
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

export default MenuChildrenScreen;
