import { Redirect, router } from "expo-router";
import { FIREBASE_AUTH } from "@/FirebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, TouchableOpacity, View } from "react-native";

const Home = () => {
  useEffect(() => {
    
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      if (user) {
        console.log("USER LOGGED IN: ", user);
        const uid = user.uid;
        // return <Redirect href="./(auth)/welcome" />
      } else {
        console.log("USER NOT LOGGED IN");
      }
    });
  }, []);

  return (
    <SafeAreaView className="flex items-center">
      <View className="p-5 w-full">
        <Text className="text-blue-500 text-center font-bold text-lg">Welcome to the health-trkr app!</Text>
      </View>

      <TouchableOpacity
        className="m-5 border border-2 flex flex-wrap rounded-full border-blue-500"
        onPress={ () => {
          router.replace("../home");
        } }
      >
        <Text className="px-5 py-3 text-center font-semibold text-orange-500 text-md underline">Continue</Text>
      </TouchableOpacity>
      <TouchableOpacity
        className="m-5 border border-2 flex flex-wrap rounded-full border-blue-500"
        onPress={ () => {
          router.replace("./signup");
        } }
      >
        <Text className="px-5 py-3 text-center font-semibold text-orange-500 text-md underline">SIGNUP</Text>
      </TouchableOpacity>
      <TouchableOpacity
        className="m-5 border border-2 flex flex-wrap rounded-full border-blue-500"
        onPress={ () => {
          router.replace("./login");
        } }
      >
        <Text className="px-5 py-3 text-center font-semibold text-orange-500 text-md underline">LOG IN</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}


export default Home;