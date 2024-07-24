import React, { FormEvent } from "react"
import Input from "@/shared/Input/Input"
import ButtonPrimary from "@/shared/Button/ButtonPrimary"
import { LOGIN_VIEW, Step } from "@/modules/account/templates/login-template"
import { useTranslation } from "react-i18next"
import { SubmitHandler, useForm } from "react-hook-form"
import Image from "next/image"
import logo from '@/images/logo.svg'
type Props = {
  setCurrentView: (view: LOGIN_VIEW) => void
  setPhone: (phone: string) => void
  setEmail: (email: string) => void
  previousView: LOGIN_VIEW
}

interface IFormInput {
  phone: String
}

const PageLogin = ({ setCurrentView, setPhone, setEmail }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    defaultValues: {
      phone: "",
    },
  })

  const { t } = useTranslation("common")
  const step: Step = "isSignUp"

  const onSubmit: SubmitHandler<IFormInput> = async ({ phone }) => {
    "use client"

    const rawFormData = {
      phone,
      step,
    }
    setPhone(phone as string)

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL}/store/auth/phone/${rawFormData.phone}`,
        {
          method: "GET",
        }
      )
      const { exists, email } = await response.json()
      if (exists) {
        // means customer exist go to password input view
        setCurrentView(LOGIN_VIEW.PASSWORD)
        setPhone(rawFormData.phone as string)
        setEmail(email)
      } else {
        // means new customer go to otp input view
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
      }
    } catch (e) {
      console.error(e)
    }
    // ...
  }
  return (
    <div className="nc-PageLogin mb-8 lg:mb-10 flex flex-col items-center">
      <div className="mb-10 sm:mx-auto sm:w-full sm:max-w-md">
        <Image
          className="mx-auto h-10 w-auto"
          src={logo}
          width={200}
          height={200}
          alt="Your Company"
        />
        {/* <h2 className="mt-6 text-center text-2xl leading-9 tracking-tight text-gray-900">
          Sign in to your account
        </h2> */}
      </div>
      <div className="w-full mx-auto space-y-6">
        {/* FORM */}
        <form
          className="grid grid-cols-1 gap-6"
          onSubmit={handleSubmit(onSubmit)}
        >
          <label className="block">
            <span className="text-neutral-800 dark:text-neutral-200">
              {t("text-phone")}
            </span>
            <Input
              type="number"
              placeholder="09123456789"
              className="text-left mt-1"
              {...register("phone", {
                required: "enter your phone number",
                pattern: {
                  value: /((0?9)|(\+?989))\d{9}/g,
                  message: "enter the valid phone number",
                },
              })}
            />
          </label>
          {errors.phone?.message && (
            <p className="mt-2 text-xs text-red-500 ltr:text-left rtl:text-right">
              {t(errors.phone.message)}
            </p>
          )}
          <ButtonPrimary type="submit">{t("text-continue")}</ButtonPrimary>
        </form>
      </div>
    </div>
  )
}

export default PageLogin
