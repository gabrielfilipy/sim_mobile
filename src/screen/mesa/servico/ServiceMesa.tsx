import httpDocument from "../../../utils/Http-Document";
// import { DocumentoModel } from '../../Documento/Documento'; 

const baseURL = '/v1/mobil';
const baseURLMovimentacoes = '/v1/movimentacao/';

export const listarDocumentos = async () => {
    try {
        const response = await httpDocument.get('/documento/listar');
        return response.data;
    } catch (error) {
        console.error('Erro ao listar documentos:', error);
        throw error;
    }
};

export const buscarDocumento = async (sigla: string) => {
    try {
        const response = await httpDocument.get(`${baseURL}/buscar/${sigla}/sigla`);
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar documento:', error);
        throw error;
    }
};

export const filtro = async (mobilId: string, typeMovement: string) => {
    try {
        const response = await httpDocument.get(`${baseURLMovimentacoes}/filtro`, {
            params: { mobilId, typeMovement }
        });
        return response.data;
    } catch (error) {
        console.error('Erro ao aplicar filtro:', error);
        throw error;
    }
};

export const filtroBoolean = async (mobilId: string, typeMovement: string) => {
    try {
        const response = await httpDocument.get(`${baseURLMovimentacoes}/filtro-boolean`, {
            params: { mobilId, typeMovement }
        });
        return response.data.isFinalized;
    } catch (error) {
        console.error('Erro ao verificar filtro booleano:', error);
        throw error;
    }
};

export const finalizarDocumento = async (sigla: string, subscritorId: string) => {
    try {
        const response = await httpDocument.post(`${baseURLMovimentacoes}/finalizacao-documento/${sigla}`, { subscritorId });
        return response.data;
    } catch (error) {
        console.error('Erro ao finalizar documento:', error);
        throw error;
    }
};

// export const cadastrarDocumento = async (documento: DocumentoModel) => {
//   try {
//       await httpDocument.post('/documento/cadastro', documento);
//   } catch (error) {
//       console.error('Erro ao cadastrar documento:', error);
//       throw error;
//   }
// };

export const excluirDocumento = async (sigla: string, subscritorId: string) => {
    try {
        const response = await httpDocument.post(`${baseURLMovimentacoes}/excluir-documento/${sigla}`, { subscritorId });
        return response.data;
    } catch (error) {
        console.error('Erro ao excluir documento:', error);
        throw error;
    }
};

export const recebimentoDocumento = async (sigla: string, subscritorId: string, pessoaRecebedoraId: string) => {
    try {
        const response = await httpDocument.post(`${baseURLMovimentacoes}/recebimento-documento/${sigla}`, { subscritorId, pessoaRecebedoraId });
        return response.data;
    } catch (error) {
        console.error('Erro ao receber documento:', error);
        throw error;
    }
};
