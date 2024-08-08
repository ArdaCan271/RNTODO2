import { StyleSheet, Text, View } from 'react-native';
import React, { forwardRef, useMemo, useRef } from 'react';

import { useTheme } from '../constants/colors';

import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';

const CustomBottomSheet = forwardRef((props, ref) => {

  const theme = useTheme();
  const styles = useMemo(() => getStyles(theme), [theme]);

  const snapPoints = useMemo(() => ['10%', '50%'], []);



  return (
    <BottomSheet
      index={0}
      snapPoints={snapPoints}
      ref={ref}
      enablePanDownToClose
      backgroundStyle={{backgroundColor: theme.primary}}
    >
      <BottomSheetScrollView>
        <Text style={styles.text}>{props.title}</Text>
      </BottomSheetScrollView>
    </BottomSheet>
  );
});

const getStyles = (theme) => StyleSheet.create({
  text: {
    fontSize: 18,
    color: theme.text,
  },
});

export default CustomBottomSheet;