import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

export default function Header(){
  return(
    <View style={styles.container}>
      <TouchableOpacity style={styles.button}>
        <AntDesign name='logout' size={25} color='#fff'/>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1d1d2e',
  },
  button:{
    marginLeft: '90%',
  }
});