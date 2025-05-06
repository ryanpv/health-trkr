import React, { createContext, useContext, useState, Dispatch, SetStateAction } from "react";


type Quest = {
  date: string,
  id: number,
  quest_status: string,
  quest_type: string,
  title: string
};

interface ContextType {
  questList: Quest[],
  setQuestList: Dispatch<SetStateAction<Quest[]>>
};

export const StateContext = createContext<ContextType | null>(null);


export const StateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [questList, setQuestList] = useState<Quest[]>([{
      date: "",
      id: 0,
      quest_status: "incomplete",
      quest_type: "",
      title: ""
    }]
  );
  

  const values: ContextType = {
    questList,
    setQuestList,
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

