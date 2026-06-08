import type { Trip } from "../../types/trip.type"
import TripList from "./components/TripList"
import { useEffect, useState } from "react"
import TripOperationButton from "./components/TripOperationButton"
import TripInputModal from "./components/TripInputModal"
import { useAuth } from "../../contexts/auth/useAuth"
import toast from "react-hot-toast"
import { useTranslation } from "react-i18next"
import Loading from "../Loading"


const Home = () => {
  const [trips, setTrips] = useState<Trip[]>([])
  const [selectedTripIds, setSelectedTripIds] = useState<number[]>([])
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false)
  const { accessToken } = useAuth()
  const { t } = useTranslation("home")
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    const getTrips = async () => {
      if (!accessToken) return;
      setIsLoading(true)
      try {
        const BACKEND_URL = import.meta.env.VITE_BACKEND_URL_DEV
        const res = await fetch(`${BACKEND_URL}/trips`, {
          method: "GET",
          headers: {
            "authorization": `Bearer ${accessToken}`
          }
        })
        if (res.ok) {
          const data = await res.json()
          setTrips(data)
        } else {
          setTrips([])
          toast.error(t("home.fetchFailed"))
        }
      } catch (error) {
        console.error(error)
        toast.error(t("home.networkError"))
      } finally {
        setIsLoading(false)
      }
    }
    getTrips()

  }, [accessToken])

  if (isLoading) {
    return <Loading />
  }

  return (
    <div className="min-h-full px-4 py-6 sm:px-6 sm:py-8">
      {isAddModalOpen && <TripInputModal setIsAddModalOpen={setIsAddModalOpen} setTrips={setTrips} />}
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-5">
        <div className="flex justify-end">
          <TripOperationButton trips={trips} setTrips={setTrips} selectedTripIds={selectedTripIds} setSelectedTripIds={setSelectedTripIds} setIsAddModalOpen={setIsAddModalOpen} />
        </div>
        <TripList trips={trips} selectedTripIds={selectedTripIds} setSelectedTripIds={setSelectedTripIds} />
      </div>
    </div>
  )
}

export default Home
