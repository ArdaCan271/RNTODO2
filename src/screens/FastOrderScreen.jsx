import { StyleSheet, Text, View, BackHandler, ScrollView } from 'react-native';
import React, { useEffect } from 'react';
import { useTheme } from '../constants/colors';

import CustomHeader from '../components/CustomHeader';

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
      <ScrollView stickyHeaderIndices={[0, 2, 4]} contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.stickyHeader}>
          <Text style={styles.headerText}>Sticky Header 1</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionText}>Content under Header 1</Text>
        </View>
        <View style={styles.stickyHeader}>
          <Text style={styles.headerText}>Sticky Header 2</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionText}>Content under Header 2</Text>
        </View>
        <View style={styles.stickyHeader}>
          <Text style={styles.headerText}>Sticky Header 3</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionText}>Content under Header 3</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionText}>Content under Header 3</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionText}>Content under Header 3</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionText}>Content under Header 3</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionText}>Content under Header 3</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionText}>Content under Header 3</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionText}>Content under Header 3</Text>
        </View>
      </ScrollView>
    </View>
  );
};

const getStyles = (theme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
    paddingTop: theme.padding.header,
  },
  scrollViewContent: {
    paddingHorizontal: 20,
  },
  stickyHeader: {
    height: 50,
    backgroundColor: theme.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 18,
    color: theme.textOnPrimary,
  },
  section: {
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.secondary,
    marginVertical: 10,
  },
  sectionText: {
    fontSize: 16,
    color: theme.text,
  },
  text: {
    fontSize: 18,
    color: theme.text,
  },
});

export default FastOrderScreen;
