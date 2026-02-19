import LionModel from "./components/LionModel";
import FixedImageScrollSection from "./components/FixedImageScrollSection";
import FramerNebecaModal from "./components/FramerNebecaModal";
import CoursesSelect from "./components/CoursesSelect";
import ClickIntoNebeca from "./components/ClickIntoNebeca";
import SubjectAnimation from "./components/SubjectAnimation";
import ExpandableButtonPage from "./components/ExpandableButton";
import ScrollStepperSection from "./components/ScrollStepperSection";
import Coverflow from "./components/Coverflow";
import CoverflowDetail from "./components/CoverflowDetail";
import ScrollSequence from "./components/ScrollSequence";
import Roadmap from "./components/Roadmap";
import CurriculumTable from "./components/CurriculumTable";
import LottieScrollSequence from "./components/LottieScrollSequence";
import CalendarInfo from "./components/CalendarInfo";
import LoadMapStep from "./components/LoadMapStep";
import SkillDetails from "./components/SkillDetails";
import Floating from "./components/Floating";
import Quiz from "./components/Quiz";
import QuizWord from "./components/QuizWord";

export const workItems = [
  {
    slug: "quiz",
    title: "Quiz",
    category: "Web",
    year: "2026",
    component: <Quiz />,
  },
  {
    slug: "quiz-word",
    title: "QuizWord",
    category: "Web",
    year: "2026",
    component: <QuizWord />,
  },
  {
    slug: "floating",
    title: "Floating",
    category: "Web",
    year: "2026",
    component: <Floating />,
  },
  // {
  //   slug: "skill-details",
  //   title: "SkillDetails",
  //   category: "Motion",
  //   year: "2026",
  //   component: <SkillDetails />,
  // },
  {
    slug: "load-map-step",
    title: "LoadMapStep",
    category: "Motion",
    year: "2026",
    component: <LoadMapStep />,
  },
  // {
  //   slug: "calendar-info",
  //   title: "CalendarInfo",
  //   category: "Web",
  //   year: "2026",
  //   component: <CalendarInfo />,
  // },
  {
    slug: "lottie-scroll",
    title: "LottieScrollSequence",
    category: "Motion",
    year: "2026",
    component: <LottieScrollSequence />,
  },
  {
    slug: "curriculum-table",
    title: "CurriculumTable",
    category: "Web",
    year: "2026",
    component: <CurriculumTable />,
  },
  {
    slug: "roadmap",
    title: "Roadmap",
    category: "Web",
    year: "2026",
    component: <Roadmap />,
  },
  {
    slug: "scroll-sequence",
    title: "Scroll Sequence",
    category: "Motion",
    year: "2026",
    component: <ScrollSequence />,
  },
  {
    slug: "coverflow-detail",
    title: "CoverflowDetail",
    category: "Motion",
    year: "2026",
    component: <CoverflowDetail />,
  },
  {
    slug: "coverflow",
    title: "Coverflow",
    category: "Motion",
    year: "2026",
    component: <Coverflow />,
  },
  {
    slug: "courses-select",
    title: "프로모션 - Courses Select",
    category: "Web",
    year: "2026",
    component: <CoursesSelect />,
  },
  {
    slug: "lion-model",
    title: "Three.js Lion Model",
    category: "Branding",
    year: "2026",
    component: <LionModel />,
  },
  {
    slug: "subject-animation",
    title: "Visual - Framer",
    category: "Motion",
    year: "2026",
    component: <SubjectAnimation />,
  },
  {
    slug: "fixed-image-scroll-section",
    title: "Fixed Image Scroll",
    category: "Web",
    year: "2026",
    component: <FixedImageScrollSection />,
  },
  {
    slug: "framer-nebeca-modal",
    title: "내일배움카드 - Framer",
    category: "Motion",
    year: "2026",
    component: <FramerNebecaModal />,
  },
  {
    slug: "click-into-nebeca",
    title: "내일배움카드 - scroll2",
    category: "Motion",
    year: "2026",
    component: <ClickIntoNebeca />,
  },
  {
    slug: "expandable-button",
    title: "Expandable Button",
    category: "Web",
    year: "2026",
    component: <ExpandableButtonPage />,
  },
  {
    slug: "scroll-stepper-section",
    title: "교육 정보 안내",
    category: "Web",
    year: "2026",
    component: <ScrollStepperSection />,
  },
].map((item, index) => ({
  id: index + 1,
  ...item,
}));
