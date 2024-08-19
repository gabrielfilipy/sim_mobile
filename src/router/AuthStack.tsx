import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { SignInScreen } from "../screen/signInScreen/SignInScreen";

const Stack = createNativeStackNavigator();


export function AuthStack() {

    return (
        <Stack.Navigator>
        <Stack.Screen name="SignInScreen" component={SignInScreen} />
    </Stack.Navigator>
    );
}