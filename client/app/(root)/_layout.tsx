import { Stack } from 'expo-router';
import { AuthProvider } from './context';

const RootLayout = () => {
  return (
    <AuthProvider>
      <Stack>
        <Stack.Screen name='(tabs)' options={{ headerShown: false }}/>
      </Stack>
    </AuthProvider>
  )
}

export default RootLayout;