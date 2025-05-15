import React, { Dispatch, SetStateAction } from "react";
import { View, Image, TouchableOpacity, Text, Modal } from "react-native";

import { icons } from '@/constants';
import Icon from "react-native-vector-icons/MaterialIcons";


interface QuestButtonProps {
  title: string;
  questType: string;
  questStatus: string;
  modalVisible: boolean;
  setModalVisible: Dispatch<SetStateAction<boolean>>;
  onPress: () => void;
};

const QuestButton: React.FC<QuestButtonProps> = ({ title, questType, questStatus, onPress }) => { // Params: questName, icon/questType?

  return (
    <TouchableOpacity 
      className=""
      onPress={ onPress }
    >
      <View 
        className="p-2 shadow-lg rounded-md bg-blue-300 flex flex-row justify-between"
      >
        <View className="">
          <Image 
            className=""
            source={ icons.home }
            style={ { width: 30, height: 30 } } 
            resizeMode="contain"
            />
        </View>

        <View className="items-center text-center">
          <Text className="text-white font-semibold m-auto">{ title }</Text>
        </View>

        <View className="">
          <Icon name="more-vert" size={ 30 } color={ "white"}/>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default QuestButton;