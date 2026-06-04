import { type Dispatch, type SetStateAction } from "react"
import { useTranslation } from "react-i18next"

type Props = {
  setIsLanguageOption: Dispatch<SetStateAction<boolean>>
}

const LanguageOptions = (props: Props) => {
  const { setIsLanguageOption } = props
  const { i18n } = useTranslation()
  const currentLanguage = i18n.resolvedLanguage;

  const handleChangeLanguage = async (language: string) => {
    await i18n.changeLanguage(language)
    setIsLanguageOption(false)
  }

  return (
    <>
      <div
        onClick={() => setIsLanguageOption(false)}
        className="fixed inset-0 z-50 bg-slate-600 opacity-95"
      ></div>
      <section className="fixed inset-x-4 top-24 z-[60] mx-auto max-w-sm sm:inset-x-0 sm:top-28">
        <div className="relative overflow-hidden rounded-[2rem] border border-white bg-slate-50 p-5 shadow-[0_28px_60px_rgba(15,23,42,0.22)]">
          <h2 className="mt-3 text-xl font-black text-slate-900">
            Language Options
          </h2>
          <ul className="relative mt-6 space-y-3">
            <li>
              <button
                type="button"
                onClick={() => handleChangeLanguage("en")}
                className="group flex w-full items-center justify-between rounded-2xl border border-orange-300 bg-orange-50 px-4 py-3 text-left shadow-[0_12px_24px_rgba(15,23,42,0.06)] transition hover:-translate-y-0.5 hover:border-orange-300 hover:bg-white cursor-pointer"
              >
                <span className="block text-sm font-bold text-slate-900">
                  English
                </span>
                {currentLanguage === "en" && (
                  <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-orange-700 transition group-hover:bg-orange-100">
                    Current
                  </span>
                )}

              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => handleChangeLanguage("ja")}
                className="group flex w-full items-center justify-between rounded-2xl border border-orange-300 bg-orange-50 px-4 py-3 text-left shadow-[0_12px_24px_rgba(15,23,42,0.06)] transition hover:-translate-y-0.5 hover:border-orange-300 hover:bg-white cursor-pointer"
              >
                <span className="block text-sm font-bold text-slate-900">
                  Japanese(日本語)
                </span>
                {currentLanguage === "ja" && (
                  <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-orange-700 transition group-hover:bg-orange-100">
                    選択中
                  </span>
                )}
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => handleChangeLanguage("fr")}
                className="group flex w-full items-center justify-between rounded-2xl border border-orange-300 bg-orange-50/70 px-4 py-3 text-left shadow-[0_12px_24px_rgba(15,23,42,0.06)] transition hover:-translate-y-0.5 hover:border-orange-300 hover:bg-white cursor-pointer"
              >
                <span className="block text-sm font-bold text-slate-900">
                  French(Français)
                </span>
                {currentLanguage === "fr" && (
                  <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-orange-700 transition group-hover:bg-orange-100">
                    Actuel
                  </span>

                )}
              </button>
            </li>
          </ul>

          <button
            type="button"
            onClick={() => setIsLanguageOption(false)}
            className="relative mt-5 w-full rounded-2xl border border-orange-200 bg-orange-100 px-4 py-3 text-sm font-bold text-orange-800 transition hover:bg-orange-200 cursor-pointer"
          >
            Close
          </button>
        </div>
      </section>
    </>
  )
}

export default LanguageOptions
