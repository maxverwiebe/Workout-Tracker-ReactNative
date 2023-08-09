import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Dimensions, TouchableOpacity, Vibration } from 'react-native';
import { Feather } from '@expo/vector-icons';
const workout_types_DATA = require('../../data/workout_types.json');
import { WorkoutDataContext, WorkoutDataSetterContext } from '../../App';
import AsyncStorage, { useAsyncStorage}  from '@react-native-async-storage/async-storage'
import WorkoutArchiveCard from '../workout_archive_card';
import * as SQLite from 'expo-sqlite';

const windowWidth = Dimensions.get('window').width;
const db = SQLite.openDatabase('dbName3');



const ArchiveList = () => {
  const [archiveData, setArchiveData] = useState([]);
  const [fluctationData, setFluctationData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const archiveDataResult = await new Promise((resolve, reject) => {
          db.transaction(txn => {
            txn.executeSql(
              "SELECT * FROM past_workouts ORDER BY id DESC;",
              [],
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

        const fluctationDataResult = await new Promise((resolve, reject) => {
          db.transaction(txn => {
            txn.executeSql(
              `SELECT t1.id, CASE WHEN t2.totalWeight IS NULL THEN 0 ELSE ((t1.totalWeight - t2.totalWeight) / t2.totalWeight) * 100 END AS weightFluctuation
              FROM past_workouts t1
              LEFT JOIN past_workouts t2 ON t1.id = t2.id + 1
              ORDER BY t1.id DESC;`,
              [],
              (sqlTxn, res) => {
                const rows = res.rows;
                const fluctations = {};

                for (let i = 0; i < rows.length; i++) {
                  fluctations[rows.item(i).id] = rows.item(i).weightFluctuation;
                }

                resolve(fluctations);
              },
              error => {
                reject(error);
              }
            );
          });
        });

        setArchiveData(archiveDataResult);
        setFluctationData(fluctationDataResult);
      } catch (error) {
        console.log("Error retrieving data: " + error);
      }
    };

    fetchData();
  }, []);
  

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.sectionTitle}>Vergangene Workouts</Text>
        <ScrollView>
        {Object.keys(archiveData).map((key) => (
          <View key={key}>
            <WorkoutArchiveCard key = {key} data = {archiveData[key]} fluctation = {fluctationData[key - 1]}></WorkoutArchiveCard>
          </View>
        ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    container: {
      marginTop: 5,
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
})

export default ArchiveList;
