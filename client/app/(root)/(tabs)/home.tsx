import { SafeAreaView } from "react-native-safe-area-context"
import { Text, View, Image, Button, TouchableOpacity } from "react-native"
import { useState } from "react";
import { icons } from '@/constants';


const Home = () => {
  const [dailyGoalCount, setDailyGoalCount] = useState<number>(2);

  return (
    <SafeAreaView className="bg-blue-400 h-full">
      <View className="m-5 flex flex-row">
        <View className="flex-1 gap-y-2">
          <Text className="font-semibold text-white">Welcome back, </Text>
          <Text className="font-semibold text-lg text-white">User One</Text>
        </View>

        <View className="">
          <Image 
            source={ icons.home }
            style={ { width: 30, height: 30 } } 
            resizeMode="contain"
          />
        </View>
      </View>

      <View className="m-5 p-5 h-40 rounded-md shadow-lg bg-blue-200">
        <Text className="font-semibold">{ dailyGoalCount } / 5 Daily goals completed</Text>

      </View>

      <TouchableOpacity className="m-5 p-2 shadow-lg rounded-md bg-blue-600 flex flex-row items-center justify-center space-x-2">
        <View className="w-full px-2">
          <Image 
            className="flex-start"
            source={ icons.check }
            style={ { width: 30, height: 30 } } 
            resizeMode="contain"
          />
        </View>

        <Text className="absolute text-white font-semibold text-center">Add New Goal</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

export default Home;