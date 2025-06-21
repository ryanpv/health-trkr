import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import Toast from "react-native-toast-message";


interface RewardButtonProps {
  title: string;
  onPress: () => void;
  points: number;
}

const RewardButton: React.FC<RewardButtonProps> = ({ title, onPress, points }) => {
  const showToast = () => {
    Toast.show({
      type: 'error',
      text1: 'No reward points to claim.',
      text2: 'Complete more quests to earn reward points! 👋'
    });
  }

  return (
    <TouchableOpacity
      onPress={ points <= 0 ? showToast : onPress }
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