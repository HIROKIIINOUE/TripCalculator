import { useAuth } from '../contexts/auth/useAuth'
import Loading from '../pages/Loading';
import { Navigate, Outlet } from 'react-router';

const ProtectedRoute = () => {
  const { authStatus } = useAuth();
  if (authStatus === "checking") {
    return <Loading />
  }

  if (authStatus === "unauthenticated") {
    return <Navigate to="/login" replace />
  }
  return <Outlet />
}

export default ProtectedRoute