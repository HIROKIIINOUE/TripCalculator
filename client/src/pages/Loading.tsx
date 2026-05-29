import { GridLoader } from 'react-spinners'

const Loading = () => {
  return (
    <main className="flex min-h-screen items-center justify-center bg-orange-50 px-6">
      <div className="w-full max-w-sm absolute top-60 rounded-3xl bg-white p-8 text-center shadow-lg shadow-orange-100">
        <p className="text-xs font-semibold uppercase tracking-[4px] text-orange-500">
          Trip Calculator
        </p>
        <div className="my-8 flex justify-center">
          <GridLoader color="#f97316" margin={6} size={16} speedMultiplier={0.9} />
        </div>
        <h1 className="text-xl font-semibold text-slate-800">読み込み中です...(JP)</h1>
      </div>
    </main>
  )
}

export default Loading
