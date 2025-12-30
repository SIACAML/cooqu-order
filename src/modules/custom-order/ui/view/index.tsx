import { CustomOrderForm } from "../components/CustomOrderForm";

export function CustomOrderView() {
  return (
    <div className="min-h-screen bg-muted/30 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <CustomOrderForm />
      </div>
    </div>
  );
}
