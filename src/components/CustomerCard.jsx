// CustomerCard.js
import React from 'react';
import { View, Text, StyleSheet, Dimensions, Pressable } from 'react-native';
import colors from '../constants/colors';

import Ionicons from 'react-native-vector-icons/Ionicons';

const formatCurrency = (value) => {
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

const CustomerCard = ({ cariKod, isim, alacak, il, onPress }) => {

  const { lira, kurus } = formatCurrency(alacak);

  const initials = getInitials(isim);

  return (
    <View
      style={styles.cardWrapper}
    >
      <Pressable 
        onPress={onPress}
        android_ripple={{ color: colors.primaryDark }}
        style={styles.cardPressable}
        unstable_pressDelay={80}
      >
        <View style={styles.topLeft}>
          <View
            style={styles.initialsWrapper}
          >
            <Text style={styles.initials}>
              { initials }
            </Text>
          </View>
          <View
            style={styles.textWrapper}
          >
            <Text style={styles.cariKod}>{cariKod}</Text>
            <Text style={styles.isim}>{isim}</Text>
          </View>
        </View>
        { il !== '' &&
          <View style={styles.bottomLeft}>
          <View style={styles.locationIconWrapper}>
            <Ionicons name="location-outline" size={16} color={colors.white}/>
          </View>
          <Text style={styles.il}>{il}</Text>
        </View>
        }
        <View style={styles.bottomRight}>
          <Text style={styles.alacakWhole}>
          ₺ {lira}
            <Text style={styles.alacakDecimal}>,{kurus}</Text>
          </Text>
        </View>
        <Ionicons name="chevron-forward" size={24} color={colors.primaryDark} style={styles.chevron} />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  cardWrapper: {
    backgroundColor: colors.white,
    width: Dimensions.get('window').width - 20,
    height: 100,
    marginTop: 12,
    borderWidth: 1,
    borderColor: colors.primaryDark,
    borderRadius: 6,
    elevation: 4,
    overflow: 'hidden',
  },
  cardPressable: {
    width: '100%',
    height: '100%',
    padding: 8,
  },
  topLeft: {
    alignItems: 'flex-start',
    flexDirection: 'row',
  },
  initialsWrapper: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primaryDark,
    justifyContent: 'center',
    alignItems: 'center',
  },
  initials: {
    fontSize: 20,
    color: colors.white,
  },
  textWrapper: {
    marginLeft: 6,
  },
  isim: {
    fontSize: 17,
    color: colors.black,
    fontWeight: 'bold',
    marginTop: 0,
    marginLeft: 2,
  },
  alacakWhole: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.primary,
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
    backgroundColor: colors.primaryDark,
    justifyContent: 'center',
    alignItems: 'center',
  },
  il: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'rgb(100, 100, 100)',
    marginLeft: 6,
  },
  bottomRight: {
    position: 'absolute',
    bottom: 10,
    right: 15,
  },
  cariKod: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'rgb(100, 100, 100)',
  },
  chevron: {
    position: 'absolute',
    top: 12,
    right: 12,
  }
});

export default CustomerCard;
