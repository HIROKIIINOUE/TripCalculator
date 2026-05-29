import { createContext } from "react";
import type { User } from "../../types/user.type";

type AuthContextType = {
  user: User | null;
  accessToken: string;
  authStatus: "unauthenticated" | "authenticated" | "checking";
  storeAuth: (user: User, token: string) => void;
  clearAuth: () => void;
};

export const AuthContext = createContext<AuthContextType>({
  user: null,
  accessToken: "",
  authStatus: "checking",
  storeAuth: () => {},
  clearAuth: () => {},
});
