import React, { useState } from "react";
import { Alert, Image, StyleSheet, Text, TextInput, TextInputComponent, TouchableOpacity, View } from "react-native";
import { Button } from "../../componentes-compartilhados/button/Button";
import { CustomTextInput } from "../../componentes-compartilhados/textInput/CustomTextInput";
import { AppStackNavigationProp } from "../../router/types";
import { useNavigation } from "@react-navigation/native"; 
import { logar } from "./servico/userService";
import Swal from "sweetalert2";

declare interface LoginProps {
  titulo?: string
  txtBotao?: String
  hidden?: boolean 
}
export class LoginModel {
  matricula?: string
  password?: string
}

export function SignInScreen(prop: LoginProps) {
  const navigation = useNavigation<AppStackNavigationProp>();
  const [ matricula, setMatricula] = useState('');
  const [ password, setPassword] = useState('');
  const login = new LoginModel();

  /*OBS: É preciso reformula esse código, pois as chamadas e setagens dos tokens ainda não funcionam*/
  function enviarFormulario(e:any) {
  e.preventDefault();
  login.matricula = matricula
  login.password = password
  try {
    const object_token = logar(login)
    object_token.then(data => {
      const token = data.token; 
      setItem('Token', token); 
    }).catch(error =>{
      console.error('Erro ao fazer login', error);
      Swal.fire("Oops!", error.message, "error")
    });
  } catch(err) {
    if (err instanceof Error)
    Swal.fire("Oops!", err.message, "error")
  }    
}

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <View style={styles.boxHeader}>
          <Image
            style={styles.logo}
            source={require('../../assets/LOGOSIM.png')}
          />
          <Text style={styles.headerText}>Por favor, faça o login.</Text>
        </View>
        <View style={styles.boxLogin}>
          <TextInput
            style={styles.input}
            placeholder="Matrícula"
            onChangeText={(text) => setMatricula(text)}
            value={matricula}
          />
          <TextInput
            style={styles.input}
            placeholder="Senha"
            secureTextEntry
            onChangeText={(text) => setPassword(text)}
            value={password}
          />
          </View>
          <View style={styles.btnLoginButton}>
          <Button 
            title="Login" 
            onPress={enviarFormulario} 
            style={styles.btnLoginButtonText}
          />
          </View>
        <View style={styles.boxFooter}>
          <TouchableOpacity>
            <Text style={styles.footerLink}>Esqueceu sua senha?</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    justifyContent: 'center',
    alignItems: 'center', 
    backgroundColor: 'white', 
  },
  box: {
    width: '70%',
    height: '70%',
    maxWidth: 500, 
    padding: 25,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center' // Centraliza o conteúdo interno
  },
  boxHeader: {
    alignItems: 'center', // Centraliza o conteúdo interno
    marginBottom: 50,
  },
  logo: {
    width: 125,
    height: 125,
    tintColor: '#000', // Cor da imagem
  },
  headerText: {
    marginTop: 5,
    fontSize: 15,
    color: 'black',
    textAlign: 'center', // Centraliza o texto
  },
  boxLogin: {
    width: '90%', // Faz com que o formulário ocupe a largura completa da caixa
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 20,
  },
  input: {
    height: 40,
    width: '100%', // Faz com que o input ocupe a largura total disponível
    borderColor: '#ddd',
    borderBottomWidth: 1.2,
    marginBottom: 30,
    paddingHorizontal: 10,
  },
  boxFooter: {
    alignItems: 'center', // Centraliza o conteúdo interno
    marginTop: 30,
  },
  footerLink: {
    paddingTop: 25,
    color: '#007bff',
    textAlign: 'center', // Centraliza o texto
  },
  btnLoginButton: {
    width: 150,
    alignContent: "center"
  },
  btnLoginButtonText: {
    alignItems: "center"
  }
});
function setItem(arg0: string, token: any) {
  throw new Error("Function not implemented.");
}

