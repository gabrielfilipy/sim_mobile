import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const httpDocument = axios.create({
    baseURL: 'http://192.168.0.100:8085/', // Substitua pelo IP correto da sua máquina
});

httpDocument.interceptors.request.use(async config => {
    try {
        const token = await AsyncStorage.getItem('Token');
        if (token) {
            config.headers.authorization = `Bearer ${token}`; 
        }
    } catch (error) {
        console.error("Failed to retrieve token from AsyncStorage", error);
    }
    return config;
});

export default httpDocument;
