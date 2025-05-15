import { Text , View, Modal, TouchableOpacity, Image, TextInput, StyleSheet } from "react-native"
import React, { useState } from "react";
import { icons } from '@/constants';
import { useForm, Controller, SubmitHandler } from "react-hook-form";

import Icon from "react-native-vector-icons/FontAwesome";
import { getUserCredentials } from "@/app/utils/getCredentials";
import { FIREBASE_AUTH } from "@/FirebaseConfig";
import { fetchQuests } from "../utils/api";

import { useStateContext } from "@/app/contexts/stateContext";


type QuestFormData = {
  questTitle: string;
  quest_type: string;
}


const AddQuestModal: React.FC = () => {
  const { questList, setQuestList } = useStateContext();
  const [modalVisible, setModalVisible] = useState(false);
  const serverUrl = process.env.EXPO_PUBLIC_DEV_SERVER;
  const { control, handleSubmit } = useForm<QuestFormData>({
    defaultValues: {
      questTitle: '',
      quest_type: '',
    }
  });
  
  const submitQuest = async (formData: QuestFormData) => {
    try {
      const credentials = FIREBASE_AUTH.currentUser

      if (!credentials) {
        throw new Error("No valid credentials. Please log in.")
      }

      const accessToken = await credentials.getIdToken();

      const response = await fetch(`${ serverUrl }/quests`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Authorization": `Bearer ${ accessToken }`,
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          title: formData.questTitle,
          quest_type: "daily",
        }),
      });

      if (response.ok) {
        const fetchNewQuests = await fetchQuests(accessToken);
        setQuestList(fetchNewQuests)
      }

    } catch (error: unknown) {
      console.log("Error: ", error);
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
            {/* FORM HEADER  */}
            <View className="p-5 flex flex-row w-screen space-x-5 justify-between">
              <Text className="font-semibold text-xl">Add New Quest</Text>
              <View className="">

              <TouchableOpacity
                onPress={ () => setModalVisible(false) }
                >
                <Icon name="close" size={ 20 } color={ "red" } />
              </TouchableOpacity>
              </View>
            </View>

            {/* FORM INPUT */}
            <View className="w-screen">
              <Controller
                name="questTitle"
                control={ control }
                render={({ field: { onChange, value }}) => (
                  <TextInput 
                    placeholder="Enter quest title"
                    placeholderTextColor={"gray"}
                    onChange={ onChange}
                    value={ value }
                    style={ styles.input }
                  />
                )}
              />
            </View>

            {/* FORM SUBMIT BUTTON */}
            <TouchableOpacity className="bg-blue-500 p-3 px-5 my-5 rounded" onPress={ handleSubmit(submitQuest) }>
              <Text className="text-white text-center text-lg">Save</Text>
            </TouchableOpacity>
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

            <Text className="absolute text-white font-semibold text-center">Add New Quest</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  )
};


const styles = StyleSheet.create({
  input: {
    backgroundColor: "white",
    borderRadius: 8,
    marginHorizontal: 35,
    padding: 10,
    height: 55,
    fontSize: 18
  },
  loadingOverlay: {
    opacity: 0.75,
    backgroundColor: "#dbeafe", // bg-blue-100
    display: "flex",
    position: "absolute", 
    zIndex: 10, 
    justifyContent: "center",
    alignItems: "center", 
    top: 0,
    left: 0, 
    right: 0, 
    bottom: 0,
  },
});


export default AddQuestModal;