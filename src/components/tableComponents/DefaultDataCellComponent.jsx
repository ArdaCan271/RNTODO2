import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

import FontAwesome from 'react-native-vector-icons/FontAwesome';

import { useTheme } from '../../constants/colors';

const DefaultDataCellComponent = ({ data, itemHeader, formatData, item }) => {

  const theme = useTheme();
  const styles = getStyles(theme);

  return (
    <View style={styles.dataCellComponent}>
      <Text style={[styles.dataCellText, {textAlign: itemHeader.Type === 'currency' ? 'right' : 'center', paddingRight: itemHeader.Type === 'currency' ? 4 : 0}]} numberOfLines={1}>
        {formatData(data, itemHeader.Type)}
      </Text>
    </View>
  );
}

const getStyles = (theme) => StyleSheet.create({
  dataCellComponent: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dataCellText: {
    color: theme.text,
    paddingTop: 6,
    width: '100%',
    height: '100%',
  },
});

export default DefaultDataCellComponent;