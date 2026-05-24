"use client";
import { useState, useMemo, useEffect } from "react";
import {
  Search,
  Mail,
  Phone,
  Calendar,
  Check,
  Trash2,
  Eye,
  Download,
  StickyNote,
} from "lucide-react";
import { MdEditNote } from "react-icons/md";

import DataTable from "@/components/admin/DataTable";
import StatusBadge from "@/components/admin/StatusBadge";
import ConfirmModal from "@/components/shared/ConfirmModal";
import { formatDate } from "@/lib/utils";
import Link from "next/link";
import {
  useGetContacts,
  useDeleteContact,
  useUpdateContactNotes,
  useExportContacts,
} from "@/hooks/admin/Usecontacts";
import { Contact } from "@/services/admin/Contactsservice";

export default function Contacts() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [page, setPage] = useState(1);

  // ─── Modals ───────────────────────────────────────────────────────────────
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);

  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const [notesModalOpen, setNotesModalOpen] = useState(false);
  const [notesContactId, setNotesContactId] = useState<string | null>(null);
  const [notesText, setNotesText] = useState("");

  useEffect(() => {
    localStorage.setItem("contacts_last_visit", new Date().toISOString());
    window.dispatchEvent(new Event("contacts_visited"));
  }, []);

  // ─── API ──────────────────────────────────────────────────────────────────
  const { data, isLoading } = useGetContacts({
    page,
    limit: 10,
    search: searchTerm || undefined,
    status: statusFilter !== "all" ? statusFilter : undefined,
  });

  const contacts = data?.data?.contacts ?? [];
  const pagination = data?.data?.pagination;

  // Derive selected contact from the already-fetched list (no extra endpoint needed)
  const selectedContact = useMemo(
    () => contacts.find((c) => c.id === selectedId) ?? null,
    [contacts, selectedId],
  );

  const { mutate: deleteContact, isPending: isDeleting } = useDeleteContact();
  const { mutate: updateNotes, isPending: isSavingNote } =
    useUpdateContactNotes();
  const { mutate: exportContacts, isPending: isExporting } =
    useExportContacts();

  // ─── Handlers ─────────────────────────────────────────────────────────────
  const handleView = (contact: Contact) => {
    setSelectedId(contact.id);
    setViewModalOpen(true);
  };

  const handleDeleteClick = (id: string) => {
    setItemToDelete(id);
    setDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (itemToDelete) {
      deleteContact(itemToDelete, {
        onSuccess: () => {
          setDeleteModalOpen(false);
          setItemToDelete(null);
          if (viewModalOpen && selectedId === itemToDelete)
            setViewModalOpen(false);
        },
      });
    }
  };

  const openNotesModal = (contact: Contact) => {
    setNotesContactId(contact.id);
    setNotesText(contact.adminNotes ?? "");
    setNotesModalOpen(true);
  };

  const saveNotes = () => {
    if (!notesContactId) return;
    updateNotes(
      { id: notesContactId, adminNotes: notesText },
      { onSuccess: () => setNotesModalOpen(false) },
    );
  };

  // ─── Columns ──────────────────────────────────────────────────────────────
  const columns = [
    {
      header: "المرسل",
      render: (item: Contact) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 font-bold">
            {item.name.charAt(0)}
          </div>
          <div>
            <p className="font-bold text-sm text-[var(--text)]">{item.name}</p>
            <p className="text-xs text-gray-500">
              {item.propertyId
                ? `استفسار عن: ${item.property?.title ?? "عقار"}`
                : item.projectId
                  ? `استفسار عن مشروع`
                  : "استفسار عام"}
            </p>
          </div>
        </div>
      ),
    },
    {
      header: "معلومات التواصل",
      render: (item: Contact) => (
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Mail size={14} className="text-gray-400" />
            <span dir="ltr">{item.email}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Phone size={14} className="text-gray-400" />
            <span dir="ltr">{item.phone}</span>
          </div>
        </div>
      ),
    },
    {
      header: "تاريخ الطلب",
      render: (item: Contact) => (
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Calendar size={14} className="text-gray-400" />
          <span>{formatDate(item.createdAt)}</span>
        </div>
      ),
    },
    {
      header: "الحالة",
      render: (item: Contact) => <StatusBadge status={item.status} />,
    },
    {
      header: "إجراءات",
      render: (item: Contact) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleView(item)}
            className="p-1.5 text-gray-600 hover:bg-gray-100 rounded transition-colors"
            title="عرض التفاصيل"
          >
            <Eye size={18} />
          </button>
          <button
            onClick={() => openNotesModal(item)}
            className="p-1.5 text-yellow-600 hover:bg-yellow-50 rounded transition-colors"
            title="ملاحظات الأدمن"
          >
            <MdEditNote size={24} />
          </button>
          <button
            onClick={() => handleDeleteClick(item.id)}
            className="p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors"
            title="حذف الطلب"
          >
            <Trash2 size={18} />
          </button>
        </div>
      ),
    },
  ];

  // ─── Render ───────────────────────────────────────────────────────────────
  return (
    <div className="space-y-6">
      {/* ── Toolbar ── */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex-1 flex flex-col sm:flex-row gap-3 w-full">
          <div className="relative flex-1">
            <Search
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="text"
              placeholder="بحث بالاسم، البريد، الجوال..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setPage(1);
              }}
              className="w-full bg-white border border-gray-200 rounded-lg py-2 pr-10 pl-4 text-sm focus:outline-none focus:border-[var(--primary)]"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setPage(1);
            }}
            className="bg-white border border-gray-200 rounded-lg py-2 px-4 text-sm focus:outline-none focus:border-[var(--primary)] sm:w-48"
          >
            <option value="all">كل الحالات</option>
            <option value="new">جديد</option>
            <option value="read">تمت القراءة</option>
            <option value="replied">تم الرد</option>
          </select>
        </div>

        <button
          onClick={() => exportContacts()}
          disabled={isExporting}
          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 disabled:opacity-60 transition-colors shrink-0"
        >
          <Download size={16} />
          {isExporting ? "جاري التصدير..." : "تصدير Excel"}
        </button>
      </div>

      {/* ── Table ── */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {isLoading ? (
          <div className="py-16 text-center text-gray-400 text-sm">
            جاري التحميل...
          </div>
        ) : (
          <DataTable
            data={contacts}
            columns={columns}
            keyExtractor={(item) => item.id}
          />
        )}

        {/* Pagination */}
        {pagination && (
          <div className="p-4 border-t border-gray-100 flex items-center justify-between text-sm text-gray-500">
            <div>
              عرض {contacts.length === 0 ? 0 : (page - 1) * 10 + 1} إلى{" "}
              {(page - 1) * 10 + contacts.length} من {pagination.total} طلب
            </div>
            <div className="flex gap-1">
              <button
                onClick={() => setPage((p) => p - 1)}
                disabled={!pagination.hasPrevPage}
                className="px-3 py-1 border rounded hover:bg-gray-50 disabled:opacity-50"
              >
                السابق
              </button>
              {Array.from(
                { length: pagination.totalPages },
                (_, i) => i + 1,
              ).map((p) => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`px-3 py-1 border rounded ${
                    p === page
                      ? "bg-[var(--primary)] text-white border-[var(--primary)]"
                      : "hover:bg-gray-50"
                  }`}
                >
                  {p}
                </button>
              ))}
              <button
                onClick={() => setPage((p) => p + 1)}
                disabled={!pagination.hasNextPage}
                className="px-3 py-1 border rounded hover:bg-gray-50 disabled:opacity-50"
              >
                التالي
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ── Delete Confirm Modal ── */}
      <ConfirmModal
        isOpen={deleteModalOpen}
        title="حذف طلب التواصل"
        message="هل أنت متأكد من رغبتك في حذف هذا الطلب؟ هذا الإجراء لا يمكن التراجع عنه."
        onConfirm={confirmDelete}
        onCancel={() => {
          setDeleteModalOpen(false);
          setItemToDelete(null);
        }}
        confirmLabel={isDeleting ? "جاري الحذف..." : "حذف نهائياً"}
      />

      {/* ── View Modal ── */}
      {viewModalOpen && selectedContact && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-gray-100 flex justify-between items-start bg-gray-50/50">
              <div>
                <h3 className="font-bold text-lg text-[var(--text)] mb-1">
                  تفاصيل طلب التواصل
                </h3>
                <p className="text-xs text-gray-500 flex items-center gap-1">
                  <Calendar size={12} /> {formatDate(selectedContact.createdAt)}
                </p>
              </div>
              <StatusBadge status={selectedContact.status} />
            </div>

            <div className="p-6 space-y-6">
              {/* Sender info */}
              <div className="flex items-center gap-4 p-4 bg-blue-50/50 border border-blue-100 rounded-xl">
                <div className="w-12 h-12 rounded-full bg-white border border-blue-200 text-blue-600 flex items-center justify-center font-bold text-lg shrink-0 shadow-sm">
                  {selectedContact.name.charAt(0)}
                </div>
                <div>
                  <p className="font-bold text-[var(--text)]">
                    {selectedContact.name}
                  </p>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1 text-sm text-gray-600">
                    <span dir="ltr" className="flex items-center gap-1">
                      <Phone size={12} className="text-blue-400" />{" "}
                      {selectedContact.phone}
                    </span>
                    <span dir="ltr" className="flex items-center gap-1">
                      <Mail size={12} className="text-blue-400" />{" "}
                      {selectedContact.email}
                    </span>
                  </div>
                </div>
              </div>

              {/* Linked property / project */}
              {(selectedContact.propertyId || selectedContact.projectId) && (
                <div className="text-sm p-3 bg-gray-50 rounded-lg flex items-center gap-2">
                  <span className="text-gray-500">
                    {selectedContact.propertyId
                      ? "رقم مرجع العقار: "
                      : "رقم مرجع المشروع: "}
                  </span>
                  <Link
                    href={
                      selectedContact.propertyId
                        ? `/admin/properties/${selectedContact.propertyId}/edit`
                        : `/admin/projects/${selectedContact.projectId}/edit`
                    }
                    className="font-mono font-medium text-[var(--primary)] hover:underline"
                  >
                    {selectedContact.property?.title ??
                      selectedContact.project?.name ??
                      selectedContact.propertyId ??
                      selectedContact.projectId}
                  </Link>
                </div>
              )}

              {/* Message */}
              <div>
                <h4 className="font-bold text-sm text-[var(--text)] mb-2 flex items-center gap-2">
                  <Mail size={16} className="text-[var(--primary)]" /> نص
                  الرسالة:
                </h4>
                <div className="p-4 bg-gray-50 rounded-xl text-sm text-gray-700 whitespace-pre-wrap leading-relaxed border border-gray-100">
                  {selectedContact.message}
                </div>
              </div>

              {/* Admin notes (read-only preview) */}
              {selectedContact.adminNotes && (
                <div>
                  <h4 className="font-bold text-sm text-[var(--text)] mb-2 flex items-center gap-2">
                    <StickyNote size={16} className="text-yellow-500" /> ملاحظات
                    الأدمن:
                  </h4>
                  <div className="p-4 bg-yellow-50 rounded-xl text-sm text-gray-700 whitespace-pre-wrap leading-relaxed border border-yellow-100">
                    {selectedContact.adminNotes}
                  </div>
                </div>
              )}
            </div>

            <div className="p-4 border-t border-gray-100 flex justify-between gap-3 bg-gray-50/80">
              <button
                onClick={() => setViewModalOpen(false)}
                className="px-4 py-2 border bg-white rounded-lg hover:bg-gray-50 font-medium transition-colors text-sm"
              >
                إغلاق
              </button>
              <div className="flex gap-2 text-sm">
                <button
                  onClick={() => {
                    setViewModalOpen(false);
                    openNotesModal(selectedContact);
                  }}
                  className="px-4 py-2 bg-yellow-500 text-white rounded-lg font-medium flex items-center gap-2 hover:bg-yellow-600 transition-colors"
                >
                  <StickyNote size={16} /> ملاحظة
                </button>
                <a
                  href={`mailto:${selectedContact.email}`}
                  className="px-4 py-2 bg-gray-800 text-white rounded-lg font-medium flex items-center gap-2 hover:bg-gray-700 transition-colors"
                >
                  <Mail size={16} /> رد عبر البريد
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Notes Modal ── */}
      {notesModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="p-5 border-b border-gray-100 bg-gray-50/50">
              <h3 className="font-bold text-lg text-[var(--text)] flex items-center gap-2">
                <StickyNote size={18} className="text-yellow-500" /> ملاحظات
                الأدمن
              </h3>
            </div>
            <div className="p-5">
              <textarea
                value={notesText}
                onChange={(e) => setNotesText(e.target.value)}
                rows={5}
                placeholder="اكتب ملاحظاتك هنا..."
                className="w-full border border-gray-200 rounded-lg p-3 text-sm resize-none focus:outline-none focus:border-[var(--primary)]"
              />
            </div>
            <div className="p-4 border-t border-gray-100 flex justify-between gap-3 bg-gray-50/80">
              <button
                onClick={() => setNotesModalOpen(false)}
                className="px-4 py-2 border bg-white rounded-lg hover:bg-gray-50 font-medium transition-colors text-sm"
              >
                إلغاء
              </button>
              <button
                onClick={saveNotes}
                disabled={isSavingNote}
                className="px-4 py-2 bg-[var(--primary)] text-white rounded-lg font-medium flex items-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-60 text-sm"
              >
                <Check size={16} />
                {isSavingNote ? "جاري الحفظ..." : "حفظ الملاحظة"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
