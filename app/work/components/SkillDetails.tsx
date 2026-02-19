"use client";
import { motion } from "framer-motion";
import { useState } from "react";

const skills = [
  {
    title: "AWS",
    src: "https://d35ai18pny966l.cloudfront.net/course/kdt/kdt-cld-4th/section5_curriculum_img7-1.png",
    top: -20,
    left: 36,
  },
  {
    title: "Github",
    src: "https://d35ai18pny966l.cloudfront.net/course/kdt/kdt-cld-4th/section5_curriculum_img7-2.png",
    top: 5,
    right: 30,
  },
  {
    title: "S3",
    src: "https://d35ai18pny966l.cloudfront.net/course/kdt/kdt-cld-4th/section5_curriculum_img7-3.png",
    top: 8,
    left: -10,
  },
  {
    title: "EC2",
    src: "https://d35ai18pny966l.cloudfront.net/course/kdt/kdt-cld-4th/section5_curriculum_img7-4.png",
    top: 16,
    right: 10,
  },
  {
    title: "Kubernetes",
    src: "https://d35ai18pny966l.cloudfront.net/course/kdt/kdt-cld-4th/section5_curriculum_img7-5.png",
    top: 15,
    left: 19,
  },
  {
    title: "Terraform",
    src: "https://d35ai18pny966l.cloudfront.net/course/kdt/kdt-cld-4th/section5_curriculum_img7-6.png",
    top: 2,
    right: -12,
  },
  {
    title: "AAAAA",
    src: "https://d35ai18pny966l.cloudfront.net/course/kdt/kdt-cld-4th/section5_curriculum_img7-7.png",
    top: -4,
    left: 9,
  },
  {
    title: "Argo",
    src: "https://d35ai18pny966l.cloudfront.net/course/kdt/kdt-cld-4th/section5_curriculum_img7-8.png",
    top: -10,
    right: 6,
  },
];

const SkillDetails = () => {
  const [isAnimationComplete, setIsAnimationComplete] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);

  return (
    <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="flex">
        {/* left side */}
        <motion.div
          className="relative mx-auto flex w-[40%] items-center justify-center"
          animate={isAnimationComplete ? { x: "-20%", scale: 0.8 } : {}}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <img src="/mock/bag.png" alt="" className="relative" />
          <motion.div
            className="absolute inset-0"
            initial={{ scale: 0.3, y: 150, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            transition={{
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
            }}
            onAnimationComplete={() => {
              setIsAnimationComplete(true);
            }}
          >
            {skills.map((item, index) => (
              <motion.span
                key={index}
                className="absolute size-12 border-2"
                onClick={() => setSelectedSkill(item.title)}
                whileHover={{ scale: 1.2 }}
                transition={{
                  duration: 0.5,
                  ease: [0.22, 1, 0.36, 1],
                }}
                style={{
                  top: `${item.top}%`,
                  left: item.left !== undefined ? `${item.left}%` : undefined,
                  right:
                    item.right !== undefined ? `${item.right}%` : undefined,
                }}
              >
                <img src={item.src} alt="" />
              </motion.span>
            ))}
          </motion.div>
          {/* radial-gradient */}
          <motion.span
            animate={isAnimationComplete ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="z-[-1 absolute inset-0 scale-150 transform bg-[radial-gradient(50%_50%,#ff6000_0%,#f9f8f300_100%)] opacity-0"
          />
        </motion.div>

        {/* right side */}
        <motion.div
          className="rounded-3xl bg-primary-secondary-hover"
          initial={{ width: 0 }}
          animate={isAnimationComplete ? { width: "50%" } : {}}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          {selectedSkill ? <h3>{selectedSkill}</h3> : <h3>Select a skill</h3>}
        </motion.div>
      </div>
    </div>
  );
};

export default SkillDetails;
