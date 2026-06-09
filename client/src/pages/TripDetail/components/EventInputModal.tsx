import { Controller, useForm } from "react-hook-form";
import CurrencyCombobox from "../../../components/CurrencyCombobox";
import type { Trip } from "../../../types/trip.type";

type EventInputForm = {
  title: string;
  date: string;
  localCurrency: string;
  detail: string;
};

type Props = {
  trip: Trip;
  setIsAddModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const EventInputModal = ({ trip, setIsAddModalOpen }: Props) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm<EventInputForm>({
    mode: "onChange",
    defaultValues: {
      title: "",
      date: "",
      localCurrency: "",
      detail: "",
    },
  });

  const handleClose = () => {
    setIsAddModalOpen(false);
  };

  const handleAdd = (_data: EventInputForm) => {
    console.log(_data)
    return;
  };

  return (
    <>
      <div
        onClick={handleClose}
        className="fixed inset-0 z-50 bg-slate-950/45 backdrop-blur-sm"
      ></div>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
        <form
          onSubmit={handleSubmit(handleAdd)}
          className="w-full max-w-xl space-y-1 rounded-3xl border border-orange-100 bg-gradient-to-br from-orange-50 via-white to-amber-50 p-5 shadow-[0_24px_80px_-28px_rgba(234,88,12,0.45)] sm:p-8"
        >
          <p className="mb-4 text-left text-lg font-bold text-stone-900 sm:text-xl">
            イベントを追加する
          </p>
          <input
            type="text"
            {...register("title")}
            className="w-full rounded-2xl border border-orange-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-orange-400 sm:text-base"
            placeholder="タイトル"
          />
          <p className="mt-2 min-h-6 text-sm text-rose-500">
            {errors.title ? "タイトルを入力してください" : ""}
          </p>
          <input
            type="date"
            {...register("date")}
            className="w-full rounded-2xl border border-orange-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 shadow-sm outline-none transition focus:border-orange-400 sm:text-base"
          />
          <p className="mt-2 min-h-6 text-sm text-rose-500">
            {errors.date ? "日付を入力してください" : ""}
          </p>
          <Controller
            name="localCurrency"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <CurrencyCombobox
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />
          <p className="mt-2 min-h-6 text-sm text-rose-500">
            {errors.localCurrency ? "現地通貨を選択してください" : ""}
          </p>
          <div className="mt-1 rounded-2xl border border-orange-200 bg-white px-4 py-3 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
              Your Currency
            </p>
            <p className="mt-2 text-sm font-medium text-slate-700 sm:text-base">
              {trip.yourCurrency}
            </p>
          </div>
          <p className="mt-2 min-h-6 text-sm text-rose-500"></p>
          <textarea
            rows={4}
            {...register("detail")}
            className="w-full rounded-2xl border border-orange-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-orange-400 sm:text-base"
            placeholder="詳細（オプション）"
          />
          <p className="mt-2 min-h-6 text-sm text-rose-500"></p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
            <button
              type="submit"
              disabled={!isValid}
              className="inline-flex cursor-pointer items-center justify-center rounded-2xl bg-orange-500 px-5 py-3 text-sm font-semibold text-white shadow-[0_16px_36px_-18px_rgba(249,115,22,0.9)] transition hover:bg-orange-600 focus:outline-none focus:ring-4 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-black disabled:shadow-none sm:min-w-32 sm:text-base"
            >
              追加
            </button>
            <button
              type="button"
              onClick={handleClose}
              className="inline-flex cursor-pointer items-center justify-center rounded-2xl border border-orange-200 bg-white px-5 py-3 text-sm font-semibold text-orange-500 shadow-sm transition hover:border-orange-300 hover:bg-orange-50 focus:outline-none sm:min-w-32 sm:text-base"
            >
              キャンセル
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default EventInputModal;
