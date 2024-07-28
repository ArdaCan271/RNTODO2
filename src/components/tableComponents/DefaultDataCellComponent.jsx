import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

import FontAwesome from 'react-native-vector-icons/FontAwesome';

import { useTheme } from '../../constants/colors';

const DefaultDataCellComponent = ({ data, itemHeader, formatData, item }) => {

  const theme = useTheme();
  const styles = getStyles(theme);

  return (
    <View style={styles.dataCellComponent}>
      <Text style={styles.dataCellText} numberOfLines={1}>
        {formatData(data, itemHeader.Type)}
      </Text>
    </View>
  );
}

const getStyles = (theme) => StyleSheet.create({
  dataCellComponent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dataCellText: {
    color: theme.text,
    textAlign: 'center',
  },
});

export default DefaultDataCellComponent;