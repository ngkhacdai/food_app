import React, { useState } from 'react';
import { View, ScrollView, Text, Image, TouchableOpacity, StyleSheet , Modal, Alert } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; // Sử dụng icon Back
import { apiweb} from '../api/index';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default ProductDetail = ({ navigation, route }) => {
  const { product } = route.params;
  const [isModalVisible, setModalVisible] = useState(false); // Sử dụng state để quản lý hiển thị modal
  const [quantity, setQuantity] = useState(1);

  function truncateText(text, maxLength) {
  if (text.length > maxLength) {
    return text.slice(0, maxLength) + '...'; // Cắt tên sản phẩm nếu vượt quá maxLength và thêm dấu '...' ở cuối
  }
  return text;
}
  const handleAddToCart = async () => {
    const form = {_id: product._id}
    axios.post(apiweb + '/addtocart', form, {
      headers: {
            'token': await AsyncStorage.getItem('token')
          }
    }).then(() => {
      Alert.alert('Thêm vào giỏ hàng thành công')
    })
  };

  const handleBuyNow = () => {
    // Hiển thị modal khi ấn nút "Mua hàng"
    setModalVisible(true);
  };
  const handleBuy = async () => { 
    const form = {
      _id: product._id,
      price: product.price,
      quantity: quantity
    }
    await axios.post(apiweb + '/payoneproduct', form, {
      headers: {
            'token': await AsyncStorage.getItem('token')
      }
    }).then(() => {
      Alert.alert('Mua hàng thành công')
    })
  }
  const closeModal = () => {
    // Đóng modal
    setModalVisible(false);
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.headerBackButton}
        onPress={() => navigation.goBack()}
      >
        <AntDesign name="arrowleft" size={24} color="black" />
      </TouchableOpacity>
      <ScrollView style={styles.content}>
        <Image source={{ uri: `data:${product.image.contentType};base64,${product.image.data}` }} style={styles.productImage} />
        <View style={styles.productInfo}>
          <Text style={styles.productName}>{product.name}</Text>
          <Text style={styles.productPrice}>{product.price}đ</Text>
          <Text style={styles.productDescription}>
            Mô tả sản phẩm: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </Text>
        </View>
      </ScrollView>
      <View style={styles.buttonContainer}>
  
  <TouchableOpacity style={[styles.button, styles.addToCartButton]} onPress={handleAddToCart}>
    <Text style={[styles.buttonText, styles.addToCartButtonText]}>Thêm vào giỏ hàng</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.buyNowButton]} onPress={handleBuyNow}>
    <Text style={[styles.buttonText, styles.buyNowButtonText]}>Mua ngay</Text>
  </TouchableOpacity>
</View>
      {/* Modal để chọn số lượng sản phẩm */}
      <Modal animationType="slide" transparent={true} visible={isModalVisible}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity onPress={closeModal}>
              <AntDesign name="close" size={24} color="black" />
            </TouchableOpacity>
            <View style={styles.modalProductContainer}>
              <Image source={{ uri: `data:${product.image.contentType};base64,${product.image.data}` }} style={styles.modalProductImage} />
              <View style={styles.modalProductInfo}>
                <Text style={styles.modalTitle}>{truncateText(product.name, 100)}</Text>
                <Text style={styles.modalPrice}>Giá: {product.price}đ</Text>
              </View>
            </View> 
            <View style={styles.quantityContainer}>
              <TouchableOpacity style={styles.quantityButton} onPress={decreaseQuantity}>
                <Text>-</Text>
              </TouchableOpacity>
              <Text>{quantity}</Text>
              <TouchableOpacity style={styles.quantityButton} onPress={increaseQuantity}>
                <Text>+</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.modalTotalPrice}>Tổng giá: {product.price * quantity}đ</Text>
            <TouchableOpacity style={styles.addToCartButton} onPress={handleBuy}>
              <Text style={styles.addToCartButtonText}>Mua hàng</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  content: {
    flex: 1,
  },
  productImage: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
  productInfo: {
    padding: 16,
  },
  productName: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  productPrice: {
    fontSize: 18,
    color: 'red',
  },
  productDescription: {
    fontSize: 16,
    marginVertical: 10,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
  },
  button: {
    flex: 1,
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  addToCartButton: {
    backgroundColor: 'blue',
  },
  addToCartButtonText: {
    color: 'white',
    width: 300,
    textAlign: 'center',
    height: 20
  },
  buyNowButton: {
    backgroundColor: 'green',
  },
  buyNowButtonText: {
    color: 'white',
  },
  headerBackButton: {
    position: 'absolute',
    top: 20,
    left: 16,
    zIndex: 2,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end', // Đặt modal ở phía dưới màn hình
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  modalContent: {
    backgroundColor: 'white',
    width: '100%',
    padding: 16,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    alignItems: 'center',
  },
  modalProductImage: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalPrice: {
    fontSize: 16,
    color: 'red',
  },

  modalTotalPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  modalContent: {
    backgroundColor: 'white',
    width: '80%',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  quantityButton: {
    backgroundColor: 'lightgray',
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  modalProductContainer: {
    flexDirection: 'row',
  },
  modalProductImage: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
  },
  modalProductInfo: {
    flex: 1,
    marginLeft: 10,
  },
});

