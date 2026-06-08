import type { TripDetailEvent } from "../TripDetailPage"

type Props = {
  event: TripDetailEvent
  onClose: () => void
}

const EventDetail = ({ event, onClose }: Props) => {
  return (
    <>
      <div onClick={onClose} className="fixed inset-0 z-50 bg-slate-950/45 backdrop-blur-sm" />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
        <div className="w-full max-w-xl rounded-3xl border border-orange-100 bg-gradient-to-br from-orange-50 via-white to-amber-50 p-5 shadow-[0_24px_80px_-28px_rgba(234,88,12,0.45)] sm:p-8">

          <div className="flex flex-col items-start justify-between">
            <h3 className="text-xl font-semibold tracking-[0.2em] text-orange-500">
              {event.title}
            </h3>
            <p className="text-sm font-semibold tracking-[0.2em]">({event.date})</p>
          </div>
          <div className="mt-6 grid gap-3 ">
            <article className="rounded-3xl border border-orange-100 bg-white p-4 shadow-sm">
              <p className="text-xs font-semibold uppercase text-stone-500">
                現地通貨
              </p>
              <p className="mt-3 text-base font-bold text-stone-900">
                {event.localAmount.toLocaleString()} {event.localCurrency}
              </p>
            </article>

          </div>

          <div className="mt-5 rounded-3xl border border-orange-100 bg-white p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase text-stone-500">
              詳細
            </p>
            <p className="mt-3 text-sm leading-7 text-stone-700">
              {event.detail}
            </p>
          </div>
          <div className="mt-6 flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center justify-center rounded-2xl border border-orange-200 bg-white px-5 py-3 text-sm font-semibold text-orange-500 shadow-sm transition hover:border-orange-300 hover:bg-orange-50  cursor-pointer"
            >
              閉じる
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default EventDetail
