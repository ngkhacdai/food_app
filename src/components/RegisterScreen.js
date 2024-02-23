import axios from 'axios';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Button, Alert } from 'react-native';
import { apiweb } from '../api/index'

const RegisterScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');

  const handleRegister = () => {
    const form = {
      username, email, password, address, phone
    }
    axios.post(apiweb + '/access/signup', form).then((res) => {
      if (res.data.status === 200) {
        Alert.alert('Đăng ký thành công')
      } else {
        Alert.alert(res.data.message)
      }
    })
  };

  const navigateToLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Đăng ký</Text>
      <TextInput
        style={styles.input}
        placeholder="Họ và tên"
        value={username}
        onChangeText={(value) => setUsername(value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
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
      <TextInput
        style={styles.input}
        placeholder="Địa chỉ"
        value={address}
        onChangeText={(value) => setAddress(value)}
      />
      <TextInput
        style={styles.input}
        keyboardType='numeric'
        placeholder="SĐT"
        value={phone}
        onChangeText={(value) => setPhone(value)}
      />
      <Button title="Đăng ký" onPress={handleRegister} />
      <TouchableOpacity onPress={navigateToLogin}>
        <Text style={styles.loginButton}>Đã có tài khoản? Đăng nhập ngay</Text>
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
    width: '90%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    margin: 10,
    padding: 10,
  },
  loginButton: {
    textAlign: 'center',
    marginTop: 10,
    color: 'blue',
  },
});

export default RegisterScreen;
