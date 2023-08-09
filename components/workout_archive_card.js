import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const windowWidth = Dimensions.get('window').width;

function formatTimestamps(timestamp1, timestamp2) {

  const oneDayInMilliseconds = 24 * 60 * 60 * 1000;
  const oneWeekInMilliseconds = 7 * oneDayInMilliseconds;

  const currentDate = new Date();
  const date1 = new Date(timestamp1);
  const date2 = new Date(timestamp2);

  const isToday = currentDate.getDate() === date1.getDate() &&
    currentDate.getMonth() === date1.getMonth() &&
    currentDate.getFullYear() === date1.getFullYear() &&
    currentDate.getDate() === date2.getDate() &&
    currentDate.getMonth() === date2.getMonth() &&
    currentDate.getFullYear() === date2.getFullYear();

  const isWithin7Days = (currentDate - date1 <= oneWeekInMilliseconds) && (currentDate - date2 <= oneWeekInMilliseconds);

  const options = {
    hour: '2-digit',
    minute: '2-digit'
  };

  if (isToday) {
    return `Heute ${date1.toLocaleTimeString('de-DE', options)} - ${date2.toLocaleTimeString('de-DE', options)}`;
  } else if (isWithin7Days) {
    const weekday = ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'][date1.getDay()];
    return `${weekday} ${date1.toLocaleTimeString('de-DE', options)} - ${date2.toLocaleTimeString('de-DE', options)}`;
  } else {
    return `${date1.toLocaleDateString('de-DE')} ${date1.toLocaleTimeString('de-DE', options)} - ${date2.toLocaleTimeString('de-DE', options)}`;
  }
}




const WorkoutArchiveCard = ({ data, fluctation }) => {
  const navigation = useNavigation();
  const [ duration, setDuration ] = useState(0)
  const [ timestamp, setTimestamp ] = useState("")
  const [ workoutType, setWorkoutType ] = useState([])
  const [ id, setId ] = useState(0)
  const [ performance, setPerformance ] = useState(0)

  useEffect(() => {

    const durationInMillis = data.endtime - data.starttime;
    const durationInMinutes = Math.floor(durationInMillis / 60000);
    const formattedDuration = `${durationInMinutes} min`;
    
    setDuration(formattedDuration)

    setWorkoutType(JSON.parse(data.workoutType))

    setTimestamp(formatTimestamps(data.starttime, data.endtime))

    setId(data.id)

    setPerformance(Math.round(data.performance))

  }, [])

  const getPerformanceIndicator = (performance) => {
    if (performance < 0) {
      return "arrow-down"
    } else if (performance > 0) {
      return "arrow-up"
    } else {
      return "check"
    }
  }

  const getPerformanceColor = (performance) => {
    if (performance < 0) {
      return styles.labelColorDown
    } else if (performance > 0) {
      return styles.labelColorUp
    } else {
      return styles.labelColorNeutral
    }
  }

  return (
    <TouchableOpacity style={styles.trainingTypeCard} onPress={() => navigation.navigate('ArchiveDetails', { timestamp, duration, workoutType, id, performance })}>
      <View style={styles.cardHeader}>
        <Feather name="check-circle" size={20} color="#000000" style={styles.icon} />
        <View style={styles.titleContainer}>
          <Text style={styles.date}>{"#" + data.id + " " + workoutType}</Text>
          <Text style={styles.time}>{timestamp}</Text>
        </View>
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.infoItem}>
          <Feather name="clock" size={16} color="#808080" style={styles.infoIcon} />
          <Text style={styles.infoText}>{duration}</Text>
        </View>
        <View style={styles.infoItem}>
          <Feather name="activity" size={16} color="#808080" style={styles.infoIcon} />
          <Text style={styles.infoText}>{performance}</Text>
        </View>
        <View style={styles.infoItem}>
          <View style={styles.labelContainer}>
            <View style={styles.labelContent}>
            <Feather name={getPerformanceIndicator(performance)} size={20} style={getPerformanceColor(performance)}/>
            <Text style={getPerformanceColor(performance)}>{performance}%</Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  trainingTypeCard: {
    width: windowWidth * 0.9,
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
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  icon: {
    marginRight: 10,
  },
  titleContainer: {
    flex: 1,
  },
  date: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
  },
  time: {
    fontSize: 14,
    color: '#808080',
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoIcon: {
    marginRight: 6,
  },
  infoText: {
    fontSize: 14,
    color: '#808080',
  },
  labelContainer: {
    backgroundColor: '#ffff',
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginLeft: 'auto',
  },
  labelText: {
    fontSize: 15,
  },
  labelColorUp: {
    color: "#02ba30",
    fontSize: 15,
  },
  labelColorDown: {
    color: "#e64545",
    fontSize: 15,
  },
  labelColorNeutral: {
    color: "#858585",
    fontSize: 15,
  },
  labelContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default WorkoutArchiveCard;
