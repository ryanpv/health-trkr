import { Redirect } from "expo-router";
import { initializeApp} from "@react-native-firebase/app";
import { 
  REACT_APP_FB_CLIENT_ID,
  REACT_APP_FB_APP_ID,
  REACT_APP_FB_APIKEY,
  REACT_APP_DATABASE_URL,
  REACT_APP_STORAGE_BUCKET,
  REACT_APP_MESSAGING_SENDER_ID,
  REACT_APP_PROJECT_ID
 } from "@react-native-dotenv";

const firebaseConfig = {
  clientId: REACT_APP_FB_CLIENT_ID || "",
  appId: REACT_APP_FB_APP_ID || "",
  apiKey: REACT_APP_FB_APIKEY || "",
  databaseURL: REACT_APP_DATABASE_URL || "",
  storageBucket: REACT_APP_STORAGE_BUCKET || "",
  messagingSenderId: REACT_APP_MESSAGING_SENDER_ID || "",
  projectId: REACT_APP_PROJECT_ID || ""
};

console.log("Firebase Config: ", firebaseConfig);


const app = initializeApp(firebaseConfig);


const Home = () => {
  return <Redirect href="./(auth)/welcome" />;
}


export default Home;