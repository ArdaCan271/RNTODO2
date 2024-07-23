import { StyleSheet, View, FlatList, BackHandler } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import MenuItem from '../components/MenuItem';
import colors from '../constants/colors';
import CustomHeader from '../components/CustomHeader';
import DrawerMenu from '../components/DrawerMenu';

const MenuScreen = ({ navigation }) => {

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

  const [expandedItems, setExpandedItems] = useState({});

  const handleToggle = (mobile, hasChildren) => {
    if (hasChildren) {
      setExpandedItems((prevExpandedItems) => ({
        ...prevExpandedItems,
        [mobile]: !prevExpandedItems[mobile],
      }));
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={menuBJSON}
        keyExtractor={(item) => item.mobile}
        renderItem={({ item }) => (
          <MenuItem
            item={item}
            expandedItems={expandedItems}
            onToggle={handleToggle}
            navigation={navigation}
          />
        )}
      />
      <CustomHeader
        title={'Menü'}
        navigation={navigation}
        noBack
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingTop: 56,
  },
});

export default MenuScreen;
