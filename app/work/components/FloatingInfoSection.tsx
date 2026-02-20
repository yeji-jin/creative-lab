"use client";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, X } from "lucide-react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

const sectionsInfo = [
  {
    sectionId: 1,
    sectionContent: "section1 content",
    sectionInnerContent: "section1 의 컨텐츠",
  },
  {
    sectionId: 2,
    sectionContent: "section2",
    sectionInnerContent: "section2 의 컨텐츠",
  },
  {
    sectionId: 3,
    sectionContent: "section3 content",
    sectionInnerContent: "section3 의 컨텐츠",
  },
  {
    sectionId: 4,
    sectionContent: "section4 content",
    sectionInnerContent: "section4 의 컨텐츠",
  },
  {
    sectionId: 5,
    sectionContent: "section5 content",
    sectionInnerContent: "section5 의 컨텐츠",
  },
];

const FloatingInfoSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  const [activeSection, setActiveSection] = useState(0);
  const currentSection = sectionsInfo[activeSection];

  const textRef = useRef<HTMLParagraphElement>(null);
  const [textWidth, setTextWidth] = useState(0);
  const textPadding = 16;

  useLayoutEffect(() => {
    if (textRef.current) {
      setTextWidth(textRef.current.scrollWidth + textPadding);
    }
  }, [currentSection]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = sectionRefs.current.findIndex(
              (el) => el === entry.target,
            );
            if (index !== -1) {
              setActiveSection(index);
            }
          }
        });
      },
      {
        rootMargin: "-50% 0px -50% 0px",
        threshold: 0,
      },
    );

    sectionRefs.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div>
      {/* content sections */}
      <section
        ref={(el) => {
          sectionRefs.current[0] = el;
        }}
        className="flex min-h-[200vh] w-full items-center justify-center bg-orange-500 text-4xl font-bold text-black"
      >
        section1 scrollable content
      </section>
      <section
        ref={(el) => {
          sectionRefs.current[1] = el;
        }}
        className="flex min-h-[200vh] w-full items-center justify-center bg-blue-500 text-4xl font-bold text-black"
      >
        section2 scrollable content
      </section>
      <section
        ref={(el) => {
          sectionRefs.current[2] = el;
        }}
        className="flex min-h-[200vh] w-full items-center justify-center bg-green-500 text-4xl font-bold text-black"
      >
        section3 scrollable content
      </section>
      <section
        ref={(el) => {
          sectionRefs.current[3] = el;
        }}
        className="flex min-h-[200vh] w-full items-center justify-center bg-yellow-500 text-4xl font-bold text-black"
      >
        section4 scrollable content
      </section>
      <section
        ref={(el) => {
          sectionRefs.current[4] = el;
        }}
        className="flex min-h-[200vh] w-full items-center justify-center bg-purple-500 text-4xl font-bold text-black"
      >
        section5 scrollable content
      </section>
      {/* bottom floating section*/}
      <motion.section
        key={activeSection}
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{
          duration: 0.4,
        }}
        className="sticky bottom-8 mx-auto my-10 max-w-fit rounded-[32px] bg-black px-2 font-bold text-white"
      >
        <button
          type="button"
          className="flex h-12 items-center"
          onClick={() => setIsModalOpen(true)}
        >
          <Plus className="size-8 rounded-full bg-blue-500 p-2 text-white" />
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, maxWidth: 0 }}
            animate={{ opacity: 1, maxWidth: textWidth }}
            transition={{ duration: 0.5, delay: 0.45 }}
            className="overflow-hidden"
          >
            <p ref={textRef} className="origin-left whitespace-nowrap px-2">
              {currentSection?.sectionContent}
            </p>
          </motion.div>
        </button>
      </motion.section>
      {/* modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-black/40 p-10 backdrop-blur-sm"
          >
            <motion.div
              key="modal"
              initial={{ y: "20%" }}
              animate={{ y: 0 }}
              exit={{ y: 0, opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="flex h-full flex-col gap-6 divide-y divide-gray-200 rounded-3xl bg-white p-4"
            >
              <header className="flex items-center justify-between py-4">
                <h2 className="text-xl font-bold">
                  {currentSection?.sectionContent}의 타이틀
                </h2>
                <button type="button">
                  <X
                    className="size-8 rounded-full bg-blue-500 p-2 text-white"
                    onClick={() => setIsModalOpen(false)}
                  />
                </button>
              </header>
              <div className="flex flex-1 items-center justify-center">
                {currentSection?.sectionInnerContent}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FloatingInfoSection;
