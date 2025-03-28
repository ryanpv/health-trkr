// External libraries
import { useEffect, useState } from "react";
import { Image, Text, View, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/Ionicons";
import { useRouter } from "expo-router";

// Firebase auth
import { FIREBASE_AUTH } from "@/FirebaseConfig";
import { signOut } from "firebase/auth";

// Context
import { useAuthContext } from "../context"; // Custom authentication context

// Components
import RouteLink from "@/app/components/routeLink"; // Navigation link component
import LogoutModal from "@/app/components/logoutModal"; // Logout confirmation modal

// Constants
import { icons } from "@/constants"; // Icon assets

const Profile = () => {
  const { currentUser } = useAuthContext();
  const [modalVisible, setModalVisible] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    console.log("Current User in Profile: ", currentUser);
  });

  const logout = async () => {
    try {
      const userSignOut = await signOut(FIREBASE_AUTH);
      setModalVisible(false);
      console.log("User logged out: ", userSignOut);

      router.replace("/login");      
    } catch (error) {
      console.error("Error: ", error);
      setError("Error logging out. Please try again.");
    }
  };

  return (
    <SafeAreaView className="bg-blue-400 h-screen p-5 flex items-center">
      <View className="flex max-w-xl w-full p-5">
        <View className="flex flex-row items-end gap-x-5">
          <View>
            <Image source={ icons.profile } />
          </View>

          <View>
            <Text className="font-semibold text-white text-xl">Full Name</Text>
            <Text className="font-semibold text-gray-200">Username | Member since ****</Text>
          </View>
        </View>

        <View className="bg-blue-200 p-5 rounded-md mt-10 flex flex-row gap-x-3 shadow shadow-xl">
          <Icon name="sparkles" size={ 30 } color={ "#ebc61e"}/>
          <Text className="text-gray-600 font-semibold">Total points: </Text>
        </View>

        <View className="flex flex-row gap-x-3 justify-center my-5">
          <View className="flex-1 rounded-md p-3 bg-blue-200 items-center justify-center shadow shadow-xl">
            <Text className="text-blue-400 font-bold">80</Text>
            <Text className="font-semibold text-gray-400 text-md text-center">Daily Streak</Text>
          </View>

          <View className="flex-1 rounded-md p-3 bg-blue-200 items-center justify-center shadow shadow-xl">
            <Text className="text-blue-400 font-bold l">11</Text>
            <Text className="font-semibold text-gray-400 text-md text-center">Weekly Streak</Text>
          </View>
        </View>

        <View className="bg-blue-200 p-5 rounded-md space-y-5 shadow shadow-xl">
          <Text className="font-semibold text-lg">Account</Text>
          <RouteLink 
            routeName="Personal Data" 
            icon={ { name: "id-card", size: 20, color: "red"} } 
            link="./personal-data"
          />
          <RouteLink 
            routeName="Personal Data" 
            icon={ { name: "id-card", size: 20, color: "red"} } 
            link="./personal-data"
          />
          <RouteLink 
            routeName="Personal Data" 
            icon={ { name: "id-card", size: 20, color: "red"} } 
            link="./personal-data"
          />
        </View>

        <View className="bg-blue-200 p-5 rounded-md space-y-5 mt-5 shadow shadow-xl">
          <Text className="font-semibold text-lg">Other</Text>
          <RouteLink 
            routeName="Contact Us" 
            icon={ { name: "id-card", size: 20, color: "red"} } 
            link="./contact"
          />
          <RouteLink 
            routeName="Privacy Policy" 
            icon={ { name: "id-card", size: 20, color: "red"} } 
            link="./privacy"
          />
          <RouteLink 
            routeName="Settings" 
            icon={ { name: "cog-sharp", size: 20, color: "red"} } 
            link="./settings"
          />
          <LogoutModal logout={ logout } />
        </View>

      </View>
    </SafeAreaView>
  )
}

export default Profile;