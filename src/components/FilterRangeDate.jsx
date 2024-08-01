import { Button, Pressable, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';

import { useTheme } from '../constants/colors';

import DatePicker from 'react-native-date-picker';

const FilterRangeDate = ({ field, fieldFilters, setFieldFilters, filterModalInfo, onClose }) => {

  const theme = useTheme();
  const styles = getStyles(theme);

  const convertDateToTRFormat = (date) => {
    const dateObject = new Date(date);

    const day = String(dateObject.getDate()).padStart(2, '0');
    const month = String(dateObject.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const year = dateObject.getFullYear();

    return `${day}.${month}.${year}`;
  };


  const startDateString = fieldFilters[`${filterModalInfo.field}Start`];
  const endDateString = fieldFilters[`${filterModalInfo.field}End`];

  const [startDay, startMonth, startYear] = startDateString ? startDateString.split('.').map(Number) : [null, null, null];

  const [endDay, endMonth, endYear] = endDateString ? endDateString.split('.').map(Number) : [null, null, null];

  const [startDate, setStartDate] = useState(startDateString.length > 0 ? new Date(startYear, startMonth - 1, startDay) : new Date());
  const [endDate, setEndDate] = useState(endDateString.length > 0 ? new Date(endYear, endMonth - 1, endDay) : new Date());

  const [showStartDate, setShowStartDate] = useState(true);
  const [showEndDate, setShowEndDate] = useState(true);

  const [openStart, setOpenStart] = useState(false);
  const [openEnd, setOpenEnd] = useState(false);

  return (
    <View style={styles.container}>
      {/* <DatePicker
        modal
        open={openStart}
        date={startDate}
        mode='date'
        onConfirm={(date) => {
          setStartDate(date)
          setOpenStart(false)
          setShowStartDate(true)
        }}
        onCancel={() => {
          setOpenStart(false)
        }}
        title={'Başlangıç Tarihi Seç'}
        confirmText='Onayla'
        cancelText='İptal'
        maximumDate={showEndDate ? endDate : null}
      />
      <DatePicker
        modal
        open={openEnd}
        date={endDate}
        mode='date'
        onConfirm={(date) => {
          setEndDate(date)
          setOpenEnd(false)
          setShowEndDate(true)
        }}
        onCancel={() => {
          setOpenEnd(false)
        }}
        title={'Bitiş Tarihi Seç'}
        confirmText='Onayla'
        cancelText='İptal'
        minimumDate={showStartDate ? startDate : null}
      /> */}
      <View style={styles.dateButtonsContainer}>
        <View style={styles.startDateContainer}>
          {/* <TouchableOpacity style={styles.dateButton} onPress={() => setOpenStart(true)}>
            <Text style={styles.dateButtonText}>Başlangıç {filterModalInfo.title} Seç</Text>
          </TouchableOpacity>
          {showStartDate &&
            <View style={styles.dateTextContainer}>
              <Text style={styles.dateTitle}>Başlangıç {filterModalInfo.title}:</Text>
              <Text style={styles.dateText}>{convertDateToTRFormat(startDate)}</Text>
            </View>
          } */}
          <Text style={styles.dateTitle}>Başlangıç {filterModalInfo.title}:</Text>
          <DatePicker
            date={startDate}
            mode='date'
            maximumDate={showEndDate ? endDate : null}
            theme={theme.type === 'light' ? 'light' : 'dark'}
            onDateChange={setStartDate}
          />
        </View>
        <View style={styles.endDateContainer}>
          <Text style={styles.dateTitle}>Bitiş {filterModalInfo.title}:</Text>
          <DatePicker
            date={endDate}
            mode='date'
            minimumDate={showStartDate ? startDate : null}
            theme={theme.type === 'light' ? 'light' : 'dark'}
            onDateChange={setEndDate}
            
          />
          {/* <TouchableOpacity style={styles.dateButton} onPress={() => setOpenEnd(true)}>
            <Text style={styles.dateButtonText}>Bitiş {filterModalInfo.title} Seç</Text>
          </TouchableOpacity>
          {showEndDate &&
            <View style={styles.dateTextContainer}>
              <Text style={styles.dateTitle}>Bitiş {filterModalInfo.title}:</Text>
              <Text style={styles.dateText}>{convertDateToTRFormat(endDate)}</Text>
            </View>
          } */}
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
          <Text style={styles.cancelButtonText}>İptal</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.clearButton} onPress={() => {
          setFieldFilters({
            ...fieldFilters,
            [`${filterModalInfo.field}Start`]: '',
            [`${filterModalInfo.field}End`]: '',
          });
          onClose();
        }}>
          <Text style={styles.clearButtonText}>Kaldır</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.acceptButton} onPress={() => {
          setShowStartDate(true);
          setShowEndDate(true);
          setFieldFilters({
            ...fieldFilters,
            [`${filterModalInfo.field}Start`]: convertDateToTRFormat(startDate),
            [`${filterModalInfo.field}End`]: convertDateToTRFormat(endDate),
          });
          onClose();
        }}>
          <Text style={styles.acceptButtonText}>Onayla</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const getStyles = (theme) => StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dateTextContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dateTitle: {
    color: theme.text,
    width: '80%',
    marginTop: 4,
    fontSize: 16,
  },
  dateText: {
    color: theme.text,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  dateButtonsContainer: {
    width: '100%',
    justifyContent: 'space-around',
    paddingVertical: 20,
    rowGap: 20,
  },
  startDateContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  endDateContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dateButton: {
    padding: 10,
    backgroundColor: theme.primary,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.text,
  },
  dateButtonText: {
    color: theme.white,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 10,
    marginBottom: 15,
  },
  acceptButton: {
    backgroundColor: theme.primary,
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: theme.text,
  },
  acceptButtonText: {
    color: theme.white,
  },
  clearButton: {
    backgroundColor: theme.tableHighlight,
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: theme.text,
  },
  clearButtonText: {
    color: theme.text,
  },
  cancelButton: {
    backgroundColor: theme.red,
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: theme.text,
  },
  cancelButtonText: {
    color: theme.white,
  },
});

export default FilterRangeDate;