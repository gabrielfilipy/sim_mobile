import React from "react";
import { 
    Text, 
    TouchableOpacity, 
    StyleSheet, 
    TouchableOpacityProps 
} from "react-native";

interface ButtonProps extends TouchableOpacityProps {
    title: string;
}

export function Button({title, style, ...rest}: ButtonProps) {
    return (
    <TouchableOpacity {...rest} style={[styles.button, style]}>
        <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    text: {
        fontWeight: 'bold',
        color: '#FFF',
        fontSize: 16,
    },
    button: {
        backgroundColor: '#6495ED',
        borderRadius: 8,
        padding: 20,
    },
});