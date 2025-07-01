import { 
  View, 
  Text, 
  TouchableOpacity, 
  Modal, 
  Image, 
  TextInput, 
  StyleSheet 
} from "react-native";
import { FC, useState } from "react";
import { useForm, Controller } from "react-hook-form";

import { FIREBASE_AUTH } from "@/FirebaseConfig";
import { icons } from "@/constants";
import Icon from "react-native-vector-icons/FontAwesome";
import { useStateContext } from "@/contexts/stateContext";
import { fetchRewards } from "@/utils/api";

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
  const { rewardList, setRewardList } = useStateContext();


  const submitNewReward = async(formData: RewardsFormData) => {
    try {
      const credentials = FIREBASE_AUTH.currentUser;
      if (!credentials) {
        throw new Error("No valid credentials. Please log in.")
      }

      const accessToken = await credentials.getIdToken();

      const response = await fetch(`${ serverUrl }/rewards`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Authorization": `Bearer ${ accessToken }`,
          "Content-type": "application/json"
        },
        body: JSON.stringify({
          title: formData.rewardTitle
        })
      });

      console.log("Reward response: ", response)
      // if (response.ok) {
      //   const rewards = await fetchRewards(accessToken);
      //   setRewardList(rewardList);
      //   reset();
      // }
    } catch (error) {
      console.log("ERROR adding new reward: ", error)
    } finally {
      reset();
      setModalVisible(false);
    }
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
            {/* MODAL HEADER  */}
            <View className="p-5 flex flex-row w-screen justify-between">
              <Text className="font-semibold text-xl">Create a reward</Text>
              <TouchableOpacity
                onPress={ () => setModalVisible(false) }
              >
                <Icon name="close" size={ 20 } color={ "red" } />                
              </TouchableOpacity>
            </View>

            {/* CREATE REWARD INPUT  */}
            <View className="w-screen">
              <Controller
                name="rewardTitle"
                control={ control }
                rules={{ required: true }}
                render={ ({ field: { onChange, value }}) => (
                  <TextInput
                    placeholder="Enter your reward"
                    placeholderTextColor={ "gray" }
                    onChangeText={ onChange }
                    value={ value }
                    style={ styles.input }
                    maxLength={50}
                  />
                )}
              />
            </View>

            {/* FORM SUBMIT BUTTON */}
            <View className="flex flex-row space-x-3">
              <TouchableOpacity className="bg-blue-500 p-3 px-5 my-5 rounded" onPress={ handleSubmit(submitNewReward) }>
                <Text className="text-white text-center text-lg">Save</Text>
              </TouchableOpacity>
              <TouchableOpacity className="bg-gray-500 p-3 px-5 my-5 rounded" onPress={ () => reset() }>
                <Text className="text-white text-center text-lg">Reset</Text>
              </TouchableOpacity>
            </View>
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


const styles = StyleSheet.create({
  input: {
    backgroundColor: "white",
    borderRadius: 8,
    marginHorizontal: 35,
    padding: 10,
    height: 55,
    fontSize: 18
  },
})


export default AddRewardModal;