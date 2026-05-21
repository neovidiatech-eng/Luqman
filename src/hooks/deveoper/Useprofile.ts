import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import {
  getDeveloperProfile,
  updateDeveloperProfile,
  changePassword,
  UpdateProfileResponse,
  ChangePasswordPayload,
  ChangePasswordResponse,
} from "@/services/developer/Profileservice";

export const profileKeys = {
  all: ["profile"] as const,
  me: () => ["profile", "me"] as const,
};

export const useGetDeveloperProfile = () => {
  return useQuery({
    queryKey: profileKeys.me(),
    queryFn: getDeveloperProfile,
    select: (res) => res.data.developer,
    staleTime: 1000 * 60 * 5,
  });
};

export const useUpdateDeveloperProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: FormData) => updateDeveloperProfile(payload),
    onSuccess: () => {
      toast.success("تم تحديث البيانات بنجاح");
      queryClient.invalidateQueries({ queryKey: profileKeys.all });
    },
    onError: (error: AxiosError<{ message: string }>) => {
      const message = error.response?.data?.message || "حدث خطأ، حاول مرة أخرى";
      toast.error(message);
    },
  });
};

export const useChangePassword = () => {
  return useMutation({
    mutationFn: (payload: ChangePasswordPayload) => changePassword(payload),
    onSuccess: () => {
      toast.success("تم تغيير كلمة المرور بنجاح");
    },
    onError: (error: AxiosError<{ message: string }>) => {
      const message =
        error.response?.data?.message || "كلمة المرور الحالية غير صحيحة";
      toast.error(message);
    },
  });
};
