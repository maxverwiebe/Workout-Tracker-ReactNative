import 'react-native-gesture-handler';
import React, { createContext, useState, useEffect } from 'react';
import AppNavigator from './components/appnavigator.js';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage, { useAsyncStorage}  from '@react-native-async-storage/async-storage'

export const WorkoutDataContext = createContext([]);
export const WorkoutDataSetterContext = createContext(() => {}); // Neuen Context für setWorkoutData erstellen

const App = () => {
  const [workoutData, setWorkoutData] = useState([]);

  useEffect(() => {
    const restoreData = async () => {
      try {
        const data = await AsyncStorage.getItem('workoutData');
        if (data) {
          setWorkoutData(JSON.parse(data));
          console.log(data)
        }
      } catch (error) {
        console.log('Fehler beim Wiederherstellen der Daten:', error);
      }
    };
  
    restoreData();
  }, []);
  

  return (
    <WorkoutDataContext.Provider value={workoutData}>
      <WorkoutDataSetterContext.Provider value={setWorkoutData}>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </WorkoutDataSetterContext.Provider>
    </WorkoutDataContext.Provider>
  );
};

export default App;
