"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema, FormValues } from "../../schema";
import { OrderBasics } from "./OrderBasics";
import { ItemDetails } from "./ItemDetails";
import { OptionalDetails } from "./OptionalDetails";
import { useState } from "react";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export function CustomOrderForm() {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      orderType: "Delivery",
      category: "Dish",
      dietType: "Veg",
      quantity: 1,
      unit: "plate",
      guestCount: 1,
    },
    mode: "onTouched",
  });

  const { handleSubmit, formState: { isSubmitting } } = form;
  const [success, setSuccess] = useState(false);

  const onSubmit = async (data: FormValues) => {
    console.log("Form Submitted:", data);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setSuccess(true);
    // alert(JSON.stringify(data, null, 2));
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 max-w-4xl mx-auto">
        
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Custom Food Order</h1>
          <p className="text-muted-foreground">Tell us what you need, and we'll make it happen.</p>
        </div>

        {/* Section 1: Required Details */}
        <Card>
            <CardHeader>
                <div className="flex items-center gap-2">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold">1</span>
                    <CardTitle>Required Details</CardTitle>
                </div>
                <CardDescription>Basic information about your order.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <OrderBasics />
                <ItemDetails />
            </CardContent>
        </Card>

        {/* Section 2: Optional Details */}
        <OptionalDetails />

        <div className="pt-6">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full sm:w-auto"
            size="lg"
          >
            {isSubmitting ? "Submitting..." : "Place Request"}
          </Button>
        </div>
        
        {success && (
          <div className="p-4 bg-green-50 text-green-700 rounded-lg border border-green-200">
            Order request placed successfully!
          </div>
        )}
      </form>
    </Form>
  );
}
