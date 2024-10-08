import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useMemo, useState } from 'react';
import { useTheme } from '../../constants/colors';
import DatePicker from 'react-native-date-picker';

import FontAwesome from 'react-native-vector-icons/FontAwesome';

const DeliveryDateSelection = ({deliveryDate, setDeliveryDate}) => {
  const theme = useTheme();
  const styles = useMemo(() => getStyles(theme), [theme]);

  const [datePickerModalVisible, setDatePickerModalVisible] = useState(false);

  const handleDatePickerConfirm = (date) => {
    setDeliveryDate(date);
    setDatePickerModalVisible(false);
  };

  const handleDatePickerCancel = () => {
    setDatePickerModalVisible(false);
  };

  return (
    <View style={styles.deliveryDateSection}>
      <View style={styles.deliveryDateInputContainer}>
        <View style={styles.deliveryDateLabelContainer}>
          <Text style={styles.deliveryDateLabel}>Teslim Tarihi:</Text>
        </View>
        <View style={styles.deliveryDateSelector}>
          <TouchableOpacity
            onPress={() => setDatePickerModalVisible(true)}
            style={{width: '100%', height: '100%', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row'}}
          >
            <View style={styles.deliveryDatePreviewTextContainer}>
              <Text style={styles.deliveryDatePreviewText}>{deliveryDate.toLocaleDateString('tr-TR')}</Text>
            </View>
            <View style={styles.deliveryDateChooseButton}>
              <FontAwesome name='calendar' size={20} color={theme.background} />
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <DatePicker
        open={datePickerModalVisible}
        date={deliveryDate}
        mode='date'
        onConfirm={handleDatePickerConfirm}
        onCancel={handleDatePickerCancel}
        modal
        minimumDate={new Date()}
        locale='tr'
        theme={theme.type === 'light' ? 'light' : 'dark'}
        title={'Teslim Tarihi Seç'}
        cancelText='İptal'
        confirmText='Onayla'
      />
    </View>
  );
}

const getStyles = (theme) => StyleSheet.create({
  deliveryDateSection: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginTop: 14,
    paddingHorizontal: 20,
  },
  deliveryDateInputContainer: {
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
  deliveryDateLabelContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderRightWidth: 1,
    borderRightColor: theme.primary,
    height: '100%',
  },
  deliveryDateLabel: {
    color: theme.primary,
    fontSize: 16,
    marginLeft: 10,
    marginRight: 5,
    fontWeight: 'bold',
  },
  deliveryDateSelector: {
    flex: 1,
  },
  deliveryDatePreviewTextContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    flex: 1,
  },
  deliveryDatePreviewText: {
    color: theme.text,
    fontSize: 16,
  },
  deliveryDateChooseButton: {
    width: 50,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.primary,
  },
});

export default DeliveryDateSelection;
