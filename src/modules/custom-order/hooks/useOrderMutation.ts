import { useMutation } from "@tanstack/react-query";
import api from "@/lib/api";
import { useUserStore } from "../store/userStore";

export function useOrderMutation() {
    return useMutation({
        mutationFn: async (formData: FormData) => {
            const response = await api.post("order/form-custom-order-create", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            return response.data;
        },
    });
}
