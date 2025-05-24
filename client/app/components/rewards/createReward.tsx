import { View, Text, TouchableOpacity, Modal, Image } from "react-native";
import { FC, useState } from "react";
import { useForm, Controller } from "react-hook-form";

import { FIREBASE_AUTH } from "@/FirebaseConfig";
import { icons } from "@/constants";

type RewardsFormData = {
  rewardTitle: string;
};


const AddRewardModal: FC = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const serverUrl = process.env.EXPO_PUBLIC_DEV_SERVER;
  const { control, handleSubmit, reset } = useForm<RewardsFormData>({
    defaultValues: {
      rewardTitle: '',
    }
  });


  const submitReward = async() => {

  };



  return (
    <View>
      <View>
        <Modal
          visible={ modalVisible }
          animationType="fade"
          transparent={ true }
        >
          <View className="flex items-center bg-blue-200 w-full shadow-xl h-screen">

          </View>
          

        </Modal>
      </View>

      <View>
        <TouchableOpacity
          className="my-5"
          onPress={ () => setModalVisible(true) }
        >
          <View 
            className="p-2 shadow-lg rounded-md flex flex-row items-center justify-center space-x-2 bg-blue-500"
          >
            <View className="w-full px-2">
              <Image 
                className="flex-start"
                source={ icons.check }
                style={ { width: 30, height: 30 } } 
                resizeMode="contain"
                />
            </View>

            <Text className="absolute text-white font-semibold text-center">Add Reward</Text>
          </View>
        </TouchableOpacity>
      </View>

    </View>
  )
}


export default AddRewardModal;