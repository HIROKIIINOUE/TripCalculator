import type { Trip } from "../../../types/trip.type"
import TripCard from "./TripCard"

type Props = {
  trips: Trip[]
  selectedTripIds: number[]
  setSelectedTripIds: React.Dispatch<React.SetStateAction<number[]>>
}

const TripList = (props: Props) => {
  const { trips, selectedTripIds, setSelectedTripIds } = props
  if (trips.length <= 0) {
    return (
      <div className="rounded-3xl border border-dashed border-orange-200 bg-white px-6 py-12 text-center shadow-sm">
        <p className="text-lg font-semibold text-stone-900">
          まだ旅行データがありません
        </p>
        <p className="mt-2 text-sm leading-6 text-stone-600">
          上部の追加ボタンから旅行を作成して、予算と開始日を管理してください。
        </p>
      </div>
    )
  }

  return (
    <div className="grid gap-3">
      {trips.map((trip) => (
        <TripCard key={trip.id} trip={trip} selectedTripIds={selectedTripIds} setSelectedTripIds={setSelectedTripIds} />
      ))}
    </div>
  )
}

export default TripList
