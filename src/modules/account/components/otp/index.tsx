"use client"

import React, { FormEvent, useEffect, useState } from "react"
import Input from "@/shared/Input/Input"
import ButtonPrimary from "@/shared/Button/ButtonPrimary"
import { LOGIN_VIEW, Step } from "@/modules/account/templates/login-template"
import { useTranslation } from "react-i18next"
import { SubmitHandler, useForm } from "react-hook-form"

type Props = {
  setCurrentView: (view: LOGIN_VIEW) => void
  setToken: (token: string) => void
  previousView: LOGIN_VIEW
  phone: string
}

interface IFormInput {
  otp: String
}

const PageLogin = ({
  setCurrentView,
  setToken,
  phone,
  previousView,
}: Props) => {
  const { t } = useTranslation()
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<IFormInput>({
    defaultValues: {
      otp: "",
    },
  })
  const [minutes, setMinutes] = useState(0)
  const [seconds, setSeconds] = useState(10)

  const step: Step =
    previousView === LOGIN_VIEW.PASSWORD ? "isResetPassword" : "isSignUp"

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1)
      }

      if (seconds === 0) {
        if (minutes === 0) {
          fetch(
            `${process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL}/store/auth/otp/invalidate`,
            {
              method: "POST",
              body: JSON.stringify({
                phone,
              }),
              headers: {
                "content-type": "application/json; charset=utf-8",
              },
            }
          )
          clearInterval(interval)
        } else {
          setSeconds(59)
          setMinutes(minutes - 1)
        }
      }
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [seconds])

  const resendOTP = () => {
    fetch(`${process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL}/store/auth/otp/send`, {
      method: "POST",
      body: JSON.stringify({
        phone,
      }),
      headers: {
        "content-type": "application/json; charset=utf-8",
      },
    })
    setMinutes(1)
    setSeconds(30)
  }

  const message =
    step === "isSignUp"
      ? t("new-customer-welcome", { phone })
      : t("forgot-password-helper")

  const onSubmit: SubmitHandler<IFormInput> = async ({ otp }) => {
    const rawFormData = {
      phone,
      token: otp,
      step,
    }
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL}/store/auth/otp/verify`,
        {
          method: "POST",
          body: JSON.stringify(rawFormData),
          headers: {
            "content-type": "application/json; charset=utf-8",
          },
        }
      )

      if (response.status === 200) {
        // customer exist go to reset password
        const { token } = await response.json()
        setToken(token)
        setCurrentView(LOGIN_VIEW.RESET_PASSWORD)
      } else if (response.status === 401) {
        const { message } = await response.json()

        setError("otp", {
          type: "manual",
          message,
        })
      } else if (response.status === 404) {
        // new customer go to register
        setCurrentView(LOGIN_VIEW.REGISTER)
      }
    } catch (e) {
      console.error(e)
    }
    // ...
  }

  return (
    <div
      className={`nc-PageLogin max-w-sm w-full mb-24 lg:mb-32 flex flex-col items-center`}
      data-nc-id="PageLogin"
    >
      <h2 className="my-20 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
        {t("text-login")}
      </h2>
      <div className="w-full mx-auto space-y-6">
        <span className="block text-sm mt-4 text-neutral-700 sm:text-base dark:text-neutral-200">
          {message}
        </span>
        {/* FORM */}
        <form
          className="grid grid-cols-1 gap-6"
          onSubmit={handleSubmit(onSubmit)}
        >
          <label className="block">
            <span className="text-neutral-800 dark:text-neutral-200">
              {t("text-otp-code")}
            </span>
            <Input
              type="number"
              // placeholder="example@example.com"
              className="mt-1"
              {...register("otp", {
                required: "enter a valid otp",
                pattern: {
                  value: /\d{6}/gm,
                  message: "enter a valid otp",
                },
              })}
            />
          </label>
          {errors.otp?.message && (
            <p className="mt-2 text-xs text-red-500 ltr:text-left rtl:text-right">
              {t(errors.otp.message)}
            </p>
          )}
          <ButtonPrimary type="submit">{t("text-verify-code")}</ButtonPrimary>
        </form>

        <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
          {seconds > 0 || minutes > 0 ? (
            <p>
              Time Remaining: {minutes < 10 ? `0${minutes}` : minutes}:
              {seconds < 10 ? `0${seconds}` : seconds}
            </p>
          ) : (
            <span>
              <span>Didt recieve code? </span>
              <button
                className="text-blue-600"
                disabled={seconds > 0 || minutes > 0}
                onClick={resendOTP}
              >
                Resend OTP
              </button>
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

export default PageLogin
