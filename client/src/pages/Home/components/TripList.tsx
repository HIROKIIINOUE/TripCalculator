import type { Trip } from "../../../types/trip.type"
import TripCard from "./TripCard"
import { useTranslation } from "react-i18next"

type Props = {
  setTrips: React.Dispatch<React.SetStateAction<Trip[]>>
  trips: Trip[]
  selectedTripIds: number[]
  setSelectedTripIds: React.Dispatch<React.SetStateAction<number[]>>
}

const TripList = (props: Props) => {
  const { setTrips, trips, selectedTripIds, setSelectedTripIds } = props
  const { t } = useTranslation("home")
  if (trips.length <= 0) {
    return (
      <div className="rounded-3xl border border-dashed border-orange-200 bg-white px-6 py-12 text-center shadow-sm">
        <p className="text-lg font-semibold text-stone-900">
          {t("home.list.emptyTitle")}
        </p>
        <p className="mt-2 text-sm leading-6 text-stone-600">
          {t("home.list.emptyDescription")}
        </p>
      </div>
    )
  }

  return (
    <div className="grid gap-3">
      {trips.map((trip) => (
        <TripCard key={trip.id} setTrips={setTrips} trip={trip} selectedTripIds={selectedTripIds} setSelectedTripIds={setSelectedTripIds} />
      ))}
    </div>
  )
}

export default TripList
