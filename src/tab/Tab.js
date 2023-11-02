import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../components/navigations/Home';
import Setting from '../components/navigations/Setting';
import ChatBot from '../components/ChatBot'

export default Tab = () => {
    const Tab = createBottomTabNavigator();

    return (
        <Tab.Navigator screenOptions={{
            headerShown: false
        }}>
            <Tab.Screen name='Home' component={Home} />
            <Tab.Screen name='ChatBot' component={ChatBot} />
            <Tab.Screen name='Setting' component={Setting} />
        </Tab.Navigator>
    );
}