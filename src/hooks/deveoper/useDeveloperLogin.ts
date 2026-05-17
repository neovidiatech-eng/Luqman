// hooks/developer/useDeveloperLogin.ts
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import api from "@/lib/axios";
import toast from "react-hot-toast";
import { LoginSchema } from "@/lib/Schemas/Loginschema";

export const useDeveloperLogin = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: async (data: LoginSchema) => {
      const response = await api.post("/api/v1/auth/developer/login", data);
      return response.data;
    },

    onSuccess: (data) => {
      const token = data?.data?.token;
      if (token) {
        localStorage.setItem("token", token);
      }
      toast.success("تم تسجيل الدخول بنجاح");
      router.push("/developer/dashboard"); // غيّر المسار حسب مشروعك
    },

    onError: () => {
      toast.error("البريد الإلكتروني أو كلمة المرور غير صحيحة");
    },
  });
};
