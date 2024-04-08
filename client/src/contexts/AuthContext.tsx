import { ReactNode, createContext, useEffect, useState, useContext } from "react";
type IUser = string | null


interface IAuthContextType {
  user: IUser
  setUser: (user: IUser) => void;
}

const AuthContext = createContext<IAuthContextType | undefined>(undefined);

interface IAuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: IAuthProviderProps) => {
  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    fetch("http://localhost:3000/auth/check-login", {credentials: "include"})
    .then(response => response.json())
    .then(data => {
      if (data.loggedIn) {
        setUser(data.user)
      } else {
        setUser(null)
      }
    })
    .catch(error => console.error("Error checking login status:", error))
  }, []);

  return (
    <AuthContext.Provider value={{user, setUser}}>
    {children}
    </AuthContext.Provider>
  )
};

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
