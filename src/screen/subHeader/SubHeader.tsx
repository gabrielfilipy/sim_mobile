import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Avatar } from 'react-native-paper';

// Definindo tipos das rotas para navegação
type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  NaoAutorizado: undefined;
  // Adicione outras rotas conforme necessário
};

const SubHeader: React.FC = () => {
  const [nameUser, setNameUser] = useState<string>('');
  const navigation = useNavigation();
  const route = useRoute();
  
  useEffect(() => {
    const fetchToken = async () => {
      const token = await AsyncStorage.getItem('Token');
      if (!token) return;
      const object = JSON.parse(atob(token.split('.')[1]));
      setNameUser(object['nome']);
    };

    fetchToken();
  }, []);

  const logout = async () => {
    await AsyncStorage.removeItem('Token');
    navigation.navigate('Login' as never); // 'as never' ajuda a contornar o erro de tipo
  };

  const exibindoNavbar = () => {
    return route.name === 'Login' || route.name === 'NaoAutorizado';
  };

  if (exibindoNavbar()) {
    return null;
  }

  return (
    <View style={styles.subHeader}>
      <View style={styles.container}>
        <View style={styles.ambiente}>
          <Text style={styles.ambienteText}>Ambiente de <Text style={styles.bold}>desenvolvimento</Text></Text>
        </View>
        <View style={styles.userContainer}>
          <Avatar.Text size={40} label={nameUser ? nameUser[0].toUpperCase() : ''} />
          <TouchableOpacity onPress={logout} style={styles.logoutButton}>
            <Text style={styles.logoutText}>Sair</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  subHeader: {
    width: '100%',
    padding: 10,
    backgroundColor: '#D0D6DB', 
    color: 'white',
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ambiente: {
    // Estilo para o container da seção Ambiente
  },
  ambienteText: {
    textAlign: 'left',
    color: 'white',
  },
  bold: {
    fontWeight: 'bold',
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoutButton: {
    marginLeft: 20,
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: 'red',
    borderRadius: 5,
  },
  logoutText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default SubHeader;
