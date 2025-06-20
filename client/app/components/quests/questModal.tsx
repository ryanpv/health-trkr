import { FIREBASE_AUTH } from "@/FirebaseConfig";
import { useState } from "react";
import { Modal, View, Text, TouchableOpacity, TouchableWithoutFeedback } from "react-native"
import { useStateContext } from "@/app/contexts/stateContext";

type QuestModalProps = {
  closeModal: () => void;
  modalVisible: boolean;
  questData: QuestData
};

type QuestData = {
  title: string,
  id: number,
  quest_status: string,
  quest_type: string,
  date: string,
  points: number
}

const QuestModal: React.FC<QuestModalProps> = ({ closeModal, modalVisible, questData }) => {
  const serverUrl = process.env.EXPO_PUBLIC_DEV_SERVER;
  const credentials = FIREBASE_AUTH.currentUser;
  const { questList, setQuestList } = useStateContext();

  const deleteQuest = async() => {
    try {
      if (!credentials){
        throw new Error("No valid credentials. Please log in.")
      }

      const accessToken = await credentials.getIdToken();

      const response = await fetch(`${ serverUrl }/quests/${ questData.id }`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${ accessToken }`,
          "Content-type": "application/json"
        }
      });

      if (!response.ok) throw new Error("Unable to complete DELETE request for quest")

      setQuestList((prev) => prev.filter(quest => quest.id !== questData.id));
      closeModal();
    } catch (error: unknown) {
      console.log("Error: ", error)
    }
  };

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

      console.log("COMPLETED QUEST RESULT: ", response)

      if (!response.ok) throw new Error("Quest cannot be completed at this time.")
        
      // Update quest list
      setQuestList((prev) => prev.filter(quest => quest.id !== questData.id));
      closeModal();
    } catch (error: unknown) {
      console.log("Error completing quest: ", error)
    }
  };

  const postponeQuest = async() => {

  };


  return (
    <View>
      <Modal
       visible={ modalVisible }
       animationType="slide"
       transparent={ true }
      >
        <View className="bg-blue-500 flex items-center justify-center m-auto p-5 rounded-md max-w-sm w-full shadow-xl">
          <Text className="font-semibold text-xl text-white">{ questData.title }</Text>
          <View className="flex flex-row gap-x-5 justify-center my-5">
            <TouchableOpacity
              onPress={ deleteQuest }
            >
              <View className="flex-1 rounded-md bg-gray-400 p-2 items-center justify-center shadow-xl w-24">
                <Text className="text-white font-semibold text-lg">Skip</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={ completeQuest }
            >
              <View className="flex-1 rounded-md bg-green-400 p-2 items-center justify-center shadow-xl w-24">
                <Text className="text-white font-semibold text-lg">Complete</Text>
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
};


export default QuestModal;