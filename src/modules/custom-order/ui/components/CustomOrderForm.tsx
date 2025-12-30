"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema, FormValues } from "../../schema";
import { OrderBasics } from "./OrderBasics";
import { ItemDetails } from "./ItemDetails";
import { OptionalDetails } from "./OptionalDetails";
import { UserAuth } from "./UserAuth";
import { useState, useEffect } from "react";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useUserStore } from "../../store/userStore";

import { PaymentPreference } from "./PaymentPreference";
import { Loader2, PartyPopper } from "lucide-react";

export function CustomOrderForm() {
  const { user, isVerified, setUser, setVerified } = useUserStore();
  const [step, setStep] = useState<1 | 2>(1);
  const [isHydrated, setIsVerifiedHydrated] = useState(false);

  useEffect(() => {
    setIsVerifiedHydrated(true);
    if (isVerified && user) {
      setStep(2);
    }
  }, [isVerified, user]);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      orderType: "Delivery",
      category: "Dish",
      dietType: "Veg",
      quantity: 1,
      unit: "plate",
      guestCount: 1,
      paymentPreference: "Online"
    },
    mode: "onTouched",
  });

  const { handleSubmit, formState: { isSubmitting } } = form;
  const [success, setSuccess] = useState(false);

  const onSubmit = async (data: FormValues) => {
    console.log("Full Order Submission:", { user: user, order: data });
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setSuccess(true);
  };

  const handleAuthVerified = (userData: any) => {
    setUser(userData);
    setVerified(true);
    setStep(2);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!isHydrated) {
    return null; // or a loading spinner
  }

  if (step === 1) {
    return (
        <div className="space-y-8 max-w-4xl mx-auto">
             <div className="space-y-2 text-center sm:text-left">
                <h1 className="text-3xl font-bold tracking-tight text-primary">Start Your Custom Order</h1>
                <p className="text-muted-foreground">First, let's verify your details so we can reach you.</p>
            </div>
            <UserAuth onVerified={handleAuthVerified} />
        </div>
    );
  }

  if (success) {
      return (
          <Card className="max-w-2xl mx-auto mt-8 border-green-200 bg-green-50">
              <CardContent className="flex flex-col items-center justify-center p-12 text-center space-y-4">
                  <div className="h-16 w-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-2">
                      <PartyPopper className="h-8 w-8" />
                  </div>
                  <h2 className="text-2xl font-bold text-green-800">Request Received Successfully!</h2>
                  <p className="text-green-700 max-w-md">
                      Thank you, {user?.name}. We have received your custom order request. Our team will review it and contact you shortly at {user?.phone}.
                  </p>
                  <Button variant="outline" className="mt-4" onClick={() => {
                      setSuccess(false);
                      form.reset();
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}>
                      Place Another Request
                  </Button>
              </CardContent>
          </Card>
      )
  }

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 max-w-4xl mx-auto pb-12">
        
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-primary">Custom Food Order</h1>
          <p className="text-muted-foreground">
             Ordering as <span className="font-semibold text-foreground">{user?.name}</span> ({user?.phone})
          </p>
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

        {/* Section 3: Payment Preference */}
        <PaymentPreference />

        <div className="pt-2 sticky bottom-4 z-10 mx-auto w-full max-w-4xl px-4 sm:px-0 sm:static sm:z-auto">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-14 text-lg font-semibold shadow-lg hover:shadow-xl transition-all"
            size="lg"
          >
            {isSubmitting ? (
                <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Submitting Request...
                </>
            ) : (
                "Place Free Order Request"
            )}
          </Button>
          <p className="text-xs text-center text-muted-foreground mt-3">
              * No payment required now. Pay only after order confirmation.
          </p>
        </div>
      </form>
    </Form>
  );
}
