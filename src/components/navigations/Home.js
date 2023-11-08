import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { apiweb } from '../../api/index';
import { useIsFocused } from '@react-navigation/native';

function Home({ navigation }) {
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
  }, [useIsFocused()]);

  const getData = () => {
    axios.get(apiweb + '/getallproduct').then((res) => {
      setData(res.data);
    });
  };

  const handleSearch = (text) => {
    const filteredData = data.filter((item) => item.name.toLowerCase().includes(text.toLowerCase()));
    setSearchResults(filteredData);
    setSearchText(text);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TextInput
          placeholder="Tìm kiếm sản phẩm..."
          value={searchText}
          onChangeText={(text) => handleSearch(text)}
          style={styles.searchInput}
        />
        <TouchableOpacity
          style={styles.cartButton}
          onPress={() => navigation.navigate('Cart')}
        >
          <Text style={styles.cartButtonText}>Giỏ hàng</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={searchResults.length > 0 ? searchResults : data}
        keyExtractor={(item) => item._id}
        renderItem={({ item, index }) => (
          <View
            style={(index + 1) % 2 === 0 ? styles.productCard : styles.singleColumn}
          >
            <TouchableOpacity
              onPress={() => navigation.navigate('ProductDetail', { product: item })}
            >
              <Image source={{ uri: `data:${item.image.contentType};base64,${item.image.data}` }} style={styles.productImage} />
              <Text style={styles.productName}>{item.name}</Text>
              <Text style={styles.productPrice}>{item.price}đ</Text>
            </TouchableOpacity>
          </View>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
    padding: 16,
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 8,
  },
  cartButton: {
    backgroundColor: 'blue',
    padding: 8,
    borderRadius: 8,
  },
  cartButtonText: {
    color: 'white',
    textAlign: 'center',
  },
  productCard: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    flex: 1,
    margin: 8,
  },
  singleColumn: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    flex: 0.5,
    margin: 8,
  },
  productImage: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
    marginBottom: 8,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  productPrice: {
    fontSize: 14,
    color: 'green',
  },
  noResultsText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 16,
  },
});

export default Home;
