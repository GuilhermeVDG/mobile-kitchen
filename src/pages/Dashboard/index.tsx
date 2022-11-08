import React, { useContext, useState } from "react";
import { View, Text, TouchableOpacity, SafeAreaView, TextInput, StyleSheet } from "react-native";
import { AuthContext } from "../../contexts/AuthContext";

export default function Dashboard(){
  const { signOut } = useContext(AuthContext);
  
  return(
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Novo Pedido</Text>

      <TextInput keyboardType="numeric" style={styles.textInput} placeholder="Insira o número da mesa" placeholderTextColor='#f0f0f0'/>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Abrir mesa</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1d1d2e',
    flex: 1,
    paddingVertical: 15
  },
  title: {
    fontSize: 32,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 24
  },
  textInput: {
    width: '90%',
    height: 60,
    backgroundColor: '#101026',
    borderRadius: 4,
    paddingHorizontal: 8,
    fontSize: 20,
    color: '#fff',
    textAlign: 'center'
  },
  button: {
    width: '90%',
    height: 40,
    backgroundColor: '#3fffa3',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    marginVertical: 14
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: '#101026'
  }
})