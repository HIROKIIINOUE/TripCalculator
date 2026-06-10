import { FaHome } from 'react-icons/fa'
import { Link } from 'react-router'
import { useTranslation } from 'react-i18next'

const ToHomeButton = () => {
  const { t } = useTranslation()

  return (
    <Link
      to="/home"
      className='flex w-full items-center justify-center gap-2 flex-col sm:w-32 sm:flex-row rounded-2xl sm:rounded-full border border-orange-700 bg-orange-700 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-orange-800 cursor-pointer'
    >
      <FaHome className='text-md' />
      <span>{t("navigation.home")}</span>
    </Link>
  )
}

export default ToHomeButton
