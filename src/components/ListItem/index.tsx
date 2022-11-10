import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ItemProps } from '../../pages/Order';
import { Feather } from '@expo/vector-icons';

interface ListItemProps{
  data: ItemProps;
  deleteItem: (item_id: string) => void;
}

export function ListItem({ data, deleteItem }: ListItemProps){
  const handleDeleteItem = async () => {
    deleteItem(data.id);
  }
  
  
  return(
    <View style={styles.container}>
      <Text style={styles.item}>{data.amount} x {data.name}</Text>

      <TouchableOpacity onPress={handleDeleteItem}>
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