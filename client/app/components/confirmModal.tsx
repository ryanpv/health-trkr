import React from 'react'
import { Modal, View, Text, TouchableOpacity, TouchableWithoutFeedback } from "react-native"


type ConfirmModalProps = {
  closeModal: () => void;
  confirmFunction: () => void;
  modalVisible: boolean;
  data: ConfirmModalData;
};

type ConfirmModalData = {
  title: string;
  id: number
};

const ConfirmModal: React.FC<ConfirmModalProps> = ({ data, closeModal, confirmFunction, modalVisible }) => {

  return (
    <View>
      <Modal
       visible={ modalVisible }
       animationType="slide"
       transparent={ true }
      >
        <TouchableWithoutFeedback onPress={ closeModal }>
          <View className='flex-1 justify-center items-center bg-black/30'>
            <TouchableWithoutFeedback>
              <View className="bg-blue-500 flex items-center justify-center m-auto p-5 rounded-md max-w-sm w-full shadow-xl">
                <Text className="font-semibold text-xl text-white">{ `Confirm delete quest: ${ data.title}?` }</Text>
                <Text className='text-white'>Action cannot be undone.</Text>
                <View className="flex flex-row gap-x-5 justify-center my-5">
                  <TouchableOpacity
                    onPress={ closeModal }
                  >
                    <View className="flex-1 rounded-md bg-gray-400 p-2 items-center justify-center shadow-xl w-24">
                      <Text className="text-white font-semibold text-lg">Cancel</Text>
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={ () => {
                      confirmFunction()
                      closeModal()
                    } }
                  >
                    <View className="flex-1 rounded-md bg-red-400 p-2 items-center justify-center shadow-xl w-24">
                      <Text className="text-white font-semibold text-lg">Confirm</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  )
}


export default ConfirmModal