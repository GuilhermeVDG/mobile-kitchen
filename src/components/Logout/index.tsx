import React, { useContext } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { AuthContext } from '../../contexts/AuthContext';

export default function Header(){
  const { signOut } = useContext(AuthContext);

  return(
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={signOut}>
        <Feather name='log-out' size={25} color='#fff'/>
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