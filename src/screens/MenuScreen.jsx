import { StyleSheet, View, FlatList, BackHandler } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import MenuItem from '../components/MenuItem';
import { useTheme } from '../constants/colors';
import CustomHeader from '../components/CustomHeader';

const MenuScreen = ({ navigation }) => {
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

  const [expandedItems, setExpandedItems] = useState({});

  return (
    <View style={styles.container}>
      <FlatList
        data={menuBJSON}
        keyExtractor={(item) => item.mobile}
        renderItem={({ item }) => (
          <MenuItem
            item={item}
            expandedItems={expandedItems}
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

const getStyles = (theme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
    paddingTop: 56,
  },
});

export default MenuScreen;
