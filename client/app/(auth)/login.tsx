// Library imports
import { useState, useEffect } from "react";
import { Platform } from "react-native";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, TextInputChangeEventData, ActivityIndicator } from "react-native";
import  { useForm, Controller, SubmitHandler, useWatch } from "react-hook-form";
import { SafeAreaView } from "react-native-safe-area-context";
import * as SecureStore from "expo-secure-store";
import { useRouter } from "expo-router";

// Firebase auth imports
import { FIREBASE_AUTH } from "@/FirebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useAuthContext } from "../(root)/context";


type FormData = {
  email: string;
  password: string;
};


const Login = () => {
  // State variables
  const [error, setError] = useState<string | null>(null);
  const { currentUser, setCurrentUser } = useAuthContext();
  const [loading, setLoading] = useState(false);

  // Watch login form state changes
  const { watch, control, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const router = useRouter();
  
  const onLogin: SubmitHandler<FormData> = async (data: FormData) => {
    try {
      setLoading(true);
      const userLogin = await signInWithEmailAndPassword(FIREBASE_AUTH, data.email, data.password);
      const user = userLogin.user;
      
      const token = await user.getIdToken();
      console.log("LOGIN TOKEN: ", token)
      if (user) {
        await storeUserCredentials(token, user.uid, user.displayName || '');
        setCurrentUser(user.uid);

        router.replace("/home");
      }
    } catch (error) {
      console.error("Error: ", error);
    } finally {
      setLoading(false);
    }
  };

  const setCredentials = async (key: string, value: string): Promise<void> => {
    try {
      if (Platform.OS === "web") {
        localStorage.setItem(key, value);
      } else {
        await SecureStore.setItemAsync(key, value, {
          keychainAccessible: SecureStore.WHEN_UNLOCKED_THIS_DEVICE_ONLY
        });
      }
    } catch (error) {
      console.error(`Error setting ${key}: `, error);
    }
  };
    
  const storeUserCredentials = async (token: string, uid: string, displayName: string) => {
    try {
      // Store user credentials in localstorage during DEVELOPMENT
      await Promise.all([
        setCredentials("accessToken", token),
        setCredentials("uid", uid),
        setCredentials("displayName", displayName)
      ]);
    } catch (error) {
      console.error("ERROR storing user credentials", error);
      setError("Error storing user credentials");
    }
  };

  // Watch input field state changes
  // const emailWatch = watch("email");
  // const passwordWatch = watch("password");
  return (
    <SafeAreaView className="bg-gray-300 h-screen">
      <SafeAreaView>
        <ActivityIndicator style={ styles.loadingOverlay } size="large" color="#0000ff" animating={ loading } />
      </SafeAreaView>

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
  },
  loadingOverlay: {
    opacity: 0.75,
    backgroundColor: "#dbeafe", // bg-blue-100
    display: "flex",
    position: "absolute", 
    zIndex: 10, 
    justifyContent: "center",
    alignItems: "center", 
    top: 0,
    left: 0, 
    right: 0, 
    bottom: 0,
  },
});


export default Login;