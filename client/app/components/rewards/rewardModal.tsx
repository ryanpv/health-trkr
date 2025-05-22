import { useStateContext } from "@/app/contexts/stateContext";
import { FIREBASE_AUTH } from "@/FirebaseConfig";
import { Modal, View, Text, TouchableOpacity } from "react-native";

type RewardModalProps = {
  closeModal: () => void;
  modalVisible: boolean;
  rewardTitle: string;
  rewardID: number;
};

const RewardModal: React.FC<RewardModalProps> = ({ closeModal, modalVisible, rewardTitle, rewardID }) => {
  const serverUrl = process.env.EXPO_PUBLIC_DEV_SERVER;
  const credentials = FIREBASE_AUTH.currentUser;
  const { setRewardList } = useStateContext();

  const claimReward = async() => {

  };



  return(
    <View>
      <Modal
       visible={ modalVisible }
       animationType="slide"
       transparent={ true }
      >
        <View className="bg-blue-500 flex items-center justify-center m-auto p-5 rounded-md max-w-sm w-full shadow-xl">
          <Text className="font-semibold text-xl text-white">{ rewardTitle }</Text>
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