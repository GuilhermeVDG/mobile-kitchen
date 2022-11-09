import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { api } from '../../services/api';

type RouteDetailParams = {
  Order: {
    table: string | number;
    order_id: string;
  }
}

type CategoryProps = {
  id: string;
  name: string;
}

type OrderRouteProps = RouteProp<RouteDetailParams, 'Order'>

export default function Order(){
  
  const route = useRoute<OrderRouteProps>();
  const navigation = useNavigation();

  const [categories, setCategories] = useState<CategoryProps[] | []>([]);
  const [categorySelected, setCategorySelected] = useState<CategoryProps>();
  const [amount, setAmount] = useState('1');


  useEffect(() => {
    async function loadInfo(){
      const response = await api.get('/category');
      
      setCategories(response.data);
      setCategorySelected(response.data[0]);
      
    }

    loadInfo();
  }, []);

  const handleCloseOrder = async () => {
    try {
      await api.delete('/order', { params: { order_id: route.params?.order_id } });

      navigation.goBack();
    } catch (error) {
      console.log(error);
    }
  }
  
  return(
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Mesa {route.params?.table}</Text>
        <TouchableOpacity onPress={handleCloseOrder}>
          <Feather name='trash-2' size={28} color='#ff2f4b'/>
        </TouchableOpacity>
      </View>

      {categories.length !== 0 && (
        <TouchableOpacity style={styles.input}>
        <Text style={{ color:'#fff' }}>{categorySelected?.name}</Text>
      </TouchableOpacity>
      )}


      <TouchableOpacity style={styles.input}>
        <Text style={{ color: '#fff' }}>Cheddar com bacon</Text>
      </TouchableOpacity>

      <View style={styles.qttContainer}>
        <Text style={styles.qttText}>Quantidade</Text>
        <TextInput style={[styles.input, { width: '60%', textAlign: 'center' }]} placeholder='quantidade' placeholderTextColor='#F0F0F0' keyboardType='numeric' value={amount} onChangeText={setAmount}/>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.buttonAdd}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonAdvance}>
          <Text style={styles.buttonText}>Avançar</Text>
        </TouchableOpacity>
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
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-between'
  },
  buttonAdd: {
    width: '25%',
    height: 40,
    backgroundColor: '#3fd1ff',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4
  },
  buttonAdvance: {
    backgroundColor: '#3fffa3',
    height: 40,
    width: '70%',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    color:'#101026',
    fontWeight: 'bold',
    fontSize: 18
  }
})