import { View, Image, TouchableOpacity, Text } from "react-native";

import { icons } from '@/constants';

const QuestButton = () => { // Params: questName, icon/questType?

  return (
    <TouchableOpacity 
      className="m-5"
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
          <Text className="text-white font-semibold m-auto">Quest 1</Text>
        </View>

        <View className="">
          <Image 
            className=""
            source={ icons.home }
            style={ { width: 30, height: 30 } } 
            resizeMode="contain"
            />
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default QuestButton;