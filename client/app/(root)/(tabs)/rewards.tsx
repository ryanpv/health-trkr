import { ScrollView, Text, View } from "react-native";
import { useEffect, useState } from "react";
import { icons } from "@/constants";
import RewardButton from "@/app/components/rewards/rewardButton";
import RewardModal from "@/app/components/rewards/rewardModal";
import { SafeAreaView } from "react-native-safe-area-context";

import AddRewardModal from "@/app/components/rewards/createReward";

const Rewards = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [rewardModalData, setRewardModalData] = useState<{ title: string, id: number }>({ title: "", id: 0 });


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
          {/* Add new reward */}
        </View>

        <ScrollView className="max-h-[75vh]">
          <View className="flex flex-col space-y-5">
            <View>
              <RewardButton 
                title="Take a break" 
                onPress={ () => setModalVisible(true) }
              />
            </View>
            <View>
              <RewardButton 
                title="Watch TV" 
                onPress={ () => setModalVisible(true) }
              />
            </View>
            <View>
              <RewardButton 
                title="Play games" 
                onPress={ () => setModalVisible(true) }
              />
            </View>
          </View>
        </ScrollView>

        <View className=""> 
          <RewardModal 
            closeModal={ () => setModalVisible(false) } 
            modalVisible={ modalVisible } 
            rewardTitle={ rewardModalData.title }
            rewardID={ rewardModalData.id }
          />
        </View>

        <View>
          <AddRewardModal />
        </View>
      </View>
    </SafeAreaView>
  )
}

export default Rewards;