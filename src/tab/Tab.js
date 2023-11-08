import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../components/navigations/Home';
import Setting from '../components/navigations/Setting';
import ChatBot from '../components/ChatBot'
import BlogScreen from '../components/Blog';
import Icon from 'react-native-vector-icons/Fontisto';

export default Tab = () => {
    const Tab = createBottomTabNavigator();

    return (
        <Tab.Navigator screenOptions={({ route }) => (
            {
            headerShown: false,
            tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
                iconName = 'home';
            } else if (route.name === 'Setting') {
                iconName = 'player-settings'
            } else if (route.name === 'ChatBot') {
                iconName = 'hipchat'
            } else if (route.name === 'Blog') {
                iconName = 'blogger'
            }

            return <Icon name={iconName} size={size} color={color} />;
          },
        }
        )}>
            <Tab.Screen name='Home' screenOptions={() => {
            
            }} component={Home} />
            <Tab.Screen name='ChatBot' component={ChatBot} />
            <Tab.Screen name='Blog' component={BlogScreen} />
            <Tab.Screen name='Setting' component={Setting} />
        </Tab.Navigator>
    );
}