import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Dimensions } from 'react-native';
import GridView from 'react-native-super-grid';
import { Feather } from '@expo/vector-icons';
import StatCard from './statcard';
const windowWidth = Dimensions.get('window').width;
import TrainingTypeCard from './training_type_card';
import WorkoutSingleCard from './workout_single_card';

const workout_singles_DATA = require('../data/workout_singles.json')

const TrainingDetailsScreen = ({ route }) => {
    const { title } = route.params; // Holen des übergebenen Titels aus den Navigationsparametern

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.sectionTitle}>{title}</Text>
        <ScrollView>
        {Object.keys(workout_singles_DATA).filter(name => workout_singles_DATA[name]["type"] == title).map((name) => {
            return <WorkoutSingleCard workoutName={name} setCount={workout_singles_DATA[name]["sets"]}></WorkoutSingleCard>
        })}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    flex: 1,
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
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 8,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
    marginRight: 8,
  },
  statTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 16,
    color: '#808080',
  },
});

export default TrainingDetailsScreen;
