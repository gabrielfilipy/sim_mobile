import http from "../../../utils/http";
import { LoginModel } from "../SignInScreen";

export const logar = async (login: LoginModel) => {
    try {
        const response = await http.post('/v1/auth/login', login);
        return response.data;
    } catch (error) {
        console.error('Erro ao fazer login:', error);
        throw error;
    }
};
 