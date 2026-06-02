import React from 'react'
import { FaUser } from 'react-icons/fa'
import { Link } from 'react-router'

const ToSignupButton = () => {
  return (
    <Link to="/signup" className='flex w-full sm:w-32'>
      <button
        type='button'
        className='flex w-full items-center justify-center gap-2 flex-col sm:flex-row rounded-2xl sm:rounded-full border border-orange-700 bg-orange-700 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-orange-800 cursor-pointer'
      >
        <FaUser className='text-md' />
        <span>新規登録</span>
      </button>
    </Link>
  )
}

export default ToSignupButton
