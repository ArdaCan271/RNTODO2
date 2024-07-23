import { StyleSheet, Text, View, TouchableOpacity, FlatList, Pressable, Dimensions } from 'react-native';
import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import colors from '../constants/colors';

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

const MenuItem = ({ item, level = 0, onToggle, expandedItems, navigation, style, props = '' }) => {

  const hasChildren = !!item.children && item.children.length > 0;

  const routeNames = useNavigationState((state) => state.routeNames);

  return (
    <View style={styles.menuItem}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View style={{ width: `${level * 5}%` }} />
        <Pressable 
          style={[styles.menuButton, {backgroundColor: colors.white, elevation: expandedItems[item.mobile] ? 4 : 0}, style]} 
          onPress={() => {
            if(routeNames.includes(item.mobile)) {
              navigation.navigate(item.mobile, { childrenOfMenuItem: item.children, props: props });
            } else if (hasChildren) {
              onToggle(item.mobile, hasChildren);
              console.log('No route found for ' + item.mobile);
            } else {
              console.log('No route found for ' + item.mobile);
            }
          }}
          unstable_pressDelay={80}
          android_ripple={{color: colors.primaryDark}}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center'}}>
            <Icon name={item.icon} size={22} color={colors.primaryDark} />
            <Text style={styles.menuText}>{item.id}</Text>
          </View>
          {hasChildren && (
            <Icon
              name={expandedItems[item.mobile] ? 'chevron-down-outline' : 'chevron-forward-outline'}
              size={20}
              color={colors.primaryDark}
              style={styles.caretIcon}
              />
            )}
        </Pressable>
      </View>
      {expandedItems[item.mobile] && hasChildren && (
        <FlatList
          data={item.children}
          keyExtractor={(childItem) => childItem.mobile}
          renderItem={({ item: childItem }) => {
            return (
              <MenuItem
              item={childItem}
              level={level + 1}
              expandedItems={expandedItems}
              onToggle={onToggle}
              />
            )
          }
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  menuItem: {
    marginVertical: 0,
  },
  menuButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderLeftWidth: 12,
    borderLeftColor: colors.primaryDark,
    borderBottomWidth: 1,
    borderBottomColor: 'rgb(180, 180, 180)',
    flex: 1
  },
  menuText: {
    marginLeft: 10,
    fontSize: 18,
    color: colors.black,
  },
  caretIcon: {

  },
});

export default MenuItem;
