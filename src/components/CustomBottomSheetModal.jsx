import { StyleSheet, Text, View } from 'react-native';
import React, { useMemo, forwardRef } from 'react';
import { BottomSheetModal } from '@gorhom/bottom-sheet';

import { useTheme } from '../constants/colors';

const CustomBottomSheetModal = forwardRef((props, ref) => {

  const snapPoints = useMemo(() => ['30%', '70%'], []);

  const theme = useTheme();
  const styles = useMemo(() => getStyles(theme), [theme]);

  return (
    <BottomSheetModal
      ref={ref}
      index={0}
      snapPoints={snapPoints}
    >
      <View style={styles.container}>
        <Text style={styles.text}>{props.title}</Text>
      </View>
    </BottomSheetModal>
  );
});

const getStyles = (theme) => StyleSheet.create({
  container: {
    backgroundColor: theme.primary,
    padding: 16,
  },
  text: {
    fontSize: 18,
    color: theme.text,
  },
});

export default CustomBottomSheetModal;