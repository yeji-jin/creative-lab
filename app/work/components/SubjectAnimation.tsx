"use client";
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

const SubjectAnimation = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const features = [
    {
      text: "직관적이고 간결한 문법으로\n비전공자도 쉽게 학습",
      position: { top: "15%", left: "18%" },
      angle: -45,
    },
    {
      text: "활발한 커뮤니티와\n자료로 문리하게 협습",
      position: { top: "20%", right: "15%" },
      angle: 45,
    },
    {
      text: "웹 개발, 데이터 분석, AI, 자동화 등\n다양한 분야로 활용 가능",
      position: { top: "84%", left: "19%" },
      angle: -20,
    },
    {
      text: "IT 직무에의 필활한 협업",
      position: { top: "84%", right: "20%" },
      angle: 20,
    },
    {
      text: "Pandas, Scikit-Learn 등\n강력한 라이브러리 지원",
      position: { bottom: "25%", left: "12%" },
      angle: -30,
    },
    {
      text: "AI, 빅데이터, 클라우드 컴퓨팅 등\n미래 자격자 기술 학습 가능",
      position: { bottom: "20%", right: "12%" },
      angle: 30,
    },
  ];

  return (
    <div
      ref={ref}
      className="relative min-h-screen overflow-hidden bg-black bg-gradient-to-br"
    >
      {/* Animated background particles */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-1 w-1 rounded-full bg-white"
            initial={{
              x:
                typeof window !== "undefined"
                  ? Math.random() * window.innerWidth
                  : 0,
              y:
                typeof window !== "undefined"
                  ? Math.random() * window.innerHeight
                  : 0,
              opacity: 0,
            }}
            animate={
              isInView
                ? {
                    opacity: [0, 0.6, 0],
                    scale: [0, 1.5, 0],
                  }
                : {}
            }
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      {/* Glowing orbs */}
      <motion.div
        className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-primary-normal-hover opacity-20 blur-3xl filter"
        animate={
          isInView
            ? {
                scale: [1, 1.3, 1],
                x: [0, 50, 0],
                y: [0, 30, 0],
              }
            : {}
        }
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-primary-secondary opacity-20 blur-3xl filter"
        animate={
          isInView
            ? {
                scale: [1, 1.2, 1],
                x: [0, -30, 0],
                y: [0, -50, 0],
              }
            : {}
        }
        transition={{ duration: 10, repeat: Infinity }}
      />

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center">
        {/* Title */}
        <motion.h1
          className="mb-20 text-center text-5xl font-bold text-white"
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ delay: 0.2 }}
        >
          멋사 교육 특징
        </motion.h1>

        {/* Logo Container */}
        <div className="relative mx-auto w-full max-w-6xl px-8">
          {/* Center glow effect */}
          <motion.div
            className="bg-gradient-radial absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 transform rounded-full from-blue-400/30 via-yellow-400/20 to-transparent"
            animate={
              isInView
                ? {
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.6, 0.3],
                  }
                : {}
            }
            transition={{ duration: 1.5, repeat: Infinity }}
          />

          {/* Logo */}
          <motion.div
            className="relative z-20 flex items-center justify-center"
            initial={{ scale: 0, rotate: -60, opacity: 0 }}
            animate={
              isInView
                ? { scale: 1, rotate: 0, opacity: 1 }
                : { scale: 0, rotate: -60, opacity: 0 }
            }
            transition={{
              duration: 1.5,
              delay: 0.8,
              type: "spring",
              bounce: 0.4,
            }}
          >
            <motion.div
              animate={
                isInView
                  ? {
                      rotateY: [-10, 10, -10],
                      y: [0, -10, 0],
                    }
                  : {}
              }
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{
                transformStyle: "preserve-3d",
              }}
            >
              <img
                src="https://d35ai18pny966l.cloudfront.net/course/kdt/kdt-frontend-18th/section3_img1_pc.png"
                className="size-[300px] object-contain"
                alt=""
              />
            </motion.div>

            {/* Sparkles around logo */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute"
                style={{
                  top: "50%",
                  left: "50%",
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={
                  isInView
                    ? {
                        scale: [0, 1, 0],
                        opacity: [0, 1, 0],
                        x: Math.cos((i * Math.PI * 2) / 8) * 150,
                        y: Math.sin((i * Math.PI * 2) / 8) * 150,
                      }
                    : { scale: 0, opacity: 0 }
                }
                transition={{
                  duration: 1.5,
                  delay: 1.5 + i * 0.1,
                  repeat: Infinity,
                  repeatDelay: 3,
                }}
              >
                <span className="text-3xl">✨</span>
              </motion.div>
            ))}
          </motion.div>

          {/* Feature texts radiating from center */}
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="absolute"
              style={feature.position}
              initial={{
                opacity: 0,
                scale: 0,
                x: 0,
                y: 0,
              }}
              animate={
                isInView
                  ? {
                      opacity: 1,
                      scale: 1,
                      x: 0,
                      y: 0,
                    }
                  : {
                      opacity: 0,
                      scale: 0,
                      x: 0,
                      y: 0,
                    }
              }
              transition={{
                duration: 0.8,
                delay: 1 + index * 0.2,
                type: "spring",
                bounce: 0.5,
              }}
            >
              {/* Feature bubble */}
              <motion.div
                className="relative"
                whileHover={{
                  scale: 1.1,
                  boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)",
                }}
                animate={
                  isInView
                    ? {
                        y: [0, -10, 0],
                      }
                    : {}
                }
                transition={{
                  y: {
                    duration: 3,
                    repeat: Infinity,
                    delay: index * 0.3,
                  },
                }}
              >
                {/* Glow effect */}
                <motion.div
                  className="text-shadow-primary-normal-hover absolute inset-0 rounded-full bg-gradient-to-r from-[#ff6000] opacity-30 blur-xl filter"
                  animate={
                    isInView
                      ? {
                          scale: [1, 1.2, 1],
                          opacity: [0.3, 0.5, 0.3],
                        }
                      : {}
                  }
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: index * 0.2,
                  }}
                />

                {/* Text bubble */}
                <div className="relative overflow-hidden rounded-3xl border-2 border-purple-300/30 bg-gradient-to-br from-[#ff6000]/90 to-amber-400/40 px-6 py-4 shadow-xl backdrop-blur-md">
                  <motion.p className="whitespace-pre-line text-center text-sm font-semibold leading-relaxed text-white md:text-base">
                    {feature.text}
                  </motion.p>

                  {/* Shine effect */}
                  <motion.div
                    className="absolute inset-0 rounded-3xl bg-gradient-to-r from-transparent via-white to-transparent opacity-0"
                    animate={
                      isInView
                        ? {
                            opacity: [0, 0.3, 0],
                            x: ["-100%", "100%"],
                          }
                        : {}
                    }
                    transition={{
                      duration: 2,
                      delay: 2.5 + index * 0.3,
                      repeat: Infinity,
                      repeatDelay: 5,
                    }}
                  />
                </div>

                {/* Floating dots near bubble */}
                <motion.div
                  className="absolute -right-2 -top-2 h-3 w-3 rounded-full bg-yellow-400"
                  animate={
                    isInView
                      ? {
                          scale: [0, 1, 0],
                          opacity: [0, 1, 0],
                        }
                      : {}
                  }
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: 2 + index * 0.4,
                  }}
                />
                <motion.div
                  className="absolute -bottom-2 -left-2 h-2 w-2 rounded-full bg-blue-400/50"
                  animate={
                    isInView
                      ? {
                          scale: [0, 1, 0],
                          opacity: [0, 1, 0],
                        }
                      : {}
                  }
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: 2.3 + index * 0.4,
                  }}
                />
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SubjectAnimation;
