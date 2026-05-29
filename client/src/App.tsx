
import { BrowserRouter, Navigate, Route, Routes } from 'react-router'
import PageLayout from './layouts/PageLayout'
import Home from './pages/Home/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import { Toaster } from 'react-hot-toast'
import { useAuth } from './contexts/auth/useAuth'
import { useEffect } from 'react'
import NotFount from './pages/NotFount'
import Loading from './pages/Loading'

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
          <Route
            path="login"
            element={
              authStatus === "authenticated" ?
                <Navigate to="/home" replace /> :
                <Login />
            }
          />
          <Route
            path="signup"
            element={
              authStatus === "authenticated" ?
                <Navigate to="/home" replace /> :
                <Signup />
            } />
          <Route
            path="home"
            element={
              authStatus === "authenticated" ?
                <Home /> :
                <Navigate to="/login" replace />
            }
          />
          <Route path="*" element={<NotFount />} />
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
