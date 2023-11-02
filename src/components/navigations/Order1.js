import React, { useEffect, useState } from "react";
import { View, FlatList, Text, Image, StyleSheet ,TouchableOpacity } from 'react-native';
import axios from "axios";
import { useIsFocused } from "@react-navigation/native";
import { apiweb, local } from "../../api/index";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default Order1 = ({navigation}) => {
  const [data, setData] = useState([]);
  const [order, setOrder] = useState([]);
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    async function getData() {
      try {
        const response = await axios.get(apiweb + '/getallorderbyuser', {
          headers: {
            'token': await AsyncStorage.getItem('token')
          }
        });
        setData(response.data.order); // Assuming 'order' contains your order data
        setLoading(false)
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    getData();
  }, [useIsFocused()]);

  useEffect(() => {
    if (data && Array.isArray(data)) {
      const filteredOrders = data.filter(item => item.status === "Chờ xác nhận");
      setOrder(filteredOrders);
    } else {
      setOrder([]);
    }
  }, [data]);
  if (isLoading) {
    return (
      <Text style={{margin: 20,alignItems: "center"}}>IsLoading...</Text>
    )
  }
  return (
    <View style={styles.container}>
      <FlatList
        data={order}
        keyExtractor={(item) => item._id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("OrderDetail", { order: item });
            }}
          >
          <View style={styles.orderItem}>
            <View style={styles.orderInfo}>
              <Text style={styles.productName}>{item._id}</Text>
              <Text >Số lượng sản phẩm: {item.products.length}</Text>
              <Text>Tổng cộng: {item.totalPrice}đ</Text>
              <Text>Trạng thái đơn hàng: {item.status}</Text>
              <Text>Ngày mua: {item.orderDate}</Text>
            </View>
          </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  orderItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    borderWidth: 1,
    borderColor: 'lightgray',
    borderRadius: 5,
    padding: 10,
  },
  productImage: {
    width: 80,
    height: 80,
    resizeMode: 'cover',
    marginRight: 10,
  },
  orderInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
