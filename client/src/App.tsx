
import { BrowserRouter, Route, Routes } from 'react-router'
import PageLayout from './layouts/PageLayout'
import Home from './components/Home'
import Login from './components/Login'
import Signup from './components/Signup'
import NotFount from './components/NotFount'
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
