import React from "react";
import { View } from "react-native";
import * as Progress from 'react-native-progress';
import { SafeAreaView } from "react-native-safe-area-context";

export function CircularProgress () {
    return (
        <SafeAreaView>
        <View>
        <Progress.Bar progress={0.3} width={200} />
        <Progress.Pie progress={0.4} size={50} />
        <Progress.Circle size={30} indeterminate={true} />
        <Progress.CircleSnail color={['red', 'green', 'blue']} />
        </View>
        </SafeAreaView>
    );

    //Esse é um exemplo de como usar o modal de loading circular
    //import * as Progress from 'react-native-progress'; >>>> você importa usando essa linha passada.
    
    //<Progress.Bar progress={0.3} width={200} />
    //<Progress.Pie progress={0.4} size={50} />
    //<Progress.Circle size={30} indeterminate={true} />
    //<Progress.CircleSnail color={['red', 'green', 'blue']} />

    //O Bar é uma barra de progresso
    //O Pie é um loading em formato de torta
    //O Circle e o CircleSnail são os load padrões. sendo o Snail verde.

}