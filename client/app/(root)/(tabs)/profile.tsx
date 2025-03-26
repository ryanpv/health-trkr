import { SafeAreaView } from "react-native-safe-area-context";
import { Image, Text, View, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { icons } from "@/constants";
import RouteLink from "@/app/components/routeLink";
import { useAuthContext } from "../context";
import { useEffect } from "react";

import LogoutModal from "@/app/components/logoutModal";

const Profile = () => {
  const { currentUser } = useAuthContext();

  useEffect(() => {
    console.log("Current User in Profile: ", currentUser);
  });

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
          <LogoutModal />
        </View>

      </View>
    </SafeAreaView>
  )
}

export default Profile;