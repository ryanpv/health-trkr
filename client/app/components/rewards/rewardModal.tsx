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

  
  return(
    <View>

    </View>
  )
}


export default RewardModal;