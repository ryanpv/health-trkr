import { Children, createContext, useContext, useState, Dispatch, SetStateAction } from "react";

// State types imports
import { User } from "@/types/state.types";
import Toast from "react-native-toast-message";

interface AuthContextType {
  currentUser: User;
  setCurrentUser: Dispatch<SetStateAction<User>>;
};


export const AuthContext = createContext<AuthContextType | null>(null);


export const useAuthContext = () => {
  const AuthStateContext = useContext(AuthContext);
  
  if (!AuthStateContext) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }

  return AuthStateContext;
};


export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User>({
    email: '',
    displayName: '',
    totalPoints: 0,
    dailyStreak: 0,
    weeklyStreak: 0,
    lastDailyBonus: null
  });

  const values: AuthContextType = {
    currentUser,
    setCurrentUser
  }

  
  return (
    <AuthContext.Provider value={ values }>
      <>
        { children }
        <Toast />
      </>
    </AuthContext.Provider>
  )
};