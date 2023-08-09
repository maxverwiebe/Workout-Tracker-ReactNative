import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Feather } from '@expo/vector-icons';

const windowWidth = Dimensions.get('window').width;

const StatCard = ({ title, value }) => {
  return (
    <View style={styles.statCard}>
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <Feather name="bar-chart-2" size={24} color="#808080" />
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.statTitle}>{title}</Text>
        </View>
      </View>
      <Text style={styles.statValue}>{value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  statCard: {
    width: windowWidth / 2 - 24,
    height: 120, // Festgelegte Höhe
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 16,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
    marginBottom: 16,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  titleContainer: {
    flex: 1,
  },
  statTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'right',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 16,
    color: '#808080',
  },
});

export default StatCard;
