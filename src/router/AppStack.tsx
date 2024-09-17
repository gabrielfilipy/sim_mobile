import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { HomeScreen } from "../screen/Home";
import { Mesa } from "../screen/mesa/Mesa";
import { RootStackParamList } from "./types";

//Cria um stack navigator que gerencia a navegação entre telas empilhadas
const Stack = createNativeStackNavigator<RootStackParamList>();

export function AppStack() {

    //Stack.Navigator e Stack.Screen: 
    //Configuram as rotas do stack navigator 
    //são as rotas disponíveis dentro desse stack navigator.

    return (
    <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{headerShown: false}}/>
        <Stack.Screen name="Mesa" component={Mesa} />
    </Stack.Navigator>
    );
}