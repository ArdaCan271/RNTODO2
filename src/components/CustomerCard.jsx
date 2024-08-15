// CustomerCard.js
import React, { useMemo } from 'react';
import { View, Text, StyleSheet, Dimensions, Pressable, TouchableOpacity, TouchableHighlight, useWindowDimensions } from 'react-native';
import colors from '../constants/colors';

import { useTheme } from '../constants/colors';

import Ionicons from 'react-native-vector-icons/Ionicons';

const formatCurrency = (value) => {
  if (value === null) {
    return { lira: '0', kurus: '00' };
  }
  const parts = value.toFixed(2).split('.');
  const lira = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  const kurus = parts[1];
  return { lira, kurus };
};

const getInitials = (isim) => {
  const words = isim.split(' ');
  if (words.length === 1) {
    return words[0][0].toUpperCase();
  }
  const firstInitial = words[0][0].toUpperCase();
  const lastInitial = words[words.length - 1][0].toUpperCase();
  return firstInitial + lastInitial;
};

const CustomerCard = ({ cariKod, isim, alacak, il, onPress, dynamicColors }) => {

  const windowWidth = useWindowDimensions().width;

  const theme = useTheme();
  const styles = useMemo(() => getStyles(theme), [theme]);

  const { lira, kurus } = formatCurrency(alacak);

  const initials = getInitials(isim);

  return (
    <Pressable
      style={[styles.cardWrapper, { width: windowWidth, borderLeftColor: dynamicColors.borderMain, backgroundColor: dynamicColors.backgroundColor }]}
      onPress={onPress}
      android_ripple={{ color: theme.primary }}
      unstable_pressDelay={20}
    >
      <View style={styles.cardPressable}>
        <View style={styles.topLeft}>
          <View style={[styles.initialsWrapper, { backgroundColor: dynamicColors.initialsWrapper }]}>
            <Text style={styles.initials}>
              {initials}
            </Text>
          </View>
          <View style={styles.textWrapper}>
            <Text style={styles.cariKod}>{cariKod}</Text>
            <Text style={styles.isim}>{isim}</Text>
          </View>
        </View>
        {il !== '' &&
          <View style={styles.bottomLeft}>
            <View style={styles.locationIconWrapper}>
              <Ionicons name="location-outline" size={18} color={theme.primary} />
            </View>
            <Text style={styles.il}>{il}</Text>
          </View>
        }
        <View style={styles.bottomRight}>
          <Text style={styles.alacakWhole}>
            ₺{lira}
            <Text style={styles.alacakDecimal}>,{kurus}</Text>
          </Text>
        </View>
        <Ionicons name="chevron-forward" size={24} color={theme.primary} style={styles.chevron} />
      </View>
    </Pressable>
  );
};

const getStyles = (theme) => StyleSheet.create({
  cardWrapper: {
    backgroundColor: theme.background,
    height: 100,
    borderLeftWidth: 15,
  },
  cardPressable: {
    width: '100%',
    height: '100%',
    padding: 8,
    paddingLeft: 10,
  },
  topLeft: {
    alignItems: 'flex-start',
    flexDirection: 'row',
  },
  initialsWrapper: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  initials: {
    fontSize: 18,
    color: theme.white,
  },
  textWrapper: {
    marginLeft: 6,
  },
  isim: {
    fontSize: 17,
    color: theme.text,
    fontWeight: 'bold',
    marginTop: 0,
    marginLeft: 2,
  },
  alacakWhole: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.primary,
  },
  alacakDecimal: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  bottomLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    bottom: 8,
    left: 25,
  },
  locationIconWrapper: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  il: {
    fontSize: 15,
    color: theme.textAlt,
    marginLeft: 0,
  },
  bottomRight: {
    position: 'absolute',
    bottom: 10,
    right: 15,
  },
  cariKod: {
    fontSize: 14,
    fontWeight: 'bold',
    color: theme.textAlt,
  },
  chevron: {
    position: 'absolute',
    top: 12,
    right: 12,
  }
});

export default CustomerCard;
