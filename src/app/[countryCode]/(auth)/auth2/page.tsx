import { Metadata } from "next"

import LoginTemplate from "@/modules/account/templates/login-template"
import initTranslations from "@/app/i18n"
import TranslationsProvider from "@/modules/translationProvider/TranslationsProvider"
import Image from "next/image"
import logo from '@/images/logo.svg'

export const metadata: Metadata = {
  title: "Sign in",
  description: "Sign in to your Medusa Store account.",
}

const i18nNamespaces = ["common"]

export default async function Login({
  params: { countryCode },
}: {
  params: { countryCode: string }
}) {
  const { t, resources } = await initTranslations(countryCode, i18nNamespaces)

  return (
    <TranslationsProvider
      locale={countryCode}
      namespaces={i18nNamespaces}
      resources={resources}
    >
      <main className="min-h-full w-full flex items-center flex-col bg-neutral-000 justify-center">
        <div className="styles_PageLoader--hasPageContainer__gPBo1 hidden"></div>
        <div className="lg:border-complete-200 rounded-medium p-5 lg:p-8 flex flex-col items-center justify-start lg:justify-center account-wrapper_AccountWrapper__mainBox__cC78z">
          <div className="w-full relative flex items-center justify-center">
            <div className="flex cursor-pointer right-0 text-neutral-700 transition-all duration-300 ease-out opacity-0 pointer-events-none fixed lg:absolute  logo_Logo__icon__bHD2_">
              <svg
                style={{
                  width: "24px",
                  height: "24px",
                  fill: "var(--color-icon-high-emphasis)",
                }}
              >
                <use xlinkHref="#arrowRight"></use>
              </svg>
            </div>
            <a className="" href="/">
              <div
                className="transform transition-all duration-500 ease-out"
                style={{ width: "150px", height: "40px", lineHeight: 0 }}
              >
                <Image
                  className="w-full inline-block"
                  src={logo}
                  width="150"
                  height="40"
                  alt="لوگوی دیجیکالا"
                  style={{ objectFit: "contain" }}
                />
              </div>
            </a>
          </div>
          <div className="w-full">
            <h1 className="text-h4 text-neutral-900 text-right w-full mt-4">
              ورود | ثبت‌نام
            </h1>
            <p className="text-body-2 text-neutral-700 mt-4 text-right w-full">
              سلام!
            </p>
            <p className="text-body-2 text-neutral-700 mb-4 text-right w-full">
              لطفا شماره موبایل یا ایمیل خود را وارد کنید
            </p>
            <form>
              <label className="FormComponentFrame_FormComponentFrame__PIUpy w-full FormComponentFrame_FormComponentFrame--normal__TQSOm">
                <div className="FormComponentFrame_FormComponentFrame__input-container__BHc4I px-2 flex items-center Input_InputWrapper--error__GDWAB relative text-neutral-800 bg-neutral-100 lg:bg-neutral-000 Input_InputWrapper__d_4kf">
                  <div className="grow text-body-3">
                    <input
                      className="px-2 TextField_TextField__input__hFMFl text-subtitle TextField_TextField__bwN9_ TextField_TextField--secondary__w_vGF text-subtitle w-full py-5 lg:py-2 rounded-medium"
                      type="text"
                      name="username"
                      autoComplete="off"
                      value=""
                    />
                  </div>
                </div>
                <p className="text-body-2 text-hint-text-error">
                  لطفا این قسمت را خالی نگذارید
                </p>
              </label>
              <button
                className="relative flex items-center user-select-none styles_btn__Q4MvL text-button-1 styles_btn--large__1Muai styles_btn--primary__y0GEv rounded-medium w-full mt-6 lg:mt-8 text-button-1"
                type="submit"
                data-cro-id="login-register"
              >
                <div className="flex items-center justify-center styles_btn__loading__d5Rcc">
                  <svg
                    width="24"
                    height="24"
                    id="e302pyQgejw1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    shape-rendering="geometricPrecision"
                    text-rendering="geometricPrecision"
                  >
                    <path
                      className="styles_Loading__circle1__K7HNJ"
                      d="M0,3C0,1.343146,1.343146,0,3,0C4.656854,0,6,1.343146,6,3C6,4.656854,4.656854,6,3,6C1.343146,6,0,4.656854,0,3Z"
                      transform="matrix(1 0 0 1 17 9)"
                      opacity="0.9"
                      fill="var(--color-icon-low-emphasis)"
                      stroke="none"
                      stroke-width="1"
                    ></path>
                    <rect
                      className="styles_Loading__circle2__jpl_q"
                      width="6"
                      height="6"
                      rx="3"
                      ry="3"
                      transform="matrix(1 0 0 1 9 9)"
                      opacity="0.6"
                      fill="var(--color-icon-low-emphasis)"
                      stroke="none"
                      stroke-width="1"
                    ></rect>
                    <rect
                      className="styles_Loading__circle3__otcH4"
                      width="6"
                      height="6"
                      rx="3"
                      ry="3"
                      transform="matrix(1 0 0 1 0.94007500000000 9)"
                      opacity="0.3"
                      fill="var(--color-icon-low-emphasis)"
                      stroke="none"
                      stroke-width="1"
                    ></rect>
                  </svg>
                </div>
                <div className="flex items-center justify-center relative grow">
                  ورود
                </div>
              </button>
            </form>
            <p className="text-caption text-neutral-700 mt-4">
              ورود شما به معنای پذیرش
              <a
                className="mx-1 inline-block text-secondary-700"
                href="/page/terms/"
              >
                شرایط دیجی‌کالا
              </a>
              و
              <a
                className="mx-1 inline-block text-secondary-700"
                href="/page/privacy/"
              >
                قوانین حریم‌خصوصی
              </a>
              است
            </p>
          </div>
        </div>
      </main>
    </TranslationsProvider>
  )
}
