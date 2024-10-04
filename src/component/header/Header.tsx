import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TouchableWithoutFeedback, Animated } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Conteudo from '../../componentes-compartilhados/conteudo/Conteudo';
import Icon from 'react-native-vector-icons/MaterialIcons';
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

type HeaderProps = {
    navigation: NativeStackNavigationProp<RootStackParamList>;
    route: RouteProp<RootStackParamList, keyof RootStackParamList>;
};

const Header: React.FC<HeaderProps> = ({ navigation }) => {
    const [showMenu, setShowMenu] = useState(false);
    const [fadeAnim] = useState(new Animated.Value(0)); // Inicialmente invisível

    useEffect(() => {
        const fetchToken = async () => {
            const token = await AsyncStorage.getItem('Token');
            if (!token) {
                navigation.navigate('Login');
            }
        };
        fetchToken();
    }, [navigation]);

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: showMenu ? 1 : 0, // Altera a opacidade para mostrar ou esconder o Navbar
            duration: 300,
            useNativeDriver: true,
        }).start();
    }, [showMenu]);

    const handleMenuToggle = () => setShowMenu(!showMenu);

    const handleOutsidePress = () => {
        if (showMenu) setShowMenu(false);
    };

    return (
        <View style={styles.appHeader}>
            <Conteudo>
                <View style={styles.container}>
                    <View style={styles.logo}>
                        <TouchableOpacity onPress={() => navigation.navigate('MesaVirtual')}>
                            <Text style={styles.logoText}>SIM!</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.menu}>
                        <TouchableOpacity onPress={handleMenuToggle}>
                            <Icon name="menu" size={32} color="white" />
                        </TouchableOpacity>
                    </View>
                </View>
            </Conteudo>

            {showMenu && (
                <TouchableWithoutFeedback onPress={handleOutsidePress}>
                    <Animated.View
                        style={[
                            styles.navbarMenu,
                            {
                                opacity: fadeAnim,
                            },
                        ]}
                    >
                        <TouchableOpacity style={styles.buttonHeader} onPress={handleMenuToggle}>
                            <Icon name="close" size={24} color="white" />
                        </TouchableOpacity>

                        <Text style={styles.navbarUsuario}>Loiane Moskviq</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('MesaVirtual')}>
                            <Text style={styles.navbarMenuItem}>Home</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('Documento')}>
                            <Text style={styles.navbarMenuItem}>Criar documento</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('ListarUsuario')}>
                            <Text style={styles.navbarMenuItem}>Cadastro usuário</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('CadastroSetor')}>
                            <Text style={styles.navbarMenuItem}>Cadastro Setor</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('PermissoesUsuario')}>
                            <Text style={styles.navbarMenuItem}>Permissões para usuário</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('CadastroOrgao')}>
                            <Text style={styles.navbarMenuItem}>Cadastro Órgão</Text>
                        </TouchableOpacity>
                    </Animated.View>
                </TouchableWithoutFeedback>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    appHeader: {
        width: '100%',
        padding: 2,
        backgroundColor: '#0078D7',
        zIndex: 100,
    },
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    menu: {
        width: 35,
        textAlign: 'right',
    },
    logo: {
        padding: 1,
    },
    logoText: {
        fontSize: 30,
        color: 'white',
        fontWeight: 'bold',
    },
    navbarMenu: {
        position: 'absolute',
        top: 0,
        right: 0,
        width: 220,
        backgroundColor: '#282523',
        padding: 10,
        zIndex: 1000,
        borderRadius: 5,
    },
    navbarUsuario: {
        padding: 15,
        marginBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#525151',
        textTransform: 'uppercase',
        fontWeight: 'bold',
        color: 'white',
    },
    navbarMenuItem: {
        padding: 15,
        color: 'white',
    },
    buttonHeader: {
        backgroundColor: 'transparent',
        width: 35,
        marginTop: 5,
    },
});

export default Header;
