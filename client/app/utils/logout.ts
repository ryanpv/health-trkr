import { useState, Dispatch, SetStateAction } from "react";
import { FIREBASE_AUTH } from "@/FirebaseConfig";
import { signOut } from "firebase/auth";
import { deleteCredentials } from "@/app/utils/deleteCredentials";


export const logout = async(
  setLoading: Dispatch<SetStateAction<boolean>>, 
  setModalVisible: Dispatch<SetStateAction<boolean>>, 
  setError: Dispatch<SetStateAction<string | null>>,
) => {
  try {
    setLoading(true);
    const userSignOut = await signOut(FIREBASE_AUTH);

    await Promise.all([
      deleteCredentials("uid"),
      deleteCredentials("displayName"),
    ]);

    setModalVisible(false);
    console.log("User logged out: ", userSignOut);
  } catch (error) {
    console.error("Error: ", error);
    setError("Error logging out. Please try again.");
  } finally {
    setLoading(false);
  }
};