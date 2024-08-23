import React, { useMemo } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';

import { useTheme } from '../constants/colors';

import Ionicons from 'react-native-vector-icons/Ionicons';

const formatCurrency = (value) => {
  if (value === null || value === undefined) {
    return { lira: '0', kurus: '00' };
  }
  const parts = value.toFixed(2).split('.');
  const lira = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  const kurus = parts[1];
  return { lira, kurus };
};

const getInitials = (name) => {
  if (!name) {
    return '';
  }
  const words = name.split(' ');
  if (words.length === 1) {
    return words[0][0].toUpperCase();
  }
  const firstInitial = words[0][0].toUpperCase();
  const lastInitial = words[words.length - 1][0].toUpperCase();
  return firstInitial + lastInitial;
};

const CustomerCard = ({ cariCode, name, due, city, onPress, dynamicColors }) => {
  const theme = useTheme();
  const styles = useMemo(() => getStyles(theme), [theme]);

  const { lira, kurus } = formatCurrency(due);

  const initials = getInitials(name);

  return (
    <View style={[styles.cardPressableWrapper, { borderLeftColor: dynamicColors.accent, backgroundColor: dynamicColors.backgroundColor }]}>
      <Pressable
        style={styles.container}
        onPress={onPress}
        android_ripple={{ color: theme.separator }}
        unstable_pressDelay={20}
      >
        <View style={styles.body}>
          <View style={styles.initialsContainer}>
            <View style={[styles.initialsCircle, {backgroundColor: dynamicColors.accent}]}>
              <Text style={styles.initialsText}>{initials}</Text>
            </View>
          </View>
          <View style={styles.infoContainer}>
            <View style={styles.cariCodeContainer}>
              <Text style={styles.cariCodeText}>{cariCode}</Text>
            </View>
            <View style={styles.nameContainer}>
              <Text numberOfLines={2} style={styles.nameText}>{name}</Text>
            </View>
          </View>
          <View style={styles.chevronContainer}>
            <Ionicons name="chevron-forward" size={26} color={dynamicColors.accent} style={{marginTop: 6}} />
          </View>
        </View>
        <View style={styles.footer}>
          {city !== '' &&
            <View style={styles.locationContainer}>
              <View style={[styles.locationIconCircle, { backgroundColor: dynamicColors.accent }]}>
                <Ionicons name="location-outline" size={18} color={dynamicColors.backgroundColor} />
              </View>
              <Text numberOfLines={1} style={styles.locationText}>{city}</Text>
            </View>
          }
          <View style={styles.dueContainer}>
            <Text style={styles.dueWhole}>₺{lira},<Text style={styles.dueDecimal}>{kurus}</Text></Text>
          </View>
        </View>
      </Pressable>
    </View>
  );
};

const getStyles = (theme) => StyleSheet.create({
  cardPressableWrapper: {
    height: 100,
    borderLeftWidth: 15,
    width: '100%',
  },
  container: {
    flex: 1,
  },
  body: {
    flex: 2,
    flexDirection: 'row',
  },
  initialsContainer: {
    paddingHorizontal: 6,
    alignItems: 'center',
  },
  initialsCircle: {
    marginTop: 6,
    width: 42,
    height: 42,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  initialsText: {
    fontSize: 18,
    color: theme.background,
  },
  infoContainer: {
    flex: 1,
  },
  cariCodeContainer: {
    flex: 1,
    marginTop: 4,
  },
  cariCodeText: {
    fontSize: 15,
    color: theme.textAlt,
  },
  nameContainer: {
    flex: 2.5,
  },
  nameText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.text,
  },
  chevronContainer: {
    paddingHorizontal: 4,
    alignItems: 'center',
  },
  footer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  locationContainer: {
    flex: 1,
    alignItems: 'flex-start',
    flexDirection: 'row',
  },
  locationIconCircle: {
    marginLeft: 15,
    width: 24,
    height: 24,
    borderRadius: 13,
    justifyContent: 'center',
    alignItems: 'center',
  },
  locationText: {
    fontSize: 15,
    color: theme.textAlt,
    marginLeft: 6,
  },
  dueContainer: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingHorizontal: 10,
  },
  dueWhole: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.primary,
  },
  dueDecimal: {
    fontSize: 14,
  },
});

export default CustomerCard;
