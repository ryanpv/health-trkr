import { ScrollView, Text, View } from "react-native";
import { useEffect, useState } from "react";
import { icons } from "@/constants";
import RewardButton from "@/app/components/rewards/rewardButton";
import RewardModal from "@/app/components/rewards/rewardModal";
import { SafeAreaView } from "react-native-safe-area-context";

import AddRewardModal from "@/app/components/rewards/createReward";
import { useStateContext } from "@/app/contexts/stateContext";
import { fetchRewards } from "@/app/utils/api";
import { getUserAccessToken } from "@/app/utils/getAccessToken";

const Rewards = () => {
  const [loading, setLoading] =  useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [rewardModalData, setRewardModalData] = useState<{ title: string, id: number, points_cost: number }>({ title: "", id: 0, points_cost: 0 });
  const { rewardList, setRewardList } = useStateContext();
  

  useEffect(() => {
    const getRewards = async () => {
      setLoading(true);
      try {
        const accessToken = await getUserAccessToken();
        const rewards = await fetchRewards(accessToken);
        console.log("USEFEFECT REWARDS: ", rewards)
        setRewardList(rewards);
      } catch (error: unknown) {
        console.error("Unable to fetch quests: ", error);
      } finally {
        setLoading(false);
      }
    }

    getRewards();
  }, [])

  return (
    <SafeAreaView className="bg-blue-400 min-h-screen flex p-5 items-center">
      <View className="flex max-w-xl w-full h-full p-5">
        <View className="my-5 flex flex-row">
          <View className="flex-1 gap-y-2">
            <Text className="font-semibold text-white">Rewards Page</Text>
          </View>
        </View>

        <View className="my-5 p-5 h-20 rounded-md shadow-lg bg-blue-200">
          <Text className="font-semibold">
            Total rewards points:
          </Text>

        </View>

        <View>
          <AddRewardModal />
        </View>

        <ScrollView className="max-h-[75vh] mb-10">
          <View className="flex flex-col space-y-5">
            {
              rewardList.length > 0 ? 
              rewardList.map((reward) => (
                <View>
                  <RewardButton 
                    title={reward.title} 
                    onPress={ () => {
                      setRewardModalData({
                        title: reward.title,
                        id: reward.id,
                        points_cost : reward.points_cost
                      })
                      setModalVisible(true)
                    } }
                  />
                </View>
              ))
              :
              null
            }
          </View>
        </ScrollView>

        <View className=""> 
          <RewardModal 
            closeModal={ () => setModalVisible(false) } 
            modalVisible={ modalVisible } 
            rewardData={ rewardModalData }
          />
        </View>

      </View>
    </SafeAreaView>
  )
}

export default Rewards;