import { IoMdAdd } from "react-icons/io"
import { MdDeleteOutline } from "react-icons/md"
import { useAuth } from "../../../contexts/auth/useAuth"
import toast from "react-hot-toast"
import type { TripDetailEvent } from "../../../types/event.type"
import { useTranslation } from "react-i18next"

type Props = {
  events: TripDetailEvent[]
  setEvents: React.Dispatch<React.SetStateAction<TripDetailEvent[]>>
  selectedEventIds: number[]
  setSelectedEventIds: React.Dispatch<React.SetStateAction<number[]>>
  setIsAddModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const EventOperationButton = (props: Props) => {
  const { accessToken } = useAuth()
  const { t } = useTranslation("tripDetail")
  const { setEvents, selectedEventIds, setSelectedEventIds, setIsAddModalOpen } = props

  const handleDelete = async () => {
    if (!confirm(t("tripDetail.operation.deleteConfirm"))) return
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL_DEV

    try {
      const results = await Promise.all(
        selectedEventIds.map(async (eventId) => {
          const res = await fetch(`${BACKEND_URL}/events/${eventId}`, {
            method: "DELETE",
            headers: {
              "authorization": `Bearer ${accessToken}`
            }
          })
          return {
            eventId,
            ok: res.ok,
            status: res.status
          }
        })
      )
      const deletedIds = results.filter(result => result.ok).map(result => result.eventId)
      setEvents(prev => prev.filter(event => {
        const judge = deletedIds.includes(event.id)
        return judge === false
      }))

      if (deletedIds.length === selectedEventIds.length) {
        toast.success(t("tripDetail.operation.deleteSuccess"))
      } else if (deletedIds.length > 0) {
        toast.error(t("tripDetail.operation.deletePartialFailure"))
      } else {
        toast.error(t("tripDetail.operation.deleteFailure"))
      }
      setSelectedEventIds([])
    } catch (error) {
      console.error(error)
      toast.error(t("tripDetail.fetch.networkError"))
    }
  }

  return (
    <>
      {selectedEventIds.length > 0 ? (
        <button
          type="button"
          onClick={handleDelete}
          className="inline-flex items-center justify-center gap-2 rounded-full border border-red-200 bg-orange-800 px-5 py-2.5 text-sm font-bold text-white shadow-[0_18px_34px_-18px_rgba(220,38,38,0.95)] transition hover:scale-[1.01] hover:from-red-600 hover:to-red-700 focus:outline-none cursor-pointer"
        >
          <MdDeleteOutline className="text-lg" />
          {t("tripDetail.operation.deleteEvent")}
        </button>
      ) : (
        <button
          type="button"
          onClick={() => setIsAddModalOpen(true)}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-orange-500 px-4 py-2.5 text-sm font-semibold text-white shadow-[0_14px_30px_-18px_rgba(249,115,22,0.95)] transition hover:bg-orange-600 focus:outline-none cursor-pointer"
        >
          <IoMdAdd className="text-lg" />
          {t("tripDetail.operation.addEvent")}
        </button>
      )}
    </>
  )
}

export default EventOperationButton
