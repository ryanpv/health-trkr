import { SafeAreaView } from "react-native-safe-area-context"
import { Text, View, Image, TouchableOpacity, ScrollView } from "react-native"
import { useEffect, useState } from "react";
import { icons } from '@/constants';

import QuestButton from "@/app/components/quests/questButton";
import AddQuestModal from "@/app/components/quests/create";
import { FIREBASE_AUTH } from "@/FirebaseConfig";
import { fetchQuests } from "@/app/utils/api";
import { getUserAccessToken } from "@/app/utils/getAccessToken";
import { useStateContext } from "@/app/contexts/stateContext";

import { Quest } from "@/app/types/quest.types";
import QuestModal from "@/app/components/quests/questModal";


type QuestData = {
  title: string,
  id: number,
  questStatus: string,
  questType: string,
  date: string
}


const Home = () => {
  const [dailyGoalCount,setDailyGoalCount] = useState<number>(2);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const { questList, setQuestList } = useStateContext();
  const [questModalData, setQuestModalData] = useState<QuestData>({
    title: '',
    id: 0,
    questStatus: '',
    questType: '',
    date: ''
  });
  
  const serverUrl = process.env.EXPO_PUBLIC_DEV_SERVER;
  const credentials = FIREBASE_AUTH.currentUser;

  
  useEffect(() => {
    const getQuests = async () => {
      setLoading(true);
      try {
        const accessToken = await getUserAccessToken();
        const fetchQuestList = await fetchQuests(accessToken);
        setQuestList(fetchQuestList);
        console.log("getQuests: ", fetchQuestList)
      } catch (error) {
        console.log("Error fetching quests: ", error)
      } finally {
        setLoading(false);
      }
    };

    getQuests();
    console.log("questlist: ", questList)

  }, []);

  return (
    <SafeAreaView className="bg-blue-400 h-screen flex items-center p-5">
      <View className="flex max-w-xl w-full p-5">
        <View className="my-5 flex flex-row">
          <View className="flex-1 gap-y-2">
            <Text className="font-semibold text-white">
              Welcome back,{" "}
            </Text>
            <Text className="font-semibold text-lg text-white">
              User One
            </Text>
          </View>

          <View className="">
            <Image
              source={icons.home}
              style={{
                width: 30,
                height: 30,
              }}
              resizeMode="contain"
            />
          </View>
        </View>

        <View className="my-5 p-5 h-40 rounded-md shadow-lg bg-blue-200">
          <Text className="font-semibold">
            {dailyGoalCount} / 5 Daily
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
                      questStatus: quest.quest_status,
                      questType: quest.quest_type,
                      date: quest.date
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
          <QuestModal closeModal={ () => setModalVisible(false) } modalVisible={ modalVisible } questData={ questModalData } />
        </View>

        <View>
          <AddQuestModal />
        </View>

      </View>
    </SafeAreaView>
  );
};

export default Home;