
import { BrowserRouter, Route, Routes } from 'react-router'
import PageLayout from './layouts/PageLayout'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import NotFount from './pages/NotFount'
import { Toaster } from 'react-hot-toast'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PageLayout />}>
          <Route index element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='*' element={<NotFount />} />
        </Route>
      </Routes>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
    </BrowserRouter>
  )
}

export default App
