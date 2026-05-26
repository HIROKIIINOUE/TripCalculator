type Props = {
  score: number
}

const PasswordStrengthUI = ({ score }: Props) => {
  if (score === 0) return (
    <p className='text-red-600'>Too weak</p>
  )
  if (score === 1) return (
    <p className='text-red-400'>Weak</p>
  )
  if (score === 2) return (
    <p className='text-lime-300'>Good</p>
  )
  if (score === 3) return (
    <p className='text-lime-500'>Strong</p>
  )
  return (
    <p className='text-blue-400'>Very strong</p>
  )
}

export default PasswordStrengthUI