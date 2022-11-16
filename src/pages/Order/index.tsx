import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Modal, FlatList } from 'react-native';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { api } from '../../services/api';
import { ModalPicker } from '../../components/ModalPicker';
import { ListItem } from '../../components/ListItem';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParamsList } from '../../routes/app.routes';

type RouteDetailParams = {
  Order: {
    table: string | number;
    order_id: string;
  }
}

export type CategoryProps = {
  id: string;
  name: string;
}

type ProductProps = {
  id: string;
  name: string;
}

export type ItemProps = {
  id: string;
  product_id: string;
  name: string;
  amount: string | number;
}

type OrderRouteProps = RouteProp<RouteDetailParams, 'Order'>

export default function Order(){
  
  const route = useRoute<OrderRouteProps>();
  const navigation = useNavigation<NativeStackNavigationProp<StackParamsList>>();

  const [categories, setCategories] = useState<CategoryProps[] | []>([]);
  const [categorySelected, setCategorySelected] = useState<CategoryProps | undefined>();
  const [amount, setAmount] = useState('1');
  const [modalCategoryVisible, setModalCategoryVisible] = useState(false);

  const [products, setProducts] = useState<ProductProps[] | []>([]);
  const [productSelected, setProductSelected] = useState<ProductProps | undefined>();
  const [modalProductVisible, setModalProductVisible] = useState(false);
  const [items, setItems] = useState<ItemProps[] | []>([]);


  useEffect(() => {
    async function loadInfo(){
      const response = await api.get('/category');
      
      setCategories(response.data);
      setCategorySelected(response.data[0]);
      
    }

    loadInfo();
  }, []);

  useEffect(() => {
    async function loadProducts(){
      const response = await api.get('/product', {
        params: {
          category_id: categorySelected?.id
        }
      });
      
      setProducts(response.data);
      setProductSelected(response.data[0]);
    }

    loadProducts();
  }, [categorySelected])

  const handleCloseOrder = async () => {
    try {
      await api.delete('/order', { params: { order_id: route.params?.order_id } });

      navigation.goBack();
    } catch (error) {
      console.log(error);
    }
  }
  
  const handleCategorySelected = (item: CategoryProps) => {
    setCategorySelected(item);
  }

  const handleProductSelected = (item: ProductProps) => {
    setProductSelected(item);
  }

  const handleAddItem = async () => {
    try {
      const response = await api.post('/order/add', {
        product_id: productSelected?.id,
        amount: ~~amount,
        order_id: route.params?.order_id
      });

      const data = {
        id: response?.data.id,
        product_id: productSelected?.id as string,
        name: productSelected?.name as string,
        amount: amount
      }

      setItems(old => [...old, data]);
    } catch (error) {
      console.log(error);
    }

  }

  const handleDeleteItem = async (item_id: string) => {
    try {
      await api.delete('/order/remove', {
        params:{
          item_id: item_id
        }
      });

      const newItems = items.filter(item => item.id !== item_id);

      setItems(newItems);
    } catch (error) {
      console.log(error);
    }
  }

  const handleAdvance = () => {
    navigation.navigate('FinishOrder', { table: route.params?.table, order_id: route.params?.order_id });
  }

  return(
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Mesa {route.params?.table}</Text>
        {!items.length && (
          <TouchableOpacity onPress={handleCloseOrder}>
            <Feather name='trash-2' size={28} color='#ff2f4b'/>
          </TouchableOpacity>
        )}
      </View>

      {categories.length !== 0 && (
        <TouchableOpacity style={styles.input} onPress={() => setModalCategoryVisible(true)}>
          <Text style={{ color:'#fff' }}>{categorySelected?.name}</Text>
          <Feather size={25} name='chevron-down' color='#fff'/>
        </TouchableOpacity>
      )}

      {products.length !== 0 && (
        <TouchableOpacity style={styles.input} onPress={() => setModalProductVisible(true)}>
          <Text style={{ color: '#fff' }}>{productSelected?.name}</Text>
          <Feather size={25} name='chevron-down' color='#fff'/>
        </TouchableOpacity>
      )}      

      <View style={styles.qttContainer}>
        <Text style={styles.qttText}>Quantidade</Text>
        <TextInput 
          style={[styles.input, { width: '60%', textAlign: 'center' }]} 
          placeholder='Quantidade' placeholderTextColor='#F0F0F0' 
          keyboardType='numeric' value={amount} 
          onChangeText={setAmount}
        />
      </View>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.buttonAdd} onPress={handleAddItem}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.buttonAdvance, { opacity: !items.length ? 0.3 : 1 }]}
          disabled={!items.length}
          onPress={handleAdvance}
        >
          <Text style={styles.buttonText}>Avançar</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        showsVerticalScrollIndicator={false}
        style={{ flex: 1, marginTop: 24 }}
        data={items}
        keyExtractor={item => item.id}
        renderItem={ ({item}) => <ListItem data={item} deleteItem={handleDeleteItem}/> }
      />

      <Modal transparent={true} visible={modalCategoryVisible} animationType='fade'>
        <ModalPicker 
          handleCloseModal={() => setModalCategoryVisible(false)} 
          options={categories} 
          selectedItem={handleCategorySelected}
        />
      </Modal>

      <Modal transparent={true} visible={modalProductVisible} animationType='fade'>
        <ModalPicker
          handleCloseModal={() => setModalProductVisible(false)}
          options={products}
          selectedItem={handleProductSelected}
        />
      </Modal>

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
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
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