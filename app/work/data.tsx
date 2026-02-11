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

export const workItems = [
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
    title: "내일배움카드 - Courses Select",
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
    title: "내일배움카드 - scroll",
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
    title: "내일배움카드 - Expandable Button",
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
