import 'react-native-reanimated';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import { globalStyles } from './styles/globalStyles';

// componenet/screen imports
import Home from './screens/Home';

import HomeStack from './routes/HomeStack';
import { NavigationContainer } from '@react-navigation/native';

export default function App() {
  return (
    <NavigationContainer >
      
      <HomeStack/>
      
      <StatusBar style="auto" />
    
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  
});
