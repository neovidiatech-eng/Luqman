// hooks/useLogin.ts
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { LoginSchema } from "@/lib/Schemas/Loginschema";
import { baseURL } from "@/consts/index";

export const useLogin = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: async (data: LoginSchema) => {
      const rawAxios = axios.create({ baseURL, timeout: 30000 });

      const [devResult, adminResult] = await Promise.allSettled([
        rawAxios.post("/api/v1/auth/developer/login", data),
        rawAxios.post("/api/v1/auth/admin/login", data),
      ]);

      if (devResult.status === "fulfilled" && devResult.value.data?.success) {
        return { ...devResult.value.data, role: "developer" };
      }

      if (
        adminResult.status === "fulfilled" &&
        adminResult.value.data?.success
      ) {
        return { ...adminResult.value.data, role: "admin" };
      }

      throw new Error("بيانات غير صحيحة");
    },

    onSuccess: (data) => {
      const token = data?.data?.token;
      const role = data?.role;

      if (token) {
        localStorage.setItem("token", token);
        localStorage.setItem("role", role);
      }

      toast.success("تم تسجيل الدخول بنجاح");

      if (role === "developer") {
        router.push("/developer/dashboard");
      } else {
        router.push("/admin/dashboard");
      }
    },

    onError: () => {
      toast.error("البريد الإلكتروني أو كلمة المرور غير صحيحة");
    },
  });
};
