import { useMutation } from "@tanstack/react-query";
import api from "@/lib/api";
import { useUserStore } from "../store/userStore";

export interface SignupRequest {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    termsAccepted: boolean;
}

export interface VerifyOtpRequest {
    userId: number;
    otp: string;
}

export function useAuthMutations() {
    const setUserId = useUserStore((state) => state.setUserId);
    const setAccessToken = useUserStore((state) => state.setAccessToken);

    /**
     * Signup Mutation - POST /user/form-signup
     */
    const signupMutation = useMutation({
        mutationFn: async (data: SignupRequest) => {
            const response = await api.post("/user/form-signup", {
                firstname: data.firstName,
                lastname: data.lastName,
                email: data.email,
                phone: data.phone,
                country_code: "+91",
            });
            return response.data;
        },
        onSuccess: (response) => {
            if (response.success && response.data?.id) {
                setUserId(response.data.id);
            }
        },
    });

    /**
     * OTP Verification Mutation - POST /user/form-otp-verify
     */
    const verifyOtpMutation = useMutation({
        mutationFn: async (data: VerifyOtpRequest) => {
            const response = await api.post("/user/form-otp-verify", {
                user_id: data.userId,
                otp: data.otp,
            });
            return response.data;
        },
        onSuccess: (response) => {
            if (response.success && response.data?.access_token) {
                setAccessToken(response.data.access_token);
            }
        },
    });

    return {
        signup: signupMutation,
        verifyOtp: verifyOtpMutation,
        isLoading: signupMutation.isPending || verifyOtpMutation.isPending,
    };
}
