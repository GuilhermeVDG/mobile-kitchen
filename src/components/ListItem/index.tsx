import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ItemProps } from '../../pages/Order';
import { Feather } from '@expo/vector-icons';

interface ListItemProps{
  data: ItemProps;
}

export function ListItem({ data }: ListItemProps){
  return(
    <View style={styles.container}>
      <Text style={styles.item}>{data.amount} x {data.name}</Text>

      <TouchableOpacity>
        <Feather name='trash-2' size={25} color='#ff2f4b'/>
      </TouchableOpacity>
    
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#101026',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginBottom: 12,
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 4,
  },
  item: {
    color: '#fff'
  }
})