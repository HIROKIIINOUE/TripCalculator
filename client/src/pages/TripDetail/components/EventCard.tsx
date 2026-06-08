import { useState } from "react"
import { FaRegEdit } from "react-icons/fa"
import { MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md"
import EventDetail from "./EventDetail"
import type { TripDetailEvent } from "../TripDetailPage"

type Props = {
  event: TripDetailEvent
  selectedEventIds: number[]
  setSelectedEventIds: React.Dispatch<React.SetStateAction<number[]>>
}

const EventCard = ({ event, selectedEventIds, setSelectedEventIds }: Props) => {
  const isSelected = selectedEventIds.includes(event.id)
  const [isDetailOpen, setIsDetailOpen] = useState(false)

  const handleSelect = () => {
    if (isSelected) {
      setSelectedEventIds(prev => prev.filter(id => id !== event.id))
      return
    }
    setSelectedEventIds(prev => [...prev, event.id])
  }

  return (
    <>
      {isDetailOpen ? (
        <EventDetail event={event} onClose={() => setIsDetailOpen(false)} />
      ) : null}
      <article
        className={`rounded-2xl border shadow-[0_14px_30px_-26px_rgba(120,53,15,0.45)] transition hover:shadow-[0_18px_36px_-24px_rgba(120,53,15,0.55)] ${isSelected
          ? "border-2 border-orange-500 bg-orange-100 shadow-[0_20px_40px_-24px_rgba(249,115,22,0.55)]"
          : "border-orange-100 bg-white"
          }`}
      >
        <div className="flex flex-col sm:flex-row sm:items-stretch">
          <button
            type="button"
            onClick={() => setIsDetailOpen(true)}
            className="flex min-w-0 flex-1 flex-col gap-3 p-3 text-left focus:outline-none sm:rounded-l-2xl sm:p-4 cursor-pointer"
          >
            <div className="flex flex-col items-start justify-between">
              <h3 className="text-md font-semibold tracking-[0.2em] text-orange-500">
                {event.title}
              </h3>
              <p className="text-sm font-semibold tracking-[0.2em]">({event.date})</p>
            </div>

            <div className="grid gap-1 text-xs text-stone-600 sm:grid-cols-2 sm:text-sm">

              <p className="min-w-0 break-words">
                <span className="mr-2 font-medium text-stone-500">現地通貨</span>
                <span className="font-semibold text-stone-900">
                  {event.localAmount.toLocaleString()} {event.localCurrency}
                </span>
              </p>
              <p className="min-w-0 break-words">
                <span className="mr-2 font-medium text-stone-500">自国通貨</span>
                <span className="font-semibold text-stone-900">
                  {event.yourAmount.toLocaleString()} {event.yourCurrency}
                </span>
              </p>
            </div>
          </button>

          <div className="flex shrink-0 items-center justify-end gap-2 border-t border-orange-200 px-3 py-3 sm:border-l sm:border-t-0 sm:px-4 sm:py-0">
            <button
              type="button"
              onClick={() => setIsDetailOpen(true)}
              aria-label={`${event.title}を編集`}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-stone-200 bg-white text-stone-600 transition hover:border-orange-200 hover:bg-orange-50 hover:text-orange-700 0 sm:h-11 sm:w-11 cursor-pointer"
            >
              <FaRegEdit className="text-base" />
            </button>
            <button
              type="button"
              aria-label={`${event.title}を選択`}
              onClick={handleSelect}
              className={`inline-flex h-10 w-10 items-center justify-center rounded-full border transition sm:h-11 sm:w-11 cursor-pointer ${isSelected
                ? "border-orange-500 bg-orange-500 text-white shadow-[0_12px_24px_-14px_rgba(249,115,22,0.95)] focus:ring-orange-200"
                : "border-stone-200 bg-white text-stone-500 hover:border-orange-200 hover:bg-orange-50 hover:text-orange-700 focus:ring-orange-200"
                }`}
            >
              {isSelected ? (
                <MdCheckBox className="text-2xl" />
              ) : (
                <MdCheckBoxOutlineBlank className="text-2xl" />
              )}
            </button>
          </div>
        </div>
      </article>
    </>
  )
}

export default EventCard
