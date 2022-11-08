import React, { useContext } from "react";
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import AppRoutes from "./app.routes";
import AuthRoutes from "./auth.routes";
import { AuthContext } from "../contexts/AuthContext";

export default function Routes(){
  const { isAuthenticated, loading } = useContext(AuthContext);

  if(loading){
    return(
      <View style={styles.loading}>
        <ActivityIndicator size={60} color='#fff'/>
      </View>
    )
  }

  return(
    isAuthenticated ? <AppRoutes/> : <AuthRoutes/>
  )
}

const styles = StyleSheet.create({
  loading: {
    flex: 1, 
    backgroundColor: '#1d1d2e', 
    justifyContent: 'center', alignItems: 
    'center'
  }
})
