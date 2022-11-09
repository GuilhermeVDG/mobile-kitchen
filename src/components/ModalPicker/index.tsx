import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, ScrollView } from 'react-native';

import { CategoryProps } from '../../pages/Order';

interface ModalPickerProps{
  options: CategoryProps[];
  handleCloseModal: () => void;
  selectedItem: (item: CategoryProps) => void;
}

const { width: WIDTH, height: HEIGTH } = Dimensions.get('window');

export function ModalPicker({ options, handleCloseModal, selectedItem }: ModalPickerProps){
  
  function onPressItem(item: CategoryProps){
    selectedItem(item);
    handleCloseModal();
  }
  
  const option = options.map((item, index) => (
    <TouchableOpacity key={index} style={styles.option} onPress={ () => onPressItem(item) }>
      <Text style={styles.item}>
        {item?.name}
      </Text>
    </TouchableOpacity>
  ))

  return(
    <TouchableOpacity style={styles.container} onPress={handleCloseModal}>
      <View style={styles.content}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {option}
        </ScrollView>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  content: {
    height: HEIGTH / 2,
    width: WIDTH - 20,
    backgroundColor: '#101026',
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 4
  },
  option: {
    alignItems: 'flex-start',
    borderTopWidth: 0.8,
    borderTopColor: '#fff'
  },
  item: {
    fontSize: 14,
    margin: 18,
    fontWeight: 'bold',
    color: '#fff'
  }
})