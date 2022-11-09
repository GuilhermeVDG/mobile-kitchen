import React, { useState, createContext, ReactNode, useEffect } from "react";
import { api } from '../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';


type AuthContextData = {
  user: UserProps;
  isAuthenticated: boolean;
  signIn: (credentials: SignInProps) => Promise<void>;
  loadingAuth: boolean;
  loading: boolean;
  signOut: () => Promise<void>;
}

type AuthProviderProps = {
  children: ReactNode;
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


  const [loading, setLoading] = useState(true);
  const [loadingAuth, setLoadingAuth] = useState(false);

  const isAuthenticated = !!user.token;


  useEffect(() => {
    async function getUser(){
      const userData = await AsyncStorage.getItem('@mykitchen');
      const hasUser: UserProps = JSON.parse(userData || '{}');

      if(Object.keys(hasUser).length > 0){
        setUser({
          id: hasUser.id,
          name: hasUser.name,
          email: hasUser.email,
          token: hasUser.token
        });
        
        
        api.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;

        setLoading(false);
      }
    }

    getUser();
  }, [isAuthenticated]);

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

  async function signOut(){
    await AsyncStorage.clear()
    .then(() => {
      setUser({
        id: '',
        name: '',
        email: '',
        token: ''
      })
    })
  }
  
  return(
    <AuthContext.Provider value={{ user, isAuthenticated, signIn, loadingAuth, loading, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}