import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TripSchema, type AddTripBody } from "../../../schemas/tripPage.schema";
import CurrencyCombobox from "./CurrencyCombobox";

type Props = {
  setIsAddModalOpen: React.Dispatch<React.SetStateAction<boolean>>

}

const TripInputModal = (props: Props) => {
  const { setIsAddModalOpen } = props;
  const { register, handleSubmit, control, formState: { errors, isValid, isSubmitting } } = useForm<AddTripBody>({
    mode: "onChange",
    resolver: zodResolver(TripSchema),
    defaultValues: {
      yourCurrency: "",
    },
  })

  const handleClose = () => {
    setIsAddModalOpen(false)
  }

  const addTrip = () => {

  }
  return (
    <>
      <div onClick={handleClose} className="fixed inset-0 z-50 bg-slate-950/45 backdrop-blur-sm" ></div>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
        <form
          onSubmit={handleSubmit(addTrip)}
          className="w-full max-w-xl space-y-1 rounded-[2rem] border border-orange-100 bg-gradient-to-br from-orange-50 via-white to-amber-50 p-5 shadow-[0_24px_80px_-28px_rgba(234,88,12,0.45)] sm:p-8"
        >
          <input
            type="text"
            {...register("title")}
            className="w-full rounded-2xl border border-orange-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-orange-400  sm:text-base"
            placeholder="Trip title"
          />
          <p className="mt-2 min-h-6 text-sm text-rose-500">
            {errors.title?.message}
          </p>
          <input
            type="date"
            {...register("startDay")}
            className="w-full rounded-2xl border border-orange-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 shadow-sm outline-none transition  focus:border-orange-400 sm:text-base"
          />
          <p className="mt-2 min-h-6 text-sm text-rose-500">
            {errors.startDay?.message}
          </p>
          <input
            type="text"
            inputMode="numeric" // for mobile
            {...register("budget")}
            className="mt-4 w-full rounded-2xl border border-orange-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-orange-400  sm:text-base"
            placeholder="Budget"
          />
          <p className="mt-2 min-h-6 text-sm text-rose-500">
            {errors.budget?.message}
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
            {errors.yourCurrency?.message}
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
            <button type="submit" disabled={!isValid || isSubmitting} className="inline-flex items-center justify-center rounded-2xl bg-orange-500 px-5 py-3 text-sm font-semibold text-white shadow-[0_16px_36px_-18px_rgba(249,115,22,0.9)] transition hover:bg-orange-600 focus:outline-none focus:ring-4 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-black disabled:shadow-none sm:min-w-32 sm:text-base cursor-pointer">追加</button>
            <button type="button" onClick={handleClose} className="inline-flex items-center justify-center rounded-2xl border border-orange-200 bg-white px-5 py-3 text-sm font-semibold text-orange-500 shadow-sm transition hover:border-orange-300 hover:bg-orange-50 focus:outline-none  sm:min-w-32 sm:text-base cursor-pointer">キャンセル</button>
          </div>
        </form>
      </div>
    </>
  )
}

export default TripInputModal
