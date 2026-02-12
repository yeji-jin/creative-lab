// "use client";

// import { useEffect, useRef, useState } from "react";

// interface ScrollSequenceProps {
//   frameCount?: number;
//   scrollHeight?: string;
// }

// export default function ScrollSequence({
//   frameCount = 60,
//   scrollHeight = "500vh",
// }: ScrollSequenceProps) {
//   const canvasRef = useRef<HTMLCanvasElement>(null);
//   const [currentFrame, setCurrentFrame] = useState(0);
//   const [scrollPercent, setScrollPercent] = useState(0);
//   const [imagesLoaded, setImagesLoaded] = useState(false);
//   const imagesRef = useRef<HTMLImageElement[]>([]);

//   // 프레임 생성 함수
//   const generateFrame = (index: number): string => {
//     const tempCanvas = document.createElement("canvas");
//     tempCanvas.width = 800;
//     tempCanvas.height = 800;
//     const ctx = tempCanvas.getContext("2d");
//     if (!ctx) return "";

//     // 배경
//     ctx.fillStyle = "#0a0a0a";
//     ctx.fillRect(0, 0, 800, 800);

//     // 회전 각도
//     const angle = (index / frameCount) * Math.PI * 2;
//     ctx.save();
//     ctx.translate(400, 400);
//     ctx.rotate(angle);

//     // 그라디언트 사각형
//     const gradient = ctx.createLinearGradient(-150, -150, 150, 150);
//     gradient.addColorStop(0, "#06b6d4"); // cyan-500
//     gradient.addColorStop(0.5, "#8b5cf6"); // violet-500
//     gradient.addColorStop(1, "#ec4899"); // pink-500

//     ctx.fillStyle = gradient;
//     ctx.shadowColor = "rgba(139, 92, 246, 0.5)";
//     ctx.shadowBlur = 30;
//     ctx.fillRect(-150, -150, 300, 300);

//     // 테두리
//     ctx.strokeStyle = "#ffffff";
//     ctx.lineWidth = 5;
//     ctx.strokeRect(-150, -150, 300, 300);

//     // 내부 작은 사각형
//     ctx.fillStyle = "rgba(255, 255, 255, 0.2)";
//     ctx.fillRect(-80, -80, 160, 160);

//     ctx.restore();

//     // 프레임 번호
//     ctx.fillStyle = "#fff";
//     ctx.font = "bold 28px Arial";
//     ctx.fillText(`Frame ${index + 1}`, 30, 50);

//     return tempCanvas.toDataURL();
//   };

//   // 이미지 로드
//   useEffect(() => {
//     const images: HTMLImageElement[] = [];
//     let loaded = 0;

//     for (let i = 0; i < frameCount; i++) {
//       const img = new Image();
//       img.src = generateFrame(i);
//       img.onload = () => {
//         loaded++;
//         if (loaded === frameCount) {
//           setImagesLoaded(true);
//         }
//       };
//       images.push(img);
//     }

//     imagesRef.current = images;
//   }, [frameCount]);

//   // Canvas 렌더링
//   const render = (frameIndex: number) => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;

//     const ctx = canvas.getContext("2d");
//     if (!ctx) return;

//     const img = imagesRef.current[frameIndex];
//     if (!img) return;

//     ctx.clearRect(0, 0, canvas.width, canvas.height);

//     // 중앙 정렬
//     const scale = Math.min(canvas.width / 800, canvas.height / 800);
//     const x = (canvas.width - 800 * scale) / 2;
//     const y = (canvas.height - 800 * scale) / 2;

//     ctx.drawImage(img, x, y, 800 * scale, 800 * scale);
//   };

//   // 스크롤 이벤트
//   useEffect(() => {
//     const handleScroll = () => {
//       const scrollTop = window.pageYOffset;
//       const maxScroll =
//         document.documentElement.scrollHeight - window.innerHeight;
//       const scrollFraction = scrollTop / maxScroll;
//       const frameIndex = Math.min(
//         frameCount - 1,
//         Math.floor(scrollFraction * frameCount),
//       );

