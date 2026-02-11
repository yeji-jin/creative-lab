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
    title: "CoverflowDetail",
    category: "Motion",
    year: "2026",
    component: <CoverflowDetail />,
  },
  {
    title: "Coverflow",
    category: "Motion",
    year: "2026",
    component: <Coverflow />,
  },
  {
    title: "내일배움카드 - Courses Select",
    category: "Web",
    year: "2026",
    component: <CoursesSelect />,
  },
  {
    title: "Three.js Lion Model",
    category: "Branding",
    year: "2026",
    component: <LionModel />,
  },
  {
    title: "Visual - Framer",
    category: "Motion",
    year: "2026",
    component: <SubjectAnimation />,
  },
  {
    title: "내일배움카드 - scroll",
    category: "Web",
    year: "2026",
    component: <FixedImageScrollSection />,
  },
  {
    title: "내일배움카드 - Framer",
    category: "Motion",
    year: "2026",
    component: <FramerNebecaModal />,
  },
  {
    title: "내일배움카드 - scroll2",
    category: "Motion",
    year: "2026",
    component: <ClickIntoNebeca />,
  },
  {
    title: "내일배움카드 - Expandable Button",
    category: "Web",
    year: "2026",
    component: <ExpandableButtonPage />,
  },
  {
    title: "교육 정보 안내",
    category: "Web",
    year: "2026",
    component: <ScrollStepperSection />,
  },
].map((item, index) => ({
  id: index + 1,
  ...item,
}));
