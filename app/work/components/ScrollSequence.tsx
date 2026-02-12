"use client";

import { useEffect, useRef, useState } from "react";

interface ScrollSequenceProps {
  frameCount?: number;
}

export default function ScrollSequence({
  frameCount = 147,
}: ScrollSequenceProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const frameIndexRef = useRef(0);

  const currentFrame = (index: number): string => {
    return `https://www.apple.com/105/media/us/airpods-pro/2019/1299e2f5_9206_4470_b28e_08307a42f19b/anim/sequence/large/01-hero-lightpass/${(
      index + 1
    )
      .toString()
      .padStart(4, "0")}.jpg`;
  };

  const setCanvasSize = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // ✨ 크기 변경 후 즉시 현재 프레임 다시 그리기
    if (imagesLoaded) {
      render(frameIndexRef.current);
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    setCanvasSize();
    window.addEventListener("resize", setCanvasSize);
    return () => window.removeEventListener("resize", setCanvasSize);
  }, [imagesLoaded]);

  // 이미지 프리로드
  useEffect(() => {
    const images: HTMLImageElement[] = [];
    let loadedCount = 0;

    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      img.src = currentFrame(i);
      img.onload = () => {
        loadedCount++;
        console.log(`Loaded: ${loadedCount}/${frameCount}`);
        if (loadedCount === frameCount) {
          setImagesLoaded(true);
        }
      };
      images.push(img);
    }

    imagesRef.current = images;
  }, [frameCount]);

  const render = (frameIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = imagesRef.current[frameIndex];
    if (!img || !img.complete) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 이미지가 캔버스 안에 전부 들어오도록 (비율 유지) -> object-fit: contain
    const scale = Math.min(
      canvas.width / img.width, // 가로 비율
      canvas.height / img.height, // 세로 비율
    );
    // → 더 작은 값 선택 = 이미지가 잘리지 않음

    const x = (canvas.width - img.width * scale) / 2; // 중앙 정렬
    const y = (canvas.height - img.height * scale) / 2;

    ctx.drawImage(
      img,
      0,
      0,
      img.width,
      img.height,
      x,
      y,
      img.width * scale,
      img.height * scale,
    );
  };

  useEffect(() => {
    if (!imagesLoaded) return;

    const handleScroll = () => {
      const scrollTop = document.documentElement.scrollTop;
      const maxScrollTop =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrollFraction = scrollTop / maxScrollTop;
      const frameIndex = Math.min(
        frameCount - 1,
        Math.ceil(scrollFraction * frameCount),
      );

      if (frameIndexRef.current !== frameIndex) {
        frameIndexRef.current = frameIndex;
        requestAnimationFrame(() => render(frameIndex));
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // 초기 렌더링

    return () => window.removeEventListener("scroll", handleScroll);
  }, [imagesLoaded, frameCount]);

  // 첫 프레임 렌더링
  useEffect(() => {
    if (imagesLoaded) {
      render(0);
    }
  }, [imagesLoaded]);

  return (
    <>
      {/* 스크롤 공간 */}
      <div className="h-[500vh]" />

      {/* Canvas - 고정 */}
      {/* fullsize */}
      {/* <canvas ref={canvasRef} className="fixed inset-0 h-screen w-screen" /> */}
      <canvas
        ref={canvasRef}
        className="fixed bottom-16 left-0 right-0 top-16"
      />

      {/* 로딩 상태 */}
      {!imagesLoaded && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
          <div className="text-center">
            <div className="mx-auto mb-4 h-16 w-16 animate-spin rounded-full border-4 border-white border-t-transparent"></div>
            <p className="font-medium text-white">Loading AirPods...</p>
          </div>
        </div>
      )}
    </>
  );
}
