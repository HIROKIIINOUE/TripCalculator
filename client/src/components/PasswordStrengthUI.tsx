type Props = {
  score: number
}

const PasswordStrengthUI = ({ score }: Props) => {
  const bars = [0, 1, 2, 3, 4]

  const activeBarColor =
    score <= 1
      ? "bg-rose-400"
      : score === 2
        ? "bg-amber-400"
        : score === 3
          ? "bg-lime-400"
          : "bg-emerald-500"

  if (score === 0) return (
    <div>
      <div className="flex gap-2">
        {bars.map((bar) => (
          <span
            key={bar}
            className={`h-2 flex-1 rounded-full ${bar === 0 ? activeBarColor : "bg-orange-100"
              }`}
          />
        ))}
      </div>
      <p className='mt-3 text-sm font-semibold text-rose-500'>Too weak</p>
    </div>
  )
  if (score === 1) return (
    <div>
      <div className="flex gap-2">
        {bars.map((bar) => (
          <span
            key={bar}
            className={`h-2 flex-1 rounded-full ${bar <= 1 ? activeBarColor : "bg-orange-100"
              }`}
          />
        ))}
      </div>
      <p className='mt-3 text-sm font-semibold text-rose-400'>Weak</p>
    </div>
  )
  if (score === 2) return (
    <div>
      <div className="flex gap-2">
        {bars.map((bar) => (
          <span
            key={bar}
            className={`h-2 flex-1 rounded-full ${bar <= 2 ? activeBarColor : "bg-orange-100"
              }`}
          />
        ))}
      </div>
      <p className='mt-3 text-sm font-semibold text-amber-500'>Good</p>
    </div>
  )
  if (score === 3) return (
    <div>
      <div className="flex gap-2">
        {bars.map((bar) => (
          <span
            key={bar}
            className={`h-2 flex-1 rounded-full ${bar <= 3 ? activeBarColor : "bg-orange-100"
              }`}
          />
        ))}
      </div>
      <p className='mt-3 text-sm font-semibold text-lime-600'>Strong</p>
    </div>
  )
  return (
    <div>
      <div className="flex gap-2">
        {bars.map((bar) => (
          <span
            key={bar}
            className={`h-2 flex-1 rounded-full ${bar <= 4 ? activeBarColor : "bg-orange-100"
              }`}
          />
        ))}
      </div>
      <p className='mt-3 text-sm font-semibold text-emerald-600'>Very strong</p>
    </div>
  )
}

export default PasswordStrengthUI
