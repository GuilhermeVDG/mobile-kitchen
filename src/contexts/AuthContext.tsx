import React, { useState, createContext, ReactNode } from "react";
import { api } from '../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

type AuthProviderProps = {
  children: ReactNode;
}

type AuthContextData = {
  user: UserProps;
  isAuthenticated: boolean;
  signIn: (credentials: SignInProps) => Promise<void>;
}

type UserProps = {
  id: string;
  name: string;
  email: string;
  token: string;
}

type SignInProps = {
  email: string;
  password: string;
}


export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({children}: AuthProviderProps){
  const [user, setUser] = useState({
    id: '',
    name: '',
    email: '',
    token: ''
  });

  const [loadingAuth, setLoadingAuth] = useState(false);

  const isAuthenticated = !!user.token;

  async function signIn({ email, password }: SignInProps){
    
    setLoadingAuth(true);

    try {
      const response = await api.post('/login', { email, password });

      const { id, name, token } = response.data;

      const data = { ...response.data };

      await AsyncStorage.setItem('@mykitchen', JSON.stringify(data));

      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      setUser({
        id,
        name,
        email,
        token
      });

      setLoadingAuth(false);
      
    } catch (error) {
      console.log(error);
      setLoadingAuth(false);
    }
    
  }
  
  return(
    <AuthContext.Provider value={{ user, isAuthenticated, signIn }}>
      {children}
    </AuthContext.Provider>
  )
}