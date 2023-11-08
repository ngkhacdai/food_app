import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';
import { apiweb, local } from '../api';
import { useIsFocused } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const BlogScreen = () => {
    const [blog, setBlog] = useState([]);
    useEffect(() => {
        getData()
    },[useIsFocused()])
    const getData = async () => {
        axios.get(apiweb + '/getallblog', {
            headers: {
                'token': await AsyncStorage.getItem('token')
            }
        }).then((res) => setBlog(res.data.blog))
    }
  return (
    <View style={styles.container}>
      <FlatList
        data={blog}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.blogItem}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.content}>{item.content}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    marginTop: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  blogItem: {
    marginBottom: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: 'lightgray',
    borderRadius: 5,
  },
  blogTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  blogContent: {
    fontSize: 16,
  },
});

export default BlogScreen;
