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
import { useToast } from "@/hooks/use-toast";

import { PaymentPreference } from "./PaymentPreference";
import { Loader2, PartyPopper } from "lucide-react";

export function CustomOrderForm() {
  const { user, isVerified, setUser, setVerified } = useUserStore();
  const toast = useToast();
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
      orderType: ["Delivery"],
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
    await new Promise((resolve) => setTimeout(resolve, 1500));
    toast.success("Hooray! Your order request has been sent successfully.");
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
      <Card className="max-w-2xl mx-auto mt-8 border-green-200 bg-green-50 shadow-lg">
        <CardContent className="flex flex-col items-center justify-center p-8 text-center space-y-6">
          <div className="h-20 w-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-2 animate-in zoom-in spin-in-180 duration-500">
            <PartyPopper className="h-10 w-10" />
          </div>

          <div className="space-y-2">
            <h2 className="text-3xl font-bold text-green-800">Request Sent Successfully!</h2>
            <div className="text-green-700 font-medium">
              Thanks {user?.firstName} {user?.lastName}, we've received your request!
            </div>
          </div>

          <div className="w-full bg-white/60 p-6 rounded-xl border border-green-100 text-left space-y-4">
            <h3 className="font-semibold text-lg text-green-900 border-b border-green-200 pb-2">What happens next?</h3>

            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-200 text-green-800 flex items-center justify-center font-bold text-sm">1</div>
                <div>
                  <h4 className="font-semibold text-green-900">Quotes from Cooks</h4>
                  <p className="text-sm text-green-700">Your request has been sent to nearby cooks. They will review it and prepare a custom quote for you.</p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-200 text-green-800 flex items-center justify-center font-bold text-sm">2</div>
                <div>
                  <h4 className="font-semibold text-green-900">Download the App</h4>
                  <p className="text-sm text-green-700">You will receive quotes <b>only on our mobile app</b>. Download it to track your request.</p>
                  <div className="flex gap-2 mt-2">
                    <Button size="sm" variant="outline" className="h-8 text-xs border-green-600 text-green-700 hover:bg-green-100">
                      Download for Android
                    </Button>
                    <Button size="sm" variant="outline" className="h-8 text-xs border-green-600 text-green-700 hover:bg-green-100">
                      Download for iOS
                    </Button>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-200 text-green-800 flex items-center justify-center font-bold text-sm">3</div>
                <div>
                  <h4 className="font-semibold text-green-900">Login & Accept Quote</h4>
                  <p className="text-sm text-green-700">Login with your email <b>{user?.email}</b> (credentials sent to inbox). Review and accept a quote to confirm your order.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-sm text-muted-foreground pt-4 border-t border-green-200 w-full">
            <p className="font-medium mb-2">Need help? Contact Support:</p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <a href="mailto:admin@cooqu.co.in" className="flex items-center gap-1 text-green-700 hover:underline">
                📧 admin@cooqu.co.in
              </a>
              <a href="https://wa.me/916353593662" target="_blank" className="flex items-center gap-1 text-green-700 hover:underline">
                💬 +91 6353 593 662
              </a>
            </div>
          </div>

          <Button variant="outline" className="mt-4 border-green-600 text-green-700 hover:bg-green-50" onClick={() => {
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
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-4xl mx-auto pb-24 px-4 sm:px-0">

        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-primary">Custom Food Order</h1>
          <p className="text-muted-foreground">
            Ordering as <span className="font-semibold text-foreground">{user?.firstName} {user?.lastName}</span> ({user?.phone})
          </p>
        </div>

        {/* Section 1: Required Details */}
        <Card className="border-none sm:border shadow-none sm:shadow-sm bg-transparent sm:bg-card">
          <CardHeader className="px-0 sm:px-6">
            <div className="flex items-center gap-2">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold">1</span>
              <CardTitle>Required Details</CardTitle>
            </div>
            <CardDescription>Basic information about your order.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 px-0 sm:px-6">
            <OrderBasics />
            <ItemDetails />
          </CardContent>
        </Card>

        {/* Section 2: Optional Details */}
        <OptionalDetails />

        {/* Section 3: Payment Preference */}
        <PaymentPreference />

        <div className="pt-4 sticky bottom-0 z-20 mx-auto w-full max-w-4xl bg-background/80 backdrop-blur-sm sm:bg-transparent pb-4 sm:static sm:z-auto space-y-2 border-t sm:border-none">
          {/* Error Message for Validation - Visible only when trying to submit invalid form */}
          {form.formState.isSubmitted && !form.formState.isValid && (
            <div className="bg-destructive/15 text-destructive text-[0.8rem] p-2 rounded-md border border-destructive/20 text-center animate-in fade-in slide-in-from-bottom-2 font-medium">
              Please fill in all required details correctly to proceed.
            </div>
          )}
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-12 sm:h-14 text-base sm:text-lg font-semibold shadow-lg hover:shadow-xl transition-all"
            size="lg"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 sm:h-5 sm:w-5 animate-spin" />
                Submitting Request...
              </>
            ) : (
              "Place Free Order Request"
            )}
          </Button>
          <p className="text-[0.65rem] sm:text-xs text-center text-muted-foreground">
            * No payment required now. Pay only after order confirmation.
          </p>
        </div>
      </form>
    </Form>
  );
}
