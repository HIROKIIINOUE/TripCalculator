import { MdLogout } from 'react-icons/md'

const LogoutButton = () => {
  return (
    <button
      type='button'
      className='flex w-full items-center justify-center gap-2 flex-col sm:flex-row rounded-2xl sm:rounded-full border border-orange-700 bg-orange-700 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-orange-800 cursor-pointer sm:w-32'
    >
      <MdLogout className='text-lg' />
      <span>ログアウト</span>
    </button>
  )
}

export default LogoutButton
