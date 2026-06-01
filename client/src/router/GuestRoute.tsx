import { Navigate, Outlet } from "react-router"
import { useAuth } from "../contexts/auth/useAuth"
import Loading from "../pages/Loading"

const GuestRoute = () => {
  const { authStatus } = useAuth()

  if (authStatus === "checking") {
    return <Loading />
  }

  if (authStatus === "authenticated") {
    return <Navigate to="/home" replace />
  }

  return <Outlet />
}

export default GuestRoute