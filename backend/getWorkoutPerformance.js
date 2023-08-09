import * as SQLite from 'expo-sqlite';
const workout_singles_DATA = require('../data/workout_singles.json');

const db = SQLite.openDatabase('dbName1');

export const getWorkoutPerformance = async (data) => {
    db.transaction(txn => {
      txn.executeSql(
        "SELECT 1 FROM past_workouts WHERE ",
        [],
        (sqlTxn, res) => {
          console.log("Table past_single_workouts created!")
        },
        error => {
          console.log("Error (past_single_workouts)")
        }
      )
    })
};

export default getWorkoutPerformance;