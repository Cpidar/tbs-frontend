import { Product } from "@medusajs/medusa"
import { Metadata } from "next"

import { getCollectionsList, getProductsList, getRegion } from "@lib/data"
import FeaturedProducts from "@modules/home/components/featured-products"
import Hero from "@modules/home/components/hero"
import { ProductCollectionWithPreviews } from "types/global"
import { cache } from "react"
import React from "react"
import SectionHowItWork from "@/components/SectionHowItWork/SectionHowItWork"
import BackgroundSection from "@/components/BackgroundSection/BackgroundSection"
import SectionPromo1 from "@/components/SectionPromo1"
import SectionHero2 from "@/components/SectionHero/SectionHero2"
import SectionHero from "@/components/SectionHero/SectionHero"
import SectionHero3 from "@/components/SectionHero/SectionHero3"
import SectionSliderLargeProduct from "@/components/SectionSliderLargeProduct"
import SectionSliderProductCard from "@/components/SectionSliderProductCard"
import DiscoverMoreSlider from "@/components/DiscoverMoreSlider"
import SectionGridMoreExplore from "@/components/SectionGridMoreExplore/SectionGridMoreExplore"
import SectionPromo2 from "@/components/SectionPromo2"
import SectionSliderCategories from "@/components/SectionSliderCategories/SectionSliderCategories"
import SectionSliderCategories2 from "@/components/SectionSliderCategories/SectionSliderCategories2"
import SectionPromo3 from "@/components/SectionPromo3"
import SectionClientSay from "@/components/SectionClientSay/SectionClientSay"
import Heading from "@/components/Heading/Heading"
import ButtonSecondary from "@/shared/Button/ButtonSecondary"
import { PRODUCTS, SPORT_PRODUCTS } from "@/data/data"
import SectionGridFeatureItems from "@/components/SectionGridFeatureItems"
import SectionMagazine5 from "@/app/blog/SectionMagazine5"
import { transformMedusaProduct } from "@/utils/data-mappers"
import ProductCard from "@/components/ProductCard/ProductCard"
import SectionHero4 from "@/components/SectionHero/SectionHero4"
import initTranslations from "@/app/i18n"
import TranslationsProvider from "@/modules/translationProvider/TranslationsProvider"

export const metadata: Metadata = {
  title: "Medusa Next.js Starter Template",
  description:
    "A performant frontend ecommerce starter template with Next.js 14 and Medusa.",
}

const i18nNamespaces = ["common"]

const getCollectionsWithProducts = cache(
  async (
    countryCode: string
  ): Promise<ProductCollectionWithPreviews[] | null> => {
    const { collections } = await getCollectionsList(0, 3)

    if (!collections) {
      return null
    }

    const collectionIds = collections.map((collection) => collection.id)

    await Promise.all(
      collectionIds.map((id) =>
        getProductsList({
          queryParams: { collection_id: [id] },
          countryCode,
        })
      )
    ).then((responses) =>
      responses.forEach(({ response, queryParams }) => {
        let collection

        if (collections) {
          collection = collections.find(
            (collection) => collection.id === queryParams?.collection_id?.[0]
          )
        }

        if (!collection) {
          return
        }

        collection.products = response.products as unknown as Product[]
      })
    )

    return collections as unknown as ProductCollectionWithPreviews[]
  }
)

export default async function Home({
  params: { countryCode },
}: {
  params: { countryCode: string }
}) {
  const collections = await getCollectionsWithProducts(countryCode)
  const region = await getRegion(countryCode)
  const { t, resources } = await initTranslations(countryCode, i18nNamespaces)

  if (!collections || !region) {
    return null
  }

  return (
    <TranslationsProvider
      locale={countryCode}
      namespaces={i18nNamespaces}
      resources={resources}
    >
      <div className="nc-PageHome2 relative overflow-hidden">
        {/* <div className="container px-4"> */}
          <SectionHero4 />
        {/* </div> */}

        <div className="container relative space-y-24 my-24 lg:space-y-32 lg:my-32">
          <SectionSliderCategories />

          <SectionSliderProductCard>
            {collections[0] &&
              collections[0]?.products.map((item, index) => (
                <li key={index} className="glide__slide">
                  <ProductCard productPreview={item} region={region} />
                </li>
              ))}
          </SectionSliderProductCard>

          <SectionPromo1 />
          {/* 
        <div className="relative py-24 lg:py-32">
          <BackgroundSection />
          <SectionGridMoreExplore />
        </div> */}

          <SectionSliderProductCard
            heading="پر فروشترین کالاها"
            subHeading=""
          >
            {collections[1].products.map((item, index) => (
              <li key={index} className="glide__slide">
                <ProductCard productPreview={item} region={region} />
              </li>
            ))}
          </SectionSliderProductCard>

          <SectionSliderProductCard
            heading="پبشترین فروش"
            subHeading="در ماه"
          >
            {collections[1].products.map((item, index) => (
              <li key={index} className="glide__slide">
                <ProductCard productPreview={item} region={region} />
              </li>
            ))}
          </SectionSliderProductCard>

          {/* <SectionPromo2 /> */}

          {/* <SectionSliderLargeProduct cardStyle="style1" /> */}

          {/* <SectionGridFeatureItems /> */}

          <div className="relative py-24 lg:py-32">
            <BackgroundSection />
            <div>
              <Heading rightDescText="From the Ciseco blog">
                The latest news
              </Heading>
              <SectionMagazine5 />
              <div className="flex mt-16 justify-center">
                <ButtonSecondary>Show all blog articles</ButtonSecondary>
              </div>
            </div>
          </div>
          {/* <SectionClientSay /> */}

          <div className="py-24 lg:py-32 border-t border-b border-slate-200 dark:border-slate-700">
            <SectionHowItWork />
          </div>
          <SectionPromo3 />
        </div>
      </div>
    </TranslationsProvider>
  )
}
