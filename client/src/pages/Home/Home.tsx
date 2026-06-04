import type { Trip } from "../../types/trip.type"
import TripList from "./components/TripList"
import { useState } from "react"
import TripOperationButton from "./components/TripOperationButton"
const dummyTrips: Trip[] = [
  {
    id: 1,
    title: "Autumn in Vancouver",
    startDay: new Date("2026-10-12"),
    budget: 1800,
    yourCurrency: "JPY",
  },
  {
    id: 2,
    title: "Tokyo Food Weekend",
    startDay: new Date("2026-08-03"),
    budget: 950,
    yourCurrency: "JPY",
  },
  {
    id: 3,
    title: "Rocky Mountains Escape",
    startDay: new Date("2026-11-18"),
    budget: 2600,
    yourCurrency: "JPY",
  },
]

const Home = () => {
  const [selectedTripIds, setSelectedTripIds] = useState<number[]>([])


  return (
    <div className="min-h-full px-4 py-6 sm:px-6 sm:py-8">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-5">
        <div className="flex justify-end">
          <TripOperationButton selectedTripIds={selectedTripIds} />
        </div>
        <TripList trips={dummyTrips} selectedTripIds={selectedTripIds} setSelectedTripIds={setSelectedTripIds} />
      </div>
    </div>
  )
}

export default Home
