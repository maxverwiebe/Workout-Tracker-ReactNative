import * as SQLite from 'expo-sqlite';
import getWorkoutPerformance from './getWorkoutPerformance';
const workout_singles_DATA = require('../data/workout_singles.json');
import { useNavigation } from '@react-navigation/native';

const db = SQLite.openDatabase('dbName3');

export const saveWorkout = (data) => {
  
  const createTables = () => {
    db.transaction(txn => {
      txn.executeSql(
        "CREATE TABLE IF NOT EXISTS past_single_workouts (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR, workoutTraining_id  INTEGER, time INTEGER, set_data TEXT)",
        [],
        (sqlTxn, res) => {
          console.log("Table past_single_workouts created!")
        },
        error => {
          console.log("Error (past_single_workouts)")
        }
      )
    })

    db.transaction(txn => {
      txn.executeSql(
        "CREATE TABLE IF NOT EXISTS past_workouts (id INTEGER PRIMARY KEY AUTOINCREMENT, starttime INTEGER, endtime INTEGER, workoutType VARCHAR, totalWeight INTEGER, performance INTEGER)",
        [],
        (sqlTxn, res) => {
          console.log("Table past_workouts created!")
        },
        error => {
          console.log("Error (past_workouts)")
        }
      )
    })
  }

  createTables();

  const getWorkoutType = () => {
    const lst = [];
    const workoutTypes = require('../data/workout_singles.json');
  
    Object.keys(data).forEach(element => {
      if (element !== "_DETAILS" && element !== undefined) {
        const workoutType = workoutTypes[element]?.type;
        if (workoutType && !lst.includes(workoutType)) {
          lst.push(workoutType);
        }
      }
    });
  
    return lst;
  };

  const workoutTypeCache = JSON.stringify(getWorkoutType())

  const addWorkout = () => {
    db.transaction(txn => {
      
      txn.executeSql(
        "SELECT totalWeight FROM past_workouts WHERE workoutType == (?) ORDER BY id DESC LIMIT 1;",
        [workoutTypeCache],
        (sqlTxn, res) => {
          var performance = 0

          if (res.rows?.item(0)) {
            performance = res.rows?.item(0).totalWeight
            performance = (getWorkoutPerformance() -performance)/performance * 100
          }

          txn.executeSql(
            "INSERT INTO past_workouts (starttime, endtime, workoutType, totalWeight, performance) VALUES (?, ?, ?, ?, ?)",
            [data["_DETAILS"].time, Date.now(), workoutTypeCache, getWorkoutPerformance(), performance],
            (sqlTxn, res) => {
              console.log("Inserted into past_workouts: ")
              console.log(res.insertId)
    
              Object.keys(data).forEach(element => {
                if (element != "_DETAILS" && element != undefined) { addSingleWorkout(element, res.insertId) }
              });
            
            },
            (sqlTxn, error) => {
              console.log("Error insertion (past_workouts)" + error.message)
            }
          )
        
        },
        (sqlTxn, error) => {
          console.log("Error insertion (past_workouts)" + error.message)
        }
      )
    })
  }
  
  const getWorkoutPerformance = () => {
    var result = 0

    Object.keys(data).forEach(element => {
      if (element !== "_DETAILS" && element !== undefined) {
        data[element].forEach(set => {
          if (set != undefined) {
            result = result + set[0] * set[1]
          }
        });
      }
    });

    return result
  }

  getWorkoutPerformance()

  const addSingleWorkout = (key, workoutTraining_id) => {
    db.transaction(txn => {
      txn.executeSql(
        "INSERT INTO past_single_workouts (name, workoutTraining_id, time, set_data) VALUES (?, ?, ?, ?)",
        [key, workoutTraining_id, Date.now(), JSON.stringify(data[key])],
        (sqlTxn, res) => {
          console.log("Inserted into past_single_workouts: "+ key)
        },
        error => {
          console.log("Error insertion (past_single_workouts)")
        }
      )
    })
  }
  addWorkout()
};
