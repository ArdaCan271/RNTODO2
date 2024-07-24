import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import React, { useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from '../constants/colors';

import { useTheme } from '../constants/colors';

import { setEmail, setPassword } from '../features/loginData/loginDataSlice';

const DrawerMenu = ({ modalVisible, setModalVisible, navigation }) => {
  const dispatch = useDispatch();

  const theme = useTheme();
  const styles = useMemo(() => getStyles(theme), [theme]);

  const userName = useSelector((state) => state.userData.data['user-name']);

  const handleLogout = () => {
    dispatch(setEmail(''));
    dispatch(setPassword(''));
    navigation.navigate('Login');
  }

  const handleSettingsPress = () => {
    setModalVisible(false);
    navigation.navigate('Settings');
  }

  return (
    <Modal
      isVisible={modalVisible}
      onBackdropPress={() => setModalVisible(false)}
      onBackButtonPress={() => setModalVisible(false)}
      animationIn="slideInRight"
      animationOut="slideOutRight"
      style={{ 
        margin: 0,
      }}
      backdropOpacity={0.4}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.userName}>{userName}</Text>
        </View>
        <TouchableOpacity style={styles.menuItem} onPress={handleSettingsPress}>
          <Ionicons name="settings-outline" size={20} color={theme.primary} />
          <Text style={styles.menuText}>Ayarlar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={() => { /* Handle Notifications press */ }}>
          <Ionicons name="notifications-outline" size={20} color={theme.primary} />
          <Text style={styles.menuText}>Bildirimler</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={() => { /* Handle Technical Support press */ }}>
          <Ionicons name="headset-outline" size={20} color={theme.primary} />
          <Text style={styles.menuText}>Teknik Destek</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItemLogout} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={20} color={theme.primary} />
          <Text style={styles.menuText}>Çıkış yap</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}

const getStyles = (theme) => StyleSheet.create({
  container: {
    position: 'absolute',
    right: 0,
    width: '65%',
    height: '100%',
    backgroundColor: theme.background,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 30,
    paddingHorizontal: 10,
    elevation: 10,
  },
  header: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: 10,
    borderBottomWidth: 1,
    borderBottomColor: theme.textAlt,
    marginBottom: 10,
    paddingBottom: 6,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.primary,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    width: '100%',
    backgroundColor: theme.backgroundAlt,
    borderRadius: 5,
    marginTop: 10,
  },
  menuItemLogout: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    width: '100%',
    position: 'absolute',
    bottom: 0,
    marginBottom: 20,
    backgroundColor: theme.backgroundAlt,
    borderRadius: 5,
  },
  menuText: {
    fontSize: 16,
    marginLeft: 10,
    color: theme.text,
  },
});

export default DrawerMenu;
