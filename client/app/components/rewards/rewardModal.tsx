import { useStateContext } from "@/app/contexts/stateContext";
import { FIREBASE_AUTH } from "@/FirebaseConfig";
import { useState } from "react";
import { Modal, View, Text, TouchableOpacity } from "react-native";

type RewardModalProps = {
  closeModal: () => void;
  modalVisible: boolean;
  rewardData: RewardData;
};

type RewardData = {
  id: number,
  title: string,
  points_cost: number,
}

const RewardModal: React.FC<RewardModalProps> = ({ closeModal, modalVisible, rewardData }) => {
  const serverUrl = process.env.EXPO_PUBLIC_DEV_SERVER;
  const credentials = FIREBASE_AUTH.currentUser;
  const { setRewardList } = useStateContext();
  const [loading, setLoading] = useState(false);
  
  const claimReward = async() => {
    try {
      setLoading(true);
      if (!credentials) throw new Error("No valid credentials. Please log in.")
      
      const accessToken = await credentials.getIdToken();
      const response = await fetch(`${ serverUrl }/rewards`, {
        method: "PATCH",
        headers: {
          "Authorization": `Bearer ${ accessToken }`,
          "Content-type": "application/json"
        },
        body: JSON.stringify({ 
          id: rewardData.id, 
          points_cost: rewardData.points_cost,
          status: "redeemed"
        })
      });

      if (!response.ok) throw new Error("Unable to claim reward at this time.");

      setRewardList((prev) => prev.filter(reward => reward.id !== rewardData.id));
    } catch (error: unknown) {
      console.log("Error claiming reward: ", error)
    } finally {
      closeModal();
      setLoading(false);
    }
  };

  const deleteReward = async() => {

  };



  return(
    <View>
      <Modal
       visible={ modalVisible }
       animationType="slide"
       transparent={ true }
      >
        <View className="bg-blue-500 flex items-center justify-center m-auto p-5 rounded-md max-w-sm w-full shadow-xl">
          <Text className="font-semibold text-xl text-white">{ rewardData.title }</Text>
          <View className="flex flex-row gap-x-5 justify-center my-5">
            <TouchableOpacity
              onPress={ claimReward }
            >
              <View className="flex-1 rounded-md bg-green-400 p-2 items-center justify-center shadow-xl w-24">
                <Text className="text-white font-semibold text-lg">Claim</Text>
              </View>
            </TouchableOpacity>
            
            <TouchableOpacity
              onPress={ closeModal }
              >
              <View className="flex-1 rounded-md bg-blue-200 p-2 items-center justify-center w-24">
                  <Text className="font-semibold text-gray-500 text-lg">Postpone</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  )
}


export default RewardModal;