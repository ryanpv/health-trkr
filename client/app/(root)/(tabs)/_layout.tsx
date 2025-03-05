import { Tabs } from 'expo-router';

const TabsLayout = () => {
  return (
    <Tabs
      initialRouteName='index'
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
          borderRadius: 25,
          marginHorizontal: 20,
          marginBottom: 20,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: 'bold',
          alignContent: 'flex-end'
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
          // tabBarIcon: () => ()
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