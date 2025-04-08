import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";

export const deleteCredentials = async (key: string): Promise<void> => {
  try {
    if (Platform.OS === "web") {
      localStorage.removeItem(key);
      console.log("User has been logged out of web");
      
    } else {
      await SecureStore.deleteItemAsync(key);
      console.log("User has been logged out of mobile");
    }
  } catch (error) {
    console.error(`Error deleting ${key}: `, error);
  }
};