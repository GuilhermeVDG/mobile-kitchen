import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { api } from '../../services/api';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParamsList } from '../../routes/app.routes';

type RouteDetailParams = {
  FinishOrder: {
    table: string | number;
    order_id: string;
  }
}

type FinishOrderRouteProp = RouteProp<RouteDetailParams, 'FinishOrder'>

export default function FinishOrder(){
  const route = useRoute<FinishOrderRouteProp>();
  const navigaton = useNavigation<NativeStackNavigationProp<StackParamsList>>();

  const handleFinishOrder = async () => {
    try {
      await api.put('/order/send', { order_id: route.params?.order_id });

      navigaton.popToTop();

    } catch (err) {
      console.log(err);
      
    }
  }
  
  return(
    <View style={styles.container}>
      <Text style={styles.message}>Deseja finalizar esse pedido?</Text>
      <Text style={styles.tittle}>Mesa {route.params?.table}</Text>

      <TouchableOpacity style={styles.button} onPress={handleFinishOrder}>
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