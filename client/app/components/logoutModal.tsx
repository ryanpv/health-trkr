import { useState } from "react";
import { View, Modal, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const LogoutModal = () => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View>
      <View className="flex bg-white border border-2 border-red-600 mx-auto">
        <Modal
          visible={ modalVisible }
          animationType="slide"
          transparent={ true }
        >
          <View className="bg-blue-500 flex items-center justify-center m-auto p-5 rounded-md max-w-xs w-full">
            <Text className="font-bold text-xl text-white">Log out?</Text>
            <View className="flex flex-row gap-x-5 justify-center my-5">
              <TouchableOpacity
                onPress={ () => setModalVisible(false) }
                >
                <View className="flex-1 rounded-md bg-red-500 p-3 items-center justify-center shadow shadow-xl w-24">
                  <Text className="text-white font-semibold text-lg">Yes</Text>
                </View>
              </TouchableOpacity>
              
              <TouchableOpacity
                onPress={ () => setModalVisible(false) }
                >
                <View className="flex-1 rounded-md bg-blue-200 p-3 items-center justify-center w-24">
                    <Text className="font-semibold text-gray-500 text-lg">No</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>

      <View>
        <TouchableOpacity
          onPress={ () => setModalVisible(true) }
        >
          <View className="flex flex-row gap-x-5">
            <Icon name="log-out" size={ 20 } color={ "red" } />
            <Text className="font-bold text-red-500">Log Out</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default LogoutModal;