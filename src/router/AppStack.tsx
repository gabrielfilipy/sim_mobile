import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { HomeScreen } from "../screen/Home";
import { RootStackParamList } from "./types";
import MainLayout from "../screen/mainLayout/MainLayout";
import MesaVirtual from "../screen/mesa/Mesa";

//Cria um stack navigator que gerencia a navegação entre telas empilhadas
const Stack = createNativeStackNavigator<RootStackParamList>();

export function AppStack() {

    //Stack.Navigator e Stack.Screen: 
    //Configuram as rotas do stack navigator 
    //são as rotas disponíveis dentro desse stack navigator.
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false, // Remove o header em todas as telas
            }}
        >
            <Stack.Screen name="Home">
                {(props: any) => (
                    <MainLayout {...props}>
                        <HomeScreen />
                    </MainLayout>
                )}
            </Stack.Screen>
            <Stack.Screen name="MesaVirtual">
                {(props: any) => (
                    <MainLayout {...props}>
                        <MesaVirtual />
                    </MainLayout>
                )}
            </Stack.Screen>
        </Stack.Navigator>
    );
}