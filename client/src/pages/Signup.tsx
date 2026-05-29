import { useForm } from 'react-hook-form'
import { SignupSchema, type SignupForm } from '../schemas/authPage.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import zxcvbn from "zxcvbn";
import PasswordStrengthUI from '../components/PasswordStrengthUI';
import toast from 'react-hot-toast';


const Signup = () => {
  // if set mode as "onBlur", form watch it when users stop focussing
  const { register, handleSubmit, formState: { errors }, watch } = useForm<SignupForm>({ mode: "onChange", resolver: zodResolver(SignupSchema) })
  const password = watch("password") ?? ""
  const score = zxcvbn(password).score


  // signup logic
  const handleSignup = async (data: SignupForm) => {
    if (score <= 2) {
      toast.error("パスワードが弱すぎます。レベルをgood以上にしてください")
      return
    }
    const payload = {
      displayName: data.displayName,
      email: data.email,
      password: data.password,
      language: "en"  // <Later> get and set app's setup language 
    }
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL_DEV

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
          toast.success(`${result.displayName} / サインアップに成功しました:JP`)
          return
        }
        case 409: {
          toast.error("既にユーザが存在しています。ログイン画面よりログインしてください。JP")
          return
        }
        case 500: {
          toast.error("通信接続に失敗しました。ネットワーク状況をお確かめください")
          return
        }
        default: {
          toast.error("サインアップに失敗しました:JP")
          return
        }
      }

    } catch (error) {
      console.error(error)
      toast.error('通信接続に失敗しました:JP')
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
              アカウント作成
            </h2>
          </div>
          <label
            htmlFor="displayName"
            className="mt-8 text-sm font-bold text-slate-700"
          >
            名前
          </label>
          <input
            id="displayName"
            type="text"
            placeholder="名前"
            {...register("displayName")}
            className="mt-2 h-13 rounded-2xl border border-orange-200 bg-orange-50 px-4 text-base text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-100"
          />
          <p className="mt-2 min-h-6 text-sm text-rose-500">
            {errors.displayName?.message}
          </p>

          <label
            htmlFor="email"
            className="mt-2 text-sm font-bold text-slate-700"
          >
            メールアドレス
          </label>
          <input
            id="email"
            type="email"
            placeholder="メールアドレス"
            {...register("email")}
            className="mt-2 h-13 rounded-2xl border border-orange-200 bg-orange-50 px-4 text-base text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-200/70"
          />
          <p className="mt-2 min-h-6 text-sm text-rose-500">
            {errors.email?.message}
          </p>

          <label
            htmlFor="password"
            className="mt-2 text-sm font-bold text-slate-700"
          >
            パスワード
          </label>
          <input
            id="password"
            type="password"
            {...register("password")}
            className="mt-2 h-13 rounded-2xl border border-orange-200 bg-orange-50 px-4 text-base text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-orange-400 focus:bg-white focus:ring-4 focus:ring-orange-100"
          />
          <p className="mt-2 min-h-6 text-sm text-rose-500">
            {errors.password?.message}
          </p>

          {password.length > 0 && (
            <div className="mt-1 rounded-2xl border border-orange-100 bg-orange-50 px-4 py-4">
              <PasswordStrengthUI score={score} />
            </div>
          )}

          <button
            type="submit"
            className="mt-7 h-13 rounded-2xl bg-orange-500 px-6 text-base font-black text-white shadow-[0_20px_40px_rgba(249,115,22,0.34)] transition hover:-translate-y-0.5 hover:bg-orange-600 focus-visible:ring-4 focus-visible:ring-orange-300 active:translate-y-0"
          >
            サインアップ
          </button>
        </form>
      </div>
    </section>
  )
}

export default Signup
