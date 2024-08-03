import React from 'react';
import styles from './Style';
import {
  Text,
  View,
  Image
} from 'react-native';

function App(): React.JSX.Element {
  
  return (
    <View style={styles.container}>
      <Image 
        source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/Senac_logo.svg/1200px-Senac_logo.svg.png' }} 
        style={styles.image} 
      />
      <Text style={styles.Text}>Bem vindo!</Text>
    </View>
  );
}

export default App;
