import { createContext } from "react";
import type { User } from "../../types/user.type";

export type AuthCheckResult =
  | { result: "success"; data: User }
  | { result: "failure"; data: null };

type AuthContextType = {
  user: User | null;
  accessToken: string;
  authStatus: "unauthenticated" | "authenticated" | "checking";
  storeAuth: (user: User, token: string) => void;
  clearAuth: () => void;
  checkUserAuthentication: (token: string) => Promise<AuthCheckResult>;
  restoreAccessToken: () => void;
};

export const AuthContext = createContext<AuthContextType>({
  user: null,
  accessToken: "",
  authStatus: "checking",
  storeAuth: () => {},
  clearAuth: () => {},
  checkUserAuthentication: async () => ({ result: "failure", data: null }),
  restoreAccessToken: () => {},
});
