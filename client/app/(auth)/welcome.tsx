import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const WelcomeScreen = () => {
  return (
    <SafeAreaView>
      <View>
        <Text>Welcome to the app!</Text>
      </View>
    </SafeAreaView>
  )
}