import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../components/navigations/Home';
import Setting from '../components/navigations/Setting';

export default Tab = () => {
    const Tab = createBottomTabNavigator();

    return (
        <Tab.Navigator screenOptions={{
            headerShown: false
        }}>
            <Tab.Screen name='Home' component={Home} />
            <Tab.Screen name='Setting' component={Setting} />
        </Tab.Navigator>
    );
}