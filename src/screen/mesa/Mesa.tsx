import React, { Text, View } from 'react-native';
import { styles } from '../Style';
import { Button } from '../../componentes-compartilhados/button/Button';

export function Mesa (){
    
    return (
        <View style={styles.container}>
            <Text style={styles.title}> Mesa-Virtual </Text>
            <Button style={{backgroundColor: 'red'}} title='Sair do App'></Button>
        </View>
    )
}