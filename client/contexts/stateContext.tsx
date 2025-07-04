import React, { createContext, useContext, useState, Dispatch, SetStateAction } from "react";

// State types imports
import { 
  Quest, 
  Reward, 
} from "@/types/state.types"


interface ContextType {
  questList: Quest[] | [],
  setQuestList: Dispatch<SetStateAction<Quest[]>>
  rewardList: Reward[] | [],
  setRewardList: Dispatch<SetStateAction<Reward[]>>,
  dailyQuestCount: number,
  setDailyQuestCount: Dispatch<SetStateAction<number>>
};


export const StateContext = createContext<ContextType | null>(null);

export const StateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [questList, setQuestList] = useState<Quest[] | []>([]);
  const [rewardList, setRewardList] = useState<Reward[] | []>([]); 
  const [dailyQuestCount, setDailyQuestCount] = useState<number>(0);

  const values: ContextType = {
    questList,
    setQuestList,
    rewardList,
    setRewardList,
    dailyQuestCount, 
    setDailyQuestCount
  };

  return (
    <StateContext.Provider value={ values }>
      { children }
    </StateContext.Provider>
  )
};

export const useStateContext = () => {
  const context = useContext(StateContext)

  if (!context) {
    throw new Error("useStateContext must be used within StateProvider");
  }

  return context;
};

