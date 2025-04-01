import { Children, createContext, useContext, useState, Dispatch, SetStateAction } from "react";

interface AuthContextType {
  currentUser: string | User;
  setCurrentUser: Dispatch<SetStateAction<string | User>>;
};

type User = {
  currentUser: string;
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
  const [currentUser, setCurrentUser] = useState<User | string>({ currentUser: "InitialHomie" });

  const values: AuthContextType = {
    currentUser,
    setCurrentUser
  }

  
  return (
    <AuthContext.Provider value={ values }>
      { children } ;
    </AuthContext.Provider>
  )
};