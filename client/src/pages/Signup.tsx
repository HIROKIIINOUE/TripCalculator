import { useForm } from 'react-hook-form'
import { SignupSchema, type SignupForm } from '../schemas/authPage.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import zxcvbn from "zxcvbn";
import PasswordStrengthUI from '../components/PasswordStrengthUI';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';


const Signup = () => {
  const navigate = useNavigate()
  // if set mode as "onBlur", form watch it when users stop focussing
  const { register, handleSubmit, formState: { errors, isValid, isSubmitting }, watch } = useForm<SignupForm>({ mode: "onChange", resolver: zodResolver(SignupSchema) })
  const password = watch("password") ?? ""
  const score = zxcvbn(password).score
  const { t } = useTranslation("auth")
  const translateError = (message?: string) =>
    message ? t(message.replace(/^auth\./, "")) : ""


  // signup logic
  const handleSignup = async (data: SignupForm) => {
    if (score <= 2) {
      toast.error(t("signup.weakPassword"))
      return
    }
    const payload = {
      displayName: data.displayName,
      email: data.email,
      password: data.password,
      language: "en"  // <Later> get and set app's setup language 
    }
    const BACKEND_URL = import.meta.env.VITE_API_BASE_URL

    try {
      const res = await fetch(`${BACKEND_URL}/users/signup`, {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify(payload)
      })
      switch (res.status) {
        case 201: {
          const result = await res.json()
          toast.success(t("signup.success", { displayName: result.displayName }))
          navigate("/login")
          return
        }
        case 409: {
          toast.error(t("signup.alreadyExists"))
          return
        }
        case 500: {
          toast.error(t("signup.networkError"))
          return
        }
        default: {
          toast.error(t("signup.failed"))
          return
        }
      }

    } catch (error) {
      console.error(error)
      toast.error(t("signup.networkError"))
    }
  }

  return (
    <section className="relative mx-auto w-full max-w-2xl px-1 py-2 sm:mt-10">
      <div className="relative overflow-hidden rounded-4xl border border-slate-100 bg-slate-50 shadow-[0_30px_80px_rgba(234,88,12,0.16)] mt-6">
        <form
          onSubmit={handleSubmit(handleSignup)}
          className="relative z-10 flex flex-col p-5 sm:p-8"
        >
          <div>
            <h2 className="mt-3 text-2xl font-black text-slate-900 sm:text-3xl">
              {t("signup.title")}
            </h2>
          </div>
          <label
            htmlFor="displayName"
            className="mt-8 text-sm font-bold text-slate-700"
          >
            {t("signup.displayNameLabel")}
          </label>
          <input
            id="displayName"
            type="text"
            placeholder={t("signup.displayNamePlaceholder")}
            {...register("displayName")}
            className="mt-2 h-13 rounded-2xl border border-orange-200 bg-orange-50 px-4 text-base text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-100"
          />
          <p className="mt-2 min-h-6 text-sm text-rose-500">
            {translateError(errors.displayName?.message)}
          </p>

          <label
            htmlFor="email"
            className="mt-2 text-sm font-bold text-slate-700"
          >
            {t("signup.emailLabel")}
          </label>
          <input
            id="email"
            type="email"
            placeholder={t("signup.emailPlaceholder")}
            {...register("email")}
            className="mt-2 h-13 rounded-2xl border border-orange-200 bg-orange-50 px-4 text-base text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-200/70"
          />
          <p className="mt-2 min-h-6 text-sm text-rose-500">
            {translateError(errors.email?.message)}
          </p>

          <label
            htmlFor="password"
            className="mt-2 text-sm font-bold text-slate-700"
          >
            {t("signup.passwordLabel")}
          </label>
          <input
            id="password"
            type="password"
            {...register("password")}
            className="mt-2 h-13 rounded-2xl border border-orange-200 bg-orange-50 px-4 text-base text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-100"
          />
          <p className="mt-2 min-h-6 text-sm text-rose-500">
            {translateError(errors.password?.message)}
          </p>

          {password.length > 0 && (
            <div className="mt-1 rounded-2xl border border-orange-100 bg-orange-50 px-4 py-4">
              <PasswordStrengthUI score={score} />
            </div>
          )}

          <button
            type="submit"
            disabled={!isValid || isSubmitting || score <= 2}
            className="mt-7 h-13 rounded-2xl bg-orange-500 px-6 text-base font-black text-white shadow-[0_20px_40px_rgba(249,115,22,0.34)] transition hover:-translate-y-0.5 hover:bg-orange-600 active:translate-y-0 cursor-pointer disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-black disabled:shadow-none"
          >
            {t("signup.submit")}
          </button>
        </form>
      </div>
    </section>
  )
}

export default Signup
