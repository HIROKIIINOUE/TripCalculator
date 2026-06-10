import { GridLoader } from 'react-spinners'
import { useTranslation } from "react-i18next"

const Loading = () => {
  const { t } = useTranslation()
  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center bg-orange-50/95 px-6 backdrop-blur-sm">
      <div className="w-full max-w-sm rounded-3xl bg-white p-8 text-center shadow-lg shadow-orange-100">
        <p className="text-xs font-semibold uppercase tracking-[4px] text-orange-500">
          Trip Calculator
        </p>
        <div className="my-8 flex justify-center">
          <GridLoader color="#f97316" margin={6} size={16} speedMultiplier={0.9} />
        </div>
        <h1 className="text-xl font-semibold text-slate-800">{t("messages.loading")}</h1>
      </div>
    </div>
  )
}

export default Loading