//       setCurrentFrame(frameIndex);
//       setScrollPercent(Math.round(scrollFraction * 100));

//       requestAnimationFrame(() => render(frameIndex));
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, [frameCount, imagesLoaded]);

//   // Canvas 리사이즈
//   useEffect(() => {
//     const handleResize = () => {
//       const canvas = canvasRef.current;
//       if (!canvas) return;

//       canvas.width = window.innerWidth;
//       canvas.height = window.innerHeight;

//       if (imagesLoaded) {
//         render(currentFrame);
//       }
//     };

//     handleResize();
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, [currentFrame, imagesLoaded]);

//   // 초기 렌더링
//   useEffect(() => {
//     if (imagesLoaded) {
//       render(0);
//     }
//   }, [imagesLoaded]);

//   return (
//     <div className="relative">
//       {/* 스크롤 공간 */}
//       <div style={{ height: scrollHeight }} />

//       {/* Canvas */}
//       <canvas ref={canvasRef} className="fixed inset-0 h-screen w-screen" />

//       {/* 정보 패널 */}
//       <div className="fixed left-4 top-4 rounded-lg bg-black/50 p-4 font-mono text-sm text-white backdrop-blur-sm">
//         <div className="space-y-1">
//           <div>
//             Frame:{" "}
//             <span className="font-bold text-cyan-400">{currentFrame + 1}</span>{" "}
//             / {frameCount}
//           </div>
//           <div>
//             Scroll:{" "}
//             <span className="font-bold text-pink-400">{scrollPercent}%</span>
//           </div>
//           <div className="mt-2 h-1 w-32 overflow-hidden rounded-full bg-white/20">
//             <div
//               className="h-full bg-gradient-to-r from-cyan-500 via-violet-500 to-pink-500 transition-all duration-150"
//               style={{ width: `${scrollPercent}%` }}
//             />
//           </div>
//         </div>
//       </div>

//       {/* 로딩 인디케이터 */}
//       {!imagesLoaded && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black">
//           <div className="text-center">
//             <div className="mb-4 h-16 w-16 animate-spin rounded-full border-4 border-violet-500 border-t-transparent" />
//             <p className="text-white">Loading frames...</p>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

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

  // Canvas 크기 설정
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const setCanvasSize = () => {
      canvas.width = 1158;
      canvas.height = 770;
    };

    setCanvasSize();
    window.addEventListener("resize", setCanvasSize);
    return () => window.removeEventListener("resize", setCanvasSize);
  }, []);

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

  // 렌더링 함수
  const render = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = imagesRef.current[frameIndexRef.current];
    if (!img || !img.complete) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0);
  };

  // 스크롤 이벤트 (GSAP 스타일로 부드럽게)
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
        requestAnimationFrame(render);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // 초기 렌더링

    return () => window.removeEventListener("scroll", handleScroll);
  }, [imagesLoaded, frameCount]);

  // 첫 프레임 렌더링
  useEffect(() => {
    if (imagesLoaded) {
      render();
    }
  }, [imagesLoaded]);

  return (
    <>
      {/* 스크롤 공간 */}
      <div className="h-[500vh]" />

      {/* Canvas - 고정 */}
      <canvas
        ref={canvasRef}
        className="fixed left-1/2 top-1/2 max-h-screen max-w-full -translate-x-1/2 -translate-y-1/2"
        style={{
          width: "1158px",
          height: "770px",
        }}
      />

      {/* 로딩 상태 */}
      {!imagesLoaded && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
          <div className="text-center">
            <div className="mb-4 h-16 w-16 animate-spin rounded-full border-4 border-white border-t-transparent"></div>
            <p className="font-medium text-white">Loading AirPods...</p>
          </div>
        </div>
      )}
    </>
  );
}
