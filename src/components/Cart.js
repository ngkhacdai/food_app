import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View, Text, FlatList, Button, StyleSheet, Image } from 'react-native';
import { local, apiweb, img } from '../api/index';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Cart = ({ navigation }) => {
  const [cartItems, setCartItems] = useState([]);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    axios.get(apiweb + '/cart/getitemincart', {
      headers: {
        'token': await AsyncStorage.getItem('token')
      }
    }).then((res) => {
      setCartItems(res.data.items);
      setData(res.data);
      setIsLoading(false)
    });
  };

  const removeFromCart = async (productId) => {
    setIsLoading(true)
    const form = {
      _id: productId
    }
    await axios.post(apiweb + '/cart/removefromcart', form, {
      headers: {
        'token': await AsyncStorage.getItem('token')
      }
    }).then(() => {
      getData()
    })
  };

  const increaseQuantity = async (productId, quantity) => {
    setIsLoading(true)
    const form = {
      _id: productId
    }
    axios.post(apiweb + '/cart/increasequantity', form, {
      headers: {
        'token': await AsyncStorage.getItem('token')
      }
    }).then(() => {
      getData()
    })
  };

  const decreaseQuantity = async (productId, quantity) => {
    if (quantity > 1) {
      setIsLoading(true)
      const form = {
        _id: productId
      }
      axios.post(apiweb + '/cart/decreasequantity', form, {
        headers: {
          'token': await AsyncStorage.getItem('token')
        }
      }).then(() => {
        getData()
      })
    }
  };
  const thanhToan = async () => {
    setIsLoading(true)
    axios.get(apiweb + '/order/payincart', {
      headers: {
        'token': await AsyncStorage.getItem('token')
      }
    }).then(() => {
      getData()
    })
  }
  if (isLoading) {
    return (
      <ActivityIndicator style={{
        flex: 1,
        justifyContent: 'center',
      }} size="large" />
    )
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Shopping Cart</Text>
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.product._id}
        renderItem={({ item }) => (
          <View style={styles.cartItem}>
            <Image
              source={{ uri: `${img}/${item.product.image.replace(/\\/g, '/')}` }}
              style={styles.productImage}
            />
            <View style={styles.productInfo}>
              <Text>{item.product.name}</Text>
              <Text>Price: {item.product.price}đ</Text>
              <View style={styles.quantityContainer}>
                <Button title="-" onPress={() => decreaseQuantity(item.product._id, item.quantity)} style={styles.quantityButton} />
                <Text style={styles.quantityText}>{item.quantity}</Text>
                <Button title="+" onPress={() => increaseQuantity(item.product._id, item.quantity)} style={styles.quantityButton} />
              </View>
              <Button title="Xóa" onPress={() => removeFromCart(item.product._id)} />
            </View>
          </View>
        )}
      />
      <View style={styles.checkoutContainer}>
        <Text style={styles.total}>Total: {data.total}đ</Text>
        <Button title="Thanh toán" onPress={() => { thanhToan() }} style={styles.checkoutButton} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    paddingTop: 10
  },
  cartItem: {
    borderBottomWidth: 1,
    borderColor: 'lightgray',
    paddingVertical: 8,
    marginBottom: 8,
    flexDirection: 'row',
  },
  total: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  productImage: {
    width: 80,
    height: 80,
  },
  productInfo: {
    marginLeft: 10,
    flex: 1,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    fontSize: 20,
    padding: 5,
  },
  quantityText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginHorizontal: 10,
  },
  checkoutContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  checkoutButton: {
    backgroundColor: 'green',
    color: 'white',
    fontSize: 16,
    padding: 10,
  },
});

export default Cart;
