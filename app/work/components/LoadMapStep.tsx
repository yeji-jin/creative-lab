"use client";
import { motion, Variants } from "framer-motion";
import { useState } from "react";

const mockList = [
  { id: 1, title: "교육 기획", color: "bg-blue-500" },
  { id: 2, title: "교육 운영", color: "bg-purple-500" },
  { id: 3, title: "교육 관리", color: "bg-pink-500" },
  { id: 4, title: "교육 운영", color: "bg-orange-500" },
  {
    id: 5,
    title: "교육 관리",
    color: "bg-red-500",
    child: ["item1", "item2", "item3", "item4"],
  },
] as const;

const stepContainerVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const stepItemVariants: Variants = {
  hidden: {
    opacity: 0,
    x: -20,
    scale: 0.95,
  },
  show: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 380,
      damping: 26,
    },
  },
};

export default function StepSequence() {
  const [showItems, setShowItems] = useState(false);

  return (
    <div className="mx-auto flex min-h-[400px] max-w-7xl items-center justify-center pb-20">
      {/* ---------------- Step Row ---------------- */}
      <motion.div
        className="flex gap-4"
        variants={stepContainerVariants}
        initial="hidden"
        animate="show"
        onAnimationComplete={() => {
          setShowItems(true);
        }}
      >
        {mockList.map((step) => (
          <motion.div
            key={step.id}
            variants={stepItemVariants}
            className={`relative rounded-full px-6 py-4 font-bold text-white ${step.color}`}
          >
            {step.title}

            {"child" in step &&
              step.child &&
              step.child.map((child, index) => {
                const gap = 60;
                const half = step.child.length / 2;
                const offset =
                  index < half ? -(index + 1) * gap : (index - half + 1) * gap;

                return (
                  <div className="absolute left-1/2 top-1/2 z-[-1] -translate-x-1/2 -translate-y-1/2">
                    <motion.div
                      key={child}
                      initial={{ opacity: 0, y: 0 }}
                      animate={{
                        opacity: showItems ? 1 : 0,
                        y: showItems ? offset : 0,
                      }}
                      transition={{
                        duration: 0.35,
                        ease: "easeOut",
                      }}
                      className="rounded-lg bg-black px-4 py-2 text-sm text-white shadow"
                    >
                      {child}
                    </motion.div>
                  </div>
                );
              })}
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
