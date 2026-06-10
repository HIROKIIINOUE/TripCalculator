import { MdLogout } from 'react-icons/md'
import { useAuth } from '../../contexts/auth/useAuth'
import { useNavigate } from 'react-router'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'

const LogoutButton = () => {
  const { clearAuth } = useAuth()
  const navigation = useNavigate()
  const BACKEND_URL = import.meta.env.VITE_API_BASE_URL
  const { t } = useTranslation()

  const handleLogout = async () => {
    if (!confirm(t("messages.logoutConfirm"))) return
    try {
      const res = await fetch(`${BACKEND_URL}/users/logout`, {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        credentials: "include"
      })
      if (res.status === 200) {
        clearAuth()
        navigation("/login")
        toast.success(t("messages.logoutSuccess"))
        return
      }
      toast.error(t("messages.logoutError"))
    } catch (error) {
      console.error(error)
      toast.error(t("messages.networkError"))
    }
  }

  return (
    <button
      type='button'
      onClick={handleLogout}
      className='flex w-full items-center justify-center gap-2 flex-col sm:flex-row rounded-2xl sm:rounded-full border border-orange-700 bg-orange-700 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-orange-800 cursor-pointer sm:w-32'
    >
      <MdLogout className='text-lg' />
      <span>{t("actions.logout")}</span>
    </button>
  )
}

export default LogoutButton
