import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { SignInScreen } from "../screen/signInScreen/SignInScreen";
import { RootStackParamList } from "./types";

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