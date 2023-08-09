import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Dimensions, Slider, TouchableOpacity } from 'react-native';
import {Picker} from '@react-native-picker/picker';

import { Feather } from '@expo/vector-icons';
import { WorkoutDataContext, WorkoutDataSetterContext } from '../../App'; // Importieren der Contexts
import { useNavigation } from '@react-navigation/native'; // Importiere useNavigation Hook
import AsyncStorage, { useAsyncStorage}  from '@react-native-async-storage/async-storage'
import * as SQLite from 'expo-sqlite';
const db = SQLite.openDatabase('dbName3');

import WorkoutSingleHistoryCard from '../workout_single_history_card';

const windowWidth = Dimensions.get('window').width;

const RepsSelectorScreen = ({ route }) => {
  const { workoutName, setIndex } = route.params; // Holen des übergebenen Titels aus den Navigationsparametern
  const [repetitions, setRepetitions] = useState(10);
  const [weight, setWeight] = useState(50);
  const [historyData, setHistoryData] = useState([])

  const navigation = useNavigation(); // Initialisiere das navigation Objekt

  const workoutData = useContext(WorkoutDataContext);
  const setWorkoutData = useContext(WorkoutDataSetterContext); // useContext für setWorkoutData aufrufen

  const handleRepetitionsChange = (value) => {
    setRepetitions(value);
  };

  const handleWeightChange = (value) => {
    setWeight(value);
  };

  const handleSave = () => {
    console.log('Daten wurden gespeichert.');
    
    // Überprüfen, ob das Workout bereits im workoutData-Array existiert
    if (workoutData[workoutName]) {
      // Wenn ja, erstelle eine Kopie des Workout-Arrays und aktualisiere den Eintrag für den aktuellen setIndex
      const updatedWorkoutData = { ...workoutData };
      updatedWorkoutData[workoutName][setIndex] = [repetitions, weight];
      setWorkoutData(updatedWorkoutData);
      saveToAsyncStorage(updatedWorkoutData);
    } else {
      // Wenn nicht, erstelle ein neues Workout-Array und füge den Eintrag für den aktuellen setIndex hinzu
      const newWorkoutData = { ...workoutData, [workoutName]: [undefined, undefined, undefined, undefined, undefined, undefined] };
      newWorkoutData[workoutName][setIndex] = [repetitions, weight];
      setWorkoutData(newWorkoutData);
      saveToAsyncStorage(newWorkoutData);
    }
    navigation.goBack();
    console.log(workoutData);
  };

  async function saveToAsyncStorage(data) {
    try {
      await AsyncStorage.setItem('workoutData', JSON.stringify(data));
      console.log('workoutData wurde gespeichert:');
    } catch (error) {
      console.log('Fehler beim Speichern der Daten:', error);
    }
  }

  const handleDelete = () => {
    console.log('Satz wurde gelöscht.');
    
    // Überprüfen, ob das Workout im workoutData-Array existiert
    if (workoutData[workoutName]) {
      // Erstelle eine Kopie des Workout-Arrays
      const updatedWorkoutData = { ...workoutData };
      
      // Setze den Eintrag für den aktuellen setIndex auf None
      updatedWorkoutData[workoutName][setIndex] = undefined;
      
      setWorkoutData(updatedWorkoutData);
    }
    navigation.goBack();
    console.log(workoutData);
  };
  
  
  const getWeightPlaceholder = () => {
    if (!workoutData[workoutName]) return 1
    if (!workoutData[workoutName][setIndex]) return 1

    return workoutData[workoutName][setIndex][1]
  };

  const getRepPlaceholder = () => {
    if (!workoutData[workoutName]) return 1
    if (!workoutData[workoutName][setIndex]) return 1

    return workoutData[workoutName][setIndex][0]
  };

  useEffect(() => {
    setRepetitions(getRepPlaceholder());
    setWeight(getWeightPlaceholder());

    const fetchData = async () => {
      try {
        const historyDataResult = await new Promise((resolve, reject) => {
          db.transaction(txn => {
            txn.executeSql(
              "SELECT * FROM past_single_workouts WHERE name = ? ORDER BY id DESC LIMIT 3;",
              [workoutName],
              (sqlTxn, res) => {
                const rows = res.rows;
                const rowData = [];

                for (let i = 0; i < rows.length; i++) {
                  rowData.push(rows.item(i));
                }

                resolve(rowData);
              },
              error => {
                reject(error);
              }
            );
          });
        });

        setHistoryData(historyDataResult);
      } catch {

      }}

      fetchData();



  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.sectionTitle}>{workoutName} | Set {setIndex + 1}</Text>
        <View>
          <View style={styles.pickerContainer}>
            <View style={styles.pickerItem}>
              <View style={styles.pickerLabelContainer}>
                  <Text style={styles.pickerLabel}>Reps</Text>
              </View>
              <Picker
                selectedValue={repetitions}
                style={styles.picker}
                onValueChange={handleRepetitionsChange}
              >
                {Array.from({ length: 30 }, (_, index) => (
                  <Picker.Item
                    key={index}
                    label={`${index} x`}
                    value={index}
                  />
                ))}
              </Picker>
            </View>

            <View style={styles.pickerItem}>
              <View style={styles.pickerLabelContainer}>
                <Text style={styles.pickerLabel}>Weight</Text>
              </View>
              <Picker
                selectedValue={weight}
                style={styles.picker}
                onValueChange={handleWeightChange}
              >
                {Array.from({ length: 150 }, (_, index) => (
                  <Picker.Item
                    key={index + 1}
                    label={`${index + 1} kg`}
                    value={index + 1}
                  />
                ))}
              </Picker>

            </View>
            <View style={styles.pickerItem}>
              <View style={styles.pickerLabelContainer}>
                  <Text style={styles.pickerLabel}>+</Text>
              </View>
              <Picker
                selectedValue={repetitions}
                style={styles.picker}
                onValueChange={handleRepetitionsChange}
              >
                <Picker.Item label="1" value={1} />
                <Picker.Item label="2" value={2} />
                {/* Weitere Optionen hier */}
              </Picker>
            </View>
          </View>
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>Speichern</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
            <Text style={styles.deleteButtonText}>Löschen</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.historyContainer}>
          <Text style={styles.sectionTitle}>Set History</Text>
          <ScrollView>
          {Object.keys(historyData).map((key) => (
            <WorkoutSingleHistoryCard time={historyData[key].time} setData={historyData[key].set_data} workoutName={workoutName} setIndex={setIndex}></WorkoutSingleHistoryCard>
          ))}
            
          </ScrollView>
        </View>

      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
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
  pickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 35,
  },
  pickerItem: {
    flex: 1,
    marginRight: 16,
  },
  pickerLabelContainer: {
    backgroundColor: '#d4d4d4',
    borderRadius: 5,
    padding: 5,
  },
  pickerLabel: {
    fontSize: 16,
    marginBottom: 2,
    marginLeft: 3,
  },
  picker: {
    height: 10,
    width: '100%',
  },
  saveButton: {
    backgroundColor: '#f7f7f7',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginTop: 150,
    shadowColor: '#262424',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  deleteButton: {
    backgroundColor: '#FF0000',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginTop: 16,
    shadowColor: '#262424',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  historyContainer: {
    //flexDirection: 'row',
    marginTop: 35,
  },
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
    backgroundColor: '#6fc972',
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginTop: 6,
    marginRight: 6,
  },
});

export default RepsSelectorScreen;
