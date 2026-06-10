import type { TripDetailEvent } from "../../../types/event.type"
import type { Trip } from "../../../types/trip.type"
import { useTranslation } from "react-i18next"


type Props = {
  trip: Trip
  events: TripDetailEvent[]
}

const TripSummary = (props: Props) => {
  const { trip, events } = props
  const { t } = useTranslation("tripDetail")
  const totalYourAmount = events.reduce((sum, event) => sum + event.priceYourCurrency, 0)
  const difference = trip.budget - totalYourAmount

  const compactSummaryItems = [
    {
      label: t("tripDetail.summary.budget"),
      value: `${trip.budget.toLocaleString()} ${trip.yourCurrency}`,
      accent: "from-amber-200 via-amber-100 to-white",
    },
    {
      label: t("tripDetail.summary.total"),
      value: `${totalYourAmount.toLocaleString()} ${trip.yourCurrency}`,
      accent: "from-orange-200 via-orange-50 to-white",
    },
    {
      label: t("tripDetail.summary.difference"),
      value: `${difference.toLocaleString()} ${trip.yourCurrency}`,
      subValue: difference >= 0 ? "" : t("tripDetail.summary.overBudget"),
      accent: difference >= 0 ? "from-emerald-100 via-emerald-50 to-white" : "from-red-200 via-red-50 to-white",
      excessive: difference < 0 ? "text-red-500" : ""
    },
  ]

  return (
    <section className="rounded-2xl border border-orange-100 bg-white p-3 shadow-[0_20px_50px_-30px_rgba(120,53,15,0.35)] sm:rounded-2xl sm:p-6">
      <div className="grid gap-3">
        <article className="rounded-3xl border border-orange-100 bg-gradient-to-br from-orange-200 via-orange-100 to-white p-4 shadow-sm sm:rounded-3xl sm:p-5">
          <p className="text-[11px] font-semibold uppercase text-stone-500 sm:text-xs">
            {t("tripDetail.summary.tripTitle")}
          </p>
          <p className="mt-2 break-words text-xl font-bold text-stone-900 sm:mt-3 sm:text-2xl">
            {trip.title}
          </p>
        </article>

        <div className="grid gap-2 sm:grid-cols-3 sm:gap-3">
          {compactSummaryItems.map((item) => (
            <article
              key={item.label}
              className={`rounded-[1.25rem] border border-orange-100 bg-gradient-to-br ${item.accent} px-3 py-2.5 shadow-sm sm:rounded-3xl sm:p-4`}
            >
              <p className={`text-[10px] font-semibold uppercase tracking-[0.1em] sm:text-xs sm:tracking-[0.1em] ${item.excessive ? item.excessive : "text-stone-500"}`}>
                {item.label}
              </p>
              <p className={`mt-1 break-words text-sm font-bold sm:mt-3 sm:text-lg ${item.excessive ? item.excessive : "text-stone-900"}`}>
                {item.value}
              </p>
              {item.subValue ? (
                <p className={`mt-2 break-words text-xs font-medium sm:text-sm ${item.excessive ? item.excessive : "text-stone-600"}`}>
                  {item.subValue}
                </p>
              ) : null}
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TripSummary
