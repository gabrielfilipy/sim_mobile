import React, { useState } from "react";
import { Image, TextInputComponent, View } from "react-native";
import styles from "../../../Style";

import { Button } from "../../componentes-compartilhados/button/Button";
import { CustomTextInput } from "../../componentes-compartilhados/textInput/CustomTextInput";

export function SignInScreen() {
  const [email, setEmail] = useState('');
  const [passWord, setPassWord]= useState('');

    return (
      <View style={[styles.container, {justifyContent: 'center'}]}>
        <Image
        style={{width: 100, height: 100}}
        resizeMode="contain"
        source={require('../../assets/LOGOSIM.png')}
        />
        <CustomTextInput placeholder="e-mail" value={email} onChangeText={setEmail} />
        <CustomTextInput
        secureTextEntry
        placeholder="senha"
        value={passWord}
        onChangeText={setPassWord}
        />

        <Button title={"Entrar no App"} />
      </View>
    );
  }