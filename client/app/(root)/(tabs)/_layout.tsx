import { Tabs } from 'expo-router';

const TabsLayout = () => {
  return (
    <Tabs>
      <Tabs.Screen
        name='explore'
        options={{ 
          title: 'Explore',
          headerShown: false,
        }}
      />
    </Tabs>
  )
}

export default TabsLayout;