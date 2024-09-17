import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { AppStack } from "./AppStack";
import { AuthStack } from "./AuthStack";

const auth = false; //autentica a autorizacao do usuario. 

export function Router() {
    return (

        //muito parecido com o app, mas aqui separei entre uma rota que leva para uma tela de login 
        //e outra para a aplicação em si.

        <NavigationContainer>
            {auth ? <AppStack /> : <AuthStack />}
        </NavigationContainer>
    )
}