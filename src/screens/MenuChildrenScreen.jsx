import { StyleSheet, View, FlatList, BackHandler } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import MenuItem from '../components/MenuItem';
import { useTheme } from '../constants/colors';
import CustomHeader from '../components/CustomHeader';

const MenuChildrenScreen = ({ navigation, route }) => {
  const theme = useTheme();
  const styles = getStyles(theme);

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

  const [expandedItems, setExpandedItems] = useState({});

  const handlePress = (mobile, hasChildren) => {
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
        data={parentItem.children}
        keyExtractor={(item) => item.mobile}
        renderItem={({ item }) => (
          <MenuItem
            item={item}
            expandedItems={expandedItems}
            onPress={handlePress}
            navigation={navigation}
          />
        )}
      />
      <CustomHeader
        title={parentItem.id}
        navigation={navigation}
        noBack
      />
    </View>
  );
};

const getStyles = (theme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.white,
    paddingTop: 56,
  },
});

export default MenuChildrenScreen;
