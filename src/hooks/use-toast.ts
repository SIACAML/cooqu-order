import { showToast } from "nextjs-toast-notify";

export const useToast = () => {
    const success = (message: string) => {
        showToast.success(message, {
            duration: 4000,
            progress: true,
            position: "bottom-center",
            transition: "fadeIn",
            icon: '',
            sound: true,
        });
    }

    const error = (message: string) => {
        showToast.error(message, {
            duration: 4000,
            progress: true,
            position: "bottom-center",
            transition: "fadeIn",
            icon: '',
            sound: true,
        });
    }

    const info = (message: string) => {
        showToast.info(message, {
            duration: 4000,
            progress: true,
            position: "bottom-center",
            transition: "fadeIn",
            icon: '',
            sound: true,
        });
    }

    return { success, error, info }
}
