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
        tintColor={ `${ focused ? "orange" : "#cbd5e1" }` }
        resizeMode='contain'
        className='w-5 h-5'
      />
    </View>
  );

  return (
    <Tabs
      // initialRouteName='index'
      screenOptions={{
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "white",
        tabBarShowLabel: true,
        tabBarLabelPosition: "below-icon",
        tabBarItemStyle: {
          // flex: 1,
        },
        tabBarStyle: {
          backgroundColor: "#66A2FF",
          display: 'flex',
          justifyContent: 'space-around',
          flexDirection: 'row',
          alignItems: 'center',
          position: 'absolute',
          height: 70,
          // padding: 25,
          // paddingBottom: 20,
          overflow: 'hidden',
        },
        tabBarLabelStyle: {
          textAlign: 'center',
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
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={ focused }
              source={ icons.check }
            />
          )
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
              source={ icons.home }
            />
          )
        }}
      />
      <Tabs.Screen
        name='profile'
        options={{ 
          title: 'Profile',
          headerShown: false,
          tabBarIcon: () => (
            <TabIcon
              focused={ false }
              source={ icons.profile}
            />
          )
        }}
      />
    </Tabs>
  )
}

export default TabsLayout;