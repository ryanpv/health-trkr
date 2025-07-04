import { SafeAreaView } from "react-native-safe-area-context"
import { Text, View, Image, TouchableOpacity, ScrollView } from "react-native"
import { useEffect, useState } from "react";
import { icons } from '@/constants';

import QuestButton from "@/app/components/quests/questButton";
import AddQuestModal from "@/app/components/quests/create";
import { FIREBASE_AUTH } from "@/FirebaseConfig";
import { fetchQuests } from "@/utils/api"
import { getUserAccessToken } from "@/utils/getAccessToken";
import { useStateContext } from "@/contexts/stateContext";

import QuestModal from "@/app/components/quests/questModal";
import { useAuthContext } from "@/contexts/context";
import ConfirmModal from "@/app/components/confirmModal";
import { Quest } from "@/types/quest.types";


const Home = () => {
  const [dailyGoalCount, setDailyGoalCount] = useState<number>(2);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);
  const { questList, setQuestList } = useStateContext();
  const { currentUser } =  useAuthContext();
  const [questModalData, setQuestModalData] = useState<Quest>({
    title: '',
    id: 0,
    quest_status: '',
    quest_type: '',
    date: '',
    points: 0
  });
  
  const serverUrl = process.env.EXPO_PUBLIC_DEV_SERVER;
  const credentials = FIREBASE_AUTH.currentUser;
// get incomplete quests for this part
  const getQuests = async () => {
    setLoading(true);
    try {
      const accessToken = await getUserAccessToken();
      const fetchQuestList = await fetchQuests(accessToken);
      setQuestList(fetchQuestList);
    } catch (error) {
      console.log("Error fetching quests: ", error)
    } finally {
      setLoading(false);
    }
  };

  const checkDailyCompleted = async () => {
    setLoading(true);
    try {
      const accessToken = await getUserAccessToken();
      const dailyCountFetch = await fetch(`${ serverUrl }/quests?status=complete&daily_check=true`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${ accessToken }`
        }
      });

      if (dailyCountFetch.ok) {
        const result = await dailyCountFetch.json()
        setDailyGoalCount(result.quests_completed_today)
      }
    } catch (error) {
      console.log("Error checking completed daily quests: ", error);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    getQuests();
    checkDailyCompleted();
  }, []);  
  
  const deleteQuest = async(questId: number) => {
    try {
      if (!credentials){
        throw new Error("No valid credentials. Please log in.")
      }

      const accessToken = await credentials.getIdToken();
      const response = await fetch(`${ serverUrl }/quests/${ questId }`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${ accessToken }`,
          "Content-type": "application/json"
        }
      });

      if (!response.ok) throw new Error("Unable to complete DELETE request for quest")

      setQuestList((prev) => prev.filter(quest => quest.id !== questId));
    } catch (error: unknown) {
      console.log("Error: ", error)
    }
  };

  return (
    <SafeAreaView className="bg-gray-100 h-screen flex items-center p-5">
      <View className="flex max-w-xl w-full p-5">
        <View className="my-5 flex flex-row">
          <View className="flex-1 gap-y-2">
            <Text className="font-semibold text-blue-500">
              Welcome back,{" "}
            </Text>
            <Text className="font-semibold text-lg text-blue-500">
              { currentUser.displayName }
            </Text>
          </View>

          <View className="">
            <Image
              source={icons.home}
              style={{
                width: 30,
                height: 30,
                tintColor: "lightblue"
              }}
              resizeMode="contain"
            />
          </View>
        </View>

        <View className="my-5 p-5 h-40 rounded-md shadow-lg bg-blue-200">
          <Text className="font-semibold">
            {dailyGoalCount <= 5 ? dailyGoalCount : 5 } / 5 Daily
            goals completed
          </Text>
        </View>
        
        <ScrollView className="max-h-[45vh]">
          <View className="gap-y-5">
            { !loading && questList?.length > 0 ?
              questList.map((quest) => (
                <QuestButton 
                  key={ quest.id }
                  title={ quest.title } 
                  questType={ quest.quest_type } 
                  questStatus={ quest.quest_status }
                  modalVisible={ modalVisible }
                  setModalVisible={ setModalVisible }
                  onPress={ () => {
                    setQuestModalData({
                      title: quest.title,
                      id: quest.id,
                      quest_status: quest.quest_status,
                      quest_type: quest.quest_type,
                      date: quest.date,
                      points: quest.quest_type == "daily" ? 100 : 200
                    });    
                    setModalVisible(true); 
                  } 
                }
                />
              ))
              : null
            }
          </View>
        </ScrollView>

        <View>
          <QuestModal 
            closeModal={ () => setModalVisible(false) } 
            openConfirmModal={ () => setConfirmModalVisible(true) }
            modalVisible={ modalVisible } 
            questData={ questModalData } />
        </View>

        <View>
          <ConfirmModal 
            data={{ title: questModalData.title, id: questModalData.id }} 
            confirmFunction={ () => deleteQuest(questModalData.id) } 
            closeModal={ () => setConfirmModalVisible(false) }
            modalVisible={ confirmModalVisible }
          />
        </View>

        <View>
          <AddQuestModal />
        </View>

      </View>
    </SafeAreaView>
  );
};

export default Home;