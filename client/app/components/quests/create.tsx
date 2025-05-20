import { Text , View, Modal, TouchableOpacity, Image, TextInput, StyleSheet } from "react-native"
import React, { useState } from "react";
import { icons } from '@/constants';
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { Dropdown } from 'react-native-element-dropdown';
import Icon from "react-native-vector-icons/FontAwesome";
import { getUserCredentials } from "@/app/utils/getCredentials";
import { FIREBASE_AUTH } from "@/FirebaseConfig";
import { fetchQuests } from "@/app/utils/api";

import { useStateContext } from "@/app/contexts/stateContext";

type AddQuestModalProps = {
}

type QuestFormData = {
  questTitle: string;
  questType: string;
}


const AddQuestModal: React.FC<AddQuestModalProps> = () => {
  const { questList, setQuestList } = useStateContext();
  const [modalVisible, setModalVisible] = useState(false);
  const serverUrl = process.env.EXPO_PUBLIC_DEV_SERVER;
  const { control, handleSubmit, reset } = useForm<QuestFormData>({
    defaultValues: {
      questTitle: '',
      questType: '',
    }
  });
  const [dropdownValue, setDropdownValue] = useState(null);
  const [dropdownFocus, setDropdownFocus] = useState(false);

  const questDropDownData = [
    { label: "Daily", value: "daily" },
    { label: "Weekly", value: "weekly" }
  ];

  const dropdownLabel = () => {
    if (dropdownValue || dropdownFocus) {
      return (
        <Text>
          Dropdown label
        </Text>
      )
    }
  };


  const submitQuest = async (formData: QuestFormData) => {
    try {
      const credentials = FIREBASE_AUTH.currentUser

      if (!credentials) {
        throw new Error("No valid credentials. Please log in.")
      }

      const accessToken = await credentials.getIdToken();
      const response = await fetch(`${ serverUrl }/quests`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Authorization": `Bearer ${ accessToken }`,
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          title: formData.questTitle,
          quest_type: formData.questType,
        }),
      });

      if (response.ok) {
        const fetchNewQuests = await fetchQuests(accessToken);
        setQuestList(fetchNewQuests);
        reset();
      }
    } catch (error: unknown) {
      console.log("Error: ", error);
    } finally {
      setModalVisible(false);
    }
  };

  return (
    <View>
      <View>
        <Modal
          visible={ modalVisible }
          animationType="fade"
          transparent={ true }
        >
          <View className="flex items-center bg-blue-200 w-full shadow-xl h-screen space-y-3">
            {/* FORM HEADER  */}
            <View className="p-5 flex flex-row w-screen space-x-5 justify-between">
              <Text className="font-semibold text-xl">Add New Quest</Text>
              <View className="">

              <TouchableOpacity
                onPress={ () => setModalVisible(false) }
                >
                <Icon name="close" size={ 20 } color={ "red" } />
              </TouchableOpacity>
              </View>
            </View>

            {/* FORM INPUT */}
            <View className="w-screen space-y-3">
              <Controller
                name="questTitle"
                control={control}
                rules={{ required: true }}
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    placeholder="Enter quest title"
                    placeholderTextColor={"gray"}
                    onChangeText={onChange}
                    value={value}
                    style={styles.input}
                  />
                )}
              />
            {/* { FORM DROPDOWN } */}
              <Controller
                name="questType"
                control={control}
                rules={{ required: true }}
                render={({ field: { onChange, value } }) => (
                  <Dropdown
                    style={styles.input}
                    data={questDropDownData}
                    search={false}
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    value={value}
                    placeholder="Quest type..."
                    placeholderStyle={styles.placeHolder}
                    onChange={item => onChange(item.value)}
                  />
                )}
              />
            </View>

            {/* FORM SUBMIT BUTTON */}
            <View className="flex flex-row space-x-3">
              <TouchableOpacity className="bg-blue-500 p-3 px-5 my-5 rounded" onPress={ handleSubmit(submitQuest) }>
                <Text className="text-white text-center text-lg">Save</Text>
              </TouchableOpacity>
              <TouchableOpacity className="bg-gray-500 p-3 px-5 my-5 rounded" onPress={ () => reset() }>
                <Text className="text-white text-center text-lg">Reset</Text>
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
  placeHolder: {
    fontSize: 18,
    color: "gray"
  },
  selectedTextStyle: {
    fontSize: 18,
  }
});


export default AddQuestModal;