import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";


// Retrieve credential
const getCredentials = async (key: string): Promise<string | null> => {
  try {
    if (Platform.OS === "web") {
      return localStorage.getItem(key);
    } else {
      return await SecureStore.getItemAsync(key);
    }
  } catch (error) {
    console.error(`Error retrieving ${key}: `, error);
    return null;
  }
};


// Retrieve multiple credentials
export const getUserCredentials = async () => {
  try {
    const [uid, displayName] = await Promise.all([
      getCredentials("uid"),
      getCredentials("displayName")
    ]);

    return { uid, displayName };
  } catch (error) {
    console.error("Error retrieving user credentials: ", error);
    return null;
  }
};