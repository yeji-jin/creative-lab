const CardApplication = () => {
  return (
    <section className="mt-8 w-full px-4 md:mt-3 md:px-0">
      <div className="flex flex-col gap-4 md:gap-6">
        <img
          src="https://d35ai18pny966l.cloudfront.net/course/kdt/kdt-backendj-21th/section12_img6.png"
          alt="내일배움카드"
          className="h-[60px] w-[55px] md:h-[100px] md:w-[90px]"
        />
        <div className="flex flex-col gap-1">
          <span className="text-sm font-semibold text-primary-normal md:text-lg">
            국비지원 받고 멋사 교육 듣는 방법은?
          </span>
          <p className="text-xl font-semibold md:text-3xl md:font-bold">
            고용24에서 내일배움카드 대상자 확인하기
          </p>
        </div>
      </div>
      <section className="mt-[60px] flex flex-col gap-12 md:mt-20">
        내배카 컨텐츠 내용
      </section>
      <footer className="my-10 md:my-[100px]">
        <div className="flex cursor-pointer items-center justify-between gap-3 rounded-xl bg-[#0046FF] px-5 py-4 shadow-[0_4px_12px_0_#D7E2FF]">
          <div className="flex flex-col gap-1">
            <span className="text-sm font-semibold text-white lg:text-xs">
              고용24에서 대상자 신청 완료했다면?
            </span>
            <p className="text-lg font-semibold text-white">
              신한 앱카드로 하루만에 발급받고, 훈련 수강하러 가기
            </p>
          </div>
        </div>
      </footer>
    </section>
  );
};
export default CardApplication;
