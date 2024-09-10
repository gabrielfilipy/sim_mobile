import React from 'react';
import { View, StyleSheet, ViewStyle, StyleProp } from 'react-native';
import Header from '../header/Header';  // Ajuste o caminho conforme necessário
import SubHeader from '../subHeader/SubHeader'; // Ajuste o caminho conforme necessário
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';

type RootStackParamList = {
    MesaVirtual: undefined;
    Documento: undefined;
    ListarUsuario: undefined;
    CadastroSetor: undefined;
    PermissoesUsuario: undefined;
    CadastroOrgao: undefined;
    Login: undefined;
    NaoAutorizado: undefined;
};

interface MainLayoutProps {
    children: React.ReactNode;
    navigation: NativeStackNavigationProp<RootStackParamList>;
    route: RouteProp<RootStackParamList, keyof RootStackParamList>;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children, navigation, route }) => {
    return (
        <View style={styles.container}>
            <Header navigation={navigation} route={route} />
            <SubHeader />
            <View style={styles.content}>
                {children}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    } as ViewStyle,
    content: {
        flex: 1,
    } as ViewStyle,
});

export default MainLayout;
