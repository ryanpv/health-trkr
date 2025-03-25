import { Redirect } from "expo-router";
import { FIREBASE_AUTH } from "@/FirebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";

const Home = () => {
  useEffect(() => {
    
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      if (user) {
        console.log("USER LOGGED IN: ", user);
        const uid = user.uid;
      } else {
        console.log("USER NOT LOGGED IN");
      }
    });
  }, []);

  return <Redirect href="./(auth)/welcome" />
}


export default Home;