import { ScrollView, Text, View } from "react-native";
import { useEffect, useState } from "react";
import { icons } from "@/constants";
import RewardButton from "@/app/components/rewards/rewardButton";
import RewardModal from "@/app/components/rewards/rewardModal";

const Rewards = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [rewardModalData, setRewardModalData] = useState<{ title: string, id: number }>({ title: "", id: 0 });


  return (
    <ScrollView className="bg-blue-400 min-h-screen flex p-5">
      <View className="flex max-w-xl w-full p-5">
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
          <RewardButton 
            title="Take a break" 
            onPress={ () => setModalVisible(true) }
          />
        </View>

        <View> 
          <RewardModal 
            closeModal={ () => setModalVisible(false) } 
            modalVisible={ modalVisible } 
            rewardTitle={ rewardModalData.title }
            rewardID={ rewardModalData.id }
          />
        </View>
      </View>
    </ScrollView>
  )
}

export default Rewards;