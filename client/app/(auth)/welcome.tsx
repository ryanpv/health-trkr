import { router } from "expo-router";
import { View, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const WelcomeScreen = () => {
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
    </SafeAreaView>
  )
}

export default WelcomeScreen;