import React, { useState } from 'react'
import { View, Text, TouchableOpacity } from "react-native"
import { FIREBASE_AUTH } from "@/FirebaseConfig";
import { getUserAccessToken } from '@/utils/getAccessToken';
import { useStateContext } from '@/contexts/stateContext';


interface ClaimButtonProps {
  bonusPoints: number;
};


const ClaimButton: React.FC<ClaimButtonProps> = ({ bonusPoints }) => {
  const serverUrl = process.env.EXPO_PUBLIC_DEV_SERVER;
  const [loading, setLoading] = useState(false);
  const { canClaimBonus } = useStateContext();
  
  const claimBonus = async(bonusPoints: number) => {
    setLoading(true)
    try {
      const accessToken = await getUserAccessToken();
      const response = await fetch(`${ serverUrl }/user_stats/bonus`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${ accessToken }`,
          "Content-type": "application/json"
        },
        body: JSON.stringify({
          points: bonusPoints
        })
      });

      if (!response.ok) throw new Error("Unable to claim bonus points.")
      
    } catch(error) {
      console.log("ERROR claiming bonus: ", error)
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 flex justify-end">
      <TouchableOpacity 
        className={
          `self-center px-4 py-1 border-2 border-blue-500 rounded-full ${
          canClaimBonus 
          ? "border-blue-500"
          : "border-gray-400 text-gray-400"
          }`
        }
        onPress={ () => claimBonus(bonusPoints) }
        disabled={!canClaimBonus}
      >
        <Text className={ !canClaimBonus ? "text-gray-400" : "text-blue-500"}>Claim bonus!</Text>
      </TouchableOpacity>
    </View>
  )
}

export default ClaimButton