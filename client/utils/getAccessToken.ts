import { FIREBASE_AUTH } from "@/FirebaseConfig";

export const getUserAccessToken = async() => {
  const credentials = FIREBASE_AUTH.currentUser;
  const accessToken = await credentials?.getIdToken();

  return accessToken;
};