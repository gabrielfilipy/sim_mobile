import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Usar AsyncStorage para React Native

const httpDocument = axios.create({
    baseURL: 'http://localhost:8085/', // Certifique-se de que a URL está correta para o ambiente mobile
});

httpDocument.interceptors.request.use(async config => {
    try {
        const token = await AsyncStorage.getItem('Token');
        if (token) {
            config.headers.authorization = `Bearer ${token}`; // Adiciona o token no cabeçalho da requisição
        }
    } catch (error) {
        console.error("Failed to retrieve token from AsyncStorage", error);
    }
    return config;
});

export default httpDocument;
