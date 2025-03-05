import { Stack } from 'expo-router';

const AuthLayout = () => {
  return (
    <Stack>
      <Stack.Screen name='welcome' options={{ headerShown: false }}/>
    </Stack>
  )
}

export default AuthLayout;