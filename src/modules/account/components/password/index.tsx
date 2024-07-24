import React, { FormEvent } from "react"
import Input from "@/shared/Input/Input"
import ButtonPrimary from "@/shared/Button/ButtonPrimary"
import { LOGIN_VIEW } from "@/modules/account/templates/login-template"
import Link from "next/link"
import { logCustomerIn } from "@modules/account/actions"
import { useFormState } from "react-dom"

type Props = {
  setCurrentView: (view: LOGIN_VIEW) => void
  phone: string
  email: string
}

const PageLogin = ({ setCurrentView, email, phone }: Props) => {
  const forgetPassword = async () => {
    "use client"
    const rawFormData = {
      phone,
      email,
      step: "isResetPassword",
    }
    try {
      fetch('http://localhost:9000/store/customers/password-token', {
        method: 'POST',
        body: JSON.stringify({
          email
        }),
        headers: {
          "content-type": "application/json; charset=utf-8",
        },
      })
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL}/store/auth/otp/send`,
        {
          method: "POST",
          body: JSON.stringify(rawFormData),
          headers: {
            "content-type": "application/json; charset=utf-8",
          },
        }
      )

      if (response.status === 200) {
        // new customer
        setCurrentView(LOGIN_VIEW.OTP)
      } else {
        // show error
      }
    } catch (e) {
      console.error(e)
    }
  }
  const onSubmit = (_currentState: unknown, formData: FormData) => {
    "use client"

    if (!formData.get("email")) formData.append("email", email)
    console.log(formData)

    logCustomerIn(_currentState, formData)
  }
  const [message, formAction] = useFormState(onSubmit, null)
  return (
    <div className={`mb-24 lg:mb-32 flex flex-col items-center`} data-nc-id="PageLogin">
       <h2 className="my-20 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
          Login
        </h2>
        <div className="w-full mx-auto space-y-6">
          {/* FORM */}
          <form className="grid grid-cols-1 gap-6" action={formAction}>
            <label className="block">
              <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
                Password
              </span>
              <Input type="hidden" value={email} />
              <Input type="password" required minLength={4} className="mt-1" name="password" />
            </label>
            <ButtonPrimary type="submit">Continue</ButtonPrimary>
          </form>
          <button
            onClick={() => forgetPassword()}
            className="text-sm text-green-600"
          >
            Forgot password?
          </button>
        </div>
    </div>
  )
}

export default PageLogin
