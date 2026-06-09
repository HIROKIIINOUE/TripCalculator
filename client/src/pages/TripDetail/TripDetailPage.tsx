import { useEffect, useState } from "react"
import EventList from "./components/EventList"
import EventOperationButton from "./components/EventOperationButton"
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
          <EventOperationButton
            events={events}
            setEvents={setEvents}
            selectedEventIds={selectedEventIds}
            setSelectedEventIds={setSelectedEventIds}
            setIsAddModalOpen={setIsAddModalOpen}
          />
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
