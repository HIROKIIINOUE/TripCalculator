import { useForm } from 'react-hook-form'
import { SignupSchema, type SignupForm } from '../schemas/authPage.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import zxcvbn from "zxcvbn";
import PasswordStrengthUI from './PasswordStrengthUI';


const Signup = () => {
  // if set mode as "onBlur", form watch it when users stop focussing
  const { register, handleSubmit, formState: { errors }, watch } = useForm<SignupForm>({ mode: "onChange", resolver: zodResolver(SignupSchema) })
  const password = watch("password") ?? ""
  const score = zxcvbn(password).score


  const handleSignup = (data: SignupForm) => {
    const payload = {
      displayName: data.displayName,
      email: data.email,
      password: data.password,
      language: "en"  // <Later> get and set app's setup language 
    }
    console.log(payload)
  }

  return (
    <>
      <form onSubmit={handleSubmit(handleSignup)}>
        <label htmlFor="displayName">名前</label>
        <input id="displayName" type="text" placeholder="名前" {...register("displayName")} />
        <p>{errors.displayName?.message}</p>
        <label htmlFor="email">メールアドレス</label>
        <input id="email" type="email" placeholder="メールアドレス" {...register("email")} />
        <p>{errors.email?.message}</p>
        <label htmlFor="password">パスワード</label>
        <input id="password" type="password" {...register("password")} />
        <p>{errors.password?.message}</p>
        {password.length > 0 && <PasswordStrengthUI score={score} />}
        <button type="submit">送信</button>
      </form>
    </>
  )
}

export default Signup