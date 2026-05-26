import Header from '../components/Header'
import Footer from '../components/Footer'
import { Outlet } from 'react-router'

const PageLayout = () => {
  return (
    <div className='min-h-screen bg-gradient-to-br from-orange-100 via-orange-200 to-orange-100 text-slate-800'>
      <header className='hidden sm:block'>
        <Header />
      </header>
      <main className='mx-auto flex w-full max-w-7xl flex-1 flex-col px-4 pb-24 pt-6 sm:px-6 sm:pb-10 sm:pt-24 lg:px-8'>
        <Outlet />
      </main>
      <footer className='sm:hidden'>
        <Footer />
      </footer>
    </div>
  )
}

export default PageLayout
