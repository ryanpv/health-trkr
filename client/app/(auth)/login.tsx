// Library imports
import React, { useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, TextInputChangeEventData } from "react-native";
import  { useForm, Controller, SubmitHandler, useWatch } from "react-hook-form";
import { SafeAreaView } from "react-native-safe-area-context";
import * as SecureStore from "expo-secure-store";

// Firebase auth imports
import { FIREBASE_AUTH } from "@/FirebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useAuthContext } from "../(root)/context";


type FormData = {
  email: string;
  password: string;
};


const Login = () => {
  const [error, setError] = useState<string | null>(null);
  const { currentUser, setCurrentUser } = useAuthContext();
  
  // Watch login form state changes
  const { watch, control, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    defaultValues: {
      email: '',
      password: ''
    }
  });
  
  const onLogin: SubmitHandler<FormData> = async (data: FormData) => {
    try {
      const userLogin = await signInWithEmailAndPassword(FIREBASE_AUTH, data.email, data.password)
      const user = userLogin.user;
      const token = await user.getIdToken();

      if (user) {
        await storeUserCredentials(token, user.uid, user.displayName || '');
        setCurrentUser(user.uid);
      }

      console.log("user: ", user);
    } catch (error) {
      console.error("Error: ", error);
    }
    };
    
  const storeUserCredentials = async (token: string, uid: string, displayName: string) => {
    try {
      await SecureStore.setItemAsync("userToken", token, {
        keychainAccessible: SecureStore.WHEN_UNLOCKED_THIS_DEVICE_ONLY,
      });
  
      await SecureStore.setItemAsync("userUid", uid, {
        keychainAccessible: SecureStore.WHEN_UNLOCKED_THIS_DEVICE_ONLY
      });
  
      await SecureStore.setItemAsync("userDisplayName", displayName, {
        keychainAccessible: SecureStore.WHEN_UNLOCKED_THIS_DEVICE_ONLY
      });
    } catch (error) {
      console.error("ERROR storing user credentials", error);
      setError("Error storing user credentials");
    }
  };

  // Watch input field state changes
  // const emailWatch = watch("email");
  // const passwordWatch = watch("password");
  return (
    <SafeAreaView className="bg-gray-300 h-full">
      <View>
        <View className="gap-y-5">
          <View>
            <Controller
              control={control}
              name="email"
              rules={{ required: true}}
              render={({ field: { onChange, onBlur, value }}) => (
                <TextInput
                  placeholder="Enter your email"
                  placeholderTextColor={"gray"}
                  style={ styles.input }
                  onBlur={ onBlur }
                  onChangeText={ onChange }
                  value={ value }
                />
              )}
            />

            <Text style={ {marginHorizontal: styles.input.marginHorizontal, color: 'red' } }>
              { errors.email ? "Email is required." : ""}
            </Text> 
          </View>

          <View>
            <Controller
              control={control}
              name="password"
              rules={{ 
                required: "Password is required",
                minLength: { value: 8, message: "Password must be at least 8 characters" },
                pattern: {
                  value: /^(?=.*[A-Z])(?=.*\d).{8,}$/,
                  message: "Password must contain at least one uppercase letter and one number",
                },
              }}
              render={({ field: { onChange, onBlur, value }}) => (
                <TextInput
                  placeholder="Enter password"
                  placeholderTextColor={"gray"}
                  style={ styles.input }
                  onBlur={ onBlur }
                  onChangeText={ onChange }
                  value={ value }
                  secureTextEntry={true}
                  textContentType="oneTimeCode"
                />
              )}
            />

            <Text style={ {marginHorizontal: styles.input.marginHorizontal, color: 'red' } }>
              { errors.password ? `${ errors.password.message }` : ""}
            </Text> 
          </View>
        </View>

        <TouchableOpacity className="bg-blue-500 p-4 m-10 rounded" onPress={handleSubmit(onLogin)}>
          <Text className="text-white text-center text-lg">Log in</Text>
        </TouchableOpacity>

        <Text className="mx-10 mt-5 text-center text-lg">Sign in using Google</Text>

      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: "white",
    borderRadius: 8,
    marginHorizontal: 35,
    padding: 10,
    height: 55,
    fontSize: 18
  }
});


export default Login;