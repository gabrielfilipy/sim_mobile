import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { buscarMovimentosPorTipo } from './servico/ServiceTable'; 
import { recebimentoDocumento } from './servico/ServiceMesa'; 

interface TableMesaProps {
    tipoDocumento: string;
    pessoaRecebedoraId?: string;
    subscritorId?: string;
}

const TableMesa: React.FC<TableMesaProps> = ({ tipoDocumento, pessoaRecebedoraId, subscritorId }) => {
    const SIZE_LIST = 5;
    const [documentos, setDocumentos] = useState<any[]>([]);
    const [totalPage, setTotalPage] = useState(0);
    const [pageActual, setPageActual] = useState(0);
    const [loading, setLoading] = useState(false);

    const navigation = useNavigation();

    const fetchData = async () => {
        setLoading(true);
        try {
            if (!subscritorId) return;
            const _documentos = await buscarMovimentosPorTipo(subscritorId, pessoaRecebedoraId, tipoDocumento, pageActual, SIZE_LIST);

            // Filtrar documentos com base na última movimentação
            const filteredDocumentos = _documentos.content.filter((documento: { movimentacoes: { typeMovement: string }[] }) => {
                const lastMovement = documento.movimentacoes[documento.movimentacoes.length - 1];
                return lastMovement.typeMovement === tipoDocumento;
            });

            setDocumentos(filteredDocumentos);
            setTotalPage(_documentos.totalPages);

        } catch (err) {
            console.error('Erro ao se conectar com o servidor!', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [subscritorId, pageActual, tipoDocumento]);

    const calculaData = (date: Date): string => {
        const dia = date.getDate().toString().padStart(2, '0');
        const mes = (date.getMonth() + 1).toString().padStart(2, '0');
        const ano = date.getFullYear();
        const hora = date.getUTCHours().toString().padStart(2, '0');
        const minuto = date.getUTCMinutes().toString().padStart(2, '0');
        const segundo = date.getUTCSeconds().toString().padStart(2, '0');
        return `${dia}/${mes}/${ano} ${hora}:${minuto}:${segundo}`;
    };

    const calculaDiferenca = (date: Date): string => {
        const criacaoDoDocumento = new Date(date);
        const agora = new Date();

        const diffMinutes = Math.floor((+agora - +criacaoDoDocumento) / (1000 * 60));
        const diffHours = Math.floor(diffMinutes / 60);
        const diffDays = Math.floor(diffHours / 24);

        if (diffDays > 3) {
            return calculaData(date);
        } else if (diffHours > 0) {
            return `Há ${diffHours} hora${diffHours > 1 ? 's' : ''}`;
        } else if (diffMinutes > 0) {
            return `Há ${diffMinutes} minuto${diffMinutes > 1 ? 's' : ''}`;
        } else {
            return 'Agora mesmo';
        }
    };

    const handleRecebimentoDocumentClick = async (sigla: string, tipoMovimento: string) => {
        if (tipoMovimento !== 'TRAMITAR') return;

        try {
            if (!subscritorId) return;
            const result = await recebimentoDocumento(sigla, subscritorId, pessoaRecebedoraId || '0');
            console.log('Documento recebido:', result);
        } catch (error) {
            console.error('Erro ao receber o documento', error);
        }
    };

    return (
        <View style={styles.container}>
            {loading && <ActivityIndicator size="large" color="#0000ff" />}
            <FlatList
                data={documentos}
                keyExtractor={(item) => item.siglaMobil}
                renderItem={({ item }) => (
                    <View style={styles.row}>
                        <Text style={styles.cell}>{calculaDiferenca(new Date(item.dateCreate))}</Text>
                        <TouchableOpacity
                            onPress={() => {
                                if (item.movimentacoes[item.movimentacoes.length - 1].typeMovement === tipoDocumento) {
                                    handleRecebimentoDocumentClick(item.siglaMobil, item.movimentacoes[item.movimentacoes.length - 1].typeMovement);
                                   // navigation.navigate('VisualizarDocumento', { sigla: item.siglaMobil });
                                }
                            }}
                        >
                            <Text style={styles.cell}>{item.siglaMobil}</Text>
                        </TouchableOpacity>
                        <Text style={styles.cell}>{item.documento.model.label}</Text>
                    </View>
                )}
                ListFooterComponent={
                    <View style={styles.pagination}>
                        {/* Adicione um componente de paginação aqui, se necessário */}
                    </View>
                }
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#f5f5f5',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    cell: {
        flex: 1,
        fontSize: 16,
        color: '#333',
    },
    pagination: {
        marginVertical: 20,
        alignItems: 'center',
    },
});

export default TableMesa;
