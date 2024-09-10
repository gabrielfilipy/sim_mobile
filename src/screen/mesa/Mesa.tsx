import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Alert } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { buscarDocumento } from './servico/ServiceMesa'; 
import Icon from 'react-native-vector-icons/FontAwesome'; // Para ícones
import TableMesa from './TableMesa';

// Definição de tipos para navegação
type RootStackParamList = {
    NaoAutorizado: undefined;
    VisualizarDocumento: { sigla: string };
    CriarDocumento: undefined;
};

type AccordionState = { [key: number]: boolean };

const MesaVirtual: React.FC = () => {
    const [subscritorId, setSubscritorId] = useState<string>('');
    const [siglaDocumento, setSiglaDocumento] = useState<string>('');
    const [showAccordion, setShowAccordion] = useState<AccordionState>({1: true, 2: false, 3: false, 4: false, 5: false});
    const [tipoDocumento, setTipoDocumento] = useState<string>('CRIACAO');
    const [open, setOpen] = useState<boolean>(false);

    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    useEffect(() => {
        const checkToken = async () => {
            try {
                const token = await AsyncStorage.getItem('Token');
                if (!token) {
                    navigation.navigate('NaoAutorizado'); // Navegação para tela não autorizada
                } else {
                    const object = JSON.parse(atob(token.split('.')[1]));
                    setSubscritorId(object['sub']);
                }
            } catch (error) {
                console.error('Failed to load token', error);
            }
        };
        checkToken();
    }, [navigation]);

    const handleClick = (id: number) => {
        const newState: AccordionState = {1: false, 2: false, 3: false, 4: false, 5: false};
        newState[id] = true;
        setShowAccordion(newState);
        setTipoDocumento(
            id === 1 ? 'CRIACAO' :
            id === 2 ? 'FINALIZACAO' :
            id === 3 ? 'TRAMITAR' :
            id === 4 ? 'ASSINATURA_COM_SENHA' :
            'RECEBIMENTO_DOCUMENTO'
        );
    };

    const buscarDocumentoPelaSigla = async (sigla: string) => {
        try {
            const documento = await buscarDocumento(sigla);
            setSiglaDocumento(documento.sigla);
            setOpen(true);
        } catch (err) {
            if (err instanceof Error) {
                Alert.alert('Atenção!', err.message);
            } else {
                Alert.alert('Atenção!', 'Ocorreu um erro desconhecido.');
            }
        }
    };

    const redirecionaVisualizarDocumento = async () => {
        try {
            await buscarDocumentoPelaSigla(siglaDocumento);
            navigation.navigate('VisualizarDocumento', { sigla: siglaDocumento });
        } catch (error) {
            console.error('Failed to redirect', error);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Mesa Virtual <Icon name="folder-open" size={24} color="black" /></Text>
                <View style={styles.searchContainer}>
                    <TextInput
                        style={styles.input}
                        onChangeText={setSiglaDocumento}
                        placeholder="Buscar"
                        onSubmitEditing={redirecionaVisualizarDocumento}
                    />
                </View>
                <TouchableOpacity style={styles.createButton} onPress={() => navigation.navigate('CriarDocumento')}>
                    <Text style={styles.createButtonText}>Criar Documento</Text>
                </TouchableOpacity>
            </View>
            <ScrollView style={styles.scrollView} contentContainerStyle={{ flexGrow: 1 }}>
    {Object.keys(showAccordion).map((key) => (
        <View key={key}>
            <TouchableOpacity
                style={styles.accordionHeading}
                onPress={() => handleClick(Number(key))}
            >
                <Text style={styles.accordionText}>
                    {`Documentos ${key === '1' ? 'criacao' :
                      key === '2' ? 'finalizados' :
                      key === '3' ? 'tramitados' :
                      key === '4' ? 'assinados' :
                      'recebidos'}`}
                </Text>
            </TouchableOpacity>
            {showAccordion[Number(key)] && (
                <View style={styles.accordionContent}>
                    <TableMesa subscritorId={subscritorId} tipoDocumento={tipoDocumento} />
                </View>
            )}
        </View>
    ))}
</ScrollView>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    header: {
        width: '100%',
        marginBottom: 10,
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    searchContainer: {
        marginBottom: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 4,
        padding: 8,
    },
    createButton: {
        backgroundColor: '#007BFF',
        padding: 10,
        borderRadius: 4,
        alignItems: 'center',
    },
    createButtonText: {
        color: '#fff',
        fontSize: 16,
    },
    scrollView: {
        flex: 1,
    },
    accordionHeading: {
        padding: 10,
        backgroundColor: 'grey',
    },
    accordionText: {
        color: 'white',
    },
    accordionContent: {
        padding: 10,
        backgroundColor: '#f0f0f0',
    },
});

export default MesaVirtual;
