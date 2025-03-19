import { Redirect } from "expo-router";
import { initializeApp} from "@react-native-firebase/app";

const firebaseConfig = {
  clientId: process.env.REACT_APP_FB_CLIENT_ID || "",
  appId: process.env.REACT_APP_FB_APP_ID || "",
  apiKey: process.env.REACT_APP_FB_APIKEY || "",
  databaseURL: process.env.REACT_APP_DATABASE_URL || "",
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET || "",
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID || "",
  projectId: process.env.REACT_APP_PROJECT_ID || ""
};

const app = initializeApp(firebaseConfig);


const Home = () => {
  return <Redirect href="./(auth)/welcome" />;
}


export default Home;