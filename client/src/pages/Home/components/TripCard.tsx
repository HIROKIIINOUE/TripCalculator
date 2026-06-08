import type { Trip } from "../../../types/trip.type"
import { Link } from "react-router"
import { FaRegEdit } from "react-icons/fa"
import { MdCheckBoxOutlineBlank } from "react-icons/md";
import { MdCheckBox } from "react-icons/md";
import { useState } from "react";
import TripInputModal from "./TripInputModal";


type Props = {
  setTrips: React.Dispatch<React.SetStateAction<Trip[]>>
  trip: Trip
  selectedTripIds: number[]
  setSelectedTripIds: React.Dispatch<React.SetStateAction<number[]>>
}

const TripCard = (props: Props) => {
  const { setTrips, trip, selectedTripIds, setSelectedTripIds } = props
  const isSelected = selectedTripIds.includes(trip.id)
  const formattedDate = trip.startDay.includes("T") ? trip.startDay.split("T")[0] : trip.startDay
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState<boolean>(false)

  const handleSelect = () => {
    if (isSelected) {
      setSelectedTripIds(prev => prev.filter(id => id !== trip.id))
      return
    } else {
      setSelectedTripIds(prev => [...prev, trip.id])
    }
  }



  return (
    <>
      {isUpdateModalOpen && <TripInputModal setTrips={setTrips} trip={trip} isUpdateModalOpen={isUpdateModalOpen} setIsUpdateModalOpen={setIsUpdateModalOpen} />}
      <article
        className={`rounded-2xl border shadow-[0_14px_30px_-26px_rgba(120,53,15,0.45)] transition hover:shadow-[0_18px_36px_-24px_rgba(120,53,15,0.55)] ${isSelected
          ? "border-2 border-orange-500 bg-orange-100 shadow-[0_20px_40px_-24px_rgba(249,115,22,0.55)]"
          : "border-orange-100 bg-white"
          }`}
      >
        <div className="flex flex-col sm:flex-row sm:items-stretch">
          <Link
            to={`/home/${trip.id}`}
            className="flex min-w-0 flex-1 flex-col gap-3 p-3 focus:outline-none sm:rounded-l-2xl sm:p-4"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0 space-y-1">
                <h3 className="text-base font-bold text-stone-900 sm:text-lg">
                  {trip.title}
                </h3>
                <p className="text-xs text-stone-500 sm:text-sm">
                  開始日: {formattedDate}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-stone-600 sm:text-sm">
              <p className="min-w-0 break-words">
                <span className="mr-2 font-medium text-stone-500">予算</span>
                <span className="font-semibold text-stone-900 break-all">
                  {trip.budget.toLocaleString()} {trip.yourCurrency}
                </span>
              </p>
            </div>
          </Link>

          <div className="flex shrink-0 items-center justify-end gap-2 border-t border-orange-200 px-3 py-3 sm:border-l sm:border-t-0 sm:px-4 sm:py-0">
            <button
              type="button"
              onClick={() => setIsUpdateModalOpen(true)}
              aria-label={`${trip.title}を編集`}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-stone-200 bg-white text-stone-600 transition hover:border-orange-200 hover:bg-orange-50 hover:text-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-300 sm:h-11 sm:w-11 cursor-pointer"
            >
              <FaRegEdit className="text-base" />
            </button>
            <button
              type="button"
              aria-label={`${trip.title}を選択`}
              onClick={handleSelect}
              className={`inline-flex h-10 w-10 items-center justify-center rounded-full border transition focus:outline-none focus:ring-2 sm:h-11 sm:w-11 cursor-pointer ${isSelected
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

export default TripCard
