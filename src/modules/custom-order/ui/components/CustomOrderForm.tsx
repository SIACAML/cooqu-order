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
import { useOrderMutation } from "../../hooks/useOrderMutation";
import { format } from "date-fns";

import { PaymentPreference } from "./PaymentPreference";
import { Loader2, PartyPopper } from "lucide-react";

export function CustomOrderForm() {
  const { user, isVerified, accessToken, setUser, setVerified, setAddress, logout } = useUserStore();
  const toast = useToast();
  const [step, setStep] = useState<1 | 2>(1);
  const [isHydrated, setIsVerifiedHydrated] = useState(false);
  const orderMutation = useOrderMutation();

  const handleLogout = () => {
    logout();
    setStep(1);
    toast.info("Logged out successfully");
  };

  useEffect(() => {
    setIsVerifiedHydrated(true);
    // Only proceed to step 2 if we have a user, it's verified AND we have an access token
    if (isVerified && user && accessToken) {
      setStep(2);
    } else {
      setStep(1);
    }
  }, [isVerified, user, accessToken]);

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

  const onSubmit = async (values: FormValues) => {
    try {
      const formData = new FormData();

      // Mapping for Category ID
      const categoryMap: Record<string, number> = {
        "Dish": 1,
        "Catering": 2,
        "Snack": 3,
        "Bakery": 4,
        "Sweet Dish": 5
      };

      const { address } = useUserStore.getState();

      // Address Fields
      if (address) {
        formData.append("address[lat]", String(address.lat));
        formData.append("address[lng]", String(address.lng));
        formData.append("address[city]", address.city || "");
        formData.append("address[state]", address.state || "");
        formData.append("address[country]", "IN"); // Defaulting to IN based on example
        formData.append("address[place_name]", address.area || "");
        formData.append("address[pincode]", address.pincode || "");
        formData.append("address[full_address]", address.fullAddress || "");
      }

      // Order Basics
      formData.append("CustomOrder[co_request_id]", String(categoryMap[values.category]));
      formData.append("CustomOrder[co_date]", format(values.date, "yyyy-MM-dd"));
      formData.append("CustomOrder[co_time]", values.time);

      // Order Available (Types)
      const orderAvailable = values.orderType.map(t => t.toLowerCase()).join(",");
      formData.append("CoDeliveryAssign[order_available]", orderAvailable);

      // Item Details
      formData.append("CoDetails[0][cuisine_id]", values.cuisine);
      formData.append("CoDetails[0][item_name]", values.itemName);
      formData.append("CoDetails[0][item_description]", values.description);
      formData.append("CoDetails[0][die_type]", values.dietType === "Veg" ? "1" : values.dietType === "Non-Veg" ? "2" : "3");
      formData.append("CoDetails[0][dish_qty]", `${values.quantity} ${values.unit}`);
      formData.append("CoDetails[0][cooking_instruction]", values.cookingInstructions || "");
      formData.append("CoDetails[0][number_of_people]", String(values.guestCount));

      // Order Timestamps
      formData.append("Order[created_at]", format(new Date(), "yyyy-MM-dd HH:mm:ss"));
      formData.append("Order[timezone]", Intl.DateTimeFormat().resolvedOptions().timeZone || "Asia/Kolkata");

      // Files
      if (values.photos && Array.isArray(values.photos)) {
        values.photos.forEach((file: File) => {
          formData.append("file[]", file);
        });
      }

      await orderMutation.mutateAsync(formData);

      toast.success("Hooray! Your order request has been sent successfully.");
      setSuccess(true);
    } catch (error: any) {
      console.error("Submission Error:", error);
      toast.error(error.response?.data?.message || "Failed to submit request. Please try again.");
    }
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
      <Card className="max-w-2xl mx-auto mt-4 sm:mt-8 border-primary/20 bg-primary/5 shadow-lg">
        <CardContent className="flex flex-col items-center justify-center p-4 sm:p-8 text-center space-y-6">
          <div className="h-20 w-20 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-2 animate-in zoom-in spin-in-180 duration-500">
            <PartyPopper className="h-10 w-10" />
          </div>

          <div className="space-y-2">
            <h2 className="text-3xl font-bold text-primary">Request Sent Successfully!</h2>
            <div className="text-foreground/80 font-medium">
              Thanks {user?.firstName} {user?.lastName}, we've received your request!
            </div>
          </div>

          <div className="w-full bg-card/60 p-4 sm:p-6 rounded-xl border border-primary/10 text-left space-y-4">
            <h3 className="font-semibold text-lg text-foreground border-b border-primary/10 pb-2">What happens next?</h3>

            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">1</div>
                <div>
                  <h4 className="font-semibold text-foreground">Quotes from Cooks</h4>
                  <p className="text-sm text-muted-foreground">Your request has been sent to nearby cooks. They will review it and prepare a custom quote for you.</p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">2</div>
                <div>
                  <h4 className="font-semibold text-foreground">Download the App</h4>
                  <p className="text-sm text-muted-foreground">You will receive quotes <b>only on our mobile app</b>. Download it to track your request.</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <Button size="sm" variant="outline" className="h-8 text-[10px] sm:text-xs border-primary text-primary hover:bg-primary/5 px-2 sm:px-3">
                      Download for Android
                    </Button>
                    <Button size="sm" variant="outline" className="h-8 text-[10px] sm:text-xs border-primary text-primary hover:bg-primary/5 px-2 sm:px-3">
                      Download for iOS
                    </Button>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">3</div>
                <div>
                  <h4 className="font-semibold text-foreground">Login & Accept Quote</h4>
                  <p className="text-sm text-muted-foreground">Login with your email <b>{user?.email}</b> (credentials sent to inbox). Review and accept a quote to confirm your order.</p>
                </div>
              </div>


              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">4</div>
                <div>
                  <h4 className="font-semibold text-foreground">Review and Accept Order</h4>
                  <p className="text-sm text-muted-foreground">Review your quotes recieved from Cooks and accept it to confirm your order.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-sm text-muted-foreground pt-4 border-t border-primary/10 w-full">
            <p className="font-medium mb-2">Need help? Contact Support:</p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <a href="mailto:admin@cooqu.co.in" className="flex items-center gap-1 text-primary hover:underline">
                📧 admin@cooqu.co.in
              </a>
              <a href="https://wa.me/916353593662" target="_blank" className="flex items-center gap-1 text-primary hover:underline">
                💬 +91 6353 593 662
              </a>
            </div>
          </div>

          <Button variant="outline" className="mt-4 border-primary text-primary hover:bg-primary/5" onClick={() => {
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

        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight text-primary">Custom Food Order</h1>
            <p className="text-muted-foreground">
              Ordering as <span className="font-semibold text-foreground">{user?.firstName} {user?.lastName}</span> ({user?.phone})
            </p>
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleLogout}
            className="w-fit text-xs h-8"
          >
            Change User
          </Button>
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
