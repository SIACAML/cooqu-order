import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { useAuthMutations } from "../../hooks/useAuthMutations";
import { useUserStore } from "../../store/userStore";
import { sendGAEvent } from "@next/third-parties/google";

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

type UserFormValues = z.infer<typeof userSchema>;

interface UserAuthProps {
  onVerified: (userData: UserFormValues) => void;
}

export function UserAuth({ onVerified }: UserAuthProps) {
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [showTermsError, setShowTermsError] = useState(false);
  const [userData, setUserData] = useState<UserFormValues | null>(null);
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const toast = useToast();
  const { signup, verifyOtp, isLoading: isAuthLoading } = useAuthMutations();
  const userId = useUserStore((state) => state.userId);

  // Timer countdown effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (otpSent && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            setCanResend(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [otpSent, timer]);

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

  const handleSendOtp = async () => {
    const isValid = await userForm.trigger();
    if (!isValid) {
      // Check specifically if terms are not accepted
      if (!userForm.getValues("termsAccepted")) {
        setShowTermsError(true);
        toast.error("Please accept the Terms & Conditions to continue");
        setTimeout(() => setShowTermsError(false), 820); // Duration of shake animation
      }
      return;
    }

    const data = userForm.getValues();
    signup.mutate(data, {
      onSuccess: (res) => {
        if (res.success) {
          sendGAEvent({ event: 'auth_info_submitted' });
          setUserData(data);
          setOtpSent(true);
          setTimer(60);
          setCanResend(false);
          toast.info("OTP sent successfully!");
        } else {
          toast.error(res.message || "Signup failed");
        }
      },
      onError: (error: any) => {
        toast.error(error.message || "Failed to send OTP. Please try again.");
      }
    });
  };

  const handleResendOtp = async () => {
    if (!userData) return;

    signup.mutate(userData, {
      onSuccess: (res) => {
        if (res.success) {
          setTimer(60);
          setCanResend(false);
          setOtp("");
          toast.info("OTP resent successfully!");
        } else {
          toast.error(res.message || "Failed to resend OTP");
        }
      },
      onError: (error: any) => {
        toast.error(error.message || "Failed to resend OTP. Please try again.");
      }
    });
  };

  const handleVerifyOtp = async () => {
    if (!userId || !userData || otp.length !== 6) {
      toast.error("Please enter a valid 6-digit OTP");
      return;
    }

    verifyOtp.mutate({ userId, otp }, {
      onSuccess: (res) => {
        if (res.success) {
          toast.success("Phone verified successfully!");
          onVerified(userData);
        } else {
          toast.error(res.message || "Verification failed");
        }
      },
      onError: (error: any) => {
        toast.error(error.message || "Invalid OTP code. Please try again.");
      }
    });
  };

  return (
    <div className="w-full space-y-6">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-primary">Your Details</h3>
        <p className="text-sm text-muted-foreground">
          Enter your details to verify and place the order.
        </p>
      </div>

      <Form {...userForm}>
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={userForm.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John" {...field} className="h-12" disabled={otpSent} />
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
                    <Input placeholder="Doe" {...field} className="h-12" disabled={otpSent} />
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
                  <Input placeholder="john@example.com" type="email" {...field} className="h-12" disabled={otpSent} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="space-y-4">
            <FormField
              control={userForm.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <div className="absolute left-0 top-0 h-12 w-12 flex items-center justify-center border-r bg-muted rounded-l-md text-sm font-medium z-10">
                        +91
                      </div>
                      <Input
                        placeholder="98XXXXXX10"
                        type="text"
                        {...field}
                        className="h-12 pl-14"
                        disabled={otpSent}
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
            {!otpSent && (
              <FormField
                control={userForm.control}
                name="termsAccepted"
                render={({ field }) => (
                  <FormItem className={`flex flex-row items-start space-x-3 space-y-0 rounded-xl border p-4 shadow-sm transition-all ${showTermsError
                    ? 'bg-destructive/10 border-destructive animate-shake'
                    : 'bg-muted/20 border-border'
                    }`}>
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
                    </div>
                  </FormItem>
                )}
              />
            )}
            {!otpSent && (
              <Button
                type="button"
                onClick={handleSendOtp}
                size="lg"
                className="h-12 w-full font-semibold"
                disabled={isAuthLoading}
              >
                {isAuthLoading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  "Send OTP"
                )}
              </Button>
            )}
          </div>
        </div>
      </Form>

      {otpSent && (
        <div className="animate-in fade-in slide-in-from-top-4 duration-300 border-t pt-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold text-foreground">Verify OTP</h4>
                {timer > 0 ? (
                  <span className="text-sm text-muted-foreground">
                    Expires in <span className="font-semibold text-primary">{timer}s</span>
                  </span>
                ) : (
                  <span className="text-sm text-destructive font-medium">OTP Expired</span>
                )}
              </div>
              <p className="text-xs text-muted-foreground">
                Enter the 6-digit code sent to +91 {userForm.getValues("phone")}
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex justify-center sm:justify-start">
                <InputOTP
                  maxLength={6}
                  value={otp}
                  onChange={(val) => {
                    const numericVal = val.replace(/\D/g, "");
                    setOtp(numericVal);
                  }}
                  inputMode="numeric"
                  disabled={timer === 0}
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} className="h-10 w-10 sm:h-12 sm:w-12" />
                    <InputOTPSlot index={1} className="h-10 w-10 sm:h-12 sm:w-12" />
                    <InputOTPSlot index={2} className="h-10 w-10 sm:h-12 sm:w-12" />
                    <InputOTPSlot index={3} className="h-10 w-10 sm:h-12 sm:w-12" />
                    <InputOTPSlot index={4} className="h-10 w-10 sm:h-12 sm:w-12" />
                    <InputOTPSlot index={5} className="h-10 w-10 sm:h-12 sm:w-12" />
                  </InputOTPGroup>
                </InputOTP>
              </div>

              <div className="flex flex-col sm:flex-row gap-2">
                {canResend ? (
                  <Button
                    type="button"
                    onClick={handleResendOtp}
                    className="h-12 w-full sm:w-auto sm:min-w-[140px] font-semibold"
                    disabled={isAuthLoading}
                    variant="outline"
                  >
                    {isAuthLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Resend OTP"}
                  </Button>
                ) : (
                  <Button
                    type="button"
                    onClick={handleVerifyOtp}
                    className="h-12 w-full sm:w-auto sm:min-w-[140px] font-semibold"
                    disabled={isAuthLoading || otp.length !== 6 || timer === 0}
                  >
                    {isAuthLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Verify"}
                  </Button>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  type="button"
                  onClick={() => {
                    setOtpSent(false);
                    setOtp("");
                    setTimer(60);
                    setCanResend(false);
                  }}
                  className="h-12 text-muted-foreground"
                >
                  Change Number
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
