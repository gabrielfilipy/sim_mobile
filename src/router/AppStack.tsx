import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { HomeScreen } from "../screen/Home";
import { Mesa } from "../screen/mesa/Mesa";

const Stack = createNativeStackNavigator();


export function AppStack() {

    return (
        <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Mesa" component={Mesa} />
    </Stack.Navigator>
    );
}