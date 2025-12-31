import { useMutation } from "@tanstack/react-query";
import api from "@/lib/api";

export interface SignupRequest {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    termsAccepted: boolean;
}

export interface VerifyOtpRequest {
    phone: string;
    otp: string;
}

export function useAuthMutations() {
    /**
     * Signup Mutation
     */
    const signupMutation = useMutation({
        mutationFn: async (data: SignupRequest) => {
            // For now, simulating the API call as requested
            // Replace with actual: const response = await api.post("/auth/signup", data);
            await new Promise((resolve) => setTimeout(resolve, 1500));
            return { success: true, message: "OTP sent successfully" };
        },
    });

    /**
     * OTP Verification Mutation
     */
    const verifyOtpMutation = useMutation({
        mutationFn: async (data: VerifyOtpRequest) => {
            // For now, simulating the API call
            // Replace with actual: const response = await api.post("/auth/verify-otp", data);
            await new Promise((resolve) => setTimeout(resolve, 1500));

            if (data.otp === "1234") {
                return { success: true, user: { ...data, isVerified: true } };
            } else {
                throw new Error("Invalid OTP");
            }
        },
    });

    return {
        signup: signupMutation,
        verifyOtp: verifyOtpMutation,
        isLoading: signupMutation.isPending || verifyOtpMutation.isPending,
    };
}
