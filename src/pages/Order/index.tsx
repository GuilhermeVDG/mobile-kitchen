import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';

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
      <Text style={styles.title}>Order Screen</Text>
      <Text>{route.params.table}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1d1d2e',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff'
  }
})