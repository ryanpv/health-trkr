import { View, Text, TouchableOpacity } from "react-native"
import Icon from "react-native-vector-icons/Ionicons";
import { router } from "expo-router";


// Type for imported rn-vector icons
type IconType = {
  name: string;
  size: number;
  color: string;
}

type NavCardProps = {
  routeName: string;
  icon: IconType;
  link: string;
}


const RouteLink: React.FC<NavCardProps> = ({ routeName, icon, link }) => {
  return (
    <TouchableOpacity
      onPress={ () => {
        router.replace(link as any)
      }}
    >
      <View className="flex flex-row gap-x-5">
        <Icon name={ icon.name } size={ icon.size } color={ icon.color } />
        <Text className="text-gray-600">{ routeName }</Text> 
      </View>
    </TouchableOpacity>
  )
}


export default RouteLink;