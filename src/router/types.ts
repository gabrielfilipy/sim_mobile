// types.ts
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

//RootStackParamList Define todos os possíveis nomes de tela e seus parâmetros (ou undefined se não houver parâmetros).
export type RootStackParamList = {
  Home: undefined;
  MesaVirtual: undefined;
  SignInScreen: undefined;
  cadastrarDocumento: undefined;
  
  // Adicione outras rotas aqui se necessário
};

export type AppStackNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home', 'cadastrarDocumento'>;
export type AuthStackNavigationProp = NativeStackNavigationProp<RootStackParamList, 'SignInScreen'>;

