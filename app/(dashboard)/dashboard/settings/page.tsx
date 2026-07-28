"use client";

import { useState, useEffect } from "react";
import { Building2, MapPin, Phone, Mail, Save, Loader2 } from "lucide-react";

export default function SettingsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [form, setForm] = useState({ name: "", address: "", phone: "", email: "" });

  useEffect(() => {
    fetch("/api/sekolah").then(r => r.json()).then(data => {
      if (data.name) setForm({ name: data.name, address: data.address ?? "", phone: data.phone ?? "", email: data.email ?? "" });
      setLoading(false);
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage("");
    const res = await fetch("/api/sekolah", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    const data = await res.json();
    setMessage(data.success ? "Profil berhasil disimpan" : data.error || "Gagal menyimpan");
    setSaving(false);
  };

  if (loading) return <div className="p-4 sm:p-6 lg:p-8 max-w-3xl mx-auto"><div className="animate-pulse space-y-4"><div className="h-8 bg-gray-100 rounded-lg w-48" /><div className="h-64 bg-gray-50 rounded-xl" /></div></div>;

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-3xl mx-auto">
      <div className="mb-6">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Pengaturan</h1>
        <p className="text-gray-500 text-sm mt-1">Profil dan konfigurasi sekolah</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-5 sm:p-6 border-b border-gray-100">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-primary-pale flex items-center justify-center flex-shrink-0">
              <Building2 size={28} className="text-primary" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">{form.name || "Sekolah"}</h2>
              <p className="text-xs text-gray-400">Informasi profil sekolah</p>
            </div>
          </div>
        </div>

        <div className="p-5 sm:p-6 space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Nama Sekolah</label>
            <input value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Alamat</label>
            <div className="relative">
              <MapPin size={15} className="absolute left-3 top-3 text-gray-300" />
              <input value={form.address} onChange={e => setForm(p => ({ ...p, address: e.target.value }))} className="w-full pl-9 pr-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Telepon</label>
              <div className="relative">
                <Phone size={15} className="absolute left-3 top-3 text-gray-300" />
                <input value={form.phone} onChange={e => setForm(p => ({ ...p, phone: e.target.value }))} className="w-full pl-9 pr-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email</label>
              <div className="relative">
                <Mail size={15} className="absolute left-3 top-3 text-gray-300" />
                <input value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} type="email" className="w-full pl-9 pr-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
              </div>
            </div>
          </div>
        </div>

        <div className="px-5 sm:px-6 py-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
          {message && <span className={`text-sm ${message === "Profil berhasil disimpan" ? "text-green-600" : "text-red-600"}`}>{message}</span>}
          <button type="submit" disabled={saving} className="ml-auto inline-flex items-center gap-2 bg-primary hover:bg-primary-light disabled:opacity-50 text-white text-sm font-bold px-6 py-2.5 rounded-full transition-all">
            {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
            {saving ? "Menyimpan..." : "Simpan Perubahan"}
          </button>
        </div>
      </form>
    </div>
  );
}
