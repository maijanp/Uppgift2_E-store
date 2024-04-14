import {
  ReactNode,
  createContext,
  useEffect,
  useState,
  useContext,
} from "react";
import { IUserData } from "../models/IUserData";

interface IAuthContextType {
  user: IUserData | null;
  setUser: (user: IUserData | null) => void;
  isLoading: boolean;
}

const AuthContext = createContext<IAuthContextType | undefined>(undefined);

interface IAuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: IAuthProviderProps) => {
  const [user, setUser] = useState<IUserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3000/auth/check-login", { credentials: "include" })
      .then((response) => response.json())
      .then((data) => {
        if (data.loggedIn) {
          setUser(data.user);
        } else {
          setUser(null);
        }
        setIsLoading(false);
      })
      .catch((error) => console.error("Error checking login status:", error));
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
