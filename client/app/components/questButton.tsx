import { View, Image, TouchableOpacity, Text } from "react-native";

import { icons } from '@/constants';
import React from "react";


interface QuestButtonProps {
  title: string;
  quest_type: string;
  quest_status: string;
};

const QuestButton: React.FC<QuestButtonProps> = ({ title, quest_type, quest_status }) => { // Params: questName, icon/questType?

  return (
    <TouchableOpacity 
      className=""
      onPress={ () => {} }
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
          <Image 
            className=""
            source={ icons.check }
            style={ { width: 30, height: 30 } } 
            resizeMode="contain"
            />
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default QuestButton;