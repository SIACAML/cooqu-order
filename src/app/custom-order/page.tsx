import { CustomOrderView } from "@/modules/custom-order/ui/view";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Custom Food Order | CooQu",
  description: "Place your custom food order for delivery, pickup, or dine-in.",
};

export default function CustomOrderPage() {
  return <CustomOrderView />;
}
