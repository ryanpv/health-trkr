import { useState } from "react";
import { Modal, View, Text, TouchableOpacity } from "react-native"


type QuestModalProps = {
  onClose: () => void;
  visible: boolean;
  questTitle: string;
};

const QuestModal: React.FC<QuestModalProps> = ({ onClose, visible, questTitle }) => {
  console.log("quest modal visible?: ", questTitle)
  return (
    <View>
      <Modal
       visible={ visible }
       animationType="slide"
       transparent={ true }
      >
        <View className="bg-blue-500 flex items-center justify-center m-auto p-5 rounded-md max-w-sm w-full shadow-xl">
          <Text className="font-semibold text-xl text-white">{ questTitle }</Text>
          <View className="flex flex-row gap-x-5 justify-center my-5">
            <TouchableOpacity
              onPress={ onClose }
            >
              <View className="flex-1 rounded-md bg-green-400 p-2 items-center justify-center shadow-xl w-24">
                <Text className="text-white font-semibold text-lg">Complete</Text>
              </View>
            </TouchableOpacity>
            
            <TouchableOpacity
              onPress={ onClose}
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