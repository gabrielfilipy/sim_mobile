import React from 'react';
import { View, StyleSheet } from 'react-native';

declare interface ConteudoProps {
    children?: React.ReactNode;
}

const Conteudo: React.FC<ConteudoProps> = (props) => {
    return <View style={styles.appConteudo}>
        {props.children}
    </View>
}

const styles = StyleSheet.create({
    appConteudo: {
        margin: 10,
        maxWidth: '100%',
    }
});

export default Conteudo;