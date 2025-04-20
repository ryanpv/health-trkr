import { Text , View, Modal, TouchableOpacity, Image, TextInput, StyleSheet } from "react-native"
import React, { useState } from "react";
import { icons } from '@/constants';
import { useForm, Controller, SubmitHandler } from "react-hook-form";


type AddQuestModalType = {
  addQuest: () => void
};

type QuestFormData = {
  questTitle: string;
}


const AddQuestModal: React.FC<AddQuestModalType> = ({ addQuest }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const { control, handleSubmit } = useForm<QuestFormData>({
    defaultValues: {
      questTitle: ''
    }
  })

  return (
    <View>
      <View>
        <Modal
          visible={ modalVisible }
          animationType="fade"
          transparent={ true }
        >
          <View className="flex items-center justify-center mx-auto bg-blue-200 w-full shadow-xl rounded-b-lg">
            <Text>Add a new quest</Text>

            <View>
              <Controller
                name="questTitle"
                control={ control }
                render={({ field: { onChange, value }}) => (
                  <TextInput 
                    placeholder="Quest title"
                    onChange={ onChange}
                    value={ value }
                    style={ styles.input }
                  />
                )}
              />
            </View>



            <View className="p-5">
              <TouchableOpacity
                onPress={ () => setModalVisible(false) }
              >
                <View>
                  <Text>Close</Text>
                </View>
              </TouchableOpacity>
            </View>
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