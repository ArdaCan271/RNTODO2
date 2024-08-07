import React, { useMemo } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useTheme } from '../constants/colors';

import Ionicons from 'react-native-vector-icons/Ionicons';

const CustomHeader = ({ navigation, title, hasDrawer, rightButtonOnPress, rightButtonIcon }) => {
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
      <TouchableOpacity style={styles.button} onPress={handleButtonPress}>
        <Ionicons name={hasDrawer ? 'menu' : 'caret-back'} size={30} color={theme.primary} />
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
      {rightButtonOnPress &&
        <TouchableOpacity style={styles.rightButtonContainer} onPress={rightButtonOnPress}>
          <Ionicons name={rightButtonIcon} size={30} color={theme.primary} />
        </TouchableOpacity>
      }
    </View>
  );
};

const getStyles = (theme) => StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    backgroundColor: theme.backgroundAlt,
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
    paddingLeft: 10,
    width: '80%',
  },
  button: {
    padding: 3,
  },
  rightButtonContainer: {
    padding: 3,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: theme.primary,
    backgroundColor: theme.background,
  },
});

export default CustomHeader;
