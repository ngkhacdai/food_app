import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Button, Alert } from 'react-native';
import axios from 'axios';
import { apiweb } from '../api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeModules } from "react-native";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    const form = {
      email, password
    }
    axios.post(apiweb + '/access/login', form).then(async (res) => {
      if (res.data.status === 200) {
        AsyncStorage.setItem('token', res.data.token)
        NativeModules.DevSettings.reload();

      } else {
        Alert.alert(res.data.message)
      }
    })
  };

  const handleRegister = () => {
    navigation.navigate('Register');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Đăng nhập</Text>
      <TextInput
        style={styles.input}
        placeholder="Tên đăng nhập"
        value={email}
        onChangeText={(value) => setEmail(value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Mật khẩu"
        secureTextEntry={true}
        value={password}
        onChangeText={(value) => setPassword(value)}
      />
      <Button
        title="Đăng nhập"
        onPress={handleLogin}
        color="blue"
      />
      <TouchableOpacity onPress={handleRegister}>
        <Text style={styles.registerButton}>Đăng ký</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    margin: 10,
    padding: 10,
    width: '90%',
  },
  registerButton: {
    textAlign: 'center',
    marginTop: 10,
    color: 'blue', // Màu của nút Đăng ký
  },
});

export default Login;
