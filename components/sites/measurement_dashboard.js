import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Dimensions, TouchableOpacity, Vibration } from 'react-native';
import { Feather } from '@expo/vector-icons';
import WorkoutArchiveCard from '../workout_archive_card';

const windowWidth = Dimensions.get('window').width;

const MeasurementDashboard = () => {

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.sectionTitle}>Measurements</Text>
        <View style={styles.circleContainer}>
          <View style={styles.circle}>
            <Text style={styles.circleText}>55kg</Text>
            <Text style={styles.labelText}>Gewicht</Text>
          </View>
        </View>
        <ScrollView>

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
  circleContainer: {
    alignItems: 'center',
    marginTop: 32,
  },
  circle: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleText: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  labelText: {
    marginTop: 16,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default MeasurementDashboard;
