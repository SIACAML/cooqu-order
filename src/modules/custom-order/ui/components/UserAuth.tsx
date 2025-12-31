import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

// Schema for User Details
const userSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().regex(/^\d{10}$/, "Phone number must be exactly 10 digits"),
});

// Schema for OTP
const otpSchema = z.object({
  otp: z.string().length(4, "OTP must be 4 digits"),
});

type UserFormValues = z.infer<typeof userSchema>;

interface UserAuthProps {
  onVerified: (userData: UserFormValues) => void;
}

export function UserAuth({ onVerified }: UserAuthProps) {
  const [step, setStep] = useState<"details" | "otp">("details");
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState<UserFormValues | null>(null);

  // Form 1: User Details
  const userForm = useForm<UserFormValues>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
    },
  });

  // Form 2: OTP
  const otpForm = useForm<{ otp: string }>({
    resolver: zodResolver(otpSchema),
    defaultValues: { otp: "" },
  });

  const onUserSubmit = async (data: UserFormValues) => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setUserData(data);
    setStep("otp");
    setIsLoading(false);
  };

  const onOtpSubmit = async (data: { otp: string }) => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));

    if (data.otp === "1234") {
      setIsLoading(false);
      if (userData) {
        onVerified(userData);
      }
    } else {
      setIsLoading(false);
      otpForm.setError("otp", { message: "Invalid OTP. Try 1234" });
    }
  };

  if (step === "details") {
    return (
      <Card className="w-full max-w-md mx-auto border-none shadow-none sm:border sm:shadow-sm">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-primary">Let's Get Started</CardTitle>
          <CardDescription className="text-center">
            Enter your details to proceed with the custom order.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-4 sm:p-6">
          <Form {...userForm}>
            <form onSubmit={userForm.handleSubmit(onUserSubmit)} className="space-y-6">
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
              <Button type="submit" className="w-full h-12 text-lg" disabled={isLoading}>
                {isLoading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : "Verify & Continue"}
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
              <Button type="submit" className="w-full h-12 text-lg" disabled={isLoading}>
                {isLoading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : "Confirm OTP"}
              </Button>
              <Button variant="ghost" type="button" className="w-full" onClick={() => setStep("details")}>
                Change Phone Number
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
