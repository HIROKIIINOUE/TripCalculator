import { useState } from "react"
import { IoMdAdd } from "react-icons/io"
import { MdDeleteOutline } from "react-icons/md"
import EventList from "./components/EventList"
import TripSummary from "./components/TripSummary"

export type TripDetailEvent = {
  id: number
  date: string
  title: string
  localAmount: number
  localCurrency: string
  yourAmount: number
  yourCurrency: string
  detail: string
}

export type TripDetailTrip = {
  id: number
  title: string
  budget: number
  yourCurrency: string
}

const mockTrip: TripDetailTrip = {
  id: 1,
  title: "秋のソウル食べ歩き旅行",
  budget: 180000,
  yourCurrency: "JPY",
}

const mockEvents: TripDetailEvent[] = [
  {
    id: 1,
    date: "2026-10-12",
    title: "ランチランチランチランチランチランチ",
    localAmount: 18500000000000000000,
    localCurrency: "KRW",
    yourAmount: 203500000000000000,
    yourCurrency: "JPY",
    detail: "明洞のスンドゥブ専門店でランチ。熱々でかなり満足。",
  },
  {
    id: 2,
    date: "2026-10-12",
    title: "カフェ",
    localAmount: 7200,
    localCurrency: "KRW",
    yourAmount: 792,
    yourCurrency: "JPY",
    detail: "景福宮近くの韓屋カフェで休憩。抹茶ラテとケーキ。",
  },
  {
    id: 3,
    date: "2026-10-13",
    title: "おみやげ",
    localAmount: 42000,
    localCurrency: "KRW",
    yourAmount: 4620,
    yourCurrency: "JPY",
    detail: "家族向けに韓国のりとパック、職場向けにお菓子を購入。",
  },
  {
    id: 4,
    date: "2026-10-14",
    title: "夕食",
    localAmount: 36500,
    localCurrency: "KRW",
    yourAmount: 4015,
    yourCurrency: "JPY",
    detail: "東大門でサムギョプサル。追加注文までして少し使いすぎた。",
  },
]

const TripDetailPage = () => {
  const [events, setEvents] = useState<TripDetailEvent[]>(mockEvents)
  const [selectedEventIds, setSelectedEventIds] = useState<number[]>([])
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)

  const handleDelete = () => {
    setEvents(prev => prev.filter(event => !selectedEventIds.includes(event.id)))
    setSelectedEventIds([])
  }

  return (
    <div className="min-h-full px-4 py-6 sm:px-6 sm:py-8">
      {isAddModalOpen && (
        <>
          {/* ここに追加インプットモーダルコンポーネント作成 */}
        </>
      )}
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-5">
        <TripSummary trip={mockTrip} events={events} />
        <div className="flex justify-end">
          {selectedEventIds.length > 0 ? (
            <button
              type="button"
              onClick={handleDelete}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-red-200 bg-orange-800 px-5 py-2 text-sm font-bold text-white shadow-[0_18px_34px_-18px_rgba(220,38,38,0.95)] transition hover:scale-[1.03] cursor-pointer"
            >
              <MdDeleteOutline className="text-lg" />
              Delete Event
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setIsAddModalOpen(true)}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-orange-500 px-4 py-2 text-sm font-semibold text-white shadow-[0_14px_30px_-18px_rgba(249,115,22,0.95)] transition hover:scale-[1.03] hover:bg-orange-600 cursor-pointer"
            >
              <IoMdAdd className="text-lg" />
              Add Event
            </button>
          )}
        </div>
        <EventList
          events={events}
          selectedEventIds={selectedEventIds}
          setSelectedEventIds={setSelectedEventIds}
        />
      </div>
    </div>
  )
}

export default TripDetailPage
