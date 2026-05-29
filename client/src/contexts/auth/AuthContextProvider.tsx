import { useState, type ReactNode } from "react"
import { AuthContext } from "./AuthContext"
import type { User } from "../../types/user.type"

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [accessToken, setAccessToken] = useState<string>("")
  const [authStatus, setAuthStatus] = useState<"unauthenticated" | "authenticated" | "checking">("checking")

  const login = (user: User, token: string) => {
    setAccessToken(token)
    setUser(user)
    setAuthStatus("authenticated")
  }

  // when refresh is failed or logout is succeeded
  const clearAuth = () => {
    setUser(null)
    setAccessToken("")
    setAuthStatus("unauthenticated")
  }

  return (

    <AuthContext.Provider value={{ user, accessToken, authStatus, login, clearAuth }}>
      {children}
    </AuthContext.Provider>
  )
}