import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { AppStack } from "./AppStack";
import { AuthStack } from "./AuthStack";

const auth = true;

export function Router() {
    return (
        <NavigationContainer>
            {auth ? <AppStack /> : <AuthStack />}
        </NavigationContainer>
    )
}