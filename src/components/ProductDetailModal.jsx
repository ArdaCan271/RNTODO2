import { StyleSheet, Text, View, Modal, ScrollView } from 'react-native';
import React, {useMemo} from 'react';

import { useTheme } from '../constants/colors';

const ProductDetailModal = () => {

  const theme = useTheme();
  const styles = useMemo(() => getStyles(theme), [theme]);

  return (
    <View>
      <Text>ProductDetailModal</Text>
    </View>
  );
}

const getStyles = (theme) => StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.backgroundColor,
  },
});

export default ProductDetailModal;