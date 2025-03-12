import { SafeAreaView } from "react-native-safe-area-context";
import { Text, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const Profile = () => {

  return (
    <SafeAreaView>
      <Text>Profile Page</Text>
      <View>

      <Icon name="walk" size={30} color="orange" />
      </View>
    </SafeAreaView>
  )
}

export default Profile;