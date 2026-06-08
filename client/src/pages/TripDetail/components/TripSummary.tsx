import type { TripDetailEvent, TripDetailTrip } from "../TripDetailPage"

type Props = {
  trip: TripDetailTrip
  events: TripDetailEvent[]
}

const TripSummary = ({ trip, events }: Props) => {
  const totalYourAmount = events.reduce((sum, event) => sum + event.yourAmount, 0)
  const totalLocalAmount = events.reduce((sum, event) => sum + event.localAmount, 0)
  const difference = trip.budget - totalYourAmount

  const compactSummaryItems = [
    {
      label: "予算",
      value: `${trip.budget.toLocaleString()} ${trip.yourCurrency}`,
      accent: "from-amber-200 via-amber-100 to-white",
    },
    {
      label: "合計",
      value: `${totalYourAmount.toLocaleString()} ${trip.yourCurrency}`,
      subValue: `${totalLocalAmount.toLocaleString()} ${events[0]?.localCurrency ?? ""}`,
      accent: "from-orange-200 via-orange-50 to-white",
    },
    {
      label: "差分",
      value: `${difference.toLocaleString()} ${trip.yourCurrency}`,
      subValue: difference >= 0 ? "予算内です" : "予算オーバーです",
      accent: difference >= 0 ? "from-emerald-100 via-emerald-50 to-white" : "from-red-200 via-red-50 to-white",
    },
  ]

  return (
    <section className="rounded-2xl border border-orange-100 bg-white p-3 shadow-[0_20px_50px_-30px_rgba(120,53,15,0.35)] sm:rounded-2xl sm:p-6">
      <div className="grid gap-3">
        <article className="rounded-3xl border border-orange-100 bg-gradient-to-br from-orange-200 via-orange-100 to-white p-4 shadow-sm sm:rounded-3xl sm:p-5">
          <p className="text-[11px] font-semibold uppercase text-stone-500 sm:text-xs">
            旅行タイトル
          </p>
          <p className="mt-2 break-words text-xl font-bold leading-snug text-stone-900 sm:mt-3 sm:text-2xl">
            {trip.title}
          </p>
        </article>

        <div className="grid gap-2 sm:grid-cols-3 sm:gap-3">
          {compactSummaryItems.map((item) => (
            <article
              key={item.label}
              className={`rounded-[1.25rem] border border-orange-100 bg-gradient-to-br ${item.accent} px-3 py-2.5 shadow-sm sm:rounded-3xl sm:p-4`}
            >
              <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-stone-500 sm:text-xs sm:tracking-[0.2em]">
                {item.label}
              </p>
              <p className="mt-1 break-words text-sm font-bold leading-snug text-stone-900 sm:mt-3 sm:text-lg">
                {item.value}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TripSummary
