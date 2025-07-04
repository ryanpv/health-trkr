import '../global.css';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';


import { FIREBASE_AUTH } from "@/FirebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { AuthProvider } from '../contexts/context';
import { StateProvider } from '../contexts/stateContext';
import Toast from 'react-native-toast-message'; // For notifications in-app
import React from 'react';


// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

if (typeof document === 'undefined') {
  React.useLayoutEffect = React.useEffect;
}

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  // Firebase auth state change listener
  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      if (user) {
        console.log("USER LOGGED IN: ");
        const uid = user.uid;
      } else {
        console.log("USER NOT LOGGED IN");
      }
    });
  }, []);

  // Hide splash screen when app is loaded
  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }



  return (
    <AuthProvider>
      <StateProvider>
        <Stack>
          <Stack.Screen name='index' options={{ headerShown: false }}/> {/* Direct to welcome page */}
          <Stack.Screen name='(auth)' options={{ headerShown: false }}/>
          <Stack.Screen name='(root)' options={{ headerShown: false }}/>
          {/* <Stack.Screen name='(quests)' options={{ headerShown: false }}/> */}
        </Stack>
      </StateProvider>
    </AuthProvider>
  );
}
