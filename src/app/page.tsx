import { HomeView } from "@/modules/home/ui/view/HomeView";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "CooQu | Authentic Homemade Food Experiences",
  description: "CooQu connects you with talented home cooks for custom meals, catering, and theme-based dining. Discover the joy of home-cooked goodness.",
};

export default function Home() {
  return <HomeView />;
}
