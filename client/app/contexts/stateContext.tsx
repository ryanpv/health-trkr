import React, { createContext, useContext, useState, Dispatch, SetStateAction } from "react";


type Quest = {
  date: string,
  id: number,
  quest_status: string,
  quest_type: string,
  title: string
};

type Reward = {
  date: string,
  id: number,
  title: string,
};

interface ContextType {
  questList: Quest[] | [],
  setQuestList: Dispatch<SetStateAction<Quest[]>>
  rewardList: Reward[] | [],
  setRewardList: Dispatch<SetStateAction<Reward[]>>
};

export const StateContext = createContext<ContextType | null>(null);


export const StateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [questList, setQuestList] = useState<Quest[] | []>([]);
  const [rewardList, setRewardList] = useState<Reward[] | []>([]); 
  

  const values: ContextType = {
    questList,
    setQuestList,
    rewardList,
    setRewardList,
  }

  return (
    <StateContext.Provider value={ values }>
      { children }
    </StateContext.Provider>
  )
}

export const useStateContext = () => {
  const context = useContext(StateContext)

  if (!context) {
    throw new Error("useStateContext must be used within StateProvider");
  }

  return context;
};

