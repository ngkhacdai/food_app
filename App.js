import { NavigationContainer } from '@react-navigation/native';
import Tab from './src/tab/Tab';
import ProductDetail from './src/components/ProductDetail';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Login from './src/components/Login';
import RegisterScreen from './src/components/RegisterScreen';
import React, { useEffect, useState } from 'react';
import Setting from './src/components/navigations/Setting';
import TopTab from './src/tab/TopTab';
import Orderdetail from './src/components/OrderDetail';

const Stack = createNativeStackNavigator();

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState(null);

  useEffect(() => {
    // Kiểm tra và sử dụng token từ AsyncStorage
    AsyncStorage.getItem('token')
      .then((storedToken) => {
        if (storedToken) {
          setToken(storedToken);
        }
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return null; // Hoặc có thể thay thế bằng một màn hình tải trước
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {token ? (
          <>
            <Stack.Screen name="Tab" component={Tab} options={{ headerShown: false }} />
            <Stack.Screen name="ProductDetail" component={ProductDetail} />
            <Stack.Screen name="Setting" component={Setting} />
            <Stack.Screen name="Order" component={TopTab} />
            <Stack.Screen name="OrderDetail" component={Orderdetail} />
          </>
        ) : (
          <>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={RegisterScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
