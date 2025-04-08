import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";


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

export const getUserCredentials = async () => {
  try {
    const [accessToken, uid, displayName] = await Promise.all([
      getCredentials("accessToken"),
      getCredentials("uid"),
      getCredentials("displayName")
    ]);

    return { accessToken, uid, displayName };
  } catch (error) {
    console.error("Error retrieving user credentials: ", error);
    return null;
  }
};