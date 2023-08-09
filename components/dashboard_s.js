import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, Dimensions, ScrollView } from 'react-native';
import GridView from 'react-native-super-grid';
import { Feather } from '@expo/vector-icons';
import StatCard from './statcard';
const windowWidth = Dimensions.get('window').width;

import { ContributionGraph, LineChart } from 'react-native-chart-kit';

const Dashboard = () => {
  const renderStatCard = ({ item }) => {
    return <StatCard title={item.title} value={item.value} />;
  };

  const statCardData = [
    { title: 'Trainingsdauer', value: '4 Stunden' },
    { title: 'Kalorien verbrannt', value: '500 kcal' },
    { title: 'Workout-Daueeer', value: '4 Stunden' },
    { title: 'Kalorien verbeerannt', value: '500 kcal' },
    // Weitere Statistikdaten hier
  ];
  
  const data = [
    { date: "2017-01-02", count: 1 },
    { date: "2017-01-03", count: 2 },
    { date: "2017-01-04", count: 3 },
    { date: "2017-01-05", count: 4 },
    { date: "2017-01-06", count: 5 },
    { date: "2017-01-30", count: 2 },
    { date: "2017-01-31", count: 3 },
    { date: "2017-03-01", count: 2 },
    { date: "2017-04-02", count: 4 },
    { date: "2017-03-05", count: 2 },
    { date: "2017-02-30", count: 4 }
  ];

  const data2 = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43],
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
        strokeWidth: 2 // optional
      }
    ],
    //legend: ["Rainy Days"] // optional
  };

  const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0,
    color: (opacity = 1) => `rgba(21, 107, 0, ${opacity})`,
    strokeWidth: 5, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false // optional
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Willkommen!</Text>
      </View>
      <ScrollView style={styles.content}>
        <Text style={styles.sectionTitle}>Statistiken</Text>
        <View style={styles.statsContainer}>
            <GridView
            itemDimension={windowWidth / 2 - 40}
            data={statCardData}
            renderItem={renderStatCard}
            />
        </View>
        <Text style={styles.sectionTitle}>Trainingsaktivität</Text>

      </ScrollView>
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
    borderRadius: 25,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
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

export default Dashboard;
