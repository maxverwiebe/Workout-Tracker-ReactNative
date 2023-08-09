import React from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const windowWidth = Dimensions.get('window').width;

const TrainingTypeCard = ({ title, value }) => {
    const navigation = useNavigation();

    const navigate = () => {
        navigation.navigate('TrainingDetails', { title });
    }

  return (
    <TouchableOpacity style={styles.TrainingTypeCard} onPress={navigate}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={styles.iconContainer}>
              <Feather name="activity" size={24} color="#FFFFFF" />
            </View>
            <View style={{ marginLeft: 20 }}>
              <Text style={styles.statTitle}>{title}</Text>
              <Text style={styles.statValue}>{value}</Text>
            </View>
        </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  TrainingTypeCard: {
    width: windowWidth *.9,
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderRadius: 16,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 5,
    marginBottom: 20,
    alignItems: 'flex-start',
  },
  statTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  statValue: {
    fontSize: 18,
    color: '#808080',
    marginTop: 10,
  },
  iconContainer: {
    backgroundColor: '#c2c2c2',
    padding: 10,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default TrainingTypeCard;
