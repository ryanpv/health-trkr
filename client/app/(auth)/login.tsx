import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { SafeAreaView } from "react-native-safe-area-context";


const Login = () => {
  // Initializing state for Firebase connection
  const [initializing, setInitializing] = useState<boolean>(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const [error, setError] = useState<string | null>(null);

  const onAuthStateChanged = (user: FirebaseAuthTypes.User | null) => {
    setUser(user);

    if (initializing) setInitializing(false);
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  if (initializing) return null;

  if (!user) {
    setError("User not found");
  }

  return (
    <SafeAreaView>
      <View>
        { error ? <Text>{ error }</Text> 
        : 
        <Text>
          Welcome back, { user?.email }
        </Text>
        }
      </View>
    </SafeAreaView>
  )
}

export default Login;