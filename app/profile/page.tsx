"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useCurrency } from "@/context/CurrencyContext";
import { updateProfile, type UpdateProfilePayload, type FullAddress } from "@/lib/authApi";
import { getMyOrders, type Order } from "@/lib/orderApi";

// ─── Status Badge ────────────────────────────────────────────────────────────
const statusColors: Record<string, { bg: string; text: string }> = {
  PENDING: { bg: "bg-amber-50 border-amber-200", text: "text-amber-700" },
  PROCESSING: { bg: "bg-blue-50 border-blue-200", text: "text-blue-700" },
  SHIPPED: { bg: "bg-purple-50 border-purple-200", text: "text-purple-700" },
  OUT_FOR_DELIVERY: { bg: "bg-indigo-50 border-indigo-200", text: "text-indigo-700" },
  DELIVERED: { bg: "bg-emerald-50 border-emerald-200", text: "text-emerald-700" },
  CANCELLED: { bg: "bg-red-50 border-red-200", text: "text-red-700" },
  PAID: { bg: "bg-emerald-50 border-emerald-200", text: "text-emerald-700" },
  FAILED: { bg: "bg-red-50 border-red-200", text: "text-red-700" },
  REFUNDED: { bg: "bg-gray-50 border-gray-200", text: "text-gray-600" },
};

