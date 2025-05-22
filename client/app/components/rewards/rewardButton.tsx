import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";


interface RewardButtonProps {
  title: string;
  onPress: () => void;
}

const RewardButton: React.FC<RewardButtonProps> = ({ title, onPress }) => {

  return (
    <TouchableOpacity
      onPress={ onPress }
    >
      <View
        className="p-2 shadow-lg rounded-md bg-blue-300 flex flex-row justify-between"
      >
        <View>
          <Icon name="gift" size={ 30 } color={ "yellow" } />
        </View>

        <View className="items-center text-center">
          <Text className="text-white font-semibold m-auto">{ title }</Text>
        </View>
        
        <View>
          <Icon name="ellipsis1" size={ 30 } color={ "white" } />
        </View>

      </View>
    </TouchableOpacity>
  )
}


export default RewardButton;