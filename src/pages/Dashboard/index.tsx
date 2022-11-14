import React, { useState } from "react";
import { Text, TouchableOpacity, SafeAreaView, TextInput, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackParamsList } from "../../routes/app.routes";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { api } from "../../services/api";
import Logout from '../../components/Logout';

export default function Dashboard(){

  const navigation = useNavigation<NativeStackNavigationProp<StackParamsList>>();

  const [table, setTable] = useState('');

  async function handleOpenOrder(){
    if(!table) return;

    try {
      const response = await api.post('/order', { 
        table: ~~table
      });

      navigation.navigate('Order', { table, order_id: response.data.id });      

      setTable('');
    } catch (error) {
      console.log(error); 
    }
    
    
    
  }
  
  return(
    <SafeAreaView style={styles.logout}>
      <Logout/>

      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Novo Pedido</Text>

        <TextInput 
          keyboardType="numeric"
          style={styles.textInput}
          placeholder="Insira o número da mesa"
          placeholderTextColor='#f0f0f0'
          value={table}
          onChangeText={setTable}
        />

        <TouchableOpacity style={styles.button} onPress={handleOpenOrder}>
          <Text style={styles.buttonText}>Abrir mesa</Text>
        </TouchableOpacity>
      </SafeAreaView>

      
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
  },
  logout: {
    marginTop: 0,
    flex: 1,
    backgroundColor: '#1d1d2e'
  }
})