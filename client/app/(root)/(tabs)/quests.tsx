import { SafeAreaView } from "react-native-safe-area-context"
import { View, Text } from "react-native"
import QuestButton from "@/app/components/questButton";

const Quests = () => {

  return (
    <SafeAreaView className="bg-blue-400 min-h-screen p-5 flex items-center">
      <View className="flex max-w-xl w-full p-5">
        <View className="flex flex-row justify-between my-10">
          <Text className="text-2xl font-semibold text-gray-800">Total Points: 0000</Text>
          <Text className="text-2xl font-semibold text-gray-800">Credits: 000</Text>
        </View>

        
        <Text className="font-semibold text-xl my-5">Daily Goals</Text>
        <View className="bg-blue-200 p-5 rounded-md shadow shadow-xl">
          <View className="flex items-center">
            <Text>99</Text>
            <Text>Daily Streak</Text>
          </View>
        </View>

        <View className="flex gap-y-5 my-5">
          <QuestButton />
          <QuestButton />
          <QuestButton />
        </View>

        <Text className="font-semibold text-xl my-5">Weekly Goals</Text>
        <View className="bg-blue-200 p-5 rounded-md shadow shadow-xl">
          <View className="flex items-center">
            <Text>99</Text>
            <Text>Daily Streak</Text>
          </View>
        </View>

        <View className="flex gap-y-5 my-5">
          <QuestButton />
          <QuestButton />
          <QuestButton />
        </View>
      </View>
    </SafeAreaView>
  )
}

export default Quests;