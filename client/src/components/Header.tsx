import { MdContactSupport, MdLanguage } from 'react-icons/md'
import { Link, useLocation } from 'react-router'
import ToSignupButton from './buttons/ToSignupButton';
import ToLoginButton from './buttons/ToLoginButton';
import LogoutButton from './buttons/LogoutButton';
import ToHomeButton from './buttons/ToHomeButton';
import { useState } from 'react';
import LanguageOptions from './LanguageOptions';
import { useTranslation } from 'react-i18next';


const Header = () => {
  const { pathname } = useLocation();
  const [isLanguageOption, setIsLanguageOption] = useState<boolean>(false)
  const { t } = useTranslation()

  return (
    <>
      {isLanguageOption && <LanguageOptions setIsLanguageOption={setIsLanguageOption} />}
      <div className='fixed inset-x-0 top-0 z-40 border-b border-orange-200 bg-orange-100 shadow-[0_12px_30px_rgba(20,20,40,0.1)]'>
        <div className='mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-6 lg:px-8'>
          <div>
            <p className='text-xs font-semibold uppercase tracking-[0.3em] text-orange-400'>
              {t("appName")}
            </p>
            <p className='mt-1 text-sm text-slate-500'>
              {t("header.tagline")}
            </p>
          </div>

          <ul className='flex items-center gap-3'>
            <li>
              <button
                type='button'
                onClick={() => setIsLanguageOption(true)}
                className='flex items-center gap-2 rounded-full border border-orange-300 bg-orange-200 px-4 py-2 text-sm font-medium text-orange-800 transition hover:-translate-y-0.5 hover:bg-orange-300 cursor-pointer'
              >
                <MdLanguage className='text-lg' />
                <span>{t("header.languageSettings")}</span>
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
              <Link
                to="/contact"
                className='flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-4 py-2 text-sm font-medium text-orange-800 transition hover:-translate-y-0.5 hover:border-orange-300 hover:bg-orange-100 hover:text-orange-700'
              >
                <MdContactSupport className='text-lg' />
                <span>{t("actions.contact")}</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  )
}

export default Header
