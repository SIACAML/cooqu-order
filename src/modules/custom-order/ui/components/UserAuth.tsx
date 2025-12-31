import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { useAuthMutations } from "../../hooks/useAuthMutations";

// Schema for User Details
const userSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().regex(/^\d{10}$/, "Phone number must be exactly 10 digits"),
  termsAccepted: z.literal(true, {
    error_message: "You must accept the terms and conditions to proceed",
  } as any),
});

// Schema for OTP
const otpSchema = z.object({
  otp: z.string().length(4, "OTP must be 4 digits"),
});

type UserFormValues = z.infer<typeof userSchema>;
type OtpFormValues = z.infer<typeof otpSchema>;

interface UserAuthProps {
  onVerified: (userData: UserFormValues) => void;
}

export function UserAuth({ onVerified }: UserAuthProps) {
  const [step, setStep] = useState<"details" | "otp">("details");
  const [userData, setUserData] = useState<UserFormValues | null>(null);
  const toast = useToast();
  const { signup, verifyOtp, isLoading: isAuthLoading } = useAuthMutations();
  const isLoading = isAuthLoading; // Using mutation state

  // Form 1: User Details
  const userForm = useForm<UserFormValues>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      termsAccepted: false as unknown as true,
    },
  });

  // Form 2: OTP
  const otpForm = useForm<OtpFormValues>({
    resolver: zodResolver(otpSchema),
    defaultValues: { otp: "" },
  });

  const onDetailsSubmit = async (data: UserFormValues) => {
    signup.mutate(data, {
      onSuccess: () => {
        setUserData(data);
        setStep("otp");
        toast.info("A 4-digit code has been sent to your phone.");
      },
      onError: (error: any) => {
        toast.error(error.message || "Failed to send OTP. Please try again.");
      }
    });
  };

  const onOtpSubmit = async (data: OtpFormValues) => {
    if (!userData) return;

    verifyOtp.mutate({ phone: userData.phone, otp: data.otp }, {
      onSuccess: () => {
        toast.success("Phone verified successfully!");
        onVerified(userData);
      },
      onError: (error: any) => {
        toast.error(error.message || "Invalid OTP code. Please try again.");
        otpForm.setError("otp", { message: "Invalid OTP. Try 1234" });
      }
    });
  };

  if (step === "details") {
    return (
      <Card className="w-full max-w-md mx-auto border-none shadow-none sm:border sm:shadow-sm">
        <CardHeader className="space-y-2 pb-2">
          <CardTitle className="text-3xl font-extrabold text-center text-zinc-900 tracking-tight">
            Let's Get Started
          </CardTitle>
          <CardDescription className="text-center text-zinc-500 text-base">
            Enter your details to proceed with your unique food experience.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-4 sm:p-6">
          <Form {...userForm}>
            <form onSubmit={userForm.handleSubmit(onDetailsSubmit)} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={userForm.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John" {...field} className="h-12" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={userForm.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Doe" {...field} className="h-12" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={userForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input placeholder="john@example.com" type="email" {...field} className="h-12" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={userForm.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <div className="absolute left-0 top-0 h-12 w-12 flex items-center justify-center border-r bg-muted rounded-l-md text-sm font-medium">
                          +91
                        </div>
                        <Input
                          placeholder="98XXXXXX10"
                          type="text"
                          {...field}
                          className="h-12 pl-14"
                          onChange={(e) => {
                            const val = e.target.value.replace(/\D/g, '').slice(0, 10);
                            field.onChange(val);
                          }}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={userForm.control}
                name="termsAccepted"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-xl border bg-muted/20 p-4 shadow-sm">
                    <FormControl>
                      <Checkbox
                        checked={field.value as boolean}
                        onCheckedChange={field.onChange}
                        className="mt-1"
                      />
                    </FormControl>
                    <div className="space-y-1.5 leading-none">
                      <p className="text-sm font-medium text-zinc-900 leading-relaxed">
                        I agree to the{" "}
                        <Link href="/terms-of-service" className="text-primary hover:underline transition-all">Terms & Conditions</Link>
                        {" "}and{" "}
                        <Link href="/privacy-policy" className="text-primary hover:underline transition-all">Privacy Policy</Link>
                      </p>
                      <p className="text-xs text-zinc-500 leading-normal">
                        By checking this box, you confirm that you have read and accepted our legal terms.
                      </p>
                    </div>
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full h-14 text-lg font-bold shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all rounded-xl" disabled={isLoading}>
                {isLoading ? <Loader2 className="mr-2 h-6 w-6 animate-spin" /> : "Verify & Continue"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto border-none shadow-none sm:border sm:shadow-sm">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center text-primary">Verify OTP</CardTitle>
        <CardDescription className="text-center">
          We sent a code to <span className="font-semibold text-foreground">{userData?.phone}</span>
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4 sm:p-6">
        <Form {...otpForm}>
          <form onSubmit={otpForm.handleSubmit(onOtpSubmit)} className="space-y-8 flex flex-col items-center">
            <Controller
              control={otpForm.control}
              name="otp"
              defaultValue=""
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <InputOTP
                      maxLength={4}
                      value={field.value}
                      onChange={field.onChange}
                    >
                      <InputOTPGroup>
                        <InputOTPSlot index={0} className="h-14 w-14 text-lg" />
                        <InputOTPSlot index={1} className="h-14 w-14 text-lg" />
                        <InputOTPSlot index={2} className="h-14 w-14 text-lg" />
                        <InputOTPSlot index={3} className="h-14 w-14 text-lg" />
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="w-full space-y-4">
              <Button type="submit" className="w-full h-14 text-lg font-bold shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all rounded-xl" disabled={isLoading}>
                {isLoading ? <Loader2 className="mr-2 h-6 w-6 animate-spin" /> : "Confirm OTP"}
              </Button>
              <Button variant="ghost" type="button" className="w-full h-12 text-zinc-500 hover:text-primary transition-colors" onClick={() => setStep("details")}>
                Change Phone Number
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
