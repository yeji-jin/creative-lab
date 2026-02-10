import LionModel from "./components/LionModel";
import FixedImageScrollSection from "./components/FixedImageScrollSection";
import FramerNebecaModal from "./components/FramerNebecaModal";
import CoursesSelect from "./components/CoursesSelect";
import ClickIntoNebeca from "./components/ClickIntoNebeca";
import SubjectAnimation from "./components/SubjectAnimation";
import ExpandableButtonPage from "./components/ExpandableButton";
import ScrollStepperSection from "./components/ScrollStepperSection";

export const workItems = [
  {
    id: 1,
    title: "내일배움카드 - Courses Select",
    category: "Web",
    year: "2026",
    component: <CoursesSelect />,
  },
  {
    id: 2,
    title: "Three.js Lion Model",
    category: "Branding",
    year: "2026",
    component: <LionModel />,
  },
  {
    id: 3,
    title: "Visual - Framer",
    category: "Motion",
    year: "2026",
    component: <SubjectAnimation />,
  },
  {
    id: 4,
    title: "내일배움카드 - scroll",
    category: "Web",
    year: "2026",
    component: <FixedImageScrollSection />,
  },
  {
    id: 5,
    title: "내일배움카드 - Framer",
    category: "Motion",
    year: "2026",
    component: <FramerNebecaModal />,
  },
  {
    id: 6,
    title: "내일배움카드 - scroll2",
    category: "Motion",
    year: "2026",
    component: <ClickIntoNebeca />,
  },
  {
    id: 7,
    title: "내일배움카드 - Expandable Button",
    category: "Web",
    year: "2026",
    component: <ExpandableButtonPage />,
  },
  {
    id: 8,
    title: "교육 정보 안내",
    category: "Web",
    year: "2026",
    component: <ScrollStepperSection />,
  },
] as const;
