import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Order1 from '../components/navigations/Order1'; // Import các màn hình Order1, Order2, Order3
import Order2 from '../components/navigations/Order2';
import Order3 from '../components/navigations/Order3';
import Order4 from '../components/navigations/Order4';
import { TouchableOpacity , Text } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; // Sử dụng icon Back

const Tab = createMaterialTopTabNavigator();
const Stack = createNativeStackNavigator();

const TopTab = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Chờ xác nhận"
        component={Order1}
        options={{
          title: 'Chờ xác nhận',
        }}
      />
      <Tab.Screen
        name="Đang giao hàng"
        component={Order2}
        options={{
          title: 'Đang giao hàng',
        }}
      />
      <Tab.Screen
        name="Đã giao hàng"
        component={Order3}
        options={{
          title: 'Đã giao hàng',
        }}
      />
      <Tab.Screen
        name="Đơn hàng bị hủy"
        component={Order4}
        options={{
          title: 'Đơn hàng bị hủy',
        }}
      />
    </Tab.Navigator>
  );
};

const OrderTabScreen = ({ navigation }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="TopTab"
        component={TopTab}
        options={{
          title: 'Danh sách đơn hàng',
          headerLeft: () => (
            <TouchableOpacity  onPress={() => navigation.goBack()}>
              <AntDesign name="arrowleft" size={24} color="black" />
            </TouchableOpacity>
          ),
        }}
      />
    </Stack.Navigator>
  );
};

export default OrderTabScreen;
