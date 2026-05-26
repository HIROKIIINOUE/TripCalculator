import { MdContactSupport, MdLanguage, MdLogout } from 'react-icons/md'

const Footer = () => {
  return (
    <div className='fixed inset-x-0 bottom-0 z-40 border-t border-orange-200 bg-orange-100 px-4 py-3 shadow-[0_-12px_30px_rgba(20,20,40,0.1)]'>
      <ul className='mx-auto grid grid-cols-3 gap-3'>
        <li>
          <button
            type='button'
            className='flex w-full flex-col items-center justify-center gap-1 rounded-2xl bg-orange-200 px-3 py-2 text-orange-800 transition active:scale-95'
          >
            <MdLanguage className='text-xl' />
            <span className='text-xs'>言語</span>
          </button>
        </li>
        <li>
          <button
            type='button'
            className='flex w-full flex-col items-center justify-center gap-1 rounded-2xl bg-orange-700 px-3 py-2 text-white transition active:scale-95'
          >
            <MdLogout className='text-xl' />
            <span className='text-xs'>ログアウト</span>
          </button>
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
  )
}

export default Footer
