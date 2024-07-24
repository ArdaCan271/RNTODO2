import { StyleSheet, Text, View, TouchableOpacity, FlatList, Pressable, Dimensions } from 'react-native';
import React, { useState, useMemo } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import colors from '../constants/colors';
import { useTheme } from '../constants/colors';

import { useNavigationState } from '@react-navigation/native';

const getBackgroundColor = (level) => {
  const baseColorR = 239;
  const baseColorG = 242;
  const baseColorB = 255;
  const colorStep = 10;
  const colorValueR = baseColorR - level * colorStep; // Ensure it doesn't get too dark
  const colorValueG = baseColorG - level * colorStep; // Ensure it doesn't get too dark
  const colorValueB = baseColorB - level * colorStep; // Ensure it doesn't get too dark
  return `rgb(${colorValueR}, ${colorValueG}, ${colorValueB})`;
};

const MenuItem = ({ item, level = 0, onPress, navigation, style, props = '' }) => {

  const theme = useTheme();
  const styles = useMemo(() => getStyles(theme), [theme]);

  const hasChildren = !!item.children && item.children.length > 0;

  const routeNames = useNavigationState((state) => state.routeNames);

  return (
    <View style={styles.menuItem}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View style={{ width: `${level * 5}%` }} />
        <TouchableOpacity 
          style={[styles.menuButton, {backgroundColor: theme.background}, style]} 
          onPress={() => {
            if(routeNames.includes(item.mobile)) {
              navigation.navigate(item.mobile, { childrenOfMenuItem: item.children, props: props });
            } else if (hasChildren) {
              navigation.navigate('MenuChildren', { parent: item });
            } else {
              navigation.navigate('PageNotFound', { routeName: item.id });
              console.log('No route found for ' + item.mobile);
            }
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center'}}>
            <Icon name={item.icon} size={22} color={theme.primary} />
            <Text style={styles.menuText}>{item.id}</Text>
          </View>
          {hasChildren && (
            <Icon
              name='chevron-forward-outline'
              size={20}
              color={theme.primary}
              style={styles.caretIcon}
              />
            )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const getStyles = (theme) => StyleSheet.create({
  menuItem: {
    marginVertical: 0,
    borderLeftWidth: 10,
    borderLeftColor: theme.primary,
  },
  menuButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    flex: 1
  },
  menuText: {
    marginLeft: 10,
    fontSize: 18,
    color: theme.text,
  },
});

export default MenuItem;
