import type { ReactNode } from "react";
import { AuthContextProvider } from "./auth/AuthContextProvider";

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <AuthContextProvider>
      {children}
    </AuthContextProvider>
  )
}

export default Providers