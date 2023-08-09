import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';

const windowWidth = Dimensions.get('window').width;

const WorkoutFinished = ({ route }) => {
    //const [ setArchive, setSetArchive ] = useState([])

    //const { timestamp, duration, workoutType, id, performance } = route.params;

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.sectionTitle}>Workout finished!</Text>

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
    width: windowWidth *.9,
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
  }
});

export default WorkoutFinished;
