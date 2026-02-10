import LionModel from "./components/LionModel";
import Test1 from "./components/Test1";

export const workItems = [
  {
    id: 1,
    title: "Project A",
    category: "Branding",
    year: "2024",
    component: <Test1 />,
  },
  {
    id: 2,
    title: "Project B",
    category: "Web",
    year: "2024",
    component: <LionModel />,
  },
  {
    id: 3,
    title: "Project C",
    category: "Motion",
    year: "2023",
    component: <LionModel />,
  },
] as const;

export type WorkItemId = (typeof workItems)[number]["id"];
