import React, { FC } from "react";
import NcImage from "@/shared/NcImage/NcImage";
import HIW1img from "@/images/HIW1img.png";
import HIW2img from "@/images/HIW2img.png";
import HIW3img from "@/images/HIW3img.png";
import HIW4img from "@/images/HIW4img.png";
import VectorImg from "@/images/VectorHIW.svg";
import Badge from "@/shared/Badge/Badge";
import Image from "next/image";

export interface SectionHowItWorkProps {
  className?: string;
  data?: typeof DEMO_DATA[0][];
}

const DEMO_DATA = [
  {
    id: 1,
    img: HIW1img,
    imgDark: HIW1img,
    title: "جستجوی پیشرفته",
    desc: "با جستجوی پیشرفته و پیشنهادات محصول مدنظر خود را به آسانی پیدا کنید",
  },
  {
    id: 2,
    img: HIW2img,
    imgDark: HIW2img,
    title: "اضافه کردن به سبد خرید",
    desc: "به راحتی اقلام مدنظر را انتخاب کرده و به سبد خرید اضافه کنید",
  },
  {
    id: 3,
    img: HIW3img,
    imgDark: HIW3img,
    title: "ارسال سریع",
    desc: "کالای مدنظر شما در سریع ترین زمان و کمترین برای شما ارسال می شود",
  },
  {
    id: 4,
    img: HIW4img,
    imgDark: HIW4img,
    title: "امتیاز بدهید",
    desc: "نظر شما برای ما ارزشمند است! با امتیاز دادن به این کالا، به دیگران کمک کنید تا بهترین انتخاب را داشته باشند",
  },
];

const SectionHowItWork: FC<SectionHowItWorkProps> = ({
  className = "",
  data = DEMO_DATA,
}) => {
  return (
    <div className={`nc-SectionHowItWork ${className}`}>
      <div className="relative grid sm:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-16 xl:gap-20">
        <Image
          className="hidden md:block absolute inset-x-0 top-5"
          src={VectorImg}
          alt="vector"
        />
        {data.map((item: typeof DEMO_DATA[number], index: number) => (
          <div
            key={item.id}
            className="relative flex flex-col items-center max-w-xs mx-auto"
          >
            <NcImage
              containerClassName="mb-4 sm:mb-10 max-w-[140px] mx-auto"
              className="rounded-3xl"
              src={item.img}
              sizes="150px"
              alt="HIW"
            />
            <div className="text-center mt-auto space-y-5">
              <Badge
                name={`گام ${index + 1}`}
                color={
                  !index
                    ? "red"
                    : index === 1
                    ? "indigo"
                    : index === 2
                    ? "yellow"
                    : "purple"
                }
              />
              <h3 className="text-base font-semibold">{item.title}</h3>
              <span className="block text-slate-600 dark:text-slate-400 text-sm leading-6">
                {item.desc}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SectionHowItWork;
