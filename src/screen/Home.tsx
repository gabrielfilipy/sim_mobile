import React from "react";
import { Text, View } from "react-native";
import { styles } from "./Style";
import { Button } from "../componentes-compartilhados/button/Button";
import { useNavigation } from "@react-navigation/native";

export function HomeScreen() {

  const navigation = useNavigation();

    return (
      <View style={styles.container}>
        <Text style={styles.title}>
        Tela somente para usuários cadastrados...
        </Text>
        <Button 
          onPress={() => navigation.navigate('Mesa')} 
          title="Teste..." 
        />
        <Text>
          by <Text style={styles.textoSIM}> Grupo SIM</Text>
        </Text>
      </View>
    );
  }