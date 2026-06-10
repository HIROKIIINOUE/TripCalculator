/* eslint-disable react-hooks/set-state-in-effect */
import { Controller, useForm, useWatch } from "react-hook-form";
import { useEffect, useState } from "react";
import CurrencyCombobox from "../../../components/CurrencyCombobox";
import type {
  EventInputForm,
  ExchangeRatePreview,
  TripDetailEvent,
} from "../../../types/event.type";
import { useAuth } from "../../../contexts/auth/useAuth";
import toast from "react-hot-toast";
import type { Trip } from "../../../types/trip.type";

const MAX_EVENT_PRICE = 2147483647;
const CONVERTED_PRICE_TOO_LARGE_MESSAGE = "converted_price_too_large";

type Props = {
  trip: Trip
  setEvents: React.Dispatch<React.SetStateAction<TripDetailEvent[]>>;
  event?: TripDetailEvent;
  setIsAddModalOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  isAddModalOpen?: boolean;
  setIsUpdateModalOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  isUpdateModalOpen?: boolean;
}

const sortEventsByDateDesc = (events: TripDetailEvent[]) =>
  [...events].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

const EventInputModal = (props: Props) => {
  const {
    trip,
    event,
    setEvents,
    setIsAddModalOpen,
    isAddModalOpen,
    setIsUpdateModalOpen,
    isUpdateModalOpen,
  } = props;
  const { accessToken } = useAuth();
  const [preview, setPreview] = useState<ExchangeRatePreview | null>(null);
  const [isPreviewLoading, setIsPreviewLoading] = useState(false);
  const formattedDate = event?.date.includes("T")
    ? event.date.split("T")[0]
    : event?.date;
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid, isSubmitting },
  } = useForm<EventInputForm>({
    mode: "onChange",
    defaultValues: event
      ? {
        title: event.title,
        date: formattedDate,
        localCurrency: event.localCurrency,
        priceLocalCurrency: String(event.priceLocalCurrency),
        detail: event.detail,
      }
      : {
        title: "",
        date: "",
        localCurrency: "",
        priceLocalCurrency: "",
        detail: "",
      },
  });
  // useWatchでは指定したnameの値を監視し、定数として値を格納できる
  const localCurrency = useWatch({ control, name: "localCurrency" });
  const priceLocalCurrency = useWatch({ control, name: "priceLocalCurrency" });
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL_DEV;

  const closeModal = () => {
    if (setIsAddModalOpen && isAddModalOpen) {
      setIsAddModalOpen(false);
    } else if (setIsUpdateModalOpen && isUpdateModalOpen) {
      setIsUpdateModalOpen(false);
    }
  };


  // 通貨換算の計算とプレビュー表示に必要な「現地通貨」「自国通貨」「現地通貨と自国通貨のレート」をバックエンドから取得し、previewにセットする。換金は「現地通貨での料金 × 現地通貨と自国通貨のレート」で求められるようになる。
  useEffect(() => {
    if (!accessToken || !localCurrency) {
      setPreview(null);
      return;
    }

    const fetchPreview = async () => {
      setIsPreviewLoading(true);

      try {
        // encodeURIComponent() -> URL に入れる文字列を安全な形に変換するための関数
        const res = await fetch(
          `${BACKEND_URL}/events/preview/${trip.id}?localCurrency=${encodeURIComponent(localCurrency)}`,
          {
            headers: {
              authorization: `Bearer ${accessToken}`,
            },
          },
        );

        if (!res.ok) {
          setPreview(null);
          return;
        }

        const data = (await res.json()) as ExchangeRatePreview;
        setPreview(data);
      } catch (error) {
        console.error(error);
        setPreview(null);
      } finally {
        setIsPreviewLoading(false);
      }
    };

    fetchPreview();
  }, [accessToken, BACKEND_URL, localCurrency, trip.id]);


  // ===プレビューに表示用の外貨計算ロジック(DBへ保存する際はバックエンドで別途計算する)===
  const parsedPrice = Number(priceLocalCurrency);
  const previewAmount =
    preview &&
      priceLocalCurrency.trim() !== "" &&
      Number.isInteger(parsedPrice) &&
      parsedPrice >= 0
      ? Math.round(parsedPrice * preview.appliedExchangeRate)
      : null;
  const isPreviewAmountTooLarge =
    previewAmount !== null && previewAmount > MAX_EVENT_PRICE;
  // ===================================

  // イベント追加ロジック
  const addEvent = async (data: EventInputForm) => {
    if (!isAddModalOpen) return;

    try {
      const res = await fetch(`${BACKEND_URL}/events/${trip.id}`, {
        method: "POST",
        headers: {
          authorization: `Bearer ${accessToken}`,
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          title: data.title,
          date: data.date,
          localCurrency: data.localCurrency,
          priceLocalCurrency: Number(data.priceLocalCurrency),
          detail: data.detail,
        }),
      });

      if (!res.ok) {
        const result = await res.json().catch(() => null);
        if (res.status === 400 && result?.message === CONVERTED_PRICE_TOO_LARGE_MESSAGE) {
          toast.error("換算後の金額が大きすぎるので値を下げてください");
        } else if (res.status === 400) {
          toast.error("イベントデータの追加に失敗しました");
        } else {
          toast.error("サーバーエラー");
        }
        return;
      }

      const createdEvent = (await res.json()) as TripDetailEvent;
      setEvents((prev) => sortEventsByDateDesc([createdEvent, ...prev]));
      toast.success("イベントを追加しました");
      if (setIsAddModalOpen) {
        setIsAddModalOpen(false);
      }
    } catch (error) {
      console.error(error);
      toast.error("ネットワークエラー");
    }
  };

  // イベント更新処理
  const updateEvent = async (data: EventInputForm) => {
    if (!isUpdateModalOpen || !event) return;

    try {
      const res = await fetch(`${BACKEND_URL}/events/${event.id}`, {
        method: "PATCH",
        headers: {
          authorization: `Bearer ${accessToken}`,
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          title: data.title,
          date: data.date,
          localCurrency: data.localCurrency,
          priceLocalCurrency: Number(data.priceLocalCurrency),
          detail: data.detail,
        }),
      });

      if (!res.ok) {
        const result = await res.json().catch(() => null);
        if (res.status === 400 && result?.message === CONVERTED_PRICE_TOO_LARGE_MESSAGE) {
          toast.error("換算後の金額が大きすぎるので値を下げてください");
        } else if (res.status === 404) {
          toast.error("イベントデータが見つかりません");
        } else {
          toast.error("サーバーエラー");
        }
        return;
      }

      const updatedEvent = (await res.json()) as TripDetailEvent;
      setEvents((prev) =>
        sortEventsByDateDesc([
          updatedEvent,
          ...prev.filter((currentEvent) => currentEvent.id !== event.id),
        ]),
      );
      toast.success("イベントを更新しました");
      if (setIsUpdateModalOpen) {
        setIsUpdateModalOpen(false);
      }
    } catch (error) {
      console.error(error);
      toast.error("ネットワークエラー");
    }
  };

  return (
    <>
      <div
        onClick={closeModal}
        className="fixed inset-0 z-50 bg-slate-950/45 backdrop-blur-sm"
      ></div>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
        <form
          onSubmit={isAddModalOpen ? handleSubmit(addEvent) : handleSubmit(updateEvent)}
          className="w-full max-w-xl rounded-3xl border border-orange-100 bg-gradient-to-br from-orange-50 via-white to-amber-50 p-5 shadow-[0_24px_80px_-28px_rgba(234,88,12,0.45)] sm:p-7"
        >
          <p className="mb-4 text-left text-lg font-bold text-stone-900 sm:text-xl">
            {isAddModalOpen ? "イベントを追加する" : "イベントを編集する"}
          </p>

          <div className="space-y-1">
            <div>
              <input
                type="text"
                {...register("title", { required: true })}
                className="w-full rounded-2xl border border-orange-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-orange-400 sm:text-base"
                placeholder="タイトル"
              />
              <p className="mt-1 min-h-5 text-sm text-rose-500">
                {errors.title ? "タイトルを入力してください" : ""}
              </p>
            </div>

            <div>
              <input
                type="date"
                {...register("date", { required: true })}
                className="w-full rounded-2xl border border-orange-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 shadow-sm outline-none transition focus:border-orange-400 sm:text-base"
              />
              <p className="mt-1 min-h-5 text-sm text-rose-500">
                {errors.date ? "日付を入力してください" : ""}
              </p>
            </div>

            <div>
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
              <p className="mt-1 min-h-5 text-sm text-rose-500">
                {errors.localCurrency ? "現地通貨を選択してください" : ""}
              </p>
            </div>

            <div>
              <input
                type="text"
                inputMode="numeric"
                {...register("priceLocalCurrency", {
                  required: true,
                  validate: (value) =>
                    value.trim() !== "" &&
                    Number.isInteger(Number(value)) &&
                    Number(value) >= 0 &&
                    Number(value) <= MAX_EVENT_PRICE,
                })}
                className="w-full rounded-2xl border border-orange-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-orange-400 sm:text-base"
                placeholder="現地価格"
              />
              <p className="mt-1 min-h-5 text-sm text-rose-500">
                {errors.priceLocalCurrency?.type === "validate"
                  ? Number(priceLocalCurrency) > MAX_EVENT_PRICE
                    ? "金額が大きすぎるので値を下げてください"
                    : "現地価格は0以上の整数で入力してください"
                  : ""}
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-orange-200 bg-orange-50/70 px-4 py-3 shadow-sm">
            <p className={`text-sm font-semibold sm:text-base ${isPreviewAmountTooLarge ? "text-rose-500" : "text-stone-900"}`}>
              {isPreviewLoading
                ? "参考換算額: 計算中..."
                : isPreviewAmountTooLarge
                  ? "参考換算額: 金額が大きすぎるので値を下げてください"
                : previewAmount !== null && preview
                  ? `参考換算額: ${previewAmount.toLocaleString()} ${preview.yourCurrency}`
                  : "参考換算額: -"}
            </p>
          </div>

          <div className="mt-10">
            <textarea
              rows={3}
              {...register("detail")}
              className="w-full rounded-2xl border border-orange-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-orange-400 sm:text-base"
              placeholder="詳細（オプション）"
            />
          </div>

          <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:justify-end">
            <button
              type="submit"
              disabled={!isValid || isSubmitting}
              className="inline-flex cursor-pointer items-center justify-center rounded-2xl bg-orange-500 px-5 py-3 text-sm font-semibold text-white shadow-[0_16px_36px_-18px_rgba(249,115,22,0.9)] transition hover:bg-orange-600 focus:outline-none focus:ring-4 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-black disabled:shadow-none sm:min-w-32 sm:text-base"
            >
              {isAddModalOpen ? "追加" : "更新"}
            </button>
            <button
              type="button"
              onClick={closeModal}
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
