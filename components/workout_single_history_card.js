import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';

const workout_singles_DATA = require('../data/workout_singles.json');



function formatTimestamp(timestamp) {
  const oneDayInMilliseconds = 24 * 60 * 60 * 1000;
  const oneWeekInMilliseconds = 7 * oneDayInMilliseconds;

  const currentDate = new Date();
  const date1 = new Date(timestamp);

  const isToday =
    currentDate.getDate() === date1.getDate() &&
    currentDate.getMonth() === date1.getMonth() &&
    currentDate.getFullYear() === date1.getFullYear();

  const isWithin7Days = currentDate - date1 <= oneWeekInMilliseconds;

  if (isToday) {
    return 'Heute';
  } else if (isWithin7Days) {
    const weekday = [
      'Sonntag',
      'Montag',
      'Dienstag',
      'Mittwoch',
      'Donnerstag',
      'Freitag',
      'Samstag',
    ][date1.getDay()];
    return weekday;
  } else {
    return date1.toLocaleDateString('de-DE');
  }
}


const WorkoutSingleHistoryCard = ({ time, setData, workoutName, setIndex }) => {
  const setDataParsed = JSON.parse(setData)
  console.log(typeof setDataParsed)
  console.log(setDataParsed[0])

  const setCount = workout_singles_DATA[workoutName].sets

  const timeFormatted = formatTimestamp(parseInt(time))

  return (
    <View style={styles.historyCard}>
      <Text>{timeFormatted}</Text>
      <View style={styles.cardRow}>
        {
          Array.from({ length: setCount }).map((_, i) => (
            setDataParsed[i] != undefined ? (
              <View key={i} style={styles.labelContainer}>
                <Text>{setDataParsed[i][0] + " x " + setDataParsed[i][1] + " kg"}</Text>
              </View>
            ) : (
              <View key={i} style={styles.labelContainer}>
                <Text>/</Text>
              </View>
            )
          ))
        }
      </View>
    </View>
  );
  
}
  


const styles = StyleSheet.create({
  historyCard: {
    backgroundColor: '#f7f7f7',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 16,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
    marginBottom: 16,
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  labelContainer: {
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginTop: 6,
    marginRight: 6,
  },
});

export default WorkoutSingleHistoryCard;
