import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const WelcomeScreen = () => {
  return (
    <SafeAreaView>
      <View>
        <Text className="text-blue-500 border border">Welcome to the health-trkr app!</Text>
      </View>
    </SafeAreaView>
  )
}

export default WelcomeScreen;