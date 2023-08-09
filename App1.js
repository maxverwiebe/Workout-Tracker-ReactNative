import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {TextInput } from 'react-native'
import tw from 'tailwind-react-native-classnames'

export default function App() {
  return (
    <View style={[tw`flex flex-row justify-between items-center p-1 h-1/6 w-full -bottom-5`,{
      position: 'absolute',
   }]}>
     
     <View style={[tw`flex-1 flex-row bg-white rounded-full ml-2 justify-between`]}>
     
       <TextInput
           style={[tw`rounded-full ml-2 justify-between`]}
           placeholder="Type a message!"
        />
   </View>

   </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
