import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';

export default function FinishOrder(){
  return(
    <View style={styles.container}>
      <Text style={styles.message}>Deseja finalizar esse pedido?</Text>
      <Text style={styles.tittle}>Mesa 25</Text>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.textButton}>Finalizar pedido</Text>
        <Feather size={20} color='#1D1D2E' name='shopping-cart'/>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1d1d2e',
    paddingHorizontal: '4%',
    paddingVertical: '4%',
  },
  message: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#fff'
  },
  tittle: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#fff'
  },
  button: {
    backgroundColor: '#3fffa3',
    height: 40,
    flexDirection: 'row',
    width: '65%',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center'
  },
  textButton: {
    color: '#1d1d2e',
    fontWeight: 'bold',
    fontSize: 18
  }
})