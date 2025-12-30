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
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
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
      name: "",
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
        <CardContent>
          <Form {...userForm}>
            <form onSubmit={userForm.handleSubmit(onUserSubmit)} className="space-y-6">
              <FormField
                control={userForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} className="h-12" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
                      <Input placeholder="+1 234 567 890" type="tel" {...field} className="h-12" />
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
      <CardContent>
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
