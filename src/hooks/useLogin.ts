// hooks/useLogin.ts
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import api from "@/lib/axios";
import toast from "react-hot-toast";
import { LoginSchema } from "@/lib/Schemas/Loginschema";

export const useLogin = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: async (data: LoginSchema) => {
      // جرب developer الأول
      try {
        const res = await api.post("/api/v1/auth/developer/login", data);
        return { ...res.data, role: "developer" };
      } catch {
        // لو فشل جرب admin
        const res = await api.post("/api/v1/auth/admin/login", data);
        return { ...res.data, role: "admin" };
      }
    },

    onSuccess: (data) => {
      const token = data?.data?.token;
      const role = data?.role;

      if (token) {
        localStorage.setItem("token", token);
        localStorage.setItem("role", role);
      }

      if (role === "developer") {
        router.push("/developer/dashboard");
      } else {
        router.push("/admin/dashboard");
      }

      toast.success("تم تسجيل الدخول بنجاح");
    },

    onError: () => {
      toast.error("البريد الإلكتروني أو كلمة المرور غير صحيحة");
    },
  });
};
