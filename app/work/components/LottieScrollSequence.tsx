"use client";

import { useEffect, useRef } from "react";
import Lottie from "lottie-react";
import animationData from "../../../public/lottie/Super_Mario.json";

const LottieScrollSequence = () => {
  const lottieRef = useRef<any>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!lottieRef.current) return;

      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;

      const scrollProgress = Math.min(scrollTop / docHeight, 1);

      const totalFrames = lottieRef.current.getDuration(true); // 총 프레임 수

      const frame = scrollProgress * totalFrames;

      lottieRef.current.goToAndStop(frame, true);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="h-[500vh]">
      <div className="sticky top-[20%]">
        <Lottie
          lottieRef={lottieRef}
          animationData={animationData}
          autoplay={false}
          loop={false}
          className="mx-auto size-[80%]"
        />
      </div>
    </div>
  );
};

export default LottieScrollSequence;
