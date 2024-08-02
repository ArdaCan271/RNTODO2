import { StyleSheet, Text, View, BackHandler, ScrollView } from 'react-native';
import React, { useEffect } from 'react';
import { useTheme } from '../constants/colors';

import CustomHeader from '../components/CustomHeader';

import { SyncedScrollView } from '../components/tableComponents/SyncedScrollView';
import { SyncedScrollViewContext, syncedScrollViewState } from '../contexts/SyncedScrollViewContext';

const FastOrderScreen = ({ navigation }) => {
  const theme = useTheme();
  const styles = getStyles(theme);

  useEffect(() => {
    const backAction = () => {
      navigation.goBack();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    return () => backHandler.remove();
  }, [navigation]);

  return (
    <View style={styles.container}>
      <CustomHeader
        title={'Hızlı Sipariş'}
        navigation={navigation}
      />
      <View
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: "lightgreen",
        }}
      >
        <SyncedScrollViewContext.Provider value={syncedScrollViewState}>
          <View style={{ width: 100, height: 32, backgroundColor: 'red', zIndex: 1, borderWidth: 1, borderColor: 'black', position: 'absolute', top: 0, left: 0 }} />
          <View style={{ width: '100%', height: 32 }}>
            <SyncedScrollView
              id={0}
              horizontal
              showsHorizontalScrollIndicator={false}
            >
              <View style={{ width: 100, height: 32, backgroundColor: 'lightblue', borderWidth: 1, borderColor: 'black' }} />
              <View style={{ width: 100, height: 32, backgroundColor: 'lightblue', borderWidth: 1, borderColor: 'black' }} />
              <View style={{ width: 100, height: 32, backgroundColor: 'lightblue', borderWidth: 1, borderColor: 'black' }} />
              <View style={{ width: 100, height: 32, backgroundColor: 'lightblue', borderWidth: 1, borderColor: 'black' }} />
              <View style={{ width: 100, height: 32, backgroundColor: 'lightblue', borderWidth: 1, borderColor: 'black' }} />
              <View style={{ width: 100, height: 32, backgroundColor: 'lightblue', borderWidth: 1, borderColor: 'black' }} />
            </SyncedScrollView>
          </View>
          <ScrollView>
            <View style={{ width: '100%', height: '100%', backgroundColor: 'yellow', flexDirection: 'row' }}>

              <View style={{ backgroundColor: 'dodgerblue', width: 100 }}>
                <View style={{ width: 100, height: 32, backgroundColor: 'dodgerblue', borderWidth: 1, borderColor: 'black' }} />
                <View style={{ width: 100, height: 32, backgroundColor: 'dodgerblue', borderWidth: 1, borderColor: 'black' }} />
                <View style={{ width: 100, height: 32, backgroundColor: 'dodgerblue', borderWidth: 1, borderColor: 'black' }} />
                <View style={{ width: 100, height: 32, backgroundColor: 'dodgerblue', borderWidth: 1, borderColor: 'black' }} />
                <View style={{ width: 100, height: 32, backgroundColor: 'dodgerblue', borderWidth: 1, borderColor: 'black' }} />
                <View style={{ width: 100, height: 32, backgroundColor: 'dodgerblue', borderWidth: 1, borderColor: 'black' }} />
                <View style={{ width: 100, height: 32, backgroundColor: 'dodgerblue', borderWidth: 1, borderColor: 'black' }} />
                <View style={{ width: 100, height: 32, backgroundColor: 'dodgerblue', borderWidth: 1, borderColor: 'black' }} />
                <View style={{ width: 100, height: 32, backgroundColor: 'dodgerblue', borderWidth: 1, borderColor: 'black' }} />
                <View style={{ width: 100, height: 32, backgroundColor: 'dodgerblue', borderWidth: 1, borderColor: 'black' }} />
                <View style={{ width: 100, height: 32, backgroundColor: 'dodgerblue', borderWidth: 1, borderColor: 'black' }} />
                <View style={{ width: 100, height: 32, backgroundColor: 'dodgerblue', borderWidth: 1, borderColor: 'black' }} />
                <View style={{ width: 100, height: 32, backgroundColor: 'dodgerblue', borderWidth: 1, borderColor: 'black' }} />
                <View style={{ width: 100, height: 32, backgroundColor: 'dodgerblue', borderWidth: 1, borderColor: 'black' }} />
                <View style={{ width: 100, height: 32, backgroundColor: 'dodgerblue', borderWidth: 1, borderColor: 'black' }} />
                <View style={{ width: 100, height: 32, backgroundColor: 'dodgerblue', borderWidth: 1, borderColor: 'black' }} />
                <View style={{ width: 100, height: 32, backgroundColor: 'dodgerblue', borderWidth: 1, borderColor: 'black' }} />
                <View style={{ width: 100, height: 32, backgroundColor: 'dodgerblue', borderWidth: 1, borderColor: 'black' }} />
                <View style={{ width: 100, height: 32, backgroundColor: 'dodgerblue', borderWidth: 1, borderColor: 'black' }} />
                <View style={{ width: 100, height: 32, backgroundColor: 'dodgerblue', borderWidth: 1, borderColor: 'black' }} />
                <View style={{ width: 100, height: 32, backgroundColor: 'dodgerblue', borderWidth: 1, borderColor: 'black' }} />
                <View style={{ width: 100, height: 32, backgroundColor: 'dodgerblue', borderWidth: 1, borderColor: 'black' }} />
                <View style={{ width: 100, height: 32, backgroundColor: 'dodgerblue', borderWidth: 1, borderColor: 'black' }} />
                <View style={{ width: 100, height: 32, backgroundColor: 'dodgerblue', borderWidth: 1, borderColor: 'black' }} />
                <View style={{ width: 100, height: 32, backgroundColor: 'dodgerblue', borderWidth: 1, borderColor: 'black' }} />
                <View style={{ width: 100, height: 32, backgroundColor: 'dodgerblue', borderWidth: 1, borderColor: 'black' }} />
                <View style={{ width: 100, height: 32, backgroundColor: 'dodgerblue', borderWidth: 1, borderColor: 'black' }} />
                <View style={{ width: 100, height: 32, backgroundColor: 'dodgerblue', borderWidth: 1, borderColor: 'black' }} />
                <View style={{ width: 100, height: 32, backgroundColor: 'dodgerblue', borderWidth: 1, borderColor: 'black' }} />
                <View style={{ width: 100, height: 32, backgroundColor: 'dodgerblue', borderWidth: 1, borderColor: 'black' }} />
                <View style={{ width: 100, height: 32, backgroundColor: 'dodgerblue', borderWidth: 1, borderColor: 'black' }} />
              </View>
              <View>
                <SyncedScrollView id={1} horizontal>
                  <View style={{ backgroundColor: 'lime', borderWidth: 1, borderColor: 'black' }}>
                    <View style={{ width: 600, height: 32, backgroundColor: 'lime', borderRightWidth: 1, borderBottomWidth: 1, borderColor: 'black' }}>
                      <Text style={styles.text}>Hızlı SiparişHızlı SiparişHızlı SiparişHızlı SiparişHızlı SiparişHızlı Sipariş</Text>
                    </View>
                    <View style={{ width: 600, height: 32, backgroundColor: 'lime', borderRightWidth: 1, borderBottomWidth: 1, borderColor: 'black' }} />
                    <View style={{ width: 600, height: 32, backgroundColor: 'lime', borderRightWidth: 1, borderBottomWidth: 1, borderColor: 'black' }} />
                    <View style={{ width: 600, height: 32, backgroundColor: 'lime', borderRightWidth: 1, borderBottomWidth: 1, borderColor: 'black' }} />
                    <View style={{ width: 600, height: 32, backgroundColor: 'lime', borderRightWidth: 1, borderBottomWidth: 1, borderColor: 'black' }} />
                    <View style={{ width: 600, height: 32, backgroundColor: 'lime', borderRightWidth: 1, borderBottomWidth: 1, borderColor: 'black' }} />
                    <View style={{ width: 600, height: 32, backgroundColor: 'lime', borderRightWidth: 1, borderBottomWidth: 1, borderColor: 'black' }} />
                    <View style={{ width: 600, height: 32, backgroundColor: 'lime', borderRightWidth: 1, borderBottomWidth: 1, borderColor: 'black' }} />
                  </View>
                </SyncedScrollView>
              </View>
            </View>
          </ScrollView>
        </SyncedScrollViewContext.Provider>
      </View>
    </View>
  );
};

const getStyles = (theme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
    paddingTop: theme.padding.header,
  },

  text: {
    fontSize: 18,
    color: theme.text,
  },
});

export default FastOrderScreen;
