import { Link, Stack } from 'expo-router';
import { StyleSheet, View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function NotFoundScreen() {
  return (
    <>
      <SafeAreaView className='h-screen bg-black'>
        <View className='bg-black h-full flex items-center justify-center space-y-5'>
          <Text className='text-white text-3xl font-semibold'>Oops! Page not found.</Text>
          <Link href="/" className='text-white text-lg'>Return to home page</Link>
        </View>
      </SafeAreaView>

      <Stack.Screen options={{ headerShown: false }} />
    </>
  );
}
