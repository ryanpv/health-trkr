import { View, Text, ScrollView } from "react-native"
import QuestButton from "@/app/components/quests/questButton";
import { useStateContext } from "@/contexts/stateContext";
import React, { useState } from "react";
import { fetchQuests } from "@/utils/api";
import { getUserAccessToken } from "@/utils/getAccessToken";
import { useAuthContext } from "@/contexts/context";
import { SafeAreaView } from "react-native-safe-area-context";


const Quests = () => {
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [questModal, setQuestModal] = useState<{ title: string, id: number }>({ title: "", id: 0 });
  const { questList, setQuestList } = useStateContext();
  const { currentUser } = useAuthContext();
  
  React.useEffect(() => {
    const getQuests = async () => {
      setLoading(true);
      try {
        const accessToken = await getUserAccessToken();
        const fetchQuestList = await fetchQuests(accessToken);
        setQuestList(fetchQuestList);
      } catch (error) {
        console.log("Unable to fetch quests: ", error)
      } finally {
        setLoading(false);
      }
    }

    getQuests();
  },[])

  return (
    <SafeAreaView className="bg-blue-400 min-h-screen pb-20 p-5 flex items-center">
      <ScrollView className="flex max-w-xl w-full p-5">
        <View className="flex flex-row justify-between my-10">
          <Text className="font-semibold text-white text-xl">Total Points: { currentUser.totalPoints }</Text>
          {/* <Text className="text-2xl font-semibold text-gray-800">Credits: 000</Text> */}
        </View>

        
        <Text className="font-semibold text-xl my-5">Daily Goals</Text>
        <View className="bg-blue-200 p-5 rounded-md shadow shadow-xl">
          <View className="flex items-center">
            <Text>{ currentUser.dailyStreak }</Text>
            <Text>Daily Streak</Text>
          </View>
        </View>

        <View className="flex gap-y-5 my-5">
          { !loading && questList.length > 0 ?
            questList.filter((quest) => quest.quest_type === "daily").map((quest) => (
              <QuestButton 
                title={ quest.title } 
                questType={ quest.quest_type } 
                questStatus={ quest.quest_status }
                modalVisible={ modalVisible }
                setModalVisible={ setModalVisible }
                onPress={ () => {
                  setQuestModal({ title: quest.title, id: quest.id });    
                  setModalVisible(true); 
                } 
              }
              />
            ))
            : null
          }
        </View>

        <Text className="font-semibold text-xl my-5">Weekly Goals</Text>
        <View className="bg-blue-200 p-5 rounded-md shadow shadow-xl">
          <View className="flex items-center">
            <Text>{ currentUser.weeklyStreak }</Text>
            <Text>Weekly Streak</Text>
          </View>
        </View>

        <View className="flex gap-y-5 my-5">
          { !loading && questList.length > 0 ?
            questList.filter((quest) => quest.quest_type === "weekly").map((quest) => (
              <QuestButton 
                title={ quest.title } 
                questType={ quest.quest_type } 
                questStatus={ quest.quest_status }
                modalVisible={ modalVisible }
                setModalVisible={ setModalVisible }
                onPress={ () => {
                  setQuestModal({ title: quest.title, id: quest.id });    
                  setModalVisible(true); 
                } 
              }
              />
            ))
            : null
          }
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Quests;