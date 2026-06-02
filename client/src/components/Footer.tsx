import { MdContactSupport, MdLanguage } from 'react-icons/md'
import { useLocation } from 'react-router'
import ToSignupButton from './buttons/ToSignupButton'
import ToLoginButton from './buttons/ToLoginButton'
import LogoutButton from './buttons/LogoutButton'
import ToHomeButton from './buttons/ToHomeButton'
import { useState } from 'react'
import LanguageOptions from './LanguageOptions'

const Footer = () => {
  const { pathname } = useLocation()
  const [isLanguageOption, setIsLanguageOption] = useState<boolean>(false)


  return (
    <>
      {isLanguageOption && <LanguageOptions setIsLanguageOption={setIsLanguageOption} />}
      <div className='fixed inset-x-0 bottom-0 z-40 border-t border-orange-200 bg-orange-100 px-4 py-3 shadow-[0_-12px_30px_rgba(20,20,40,0.1)]'>
        <ul className='mx-auto grid grid-cols-[1fr_1.2fr_1fr] gap-3'>
          <li>
            <button
              type='button'
              onClick={() => { setIsLanguageOption(true) }}
              className='flex w-full flex-col items-center justify-center gap-1 rounded-2xl bg-orange-200 px-3 py-2 text-orange-800 transition active:scale-95'
            >
              <MdLanguage className='text-xl' />
              <span className='text-xs'>言語</span>
            </button>
          </li>
          <li>
            {pathname === "/login" ? (
              <ToSignupButton />
            ) : pathname === "/signup" ? (
              <ToLoginButton />
            ) : pathname === "/home" ? (
              <LogoutButton />
            ) : pathname.startsWith("/home/") ? (
              <ToHomeButton />
            ) : null}
          </li>
          <li>
            <button
              type='button'
              className='flex w-full flex-col items-center justify-center gap-1 rounded-2xl bg-orange-50 px-3 py-2 text-slate-700 ring-1 ring-orange-200 transition active:scale-95'
            >
              <MdContactSupport className='text-xl' />
              <span className='text-xs'>問合せ</span>
            </button>
          </li>
        </ul>
      </div>
    </>
  )
}

export default Footer
