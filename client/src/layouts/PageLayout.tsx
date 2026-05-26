import Header from '../components/Header'
import Footer from '../components/Footer'
import { Outlet } from 'react-router'

const PageLayout = () => {
  return (
    <div className='min-h-screen flex flex-col'>
      <header className='hidden sm:block'>
        <Header />
      </header>
      <main className='flex-1'>
        <Outlet />
      </main>
      <footer className='sm:hidden'>
        <Footer />
      </footer>
    </div>
  )
}

export default PageLayout
