import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet , NativeModules } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Setting = () => {
    const navigation = useNavigation();

    const goToEditProfile = () => {
        navigation.navigate('EditProfile');
    };

    const goToOrderHistory = () => {
        navigation.navigate('Order');
    };
    const Logout = () => {
        AsyncStorage.setItem('token', '')
        NativeModules.DevSettings.reload();
    }

  return (
      <View style={styles.container}>
      <TouchableOpacity style={styles.settingItem} onPress={goToEditProfile}>
        <Text>Chỉnh sửa thông tin cá nhân</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.settingItem} onPress={goToOrderHistory}>
        <Text>Xem đơn hàng</Text>
          </TouchableOpacity>
        <TouchableOpacity style={styles.settingItem} onPress={Logout}>
            <Text>Đăng xuất</Text>
        </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        marginTop:50
    },
    userName: {
        fontSize: 24,
        marginTop: 20, 
        textAlign: "center"
    },
    settingItem: {
        borderBottomWidth: 1,
        borderColor: 'gray',
        paddingVertical: 16,
    },
});

export default Setting;
