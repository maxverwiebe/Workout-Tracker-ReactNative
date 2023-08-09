import 'react-native-gesture-handler';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import Dashboard from './dashboard_s';
import Training from './training_s';
import TrainingDetailsScreen from './TrainingDetailsScreen';
import RepsSelectorScreen from './sites/reps_selector';
import ArchiveList from './sites/archive_list';
import {Text, View, TouchableOpacity} from "react-native";
import { createStackNavigator } from '@react-navigation/stack';
import WorkoutFinished from './sites/workout_finished';
import ArchiveDetails from './sites/archive_details';

import * as Unicons from '@iconscout/react-unicons';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const BackButton = () => {
  const navigation = useNavigation();

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <TouchableOpacity onPress={handleBack} style={{ marginLeft: 16 }}>
      <Feather name="chevron-left" size={24} color="#000000" />
    </TouchableOpacity>
  );
};

function HomeTabs() {
  return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          activeTintColor: '#00b52a',
          inactiveTintColor: '#808080',
          tabBarIcon: ({ color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = 'home';
            } else if (route.name === 'Training') {
              iconName = 'activity';
            } else if (route.name === 'Measurements') {
              iconName = 'percent';
            } else if (route.name === 'Diet') {
              iconName = 'octagon';
            }

            return <Feather name={iconName} size={size} color={color} />;
    
          },
          headerShown: false, // Korrekte Platzierung der Option
        })
        }
      >
        <Tab.Screen
          name="Home"
          component={Dashboard}
          options={{
            headerTitle: '',
            headerLeft: () => (
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <BackButton />
                <Text style={{ marginLeft: 8, fontSize: 18 }}>Mein Dashboard</Text>
                </View>
            ),
          }}
        />
        <Tab.Screen
          name="Training"
          component={Training}
          options={{
          }}
        />
        <Tab.Screen
          name="Measurements"
          component={Training}
          options={{
          }}
        />
        <Tab.Screen
          name="Diet"
          component={Training}
          options={{
          }}
        />
      </Tab.Navigator>
      
  );
}

function AppNavigator() {
  return (
      <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      >
      <Stack.Screen name="Start" component={HomeTabs} />
      <Stack.Screen
          name="TrainingDetails"
          component={TrainingDetailsScreen}
          options={{
            headerTitle: '',
            headerLeft: () => <BackButton />,
            tabBarStyle: { display: 'none' }
          }}
          
        />
      <Stack.Screen
          name="RepsSelector"
          component={RepsSelectorScreen}
          options={{
            headerTitle: '',
            headerLeft: () => <BackButton />,
            tabBarStyle: { display: 'none' }
          }}
          
        />
      <Stack.Screen
          name="ArchiveList"
          component={ArchiveList}
          options={{
            headerTitle: '',
            headerLeft: () => <BackButton />,
            tabBarStyle: { display: 'none' }
          }}
          
        />
      <Stack.Screen
          name="ArchiveDetails"
          component={ArchiveDetails}
          options={{
            headerTitle: '',
            headerLeft: () => <BackButton />,
            tabBarStyle: { display: 'none' }
          }}
          
        />
      <Stack.Screen
          name="WorkoutFinished"
          component={WorkoutFinished}
          options={{
            headerTitle: '',
            headerLeft: () => <BackButton />,
            tabBarStyle: { display: 'none' }
          }}
          
        />
      </Stack.Navigator>
      
  );
}

export default AppNavigator;
