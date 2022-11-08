import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';

type RouteDetailParams = {
  Order: {
    table: string | number;
    order_id: string;
  }
}

type OrderRouteProps = RouteProp<RouteDetailParams, 'Order'>

export default function Order(){
  const route = useRoute<OrderRouteProps>();
  
  return(
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Mesa {route.params.table}</Text>
        <TouchableOpacity>
          <Feather name='trash-2' size={28} color='#ff2f4b'/>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.input}>
        <Text style={{ color:'#fff' }}>Hamburgueres</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.input}>
        <Text style={{ color: '#fff' }}>Cheddar com bacon</Text>
      </TouchableOpacity>

      <View style={styles.qttContainer}>
        <Text style={styles.qttText}>Quantidade</Text>
        <TextInput style={[styles.input, { width: '60%', textAlign: 'center' }]} placeholder='quantidade' placeholderTextColor='#F0F0F0' keyboardType='numeric' value='1'/>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1d1d2e',
    flex: 1,
    paddingVertical: '5%',
    paddingHorizontal: '4%'
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
    marginRight: 14
  },
  header: {
    flexDirection: 'row',
    marginBottom: 12,
    alignItems: 'center',
    marginTop: 24
  },
  input: {
    backgroundColor: '#101026',
    color: '#fff',
    fontSize: 20,
    borderRadius: 4,
    height: 40,
    marginBottom: 12,
    justifyContent: 'center',
    paddingHorizontal: 8,
    width: '100%',
  },
  qttContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  qttText: {
    fontSize: 20,
    color:'#fff',
    fontWeight: 'bold'
  }
})