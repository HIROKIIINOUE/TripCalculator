import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addTripSchema, type AddTripBody } from "../../../schemas/tripPage.schema";
import CurrencyCombobox from "../../../components/CurrencyCombobox";
import { useAuth } from "../../../contexts/auth/useAuth";
import toast from "react-hot-toast";
import type { Trip } from "../../../types/trip.type";
import { useTranslation } from "react-i18next";

type Props = {
  setIsAddModalOpen?: React.Dispatch<React.SetStateAction<boolean>>
  isAddModalOpen?: boolean
  setTrips: React.Dispatch<React.SetStateAction<Trip[]>>
  trip?: Trip
  setIsUpdateModalOpen?: React.Dispatch<React.SetStateAction<boolean>>
  isUpdateModalOpen?: boolean
}

// 旅行データを追加更新した後に日付順にソートされるようにsetTrips用に旅行リストデータを整理する
const sortTripsByStartDayDesc = (trips: Trip[]) =>
  [...trips].sort(
    (a, b) => new Date(b.startDay).getTime() - new Date(a.startDay).getTime(),
  )

const TripInputModal = (props: Props) => {
  const { accessToken } = useAuth()
  const { setIsAddModalOpen, isAddModalOpen, trip, setTrips, setIsUpdateModalOpen, isUpdateModalOpen } = props;
  const { t } = useTranslation("home")
  const translateError = (message?: string) =>
    message ? t(message.replace(/^trip\./, "home.modal.")) : ""

  const formattedStartDay = trip?.startDay.includes("T")
    ? trip.startDay.split("T")[0]
    : trip?.startDay

  const { register, handleSubmit, control, formState: { errors, isValid, isSubmitting } } = useForm<AddTripBody>({
    mode: "onChange",
    resolver: zodResolver(addTripSchema),
    defaultValues: trip ? {
      title: trip.title,
      startDay: formattedStartDay,
      budget: String(trip.budget),
      yourCurrency: trip.yourCurrency
    } : {
      yourCurrency: "",
    },
  })

  const handleClose = () => {
    if (setIsAddModalOpen && isAddModalOpen) {
      setIsAddModalOpen(false)
    } else if (setIsUpdateModalOpen && isUpdateModalOpen) {
      setIsUpdateModalOpen(false)
    }
  }

  const addTrip = async (data: AddTripBody) => {
    if (!isAddModalOpen) return
    const payload = {
      title: data.title,
      startDay: data.startDay,
      budget: Number(data.budget),
      yourCurrency: data.yourCurrency
    }

    try {
      const BACKEND_URL = import.meta.env.VITE_BACKEND_URL_DEV
      const res = await fetch(`${BACKEND_URL}/trips`, {
        method: "POST",
        headers: {
          "authorization": `Bearer ${accessToken}`,
          "Content-type": "application/json"
        },
        body: JSON.stringify(payload)
      })
      if (!res.ok) {
        if (res.status === 400) {
          toast.error(t("home.modal.addFailed"))
        } else if (res.status === 500) {
          toast.error(t("home.modal.serverError"))
        }
      } else {
        const data = await res.json()
        setTrips(prev => sortTripsByStartDayDesc([data, ...prev]))
        toast.success(t("home.modal.addSuccess"))
        if (setIsAddModalOpen && isAddModalOpen) {
          setIsAddModalOpen(false)
        }
      }
    } catch (error) {
      console.error(error)
      toast.error(t("home.networkError"))
    }
  }

  const updateTrip = async (data: AddTripBody) => {
    if (!isUpdateModalOpen) return
    const payload = {
      title: data.title,
      startDay: data.startDay,
      budget: Number(data.budget),
      yourCurrency: data.yourCurrency
    }
    try {
      const BACKEND_URL = import.meta.env.VITE_BACKEND_URL_DEV
      const res = await fetch(`${BACKEND_URL}/trips/${trip?.id}`, {
        method: "PATCH",
        headers: {
          "authorization": `Bearer ${accessToken}`,
          "Content-type": "application/json"
        },
        body: JSON.stringify(payload)
      })
      const result = await res.json()

      if (!res.ok) {
        switch (res.status) {
          case 404:
            toast.error(t("home.modal.notFound"))
            return;
          case 500:
            toast.error(t("home.modal.serverError"))
            return;
          default:
            toast.error(t("home.modal.updateFailed"))
            return;
        }
      } else {
        const updatedTrip = {
          id: Number(trip?.id),
          title: result.title,
          startDay: result.startDay,
          budget: result.budget,
          yourCurrency: result.yourCurrency
        }
        setTrips(prev =>
          sortTripsByStartDayDesc([
            updatedTrip,
            ...prev.filter(element => element.id !== trip?.id),
          ]),
        )
        toast.success(t("home.modal.updateSuccess"))
      }
      if (setIsUpdateModalOpen && isUpdateModalOpen) {
        setIsUpdateModalOpen(false)
      }
    } catch (error) {
      console.error(error)
      toast.error(t("home.networkError"))
    }

  }

  return (
    <>
      <div onClick={handleClose} className="fixed inset-0 z-50 bg-slate-950/45 backdrop-blur-sm" ></div>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
        <form
          onSubmit={isAddModalOpen ? handleSubmit(addTrip) : handleSubmit(updateTrip)}
          className="w-full max-w-xl space-y-1 rounded-[2rem] border border-orange-100 bg-gradient-to-br from-orange-50 via-white to-amber-50 p-5 shadow-[0_24px_80px_-28px_rgba(234,88,12,0.45)] sm:p-8"
        >
          <p className="mb-4 text-left text-lg font-bold text-stone-900 sm:text-xl">
            {isAddModalOpen ? t("home.modal.addHeading") : t("home.modal.editHeading")}
          </p>
          <p className="mb-2 text-xs font-semibold text-stone-500 sm:text-sm">
            {t("home.modal.titlePlaceholder")}
          </p>
          <input
            type="text"
            {...register("title")}
            className="w-full rounded-2xl border border-orange-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-orange-400  sm:text-base"
            placeholder={t("home.modal.titlePlaceholder")}
          />
          <p className="mt-2 min-h-6 text-sm text-rose-500">
            {translateError(errors.title?.message)}
          </p>
          <p className="mb-2 text-xs font-semibold text-stone-500 sm:text-sm">
            Start Date
          </p>
          <input
            type="date"
            {...register("startDay")}
            className="w-full rounded-2xl border border-orange-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 shadow-sm outline-none transition  focus:border-orange-400 sm:text-base"
          />
          <p className="mt-2 min-h-6 text-sm text-rose-500">
            {translateError(errors.startDay?.message)}
          </p>
          <p className="mb-2 text-xs font-semibold text-stone-500 sm:text-sm">
            {t("home.modal.budgetPlaceholder")}
          </p>
          <input
            type="text"
            inputMode="numeric" // for mobile
            {...register("budget")}
            className="w-full rounded-2xl border border-orange-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-orange-400  sm:text-base"
            placeholder={t("home.modal.budgetPlaceholder")}
          />
          <p className="mt-2 min-h-6 text-sm text-rose-500">
            {translateError(errors.budget?.message)}
          </p>
          <p className="mb-2 text-xs font-semibold text-stone-500 sm:text-sm">
            Your Currency
          </p>
          <Controller
            name="yourCurrency"
            control={control}
            render={({ field }) => (
              <CurrencyCombobox
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />
          <p className="mt-2 min-h-6 text-sm text-rose-500">
            {translateError(errors.yourCurrency?.message)}
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
            <button type="submit" disabled={!isValid || isSubmitting} className="inline-flex items-center justify-center rounded-2xl bg-orange-500 px-5 py-3 text-sm font-semibold text-white shadow-[0_16px_36px_-18px_rgba(249,115,22,0.9)] transition hover:bg-orange-600 focus:outline-none focus:ring-4 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-black disabled:shadow-none sm:min-w-32 sm:text-base cursor-pointer">{isAddModalOpen ? t("home.modal.submit") : t("home.modal.update")}</button>
            <button type="button" onClick={handleClose} className="inline-flex items-center justify-center rounded-2xl border border-orange-200 bg-white px-5 py-3 text-sm font-semibold text-orange-500 shadow-sm transition hover:border-orange-300 hover:bg-orange-50 focus:outline-none  sm:min-w-32 sm:text-base cursor-pointer">{t("home.modal.cancel")}</button>
          </div>
        </form>
      </div>
    </>
  )
}

export default TripInputModal
