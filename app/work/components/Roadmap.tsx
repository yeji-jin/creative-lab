"use client";

import { motion } from "framer-motion";
import { useMediaQuery } from "@/hooks/useMediaQuery";

const steps = [
  {
    id: 1,
    title: "Learn \nthe Fundamentals",
    imageUrl:
      "https://d35ai18pny966l.cloudfront.net/course/kdt/kdt-aiplus_nlp-4th/section3_usp_img1.png",
  },
  {
    id: 2,
    title: "Design Tools\nAdobe XD · Sketch",
    imageUrl:
      "https://d35ai18pny966l.cloudfront.net/course/kdt/kdt-aiplus_nlp-4th/section3_usp_img1.png",
  },
  {
    id: 3,
    title: "User Testing\nHotjar · Maze",
    imageUrl:
      "https://d35ai18pny966l.cloudfront.net/course/kdt/kdt-aiplus_nlp-4th/section3_usp_img1.png",
  },
  {
    id: 4,
    title: "Wireframing\nUXPin",
    imageUrl:
      "https://d35ai18pny966l.cloudfront.net/course/kdt/kdt-aiplus_nlp-4th/section3_usp_img1.png",
  },
  {
    id: 5,
    title: "Prototyping\nWebflow · Flinto",
    imageUrl:
      "https://d35ai18pny966l.cloudfront.net/course/kdt/kdt-aiplus_nlp-4th/section3_usp_img1.png",
  },
  {
    id: 6,
    title: "Visual Design\nAdobe · Canva",
    imageUrl:
      "https://d35ai18pny966l.cloudfront.net/course/kdt/kdt-aiplus_nlp-4th/section3_usp_img1.png",
  },
  {
    id: 7,
    title: "Create Portfolio\nSuccess",
    imageUrl:
      "https://d35ai18pny966l.cloudfront.net/course/kdt/kdt-aiplus_nlp-4th/section3_usp_img1.png",
  },
];

//Stagger를 쓰려면 자식도 variants 필수
const container = {
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const numberVariant = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.2 } },
};

const arrowLineVariant = {
  hidden: { scaleY: 0 },
  show: {
    scaleY: 1,
    transition: {
      duration: 0.25,
    },
  },
};

const textVariant = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

const Roadmap = () => {
  const isMobile = useMediaQuery("(max-width: 1279px)");

  return (
    <>
      {isMobile ? (
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="relative mx-auto my-20 flex max-w-xl flex-col gap-10"
        >
          {steps.map((step) => (
            <motion.div
              key={step.id}
              variants={{
                hidden: { opacity: 0, y: 30 },
                show: { opacity: 1, y: 0 },
              }}
              className="relative pl-20"
            >
              {/* Number */}
              <div className="absolute left-0 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-primary-normal text-sm font-bold text-white">
                {step.id}
              </div>

              {/* Content */}
              <div className="flex items-center gap-3">
                <img src={step.imageUrl} className="w-20" />
                <p className="text-sm font-medium">{step.title}</p>
              </div>
              {/* Line */}
            </motion.div>
          ))}
          <div className="absolute left-4 top-0 h-full w-[2px] bg-primary-normal" />
        </motion.div>
      ) : (
        <div className="mx-auto w-full max-w-7xl px-4 pt-20 sm:px-6 lg:px-8">
          <div className="w-full overflow-x-auto bg-slate-50 py-16">
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="flex flex-1 justify-between gap-10"
            >
              {steps.map((step, index) => (
                <div
                  key={step.id}
                  className="flex flex-col-reverse items-center gap-6"
                  style={{ marginBottom: `${index * 50}px` }}
                >
                  {/* Number */}
                  <motion.div
                    variants={numberVariant}
                    className="flex items-center justify-center rounded-xl bg-primary-normal px-4 py-3 text-xl font-bold text-white shadow"
                  >
                    STEP {step.id}
                  </motion.div>

                  {/* Arrow */}
                  <motion.div
                    variants={arrowLineVariant}
                    style={{ transformOrigin: "bottom" }}
                    className="flex h-20 w-[2px] flex-col items-center justify-center bg-primary-normal"
                  >
                    <div className="size-2 rounded-full bg-primary-normal" />
                    <div className="h-20 w-[2px] bg-primary-normal" />
                  </motion.div>

                  {/* Text */}
                  <motion.div
                    variants={textVariant}
                    className="flex flex-col items-center justify-center gap-4 whitespace-pre-line text-center text-sm font-medium"
                  >
                    <div className="size-20 object-cover">
                      <img src={step.imageUrl} alt={step.title} />
                    </div>
                    {step.title}
                  </motion.div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      )}
    </>
  );
};
export default Roadmap;
