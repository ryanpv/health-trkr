import { FIREBASE_AUTH } from "@/FirebaseConfig";
import { useState } from "react";
import { Modal, View, Text, TouchableOpacity, TouchableWithoutFeedback } from "react-native"
import { useStateContext } from "@/contexts/stateContext";
import { useAuthContext } from "@/contexts/context";
import Icon from "react-native-vector-icons/FontAwesome";
import { Quest } from "@/types/quest.types";


type QuestModalProps = {
  closeModal: () => void;
  openConfirmModal: () => void;
  modalVisible: boolean;
  questData: Quest
};


const QuestModal: React.FC<QuestModalProps> = ({ closeModal, openConfirmModal, modalVisible, questData }) => {
  const serverUrl = process.env.EXPO_PUBLIC_DEV_SERVER;
  const credentials = FIREBASE_AUTH.currentUser;
  const { 
    questList, 
    setQuestList,
    dailyQuestCount,
    setDailyQuestCount
  } = useStateContext();
  const { setCurrentUser } = useAuthContext();


  const completeQuest = async() => {
    try {
      if (!credentials) {
        throw new Error("No valid credentials. Please log in.")
      }
      const accessToken = await credentials.getIdToken();

      const response = await fetch(`${ serverUrl }/user_stats`, {
          method: "POST",
          headers: {
          "Authorization": `Bearer ${ accessToken }`,
          "Content-type": "application/json"
          },
          body: JSON.stringify({ 
            id: questData.id, 
            quest_type: questData.quest_type,
            quest_status: "complete", 
            points: questData.points 
          })
      });

      if (!response.ok) throw new Error("Quest cannot be completed at this time.")
        
      // Update quest list and user total points
      setQuestList((prev) => prev.filter(quest => quest.id !== questData.id));
      setCurrentUser((prev) => ({
        ...prev,
        totalPoints: prev.totalPoints += questData.points
      }));
      setDailyQuestCount(prev => prev + 1)

      closeModal();
    } catch (error: unknown) {
      console.log("Error completing quest: ", error)
    }
  };


  return (
    <View>
      <Modal
       visible={ modalVisible }
       animationType="slide"
       transparent={ true }
      >
        <TouchableWithoutFeedback onPress={ closeModal }>
          <View className="flex-1 justify-center items-center">
            <TouchableWithoutFeedback>
              <View className="bg-blue-500 flex items-center justify-center m-auto p-5 rounded-md max-w-sm w-full shadow-xl">
                <View className="flex-row justify-center items-center w-full">
                  <Text className="font-semibold text-xl text-white">{ questData.title }</Text>
                  <View className="absolute right-0 ">
                    <TouchableOpacity
                      onPress={ closeModal }
                      >
                      <Icon name="close" size={ 20 } color={ "red" } />
                    </TouchableOpacity>
                  </View>
                </View>

                <View className="flex flex-row gap-x-5 justify-center my-5">
                  <TouchableOpacity
                    onPress={ () => {
                      closeModal()
                      openConfirmModal()
                    } }
                  >
                    <View className="flex-1 rounded-md bg-gray-400 p-2 items-center justify-center shadow-xl w-24">
                      <Text className="text-white font-semibold text-lg">Delete</Text>
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={ completeQuest }
                  >
                    <View className="flex-1 rounded-md bg-green-400 p-2 items-center justify-center shadow-xl w-24">
                      <Text className="text-white font-semibold text-lg">Complete</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  )
};


export default QuestModal;