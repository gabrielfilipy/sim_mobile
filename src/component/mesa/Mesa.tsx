import React, { Text, View } from 'react-native';
import { Button } from '../../componentes-compartilhados/button/Button';
import { styles } from '../screen/Style';

export function Mesa (){
    
    return (
        <View style={styles.container}>
            <Text style={styles.title}> Mesa-Virtual </Text>
            <Button style={{backgroundColor: 'red'}} title='Sair do App'></Button>
        </View>
    )
}