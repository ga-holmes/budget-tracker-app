import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import { globalStyles } from './styles/globalStyles';

// componenet/screen imports
import Home from './screens/Home';

export default function App() {
  return (
    <View style={globalStyles.container}>
      <Home/>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  
});
