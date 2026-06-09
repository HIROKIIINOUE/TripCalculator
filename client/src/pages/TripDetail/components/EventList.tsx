import type { TripDetailEvent } from "../../../types/event.type"
import type { Trip } from "../../../types/trip.type"
import EventCard from "./EventCard"

type Props = {
  trip: Trip
  events: TripDetailEvent[]
  setEvents: React.Dispatch<React.SetStateAction<TripDetailEvent[]>>
  selectedEventIds: number[]
  setSelectedEventIds: React.Dispatch<React.SetStateAction<number[]>>
}

const EventList = (props: Props) => {
  const { trip, events, setEvents, selectedEventIds, setSelectedEventIds } = props
  if (events.length <= 0) {
    return (
      <div className="rounded-3xl border border-dashed border-orange-200 bg-white px-6 py-12 text-center shadow-sm">
        <p className="text-lg font-semibold text-stone-900">
          まだイベントデータがありません
        </p>
        <p className="mt-2 text-sm leading-6 text-stone-600">
          上部の追加ボタンからイベントを作成して、旅行中の支出を記録してください。
        </p>
      </div>
    )
  }

  return (
    <div className="grid gap-3">
      {events.map((event) => (
        <EventCard
          key={event.id}
          trip={trip}
          event={event}
          setEvents={setEvents}
          selectedEventIds={selectedEventIds}
          setSelectedEventIds={setSelectedEventIds}
        />
      ))}
    </div>
  )
}

export default EventList
