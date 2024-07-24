import React, {useState} from 'react';
import { StyleSheet, View, Text, Pressable, Touchable, TouchableOpacity, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import { useTheme } from '../constants/colors';

import { useDispatch, useSelector } from 'react-redux';
import { changeTheme } from '../features/themeData/themeSlice';
import DrawerMenu from './DrawerMenu';


const CustomBottomTab = ({ navigation }) => {
  const theme = useTheme();
  const styles = getStyles(theme);

  const dispatch = useDispatch();
  const currentTheme = useSelector((state) => state.themeData.value);

  const toggleTheme = () => {
    dispatch(changeTheme());
  };

  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.tabButton}
        onPress={toggleTheme}
      >
        {currentTheme === 'light' ?
          <Icon name="sunny-outline" size={24} color={theme.primary} />
          :
          <Icon name="moon-outline" size={24} color={theme.primary} />
        }
        <Text style={styles.tabButtonText}>Tema</Text>
      </TouchableOpacity>

      <View 
        style={styles.emptyButton}
      >
      </View>
      <Pressable 
        style={styles.menuButton}
        onPress={() => setModalVisible(true)}
      >
        <Icon name="menu" size={50} color={theme.background} />
      </Pressable>
      <TouchableOpacity 
        style={styles.tabButton}
        onPress={() => navigation.navigate('Settings')}
      >
        <Icon name="settings-outline" size={24} color={theme.primary} />
        <Text style={styles.tabButtonText}>Ayarlar</Text>
      </TouchableOpacity>
      <DrawerMenu modalVisible={modalVisible} setModalVisible={setModalVisible} navigation={navigation} />
    </View>  
  );
}

const getStyles = (theme) => StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: theme.backgroundAlt,
    height: 54,
    elevation: 4,
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  tabButton: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 6,
  },
  tabButtonText: {
    color: theme.primary,
    fontSize: 10,
  },
  menuButton: {
    backgroundColor: theme.primary,
    borderRadius: 50,
    padding: 6,
    position: 'absolute',
    bottom: 10,
    left: Dimensions.get('window').width / 2 - 31,
    elevation: 6,
  },
  emptyButton: {
    width: 56,
    height: 56,
  },
});

export default CustomBottomTab;