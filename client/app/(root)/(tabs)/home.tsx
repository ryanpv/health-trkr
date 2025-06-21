import { SafeAreaView } from "react-native-safe-area-context"
import { Text, View, Image, TouchableOpacity, ScrollView } from "react-native"
import { useEffect, useState } from "react";
import { icons } from '@/constants';

import QuestButton from "@/app/components/quests/questButton";
import AddQuestModal from "@/app/components/quests/create";
import { FIREBASE_AUTH } from "@/FirebaseConfig";
import { fetchQuests } from "@/utils/api"
import { getUserAccessToken } from "@/utils/getAccessToken";
import { useStateContext } from "@/app/contexts/stateContext";

import QuestModal from "@/app/components/quests/questModal";
import { useAuthContext } from "@/app/contexts/context";


type QuestData = {
  title: string,
  id: number,
  quest_status: string,
  quest_type: string,
  date: string,
  points: number
}


const Home = () => {
  const [dailyGoalCount, setDailyGoalCount] = useState<number>(2);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const { questList, setQuestList } = useStateContext();
  const { currentUser } =  useAuthContext();
  const [questModalData, setQuestModalData] = useState<QuestData>({
    title: '',
    id: 0,
    quest_status: '',
    quest_type: '',
    date: '',
    points: 0
  });
  
  // const serverUrl = process.env.EXPO_PUBLIC_DEV_SERVER;
  // const credentials = FIREBASE_AUTH.currentUser;

  
  useEffect(() => {
    const getQuests = async () => {
      setLoading(true);
      try {
        const accessToken = await getUserAccessToken();
        const fetchQuestList = await fetchQuests(accessToken);
        setQuestList(fetchQuestList);
        console.log("getQuests: ", fetchQuestList.length)
      } catch (error) {
        console.log("Error fetching quests: ", error)
      } finally {
        setLoading(false);
      }
    };

    getQuests();
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
              { currentUser.displayName }
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