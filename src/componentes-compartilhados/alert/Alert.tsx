import React from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface AlertProps{
    visible: boolean;
    title: string;
    message: string;
    onOk: () => void; 
    onCancel: () => void;
}

const AlertModal: React.FC<AlertProps> =({visible, title, message, onOk, onCancel}) => {
    return(
        <Modal
        transparent={true}
        animationType={'slide'}
        visible={visible}
        onRequestClose={onCancel}
        >
            <View style={styles.overLay}>
                <View style={styles.alertContainer}>
                        <Text style={styles.title}>{title}</Text>
                        <Text style={styles.message}>{message}</Text>
                <View style={styles.buttonConteiner}>
                    <TouchableOpacity style={[styles.button, styles.buttonOk]} onPress={onOk}>
                        <Text style={styles.buttonText}>OK</Text>
                    </TouchableOpacity> 
                    <TouchableOpacity style={[styles.button, styles.buttonCancel]} onPress={onCancel}>
                        <Text style={styles.buttonText}>CANCEL</Text>
                    </TouchableOpacity>  
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overLay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#00005'
    },
    alertContainer: {
        width: '80%',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    message: {
        fontSize: 16,
        marginBottom: 20,
    },
    buttonConteiner: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%"
    },
    button: {
        backgroundColor: '#6495ED',
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
    buttonOk: {
        backgroundColor: '#228B22',
    },
    buttonCancel: {
        backgroundColor: '#FF0000',
    },
});

export default AlertModal;