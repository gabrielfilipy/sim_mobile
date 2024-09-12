import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { RootStackParamList } from "./types";
import { SignInScreen } from "../signInScreen/SignInScreen";

const Stack = createNativeStackNavigator<RootStackParamList>();

export function AuthStack() {

    return (

        //aqui e uma tela de login, 
        //aqui poderá ter rotas de recuperar senha por exemplo.

    <Stack.Navigator>
        <Stack.Screen name="SignInScreen" component={SignInScreen} />
    </Stack.Navigator>
    );
}