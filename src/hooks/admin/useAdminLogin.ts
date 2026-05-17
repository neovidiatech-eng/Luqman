import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import {
  adminLogin,
  AdminLoginPayload,
  AdminLoginResponse,
} from "@/services/admin/adminAuthService";
import { AxiosError } from "axios";

// ─── Hook ─────────────────────────────────────────────────────────────────────

export const useAdminLogin = () => {
  const router = useRouter();

  return useMutation<
    AdminLoginResponse,
    AxiosError<{ message: string }>,
    AdminLoginPayload
  >({
    mutationFn: adminLogin,

    onSuccess: (data) => {
      toast.success(data.message || "تم تسجيل الدخول بنجاح");
      router.push("/admin/dashboard");
    },

    onError: (error) => {
      const message = error.response?.data?.message || "حدث خطأ، حاول مرة أخرى";
      toast.error(message);
    },
  });
};
