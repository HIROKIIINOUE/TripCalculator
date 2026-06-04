import { MdLogin } from 'react-icons/md'
import { Link } from 'react-router'
import { useTranslation } from 'react-i18next'

const ToLoginButton = () => {
  const { t } = useTranslation()

  return (
    <Link to="/login" className='flex w-full sm:w-32'>
      <button
        type='button'
        className='flex w-full items-center justify-center gap-2 flex-col sm:flex-row rounded-2xl sm:rounded-full border border-orange-700 bg-orange-700 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-orange-800 cursor-pointer'
      >
        <MdLogin className='text-lg' />
        <span>{t("actions.login")}</span>
      </button>
    </Link>
  )
}

export default ToLoginButton
