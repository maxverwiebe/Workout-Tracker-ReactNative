import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import WorkoutModal from './workout_modal';
import { WorkoutDataContext, WorkoutDataSetterContext } from '../App'; // Importieren der Contexts

const windowWidth = Dimensions.get('window').width;

const WorkoutSingleCard = ({ workoutName, setCount }) => {
  const navigation = useNavigation();
  const navigate = (setIndex) => {
    navigation.navigate('RepsSelector', { workoutName, setIndex });
  }

  const workoutData = useContext(WorkoutDataContext);

  function getButtonText(workoutName, index) {
    data = workoutData

    if (!data[workoutName]) return "n/A"
    if (!data[workoutName][index]) return "n/A"

    return data[workoutName][index][0] + " x " + data[workoutName][index][1]
  }

  function getButtonStyle(workoutName, index) {
    const data = workoutData;

    if (!data[workoutName] || !data[workoutName][index]) {
      return styles.setButton;
    } else {
      return [styles.setButton, { backgroundColor: '#98d4a8' }];
    }
  }

  return (
    <TouchableOpacity style={styles.WorkoutSingleCard}>
      <View style={styles.titleContainer}>
        <View style={styles.titleContent}>
          <Feather name="plus" size={20} color="#000000" style={styles.plusIcon} />
          <Text style={styles.titleText}>{workoutName}</Text>
        </View>
        <View style={styles.labelContainer}>
          <View style={styles.labelContent}>
          <Feather name="arrow-up" size={20} color="#000000" style={styles.labelIcon} />
          <Text style={styles.labelText}>2%</Text>
          </View>
        </View>
      </View>

      {Array.from({ length: setCount }, (_, index) => (
        <TouchableOpacity
          key={index}
          style={getButtonStyle(workoutName, index)}
          onPress={() => navigate(index)}
        >
          <Text style={styles.setButtonText}>Set {getButtonText(workoutName, index)}</Text>
        </TouchableOpacity>
      ))}
    </TouchableOpacity>
  );
};


const styles = StyleSheet.create({
  WorkoutSingleCard: {
    width: windowWidth * 0.9,
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 8,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
    marginBottom: 16,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  titleContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  plusIcon: {
    marginLeft: 5,
  },
  titleText: {
    marginLeft: 10,
    fontSize: 18,
  },
  labelContainer: {
    backgroundColor: '#6fc972',
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginLeft: 'auto',
  },
  labelText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  labelIcon: {
    color: 'white',
  },
  labelContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  setButton: {
    backgroundColor: '#EDEDED',
    padding: 8,
    borderRadius: 4,
    marginTop: 8,
  },
  setButtonText: {
    fontSize: 14,
    color: '#808080',
  },
});

export default WorkoutSingleCard;
