import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Dimensions, TouchableOpacity, Vibration } from 'react-native';
import { Feather } from '@expo/vector-icons';
const workout_types_DATA = require('../data/workout_types.json');
import TrainingTypeCard from './training_type_card';
import { WorkoutDataContext, WorkoutDataSetterContext } from '../App';
import AsyncStorage, { useAsyncStorage}  from '@react-native-async-storage/async-storage'
import HapticFeedback from 'react-native-haptic-feedback';
import { useNavigation } from '@react-navigation/native';

import { saveWorkout } from '../backend/saveWorkout';

const windowWidth = Dimensions.get('window').width;

const Training = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [currentTime, setCurrentTime] = useState(null);
  const workoutData = useContext(WorkoutDataContext);
  const SetWorkoutData = useContext(WorkoutDataSetterContext);
  const navigation = useNavigation();

  const goToArchive = () => navigation.navigate('ArchiveList')

  useEffect(() => {
    let intervalId;

    if (workoutData["_DETAILS"]?.time) {
      setIsRunning(true);
      setStartTime(workoutData["_DETAILS"].time);
      setCurrentTime(Date.now());
    }

    if (isRunning) {
      intervalId = setInterval(() => {
        setCurrentTime(Date.now());
      }, 1000);
    } else {
      clearInterval(intervalId);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [isRunning]);

  const handleStartStop = () => {
    if (isRunning) {
      setIsRunning(false);
      setCurrentTime(null);
      Vibration.cancel();
      console.log("END");
      saveWorkout(workoutData)
      //saveToArchive(workoutData)
      SetWorkoutData([]);
      saveToAsyncStorage([]);
    } else {
      setIsRunning(true);
      setStartTime(Date.now());
      HapticFeedback.trigger('impactLight'); // Vibration

      const newWorkoutData = { ...workoutData, _DETAILS: { time: Date.now() } };
      SetWorkoutData(newWorkoutData);
       saveToAsyncStorage(newWorkoutData);
    }
  };

  async function saveToArchive(dataaa) {
    try {
      let data = await AsyncStorage.getItem('workoutArchive');
      var newData = data ? JSON.parse(data) : {}; // Wert initialisieren, wenn data null ist
  
      console.log(newData);
  
      newData[Math.floor(Math.random() * 1000)] = dataaa; // FUNKTIONIERT NOCH NICHT GANZ
      console.log(dataaa)
      console.log(newData)

      try {
        await AsyncStorage.setItem('workoutArchive', JSON.stringify(newData));
        console.log('workoutArchive wurde gespeichert:');
      } catch (error) {
        console.log('Fehler beim Speichern der Daten workoutArchive:', error);
      }
    } catch (error) {
      console.log('Fehler beim Wiederherstellen der Daten workoutArchive:', error);
    }
  }
  
  
  

  async function saveToAsyncStorage(data) {
    try {
      await AsyncStorage.setItem('workoutData', JSON.stringify(data));
      console.log('workoutData wurde gespeichert:');
    } catch (error) {
      console.log('Fehler beim Speichern der Daten:', error);
    }
  };

  const calculateElapsedTime = () => {
    if (startTime && currentTime) {
      return currentTime - startTime;
    }
    return 0;
  };

  const formatTime = (ms) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.timerContainer}>
        <View style={styles.timerBar}>
            <Feather style={styles.startStopButton}
            name={isRunning ? 'stop-circle' : 'play-circle'}
            size={48}
            color={isRunning ? '#FF0000' : '#00b52a'}
            onPress={handleStartStop}
            />
            <Text style={styles.timer}>{formatTime(calculateElapsedTime()) + ",-"}</Text>
        </View>
      </View>
      <ScrollView style={styles.content}>
        <Text style={styles.sectionTitle}>Deine Trainingseinheiten</Text>
        {/* Hier kommen die Trainingseinheiten hin */}
        {Object.keys(workout_types_DATA).map((name) => {
            return <TrainingTypeCard title={name}></TrainingTypeCard>
        })}
        <Text style={styles.sectionTitle}>Einstellungen</Text>
        <TouchableOpacity style={styles.TrainingTypeCard} onPress={goToArchive}>
          <View style={{ flexDirection: 'row' }}>
                <Feather name="server" size={20} color="#000000" style={{ marginLeft: 5 }} />
                <Text style={{ marginLeft: 10, fontSize: 18 }}>{"Archiv"}</Text>
            </View>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 5,
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  startStopButton: {
    padding: 8,
  },
  timerContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  timerBar: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 70,
    width: windowWidth * 0.9,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  timerProgress: {
    height: 6,
    backgroundColor: '#FF0000',
  },
  timer: {
    fontSize: 32,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
});

export default Training;
