import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import React, { useMemo, useState } from 'react';
import { useTheme } from '../../constants/colors';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import DatePicker from 'react-native-date-picker';

const VadeSelection = ({vadeDate, setVadeDate}) => {
  const theme = useTheme();
  const styles = useMemo(() => getStyles(theme), [theme]);


  const [days, setDays] = useState('');
  const [datePickerModalVisible, setDatePickerModalVisible] = useState(false);

 const handleDaysChange = (text) => {
    if (text === '0') {
      setDays('');
      setVadeDate(new Date());
      return;
    }
    setDays(text);
    if (!isNaN(text) && text !== '') {
      const newDate = new Date();
      newDate.setDate(newDate.getDate() + parseInt(text, 10));
      setVadeDate(newDate);
    } else {
      setVadeDate(new Date());
    }
  };

  const handleDatePickerConfirm = (date) => {
    setVadeDate(date);
    // calculate days between selected date and now
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Clear the time part for accurate date comparison
    const diffTime = date.getTime() - today.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    setDays(diffDays === 0 ? '' : diffDays.toString());
    setDatePickerModalVisible(false);
  };

  const handleDatePickerCancel = () => {
    setDatePickerModalVisible(false);
  };

  return (
    <View style={styles.vadeSection}>
      <View style={styles.vadeInputContainer}>
        <TouchableOpacity style={styles.vadeLabelContainer}>
          <Text style={styles.vadeLabel}>Vade:</Text>
        </TouchableOpacity>
        <View style={{flex: 1, flexDirection: 'row', height: '100%'}}>
          <View style={styles.vadeDayInput}>
            <TextInput
              style={styles.vadeDayTextInput}
              placeholder='Gün'
              placeholderTextColor={theme.textAlt}
              keyboardType='number-pad'
              selectTextOnFocus
              value={days}
              onChangeText={handleDaysChange}
            />
          </View>
          <TouchableOpacity style={styles.vadeDatePreview} onPress={() => setDatePickerModalVisible(true)}>
            <View style={styles.vadeDatePreviewTextContainer}>
              <Text style={styles.vadeDatePreviewText}>{vadeDate.toLocaleDateString('tr-TR')}</Text>
            </View>
            <View style={styles.vadeDateChooseButton}>
              <FontAwesome name='calendar' size={20} color={theme.background} />
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <DatePicker
        open={datePickerModalVisible}
        date={vadeDate}
        mode='date'
        onConfirm={handleDatePickerConfirm}
        onCancel={handleDatePickerCancel}
        modal
        minimumDate={new Date()}
        locale='tr'
        theme={theme.type === 'light' ? 'light' : 'dark'}
        title={'Vade Tarihi Seç'}
        cancelText='İptal'
        confirmText='Onayla'
      />
    </View>
  );
}

const getStyles = (theme) => StyleSheet.create({
  vadeSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginTop: 14,
    paddingHorizontal: 20,
  },
  vadeInputContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.primary,
    borderRadius: 5,
    height: 50,
    overflow: 'hidden',
  },
  vadeLabelContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderRightWidth: 1,
    borderRightColor: theme.primary,
    height: '100%',
  },
  vadeLabel: {
    color: theme.primary,
    fontSize: 16,
    marginLeft: 10,
    marginRight: 5,
    fontWeight: 'bold',
  },
  vadeDayInput: {
    width: 70,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 1,
    borderRightColor: theme.primary,
  },
  vadeDayTextInput: {
    width: 70,
    height: '100%',
    textAlign: 'center',
    padding: 0,
    paddingHorizontal: 8,
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 16,
    color: theme.text,
  },
  vadeDatePreview: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  vadeDatePreviewTextContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  vadeDatePreviewText: {
    color: theme.text,
    fontSize: 16,
  },
  vadeDateChooseButton: {
    width: 50,
    height: '100%',
    backgroundColor: theme.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default VadeSelection;
