import React, { useState } from "react";
import { Text, View } from "react-native";
import { styles } from "./Style";
import { Button } from "../componentes-compartilhados/button/Button";
import { useNavigation } from "@react-navigation/native";
import { Mesa } from "./mesa/Mesa";
import { AppStackNavigationProp } from "../router/types";
import AlertModal from "../componentes-compartilhados/alert/Alert";

export function HomeScreen() {

  const navigation = useNavigation<AppStackNavigationProp>();
  const [alertVisible, setAlertVisible] = useState(false);

  const showAlert = () => {
    setAlertVisible(true);
  };
  const hideAlert = () => {
    setAlertVisible(false);
  };

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