"use client";
import CardApplication from "@/work/components/CardApplication";
import { useState } from "react";
import { Element, scroller } from "react-scroll";

const NebecaCard = () => {
  return (
    <div className="flex flex-col gap-4 md:gap-6">
      <img
        src="https://d35ai18pny966l.cloudfront.net/course/kdt/kdt-backendj-21th/section12_img6.png"
        alt="내일배움카드"
        className="h-[60px] w-[55px] md:h-[100px] md:w-[90px]"
      />
      <div className="flex flex-col gap-1">
        <span className="text-sm font-semibold text-primary-normal md:text-lg">
          카드 신청까지 완료 되었다면?
        </span>
        <p className="text-xl font-semibold md:text-3xl md:font-bold">
          멋쟁이사자처럼이 제공하는 IT 전문 교육 탐색하러 출발!
        </p>
      </div>
    </div>
  );
};

const Nebeca = () => {
  const [isCard, setIsCard] = useState<boolean>(true);

  const handleButtonClick = (cardState: boolean) => {
    setIsCard(cardState);
    scroller.scrollTo("cardApplicationSection", {
      smooth: true,
      duration: 500,
      offset: -100,
    });
  };

  return (
    <div className="mx-auto max-w-7xl px-20 py-10">
      <div className="mb-10 text-center text-4xl font-bold leading-snug">
        <span className="font-bold text-primary-normal">ABCD 과정</span>{" "}
        내일배움카드로
        <br />
        N만 원 지원받을 수 있어요 🔥
      </div>
      <div className="z-1 relative flex gap-4">
        <button
          onClick={() => handleButtonClick(true)}
          className={`flex-1 rounded-md bg-primary-normal px-4 py-10 text-2xl font-bold ${isCard ? "bg-primary-normal text-white" : "text-neutral border-4 border-dashed bg-white"}`}
        >
          카드를 가지고 있어요
        </button>
        <button
          onClick={() => handleButtonClick(false)}
          className={`flex-1 rounded-md bg-primary-normal px-4 py-10 text-2xl font-bold ${!isCard ? "bg-primary-normal text-white" : "text-neutral border-4 border-dashed bg-white"}`}
        >
          현재 카드가 없어요
        </button>
        <div></div>
      </div>
      <div className="mx-auto -mt-2 flex max-w-[50%] items-center justify-center">
        <img
          src={`https://d35ai18pny966l.cloudfront.net/course/kdt/kdt-python-2nd/${isCard ? "section4_trackA_pc" : "section4_trackB_pc"}.png`}
          alt="Nebeca"
        />
      </div>
      <Element name="cardApplicationSection">
        <div className="rounded-md border-4 border-dashed border-primary-normal bg-primary-secondary-hover px-10 py-10">
          <div className="rounded-md bg-white p-10">
            {isCard ? <NebecaCard /> : <CardApplication />}
          </div>
        </div>
      </Element>
    </div>
  );
};

export default Nebeca;