function StatusBadge({ status }: { status: string }) {
  const colors = statusColors[status] || { bg: "bg-gray-50 border-gray-200", text: "text-gray-600" };
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${colors.bg} ${colors.text}`}>
      {status.replace(/_/g, " ")}
    </span>
  );
}

// ─── Input Field ─────────────────────────────────────────────────────────────
function InputField({ label, value, onChange, disabled, type = "text", required }: {
  label: string; value: string; onChange: (v: string) => void;
  disabled?: boolean; type?: string; required?: boolean;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-600 mb-1.5">
        {label} {required && <span className="text-red-400">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className={`w-full px-4 py-3 border rounded-xl text-sm text-black placeholder:text-gray-300 transition-all
          ${disabled
            ? "bg-gray-50 border-gray-100 text-gray-500 cursor-not-allowed"
            : "border-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-400"
          }`}
      />
    </div>
  );
}

// ─── Section Wrapper ─────────────────────────────────────────────────────────
function Section({ title, children, action }: {
  title: string; children: React.ReactNode; action?: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="flex items-center justify-between px-6 lg:px-8 pt-6 lg:pt-8 pb-4 border-b border-gray-50">
        <h2 className="text-lg font-bold text-black">{title}</h2>
        {action}
      </div>
      <div className="px-6 lg:px-8 py-6">{children}</div>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// PROFILE PAGE
// ═════════════════════════════════════════════════════════════════════════════
export default function ProfilePage() {
  const router = useRouter();
  const { user, isAuthenticated, isLoading: authLoading, openAuthModal, logout } = useAuth();
  const { formatPrice } = useCurrency();

  // ─── Profile edit state ──────────────────────────────────────────────
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [profileSaving, setProfileSaving] = useState(false);
  const [profileMsg, setProfileMsg] = useState("");

  // ─── Address edit state ──────────────────────────────────────────────
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [addressForm, setAddressForm] = useState<FullAddress>({});
  const [addressSaving, setAddressSaving] = useState(false);
  const [addressMsg, setAddressMsg] = useState("");

  // ─── Orders state ────────────────────────────────────────────────────
  const [orders, setOrders] = useState<Order[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(true);
  const [ordersError, setOrdersError] = useState("");

  // ─── Sync user data into form state ──────────────────────────────────
  useEffect(() => {
    if (user) {
      setFirstName(user.first_name || "");
      setLastName(user.last_name || "");
      setPhone(user.phone || "");
      setAddressForm(user.address || {});
    }
  }, [user]);

  // ─── Fetch orders ────────────────────────────────────────────────────
  const fetchOrders = useCallback(async () => {
    try {
      setOrdersLoading(true);
      setOrdersError("");
      const token = localStorage.getItem("marma_access_token");
      if (!token) return;
      const data = await getMyOrders(token);
      setOrders(data);
    } catch {
      setOrdersError("Failed to load order history.");
    } finally {
      setOrdersLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) fetchOrders();
  }, [isAuthenticated, fetchOrders]);

  // ─── Auth guard ──────────────────────────────────────────────────────
  if (authLoading) {
    return (
      <main className="flex items-center justify-center min-h-screen bg-[#F9F9F9]">
        <div className="w-8 h-8 border-3 border-gray-200 border-t-red-500 rounded-full animate-spin" />
      </main>
    );
  }

  if (!isAuthenticated) {
    return (
      <main className="flex flex-col items-center justify-center min-h-screen bg-[#F9F9F9] gap-4 px-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-black mb-2">Sign in to view your profile</h1>
          <p className="text-gray-500 text-sm mb-6">You need to be logged in to access this page.</p>
          <button
            onClick={openAuthModal}
            className="px-8 py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-xl transition-all shadow-[0_4px_14px_rgba(239,68,68,0.25)]"
          >
            Sign In
          </button>
        </div>
      </main>
    );
  }

  // ─── Save profile ────────────────────────────────────────────────────
  const handleSaveProfile = async () => {
    setProfileSaving(true);
    setProfileMsg("");
    try {
      const token = localStorage.getItem("marma_access_token");
      if (!token) return;
      const payload: UpdateProfilePayload = { first_name: firstName, last_name: lastName, phone };
      const updated = await updateProfile(token, payload);
      localStorage.setItem("marma_user", JSON.stringify(updated));
      setProfileMsg("Profile updated!");
      setIsEditingProfile(false);
      setTimeout(() => setProfileMsg(""), 3000);
    } catch {
      setProfileMsg("Failed to update profile.");
    } finally {
      setProfileSaving(false);
    }
  };

  // ─── Save address ────────────────────────────────────────────────────
  const handleSaveAddress = async () => {
    setAddressMsg("");

    // Validate country code before sending
    const code = (addressForm.country_code || "").trim().toUpperCase();
    if (code && code.length !== 2) {
      setAddressMsg("Country code must be a 2-letter ISO code (e.g. IN, US, GB).");
      return;
    }

    setAddressSaving(true);
    try {
      const token = localStorage.getItem("marma_access_token");
      if (!token) return;
      const payload: UpdateProfilePayload = {
        address: { ...addressForm, country_code: code || undefined },
      };
      const updated = await updateProfile(token, payload);
      localStorage.setItem("marma_user", JSON.stringify(updated));
      setAddressMsg("Address updated!");
      setIsEditingAddress(false);
      setTimeout(() => setAddressMsg(""), 3000);
    } catch {
      setAddressMsg("Failed to update address.");
    } finally {
      setAddressSaving(false);
    }
  };

  const initials = `${(user?.first_name || "U")[0]}${(user?.last_name || "")[0] || ""}`.toUpperCase();
  const addr = user?.address;
  const hasAddress = addr && (addr.line1 || addr.city);

  const formatDate = (d?: string) => {
    if (!d) return "";
    return new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
  };

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <main className="flex flex-col bg-[#F9F9F9] min-h-screen pt-24 lg:pt-32 pb-20">
      <div className="max-w-[800px] mx-auto px-6 w-full space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-black">My Profile</h1>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-5 py-2.5 border border-gray-200 text-gray-600 text-sm font-medium rounded-xl hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-all"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>

        {/* ─── PROFILE INFO ──────────────────────────────────────────── */}
        <Section
          title="Profile Information"
          action={
            !isEditingProfile ? (
              <button onClick={() => setIsEditingProfile(true)} className="text-sm text-red-500 font-semibold hover:text-red-600 transition-colors">
                Edit
              </button>
            ) : null
          }
        >
          {profileMsg && (
            <p className={`text-sm mb-4 ${profileMsg.includes("Failed") ? "text-red-500" : "text-emerald-600"}`}>
              {profileMsg}
            </p>
          )}

          <div className="flex items-start gap-5">
            {/* Avatar */}
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center text-white text-xl font-bold flex-shrink-0 shadow-md">
              {initials}
            </div>
            <div className="flex-1 min-w-0">
              {isEditingProfile ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <InputField label="First Name" value={firstName} onChange={setFirstName} required />
                  <InputField label="Last Name" value={lastName} onChange={setLastName} />
                  <InputField label="Phone" value={phone} onChange={setPhone} type="tel" />
                  <InputField label="Email" value={user?.email || ""} onChange={() => {}} disabled />
                  <div className="sm:col-span-2 flex gap-3 pt-2">
                    <button
                      onClick={handleSaveProfile}
                      disabled={profileSaving}
                      className="px-6 py-2.5 bg-red-500 hover:bg-red-600 text-white text-sm font-semibold rounded-xl transition-all disabled:opacity-50"
                    >
                      {profileSaving ? "Saving…" : "Save"}
                    </button>
                    <button
                      onClick={() => { setIsEditingProfile(false); setFirstName(user?.first_name || ""); setLastName(user?.last_name || ""); setPhone(user?.phone || ""); }}
                      className="px-6 py-2.5 border border-gray-200 text-gray-600 text-sm font-medium rounded-xl hover:bg-gray-50 transition-all"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  <p className="text-lg font-semibold text-black">
                    {user?.first_name || ""} {user?.last_name || ""}
                  </p>
                  <p className="text-sm text-gray-500">{user?.email}</p>
                  {user?.phone && <p className="text-sm text-gray-500">{user.phone}</p>}
                </div>
              )}
            </div>
          </div>
        </Section>

        {/* ─── SAVED ADDRESS ─────────────────────────────────────────── */}
        <Section
          title="Saved Address"
          action={
            !isEditingAddress ? (
              <button onClick={() => setIsEditingAddress(true)} className="text-sm text-red-500 font-semibold hover:text-red-600 transition-colors">
                {hasAddress ? "Edit" : "Add"}
              </button>
            ) : null
          }
        >
          {addressMsg && (
            <p className={`text-sm mb-4 ${addressMsg.includes("Failed") ? "text-red-500" : "text-emerald-600"}`}>
              {addressMsg}
            </p>
          )}

          {isEditingAddress ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <InputField label="Address Line 1" value={addressForm.line1 || ""} onChange={(v) => setAddressForm({ ...addressForm, line1: v })} required />
              </div>
              <div className="sm:col-span-2">
                <InputField label="Address Line 2" value={addressForm.line2 || ""} onChange={(v) => setAddressForm({ ...addressForm, line2: v })} />
              </div>
              <InputField label="City" value={addressForm.city || ""} onChange={(v) => setAddressForm({ ...addressForm, city: v })} required />
              <InputField label="State" value={addressForm.state || ""} onChange={(v) => setAddressForm({ ...addressForm, state: v })} required />
              <InputField label="Postal Code" value={addressForm.postal_code || ""} onChange={(v) => setAddressForm({ ...addressForm, postal_code: v })} required />
              <InputField label="Country Code (e.g. IN)" value={addressForm.country_code || ""} onChange={(v) => setAddressForm({ ...addressForm, country_code: v.toUpperCase().slice(0, 2) })} required />
              <div className="sm:col-span-2 flex gap-3 pt-2">
                <button
                  onClick={handleSaveAddress}
                  disabled={addressSaving}
                  className="px-6 py-2.5 bg-red-500 hover:bg-red-600 text-white text-sm font-semibold rounded-xl transition-all disabled:opacity-50"
                >
                  {addressSaving ? "Saving…" : "Save Address"}
                </button>
                <button
                  onClick={() => { setIsEditingAddress(false); setAddressForm(user?.address || {}); }}
                  className="px-6 py-2.5 border border-gray-200 text-gray-600 text-sm font-medium rounded-xl hover:bg-gray-50 transition-all"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : hasAddress ? (
            <div className="text-sm text-gray-700 space-y-0.5">
              <p>{addr?.line1}{addr?.line2 ? `, ${addr.line2}` : ""}</p>
              <p>{[addr?.city, addr?.state, addr?.postal_code].filter(Boolean).join(", ")}</p>
              {addr?.country_code && <p>{addr.country_code}</p>}
            </div>
          ) : (
            <p className="text-sm text-gray-400 italic">No address saved — click Add to set one.</p>
          )}
        </Section>

        {/* ─── ORDER HISTORY ─────────────────────────────────────────── */}
        <Section title="Order History">
          {ordersLoading ? (
            <div className="flex items-center justify-center py-10">
              <div className="w-6 h-6 border-2 border-gray-200 border-t-red-500 rounded-full animate-spin" />
            </div>
          ) : ordersError ? (
            <div className="text-center py-8">
              <p className="text-sm text-red-500 mb-3">{ordersError}</p>
              <button onClick={fetchOrders} className="text-sm text-red-500 font-semibold hover:underline">
                Retry
              </button>
            </div>
          ) : orders.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-gray-400 text-sm mb-3">You haven&apos;t placed any orders yet.</p>
              <button onClick={() => router.push("/store")} className="text-sm text-red-500 font-semibold hover:underline">
                Browse Store
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <div key={order.id} className="border border-gray-100 rounded-xl p-4 hover:shadow-sm transition-shadow">
                  {/* Header */}
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-bold text-black">Order #{order.id}</span>
                      <StatusBadge status={order.orderStatus} />
                      <StatusBadge status={order.paymentStatus} />
                    </div>
                    <span className="text-xs text-gray-400">{formatDate(order.createdAt)}</span>
                  </div>
                  {/* Items */}
                  {Array.isArray(order.items) && order.items.length > 0 && (
                    <div className="space-y-1.5 mb-3">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="flex justify-between text-sm">
                          <span className="text-gray-600">{item.name} <span className="text-gray-400">× {item.quantity}</span></span>
                          <span className="font-medium text-gray-700">{formatPrice(item.price * item.quantity)}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  {/* Total */}
                  <div className="flex justify-between items-center pt-3 border-t border-gray-50">
                    <span className="text-sm font-semibold text-black">Total</span>
                    <span className="text-base font-bold text-red-500">
                      {order.currency && order.currency !== "usd"
                        ? new Intl.NumberFormat(undefined, { style: "currency", currency: order.currency }).format(order.totalAmount)
                        : formatPrice(order.baseAmountUSD || order.totalAmount)
                      }
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Section>
      </div>
    </main>
  );
}
