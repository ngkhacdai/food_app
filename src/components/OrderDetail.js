import axios from "axios";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Button, FlatList , TouchableOpacity , Image} from "react-native";
import { apiweb, local } from "../api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AntDesign } from '@expo/vector-icons'; // Sử dụng icon Back
import { useIsFocused } from "@react-navigation/native";
import { ActivityIndicator } from "react-native";
const OrderDetail = ({ navigation , route }) => {
  const item = route.params;
  const [data, setData] = useState([])
  const [isLoading, setLoading] = useState(true)
  useEffect(() => {
    getData()
  }, [])
  const getData = async () => {
      const form = {_id: item.order._id};
      const response = await axios.post(apiweb + '/getorderdetail',form, {
          headers: {
            'token': await AsyncStorage.getItem('token')
          }
        });
      setData(response.data.order);
      setLoading(false)
    }
  const checkStatus = () => {
    if (data.status === 'Đơn hàng đã bị hủy' || data.status === 'Đã nhận hàng') {
      return null
    } else if (data.status === 'Chờ xác nhận') {
      return (
        <View>
          <Button title="Hủy đơn hàng" onPress={() => huyDonHang()} />
        </View>
      )
    } else {
      <View>
          <Button title="Nhận hàng" onPress={()=>nhanHang()} />
      </View>
    }
  }
  const huyDonHang = async () => {
    setLoading(true)
    const form = {_id: item.order._id};
    await axios.post(apiweb + '/huydonhang', form, {
      headers: {
            'token': await AsyncStorage.getItem('token')
          }
    }).then(() => {
      getData();
      setLoading(false);
    })
  }
  const nhanHang = async () => {
    setLoading(true)
    const form = {_id: item.order._id};
    await axios.post(apiweb + '/nhanhang', form, {
      headers: {
            'token': await AsyncStorage.getItem('token')
          }
    }).then(() => {
      getData();
      setLoading(false);
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
      <TouchableOpacity
        style={styles.headerBackButton}
        onPress={() => navigation.goBack()}
      >
        <AntDesign name="arrowleft" size={28} color="black" />
      </TouchableOpacity>
      <View style={styles.customerInfo}>
        <Text style={styles.infoLabel}>Customer Information</Text>
        <Text>Name: {data.user.username}</Text>
        <Text>Address: {data.user.address}</Text>
        <Text>Phone: 0{data.user.phone}</Text>
      </View>

      <View style={styles.productList}>
        <Text style={styles.infoLabel}>Product List</Text>
        <FlatList
          data={data.products}
          style={styles.product}
          keyExtractor={(item, index) => `${item.name}_${index}`}
          renderItem={({ item }) => (
            <View style={styles.productItem}>
              <Image source={{ uri: `data:${item.product.image.contentType};base64,${item.product.image.data}` }} style={styles.productImage} />
              <View style={styles.productInfo}>
                <Text style={{fontWeight: "bold" , fontSize: 16}}>{item.product.name}</Text>
                <Text>Quantity: {item.quantity}</Text>
                <Text>Price: {item.product.price}đ</Text>
                <Text>Tổng tiền: {item.price}đ</Text>
              </View>
              
            </View>
          )}
        />
      </View>

      <View style={styles.orderSummary}>
        <Text style={styles.infoLabel}>Order Summary</Text>
        <Text>Total Amount: {data.totalPrice}đ</Text>
        <Text>Order Status: {data.status}</Text>
        {checkStatus()}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    marginTop: 20
  },
  customerInfo: {
    borderBottomWidth: 1,
    borderBottomColor: "lightgray",
    paddingBottom: 16,
    marginBottom: 16,
  },
  infoLabel: {
    fontSize: 18,
    fontWeight: "bold",
  },
  productList: {
    marginBottom: 16,
  },
  productItem: {
    marginBottom: 8,
    flexDirection: 'row',

  },
  orderSummary: {},
  productInfo: {
    marginLeft: 10,
    
  },
  productImage: {
    width: 80,
    height: 80,
  },
  product: {
    maxHeight: 300

  },
  headerBackButton: {
    top: -10,
    left: -10,
  },
});

export default OrderDetail;
