import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { LoginSchema, type LoginForm } from '../schemas/authPage.schema'

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>({ mode: "onChange", resolver: zodResolver(LoginSchema) })

  const handleLogin = (data: LoginForm) => {
    const payload = {
      email: data.email,
      password: data.password
    }
    console.log(payload)
  }

  return (
    <section className="relative mx-auto w-full max-w-2xl px-1 py-2 sm:mt-10">
      <div className="relative overflow-hidden rounded-4xl border border-slate-100 bg-slate-50 shadow-[0_30px_80px_rgba(234,88,12,0.16)] mt-6">
        <form
          onSubmit={handleSubmit(handleLogin)}
          className="relative z-10 flex flex-col p-5 sm:p-8"
        >
          <div>
            <h2 className="mt-3 text-2xl font-black text-slate-900 sm:text-3xl">
              ログイン
            </h2>
          </div>
          <label
            htmlFor="email"
            className="mt-8 text-sm font-bold text-slate-700"
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
          <button
            type="submit"
            className="mt-7 h-13 rounded-2xl bg-orange-500 px-6 text-base font-black text-white shadow-[0_20px_40px_rgba(249,115,22,0.34)] transition hover:-translate-y-0.5 hover:bg-orange-600 focus-visible:ring-4 focus-visible:ring-orange-300 active:translate-y-0"
          >
            ログイン
          </button>
        </form>
      </div>
    </section>
  )
}

export default Login