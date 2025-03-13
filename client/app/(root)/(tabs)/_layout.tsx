import { icons } from '@/constants';
import { Tabs } from 'expo-router';
import { Image, ImageSourcePropType, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';




const TabsLayout = () => {


  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "white",
        tabBarShowLabel: true,
        tabBarLabelPosition: "below-icon",
        tabBarStyle: {
          backgroundColor: "#66A2FF",
          display: 'flex',
          justifyContent: 'space-around',
          flexDirection: 'row',
          alignItems: 'center',
          position: 'absolute',
          height: 80,
          // overflow: 'hidden',
          
        },
        tabBarLabelStyle: {
          // textAlign: 'center',
          fontSize: 12,
          // color: 'white',
        },
      }}
    >
      <Tabs.Screen
        name='explore'
        options={{ 
          title: 'Explore',
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Icon
              name='rocket'
              size={25}
              color={ focused ? "#ebc61e" : "#cbd5e1" }
            />
          ),
          tabBarLabel: 'Explore',
        }}
      />
      <Tabs.Screen
        name='quests'
        options={{ 
          title: 'Quests',
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Icon
              name='reader'
              size={25}
              color={ focused ? "#ebc61e" : "#cbd5e1" }
            />
          ),
          tabBarLabel: 'Quests',
        }}
      />
      <Tabs.Screen
        name='home'
        options={{ 
          title: 'Home',
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Icon
              name='home'
              size={25}
              color={ focused ? "#ebc61e" : "#cbd5e1" }
            />
          ),
          tabBarLabel: 'Home',
        }}
      />
      <Tabs.Screen
        name='profile'
        options={{ 
          title: 'Profile',
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Icon
              name='id-card'
              size={25}
              color={ focused ? "#ebc61e" : "#cbd5e1" }
            />
          ),
          tabBarLabel: 'Profile',
        }}
      />
    </Tabs>
  )
}

export default TabsLayout;