import { MdContactSupport, MdLanguage, MdLogout } from 'react-icons/md'

const Header = () => {
  return (
    <div className='fixed inset-x-0 top-0 z-40 border-b border-orange-200 bg-orange-100 shadow-[0_12px_30px_rgba(20,20,40,0.1)]'>
      <div className='mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-6 lg:px-8'>
        <div>
          <p className='text-xs font-semibold uppercase tracking-[0.3em] text-orange-400'>
            Trip Calculator
          </p>
          <p className='mt-1 text-sm text-slate-500'>
            Travel budget dashboard
          </p>
        </div>

        <ul className='flex items-center gap-3'>
          <li>
            <button
              type='button'
              className='flex items-center gap-2 rounded-full border border-orange-300 bg-orange-200 px-4 py-2 text-sm font-medium text-orange-800 transition hover:-translate-y-0.5 hover:bg-orange-300 cursor-pointer'
            >
              <MdLanguage className='text-lg' />
              <span>言語設定</span>
            </button>
          </li>
          <li>
            <button
              type='button'
              className='flex items-center gap-2 rounded-full border border-orange-700 bg-orange-700 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-orange-800  cursor-pointer'
            >
              <MdLogout className='text-lg' />
              <span>ログアウト</span>
            </button>
          </li>
          <li>
            <button
              type='button'
              className='flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-4 py-2 text-sm font-medium text-orange-800 transition hover:-translate-y-0.5 hover:border-orange-300 hover:bg-orange-100 hover:text-orange-700'
            >
              <MdContactSupport className='text-lg' />
              <span>お問い合わせ</span>
            </button>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Header
