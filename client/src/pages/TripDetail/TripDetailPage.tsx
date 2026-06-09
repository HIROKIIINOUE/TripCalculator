import { useEffect, useState } from "react"
import { IoMdAdd } from "react-icons/io"
import { MdDeleteOutline } from "react-icons/md"
import EventList from "./components/EventList"
import TripSummary from "./components/TripSummary"
import type { TripDetailEvent } from "../../types/event.type"
import type { Trip } from "../../types/trip.type"
import { Navigate, useParams } from "react-router"
import { useAuth } from "../../contexts/auth/useAuth"
import toast from "react-hot-toast"
import Loading from "../Loading"

const TripDetailPage = () => {
  const { tripId } = useParams()
  const { accessToken } = useAuth()
  const [events, setEvents] = useState<TripDetailEvent[]>([])
  const [trip, setTrip] = useState<Trip | null>(null)
  const [isTripNotFound, setIsTripNotFound] = useState<boolean>(false)
  const [isNetworkError, setIsNetworkError] = useState<boolean>(false)
  const [selectedEventIds, setSelectedEventIds] = useState<number[]>([])
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL_DEV


  // 該当の旅行情報と紐づくイベントデータの取得
  useEffect(() => {
    if (!accessToken) return;
    const getTripAndEvents = async () => {
      setIsLoading(true)
      setIsTripNotFound(false)
      setIsNetworkError(false)
      try {
        const resTrip = await fetch(`${BACKEND_URL}/trips/${tripId}`, {
          method: "GET",
          headers: {
            "authorization": `Bearer ${accessToken}`
          }
        })
        const resultTrip = await resTrip.json()
        if (!resTrip.ok) {
          if (resTrip.status === 404) {
            toast.error("Trip is not found")
            setIsTripNotFound(true)
            return
          }
          toast.error("server error")
          setIsTripNotFound(true)
          return
        }
        if (!resultTrip) {
          setIsTripNotFound(true)
          return
        } else {
          setTrip(resultTrip)
        }

        const resEvent = await fetch(`${BACKEND_URL}/events/${resultTrip.id}`, {
          method: "GET",
          headers: {
            "authorization": `Bearer ${accessToken}`
          }
        })
        if (!resEvent.ok) {
          if (resEvent.status === 404) {
            toast.error("Events are not found")
            return
          }
          toast.error("server error")
          return
        }
        const resultEvent = await resEvent.json()
        setEvents(resultEvent)

      } catch (error) {
        console.error(error)
        toast.error("ネットワークエラー")
        setIsNetworkError(true)
      } finally {
        setIsLoading(false)
      }
    }
    getTripAndEvents()

  }, [tripId, accessToken])


  const handleDelete = () => {
    setEvents(prev => prev.filter(event => !selectedEventIds.includes(event.id)))
    setSelectedEventIds([])
  }


  if (isLoading) return <Loading />
  if (isTripNotFound || isNetworkError) return <Navigate to="/" replace />
  if (!trip) return

  return (
    <div className="min-h-full px-4 py-6 sm:px-6 sm:py-8">
      {isAddModalOpen && (
        <>
          {/* ここに追加インプットモーダルコンポーネント作成 */}
        </>
      )}
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-5">
        <TripSummary trip={trip} events={events} />
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
          trip={trip}
          events={events}
          selectedEventIds={selectedEventIds}
          setSelectedEventIds={setSelectedEventIds}
        />
      </div>
    </div>
  )
}

export default TripDetailPage
