import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

import { useTheme } from '../constants/colors';

const FilterSingle = () => {

  const theme = useTheme();
  const styles = getStyles(theme);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>FilterSingle</Text>
    </View>
  );
}

const getStyles = (theme) => StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: theme.text,
  },
});

export default FilterSingle;