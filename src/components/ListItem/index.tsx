import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ItemProps } from '../../pages/Order'

interface ListItemProps{
  data: ItemProps;
}

export function ListItem({ data }: ListItemProps){
  return(
    <View style={styles.container}>
      <Text>Item</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {

  }
})