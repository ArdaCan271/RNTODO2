import React, { useMemo } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useTheme } from '../constants/colors';

import Ionicons from 'react-native-vector-icons/Ionicons';

const CustomHeader = ({ navigation, title, hasDrawer, customRightComponent }) => {
  const theme = useTheme();
  const styles = useMemo(() => getStyles(theme), [theme]);

  const handleButtonPress = () => {
    if (hasDrawer) {
      navigation.openDrawer();
    } else {
      navigation.goBack();
    }
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <TouchableOpacity style={styles.button} onPress={handleButtonPress}>
          <Ionicons name={hasDrawer ? 'menu' : 'caret-back'} size={30} color={theme.primary} />
        </TouchableOpacity>
        <Text style={styles.title}>{title}</Text>
      </View>
      {customRightComponent}
    </View>
  );
};

const getStyles = (theme) => StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    backgroundColor: theme.background,
    position: 'absolute',
    top: 0,
    width: '100%',
    height: 45,
    elevation: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.primary,
    marginLeft: 10,
  },
  button: {
    padding: 3,
  },
});

export default CustomHeader;
