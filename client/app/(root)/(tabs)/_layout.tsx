import { icons } from '@/constants';
import { Tabs } from 'expo-router';
import { Image, ImageSourcePropType, View } from 'react-native';




const TabsLayout = () => {
  const TabIcon = ({
    source,
    focused
  } : {
    source: ImageSourcePropType,
    focused: boolean
  }) => (
    <View>
      <Image
        source={source}
        tintColor={ `${ focused ? "#71B8CA" : "#cbd5e1" }` }
        resizeMode='contain'
        className='w-6 h-6'
      />
    </View>
  );

  return (
    <Tabs
      // initialRouteName='index'
      screenOptions={{
        tabBarActiveTintColor: "white",
        // tabBarInactiveTintColor: "white",
        tabBarShowLabel: true,
        tabBarLabelPosition: "below-icon",
        tabBarStyle: {
          backgroundColor: "#333333",
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
          height: 76,
          padding: 10,
          paddingBottom: 10,
          overflow: 'hidden',
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: 'bold',
          alignContent: 'flex-end',
        }
      }}
    >
      <Tabs.Screen
        name='explore'
        options={{ 
          title: 'Explore',
          headerShown: false,
          // tabBarIcon: () => ()
        }}
      />
      <Tabs.Screen
        name='quests'
        options={{ 
          title: 'Quests',
          headerShown: false,
          // tabBarIcon: () => ()
        }}
      />
      <Tabs.Screen
        name='home'
        options={{ 
          title: 'Home',
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={ focused }
              source={ icons.profile }
            />
          )
        }}
      />
      <Tabs.Screen
        name='profile'
        options={{ 
          title: 'Profile',
          headerShown: false,
          // tabBarIcon: () => ()
        }}
      />
    </Tabs>
  )
}

export default TabsLayout;