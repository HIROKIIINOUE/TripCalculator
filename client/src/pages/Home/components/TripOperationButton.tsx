import { IoMdAdd } from "react-icons/io"
import { MdDeleteOutline } from "react-icons/md";

type Props = {
  selectedTripIds: number[]
}

const TripOperationButton = (props: Props) => {

  const { selectedTripIds } = props

  return (
    <>
      {selectedTripIds.length > 0 ? (
        <button
          type="button"
          className="inline-flex items-center justify-center gap-2 rounded-full border border-red-200 bg-orange-800 px-5 py-2.5 text-sm font-bold text-white shadow-[0_18px_34px_-18px_rgba(220,38,38,0.95)] transition hover:scale-[1.01] hover:from-red-600 hover:to-red-700 focus:outline-none cursor-pointer"
        >
          <MdDeleteOutline className="text-lg" />
          Delete Trip
        </button>
      ) : (
        <button
          type="button"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-orange-500 px-4 py-2.5 text-sm font-semibold text-white shadow-[0_14px_30px_-18px_rgba(249,115,22,0.95)] transition hover:bg-orange-600 focus:outline-none cursor-pointer"
        >
          <IoMdAdd className="text-lg" />
          Add Trip
        </button>
      )}

    </>

  )
}

export default TripOperationButton
