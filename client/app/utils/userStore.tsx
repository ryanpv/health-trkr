import * as SecureStore from "expo-secure-store";

export const getUserCredentials = async () => {
  try {
    const uid = await SecureStore.getItemAsync("userUid");
    const token = await SecureStore.getItemAsync("userToken");
    const displayName = await SecureStore.getItemAsync("userDisplayName");
    
    return {
      uid,
      token,
      displayName,
    }
  } catch (error) {
    console.error("Error retrieving user credentials: ", error);
  }
};