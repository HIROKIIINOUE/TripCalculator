
import { BrowserRouter, Navigate, Route, Routes } from 'react-router'
import PageLayout from './layouts/PageLayout'
import Home from './pages/Home/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import { Toaster } from 'react-hot-toast'
import { useAuth } from './contexts/auth/useAuth'
import { useEffect } from 'react'
import Loading from './pages/Loading'
import TripPage from './pages/TripDetail/TripDetailPage'
import NotFound from './pages/NotFound'
import GuestRoute from './router/GuestRoute'
import ProtectedRoute from './router/ProtectedRoute'

function App() {
  const { accessToken, authStatus, checkUserAuthentication, restoreAccessToken } = useAuth()

  useEffect(() => {
    // check user's access token, otherwise try to generate it from refresh token
    const authCheck = async () => {
      if (accessToken) {
        const res = await checkUserAuthentication(accessToken)
        if (res.result === "failure") {
          void restoreAccessToken()
        }
      } else {
        void restoreAccessToken()
      }
    }
    authCheck()
  }, [])

  if (authStatus === "checking") {
    return <Loading />
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PageLayout />}>
          <Route
            index
            element={
              authStatus === "authenticated" ?
                <Navigate to="/home" replace /> :
                <Navigate to="/login" replace />
            }
          />
          <Route element={<GuestRoute />}>
            <Route
              path="login"
              element={<Login />}
            />
            <Route
              path="signup"
              element={<Signup />} />
          </Route>
          <Route path="home" element={<ProtectedRoute />}>
            <Route
              index
              element={<Home />}
            />
            <Route
              path=":tripId"
              element={<TripPage />}
            />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
    </BrowserRouter >
  )
}

export default App
