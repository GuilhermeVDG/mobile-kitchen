import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Order(){
  return(
    <View style={styles.container}>
      <Text style={styles.title}>Order Screen</Text>
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