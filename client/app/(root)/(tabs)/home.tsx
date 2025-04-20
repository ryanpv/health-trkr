import { SafeAreaView } from "react-native-safe-area-context"
import { Text, View, Image, TouchableOpacity } from "react-native"
import { useState } from "react";
import { icons } from '@/constants';

import QuestButton from "@/app/components/questButton";
import AddQuestModal from "@/app/(quests)/create";


const Home = () => {
  const [dailyGoalCount, setDailyGoalCount] = useState<number>(2);
  const [pressed, setPressed] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const handleOnPress = async() => {
    try {
      console.log("ADD BUTTON PRESSED")
      // const result = await fetch("http://localhost:8000/quest", {
      //   method: "POST",
      //   credentials: "include",
      //   headers: {
      //     "Content-type": "application/json",
      //   },
      //   body: JSON.stringify({
      //     title: "30 min workout",
      //     quest_type: "daily",
      //     // date: new Date().toISOString(),
      //     user_id: 8,
      //     quest_status: "incomplete"
      //   })
      // });
  
      // const data = await result.json();
      // console.log("RETURNED DATA: ", data);
    } catch (error) {
      console.log("Error: ", error);

    }
  }

  return (
    <SafeAreaView className="bg-blue-400 min-h-screen flex items-center p-5">
      <View className="flex max-w-xl w-full p-5">
        <View className="my-5 flex flex-row">
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

        <View className="my-5 p-5 h-40 rounded-md shadow-lg bg-blue-200">
          <Text className="font-semibold">{ dailyGoalCount } / 5 Daily goals completed</Text>
        </View>
        
        <QuestButton />

        <AddQuestModal addQuest={ handleOnPress }/>
      </View>
    </SafeAreaView>
  )
}

export default Home;