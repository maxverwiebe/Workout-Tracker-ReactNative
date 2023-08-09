import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import * as SQLite from 'expo-sqlite';
import { useNavigation } from '@react-navigation/native';

const db = SQLite.openDatabase('dbName3');

const windowWidth = Dimensions.get('window').width;

const ArchiveDetails = ({ route }) => {
    const [ setArchive, setSetArchive ] = useState([])
    const navigation = useNavigation();
    const { timestamp, duration, workoutType, id, performance } = route.params;

    useEffect(() => {
      db.transaction(txn => {
        txn.executeSql(
          "SELECT * FROM past_single_workouts WHERE workoutTraining_id = (?)",
          [id],
          (sqlTxn, res) => {
            const rows = res.rows;
            const rowData = [];
    
            for (let i = 0; i < rows.length; i++) {
              let item = rows.item(i);
              item.set_data = JSON.parse(item.set_data);
              rowData.push(item);
            }
    
            setSetArchive(rowData)
          },
          (txn, error) => {
            console.log(error)
          }
        );
      });
    }, [])

    const deleteWorkoutData = () => {
      db.transaction(txn => {
        txn.executeSql(
          "DELETE FROM past_workouts WHERE id = ?;",
          [id],
          (sqlTxn, res) => {
            console.log("--------------")
            console.log("success!")
            console.log("--------------")
            console.log(res)
            navigation.goBack()
          },
          (sqlTxn, error) => {
            console.log("ERROR")
            console.log("--------------")
            console.log(error.message)
            console.log("--------------")
          }
        )
    })
  }
    

    const getPerformanceColor = (performance) => {
      if (performance < 0) {
        return styles.cardPerfDown
      } else if (performance > 0) {
        return styles.cardPerfUp
      } else {
        return styles.cardPerfNeutral
      }
    }

    const getPerformanceText = (performance) => {
      if (performance < 0) {
        return `Your performance was down by ${performance}% compared to ur last workout of that type.`
      } else if (performance > 0) {
        return `Your performance was up by ${performance}% compared to ur last workout of that type.`
      } else {
        return `Your performance was equal compared to ur last workout of that type.`
      }
    }

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <View style={styles.header}>
            <View style={styles.titleContainer}>
              <Text style={styles.sectionTitle}>Details</Text>
            </View>
            <TouchableOpacity onPress={deleteWorkoutData}><Text>DELETE</Text></TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.card}>
            <View style={styles.cardRow}>
              <Feather name="activity" size={24} color="#000000" />
              <Text style={styles.cardText}>{workoutType}</Text>
            </View>
            <View style={styles.cardRow}>
              <Feather name="calendar" size={24} color="#000000" />
              <Text style={styles.cardText}>{timestamp}</Text>
            </View>
            <View style={styles.cardRow}>
              <Feather name="clock" size={24} color="#000000" />
              <Text style={styles.cardText}>{duration}</Text>
            </View>

            <View style={styles.cardRow}>
              <View style={getPerformanceColor(performance)}><Text>{getPerformanceText(performance)}</Text></View>
            </View>

          </TouchableOpacity>
          <ScrollView>
            {setArchive.map((workout, workoutIndex) => {
              return (
                <TouchableOpacity style={styles.card} key={workoutIndex}>
                  <View style={styles.cardRow}>
                    <Text style={styles.cardText}>{workout.name}</Text>
                  </View>
                  {workout.set_data && workout.set_data.reverse().map((setData, index) => {
                    if (setData != undefined) {
                      return (
                        <TouchableOpacity style={styles.setButton} key={index}>
                            <View style={styles.cardRow}>
                              <Feather name="activity" size={15} color="#000000" />
                              <Text style={styles.cardText}>{setData[0] + " x " + setData[1]}</Text>
                            </View>
                        </TouchableOpacity>
                      )
                    }
                  })}
                </TouchableOpacity>
              );
            })}
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
  card: {
    width: windowWidth *.93,
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
  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  cardText: {
    marginLeft: 8,
    fontSize: 16,
  },
  setButton: {
    backgroundColor: '#EDEDED',
    padding: 8,
    borderRadius: 4,
    marginTop: 8,
  },
  cardPerfUp: {
    backgroundColor: '#c7ffcc',
    padding: 8,
    borderRadius: 4,
    marginTop: 8
  },
  cardPerfDown: {
    backgroundColor: '#ffb5b5',
    padding: 8,
    borderRadius: 4,
    marginTop: 8
  },
  cardPerfNeutral: {
    backgroundColor: '#ededed',
    padding: 8,
    borderRadius: 4,
    marginTop: 8
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  titleContainer: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default ArchiveDetails;
