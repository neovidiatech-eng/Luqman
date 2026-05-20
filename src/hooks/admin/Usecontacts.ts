import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getContacts,
  exportContacts,
  updateContactNotes,
  deleteContact,
  GetContactsParams,
} from "@/services/admin/Contactsservice";
import { AxiosError } from "axios";
import toast from "react-hot-toast";

// ─── Query Keys ───────────────────────────────────────────────────────────────

export const contactsKeys = {
  all: ["contacts"] as const,
  list: (params: GetContactsParams) => ["contacts", "list", params] as const,
};

// ─── List Hook ────────────────────────────────────────────────────────────────

export const useGetContacts = (params: GetContactsParams = {}) => {
  return useQuery({
    queryKey: contactsKeys.list(params),
    queryFn: () => getContacts(params),
  });
};

// ─── Export Hook ──────────────────────────────────────────────────────────────

export const useExportContacts = () => {
  return useMutation<Blob, AxiosError<{ message: string }>>({
    mutationFn: exportContacts,
    onSuccess: (blob) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `contacts-${new Date().toISOString().slice(0, 10)}.xlsx`;
      a.click();
      window.URL.revokeObjectURL(url);
      toast.success("تم تصدير جهات التواصل بنجاح");
    },
    onError: (error) => {
      const message = error.response?.data?.message || "حدث خطأ أثناء التصدير";
      toast.error(message);
    },
  });
};

// ─── Update Notes Hook ────────────────────────────────────────────────────────

export const useUpdateContactNotes = () => {
  const queryClient = useQueryClient();

  return useMutation<
    void,
    AxiosError<{ message: string }>,
    { id: string; adminNotes: string }
  >({
    mutationFn: async ({ id, adminNotes }) => {
      await updateContactNotes(id, adminNotes);
    },
    onSuccess: () => {
      toast.success("تم حفظ الملاحظات بنجاح");
      queryClient.invalidateQueries({ queryKey: contactsKeys.all });
    },
    onError: (error) => {
      const message = error.response?.data?.message || "حدث خطأ، حاول مرة أخرى";
      toast.error(message);
    },
  });
};

// ─── Delete Hook ──────────────────────────────────────────────────────────────

export const useDeleteContact = () => {
  const queryClient = useQueryClient();

  return useMutation<void, AxiosError<{ message: string }>, string>({
    mutationFn: async (id) => {
      await deleteContact(id);
    },
    onSuccess: () => {
      toast.success("تم حذف طلب التواصل بنجاح");
      queryClient.invalidateQueries({ queryKey: contactsKeys.all });
    },
    onError: (error) => {
      const message = error.response?.data?.message || "حدث خطأ، حاول مرة أخرى";
      toast.error(message);
    },
  });
};
