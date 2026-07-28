"use client";

import { useState, useEffect, useCallback } from "react";
import { Search, CalendarDays, Plus, X, Loader2 } from "lucide-react";

const MOOD_OPTIONS = [
  { value: "senang", emoji: "😊", label: "Senang" },
  { value: "biasa", emoji: "😐", label: "Biasa" },
  { value: "sedih", emoji: "😢", label: "Sedih" },
  { value: "marah", emoji: "😤", label: "Marah" },
];
const MOOD_EMOJI_MAP: Record<string, string> = { senang: "😊", biasa: "😐", sedih: "😢", marah: "😤" };
const SESI = ["Pagi", "Siang", "Full Day"];

function DataBadge({ label, value }: { label: string; value: string }) {
  return <div className="bg-gray-50 rounded-lg px-3 py-2"><div className="text-gray-400 mb-0.5 text-xs">{label}</div><div className="font-semibold text-gray-800 text-sm">{value}</div></div>;
}

function DailyReportSection() {
  const [data, setData] = useState<any[]>([]);
  const [siswaList, setSiswaList] = useState<any[]>([]);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [selectedSiswa, setSelectedSiswa] = useState("");
  const [modal, setModal] = useState(false);
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    const params = new URLSearchParams();
    if (selectedSiswa) params.set("siswa_id", selectedSiswa);
    const [d, s] = await Promise.all([fetch(`/api/laporan?${params}`).then(r => r.json()), fetch("/api/siswa").then(r => r.json())]);
    setData(d); setSiswaList(s);
  }, [selectedSiswa]);

  useEffect(() => { load(); }, [load]);

  const [form, setForm] = useState<any>({
    student_id: "", tanggal: new Date().toISOString().split("T")[0], sesi: "Pagi", kehadiran: "Hadir",
    mood_datang: "biasa", kondisi_kesehatan: "Sehat", suhu_tubuh: "36.5",
    sarapan: "", snack_pagi: "", makan_siang: "", snack_sore: "", minum_gelas: "3",
    tidur_siang: "Tidur", durasi_tidur: "1 jam", bak_kali: "3", bab: "Normal",
    ibadah_checklist: [], observasi_guru: "", catatan_ortu: "",
  });
  const resetForm = () => setForm({
    student_id: "", tanggal: new Date().toISOString().split("T")[0], sesi: "Pagi", kehadiran: "Hadir",
    mood_datang: "biasa", kondisi_kesehatan: "Sehat", suhu_tubuh: "36.5",
    sarapan: "", snack_pagi: "", makan_siang: "", snack_sore: "", minum_gelas: "3",
    tidur_siang: "Tidur", durasi_tidur: "1 jam", bak_kali: "3", bab: "Normal",
    ibadah_checklist: [], observasi_guru: "", catatan_ortu: "",
  });

  const toggleIbadah = (item: string) => {
    setForm((p: any) => ({ ...p, ibadah_checklist: p.ibadah_checklist.includes(item) ? p.ibadah_checklist.filter((i: string) => i !== item) : [...p.ibadah_checklist, item] }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const res = await fetch("/api/laporan", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({
      ...form, minum_gelas: parseInt(form.minum_gelas), bak_kali: parseInt(form.bak_kali), suhu_tubuh: parseFloat(form.suhu_tubuh),
    }) });
    if (res.ok) { setModal(false); resetForm(); load(); }
    setSaving(false);
  };

  return (<div className="max-w-6xl mx-auto">
    <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <select value={selectedSiswa} onChange={e => setSelectedSiswa(e.target.value)} className="text-sm border border-gray-200 rounded-lg px-4 py-2 text-gray-600 bg-white self-start">
        <option value="">Semua Siswa</option>
        {siswaList.map((s: any) => <option key={s.id} value={s.id}>{s.nama}</option>)}
      </select>
      <button onClick={() => setModal(true)} className="inline-flex items-center gap-1.5 bg-primary hover:bg-primary-light text-white text-sm font-bold px-4 py-2 rounded-lg transition-all self-start"><Plus size={16} /> Laporan Baru</button>
    </div>

    {data.length === 0 ? <div className="bg-white rounded-xl p-8 text-center text-sm text-gray-400 border border-gray-100">Belum ada laporan</div>
    : <div className="space-y-4">{data.map((r: any) => {
      const isOpen = expanded === r.id;
      return <div key={r.id} className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <button onClick={() => setExpanded(isOpen ? null : r.id)} className="w-full p-4 sm:p-5 flex items-start justify-between gap-4 text-left hover:bg-gray-50/50 transition-colors">
          <div className="flex items-center gap-3 min-w-0">
            <Avatar name={r.students?.nama || ""} />
            <div className="min-w-0">
              <div className="text-sm font-bold text-gray-900">{r.students?.nama}</div>
              <div className="text-xs text-gray-400 mt-0.5">{r.tanggal} · {r.sesi}</div>
              <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                <span className={`text-[11px] px-2 py-0.5 rounded-full font-medium ${r.kehadiran === "Hadir" ? "bg-green-50 text-green-600" : r.kehadiran === "Izin" ? "bg-yellow-50 text-yellow-600" : "bg-red-50 text-red-600"}`}>{r.kehadiran}</span>
              </div>
            </div>
          </div>
          <div className="text-right flex-shrink-0 flex flex-col items-end gap-1">
            <span className="text-lg">{MOOD_EMOJI_MAP[r.mood_datang] || "–"}</span>
            <span className="text-xs text-gray-300">{isOpen ? "▲" : "▼"}</span>
          </div>
        </button>
        {isOpen && <div className="px-4 sm:px-5 pb-5 border-t border-gray-50">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-4">
            <div className="col-span-full"><h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-3">Kesehatan & Fisik</h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                <DataBadge label="Suhu" value={`${r.suhu_tubuh}°C`} />
                <DataBadge label="Kondisi" value={r.kondisi_kesehatan} />
                <DataBadge label="Bak" value={`${r.bak_kali}x`} />
                <DataBadge label="BAB" value={r.bab} />
                <DataBadge label="Tidur" value={r.tidur_siang} />
                <DataBadge label="Durasi" value={r.durasi_tidur} />
              </div>
            </div>
            <div className="col-span-full"><h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-3">Makan & Minum</h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                <DataBadge label="Sarapan" value={r.sarapan || "–"} />
                <DataBadge label="Snack Pagi" value={r.snack_pagi || "–"} />
                <DataBadge label="Makan Siang" value={r.makan_siang || "–"} />
                <DataBadge label="Snack Sore" value={r.snack_sore || "–"} />
              </div>
              <div className="mt-2 text-xs"><span className="text-gray-400">Minum: </span><span className="font-semibold">{r.minum_gelas} gelas</span></div>
            </div>
            <div className="col-span-full"><h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-3">Observasi</h4>
              <div className="flex flex-wrap gap-1.5 mb-3">{(r.ibadah_checklist || []).map((item: string) => <span key={item} className="text-[11px] bg-green-50 text-green-600 px-2 py-0.5 rounded-full">✓ {item}</span>)}</div>
              <div className="text-xs space-y-2">
                <div><span className="text-gray-400">Observasi Guru:</span><p className="text-gray-700 mt-0.5">{r.observasi_guru}</p></div>
                {r.catatan_ortu && <div><span className="text-gray-400">Catatan Orang Tua:</span><p className="text-gray-700 mt-0.5">{r.catatan_ortu}</p></div>}
              </div>
            </div>
          </div>
        </div>}
      </div>;
    })}</div>}

    {modal && <Modal title="Laporan Baru" onClose={() => { setModal(false); resetForm(); }}>
      <form onSubmit={handleSubmit} className="space-y-4 max-h-[70vh] overflow-y-auto pr-1">
        <div className="grid sm:grid-cols-2 gap-4">
          <div><label className="block text-sm font-semibold text-gray-700 mb-1">Siswa</label>
            <select required value={form.student_id} onChange={e => setForm((p: any) => ({ ...p, student_id: e.target.value }))} className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl text-gray-600 bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary">
              <option value="">– Pilih Siswa –</option>{siswaList.map((s: any) => <option key={s.id} value={s.id}>{s.nama}</option>)}
            </select>
          </div>
          <div><label className="block text-sm font-semibold text-gray-700 mb-1">Tanggal</label>
            <input type="date" required value={form.tanggal} onChange={e => setForm((p: any) => ({ ...p, tanggal: e.target.value }))} className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
          </div>
        </div>
        <div className="grid sm:grid-cols-3 gap-4">
          <div><label className="block text-sm font-semibold text-gray-700 mb-1">Sesi</label>
            <select value={form.sesi} onChange={e => setForm((p: any) => ({ ...p, sesi: e.target.value }))} className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl text-gray-600 bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary">
              {SESI.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div><label className="block text-sm font-semibold text-gray-700 mb-1">Kehadiran</label>
            <select value={form.kehadiran} onChange={e => setForm((p: any) => ({ ...p, kehadiran: e.target.value }))} className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl text-gray-600 bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary">
              <option value="Hadir">Hadir</option><option value="Izin">Izin</option><option value="Sakit">Sakit</option>
            </select>
          </div>
          <div><label className="block text-sm font-semibold text-gray-700 mb-1">Mood</label>
            <select value={form.mood_datang} onChange={e => setForm((p: any) => ({ ...p, mood_datang: e.target.value }))} className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl text-gray-600 bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary">
              {MOOD_OPTIONS.map(m => <option key={m.value} value={m.value}>{m.emoji} {m.label}</option>)}
            </select>
          </div>
        </div>
        <div className="grid sm:grid-cols-3 gap-4">
          <div><label className="block text-sm font-semibold text-gray-700 mb-1">Suhu Tubuh</label>
            <input type="number" step="0.1" value={form.suhu_tubuh} onChange={e => setForm((p: any) => ({ ...p, suhu_tubuh: e.target.value }))} className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
          </div>
          <div><label className="block text-sm font-semibold text-gray-700 mb-1">Kondisi Kesehatan</label>
            <input value={form.kondisi_kesehatan} onChange={e => setForm((p: any) => ({ ...p, kondisi_kesehatan: e.target.value }))} className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
          </div>
          <div><label className="block text-sm font-semibold text-gray-700 mb-1">Bak (kali)</label>
            <input type="number" value={form.bak_kali} onChange={e => setForm((p: any) => ({ ...p, bak_kali: e.target.value }))} className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
          </div>
        </div>
        <div className="grid sm:grid-cols-3 gap-4">
          <div><label className="block text-sm font-semibold text-gray-700 mb-1">BAB</label>
            <select value={form.bab} onChange={e => setForm((p: any) => ({ ...p, bab: e.target.value }))} className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl text-gray-600 bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary">
              <option value="Normal">Normal</option><option value="Keras">Keras</option><option value="Encer">Encer</option><option value="–">–</option>
            </select>
          </div>
          <div><label className="block text-sm font-semibold text-gray-700 mb-1">Tidur Siang</label>
            <select value={form.tidur_siang} onChange={e => setForm((p: any) => ({ ...p, tidur_siang: e.target.value }))} className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl text-gray-600 bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary">
              <option value="Tidur">Tidur</option><option value="Tidak tidur">Tidak tidur</option>
            </select>
          </div>
          <div><label className="block text-sm font-semibold text-gray-700 mb-1">Durasi Tidur</label>
            <input value={form.durasi_tidur} onChange={e => setForm((p: any) => ({ ...p, durasi_tidur: e.target.value }))} placeholder="1 jam" className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
          </div>
        </div>
        <div><label className="block text-sm font-semibold text-gray-700 mb-1">Sarapan</label>
          <input value={form.sarapan} onChange={e => setForm((p: any) => ({ ...p, sarapan: e.target.value }))} placeholder="Nasi goreng, susu, dll" className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
        </div>
        <div className="grid sm:grid-cols-3 gap-4">
          <div><label className="block text-sm font-semibold text-gray-700 mb-1">Snack Pagi</label>
            <input value={form.snack_pagi} onChange={e => setForm((p: any) => ({ ...p, snack_pagi: e.target.value }))} className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
          </div>
          <div><label className="block text-sm font-semibold text-gray-700 mb-1">Makan Siang</label>
            <input value={form.makan_siang} onChange={e => setForm((p: any) => ({ ...p, makan_siang: e.target.value }))} className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
          </div>
          <div><label className="block text-sm font-semibold text-gray-700 mb-1">Snack Sore</label>
            <input value={form.snack_sore} onChange={e => setForm((p: any) => ({ ...p, snack_sore: e.target.value }))} className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
          </div>
        </div>
        <div><label className="block text-sm font-semibold text-gray-700 mb-1">Minum (gelas)</label>
          <input type="number" value={form.minum_gelas} onChange={e => setForm((p: any) => ({ ...p, minum_gelas: e.target.value }))} className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
        </div>
        <div><label className="block text-sm font-semibold text-gray-700 mb-1">Ibadah</label>
          <div className="flex flex-wrap gap-2">
            {["Doa sebelum makan", "Doa sebelum tidur", "Mengaji", "Salam", "Cuci tangan", "Sholat"].map(item => (
              <button key={item} type="button" onClick={() => toggleIbadah(item)} className={`text-xs px-3 py-1.5 rounded-lg border transition-all ${form.ibadah_checklist.includes(item) ? "bg-green-50 border-green-200 text-green-700" : "border-gray-200 text-gray-500 hover:border-gray-300"}`}>{item}</button>
            ))}
          </div>
        </div>
        <div><label className="block text-sm font-semibold text-gray-700 mb-1">Observasi Guru</label>
          <textarea rows={3} value={form.observasi_guru} onChange={e => setForm((p: any) => ({ ...p, observasi_guru: e.target.value }))} className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none" />
        </div>
        <div><label className="block text-sm font-semibold text-gray-700 mb-1">Catatan Orang Tua</label>
          <textarea rows={2} value={form.catatan_ortu} onChange={e => setForm((p: any) => ({ ...p, catatan_ortu: e.target.value }))} className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none" />
        </div>
        <div className="flex justify-end gap-3 pt-2">
          <button type="button" onClick={() => { setModal(false); resetForm(); }} className="text-sm font-semibold text-gray-500 px-4 py-2.5 rounded-xl hover:bg-gray-50 transition-all">Batal</button>
          <button type="submit" disabled={saving} className="inline-flex items-center gap-2 bg-primary hover:bg-primary-light disabled:opacity-50 text-white text-sm font-bold px-6 py-2.5 rounded-xl transition-all">{saving && <Loader2 size={16} className="animate-spin" />}Simpan</button>
        </div>
      </form>
    </Modal>}
  </div>);
}

function RiwayatSection() {
  const [data, setData] = useState<any[]>([]);
  const [siswa, setSiswa] = useState("");
  const [tanggalAwal, setTanggalAwal] = useState("");
  const [tanggalAkhir, setTanggalAkhir] = useState("");
  const [siswaList, setSiswaList] = useState<any[]>([]);

  const load = useCallback(async () => {
    const params = new URLSearchParams();
    if (siswa) params.set("siswa_id", siswa);
    if (tanggalAwal) params.set("from", tanggalAwal);
    if (tanggalAkhir) params.set("to", tanggalAkhir);
    params.set("limit", "100");
    const [d, s] = await Promise.all([fetch(`/api/laporan?${params}`).then(r => r.json()), fetch("/api/siswa").then(r => r.json())]);
    setData(d); setSiswaList(s);
  }, [siswa, tanggalAwal, tanggalAkhir]);

  useEffect(() => { load(); }, [load]);

  const grouped = data.reduce<Record<string, any[]>>((acc, r) => {
    const nama = r.students?.nama || "Tanpa Nama";
    if (!acc[nama]) acc[nama] = [];
    acc[nama].push(r);
    return acc;
  }, {});

  return <div className="max-w-6xl mx-auto">
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 sm:p-5 mb-6">
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
        <div className="flex items-center gap-2"><Search size={16} className="text-gray-300" />
          <select value={siswa} onChange={e => setSiswa(e.target.value)} className="text-sm border border-gray-200 rounded-lg px-3 py-2 text-gray-600 bg-white">
            <option value="">Semua Siswa</option>{siswaList.map((s: any) => <option key={s.id} value={s.id}>{s.nama}</option>)}
          </select>
        </div>
        <div className="flex items-center gap-2"><CalendarDays size={16} className="text-gray-300" />
          <input type="date" value={tanggalAwal} onChange={e => setTanggalAwal(e.target.value)} className="text-sm border border-gray-200 rounded-lg px-3 py-2 text-gray-600 bg-white" />
          <span className="text-gray-300">–</span>
          <input type="date" value={tanggalAkhir} onChange={e => setTanggalAkhir(e.target.value)} className="text-sm border border-gray-200 rounded-lg px-3 py-2 text-gray-600 bg-white" />
        </div>
      </div>
    </div>
    {Object.entries(grouped).length === 0 ? <div className="bg-white rounded-xl p-8 text-center text-sm text-gray-400 border border-gray-100">Tidak ada laporan</div>
    : <div className="space-y-6">{Object.entries(grouped).map(([nama, reports]) => <div key={nama} className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="p-4 sm:p-5 border-b border-gray-100 bg-gray-50/50"><h2 className="text-sm font-bold text-gray-900">{nama}</h2><p className="text-xs text-gray-400">{reports.length} laporan</p></div>
      <div className="divide-y divide-gray-50">{(reports as any[]).map((r: any) => <div key={r.id} className="p-4 sm:p-5 flex items-start justify-between gap-4 hover:bg-gray-50/50">
        <div className="flex items-center gap-3 min-w-0">
          <Avatar name={r.students?.nama || ""} size="xs" />
          <div className="min-w-0"><div className="flex items-center gap-2"><span className="text-sm font-semibold text-gray-900">{r.tanggal}</span><span className="text-xs text-gray-400">· {r.sesi}</span></div><p className="text-xs text-gray-500 mt-1 line-clamp-2">{r.observasi_guru}</p></div>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <span className="text-sm">{MOOD_EMOJI_MAP[r.mood_datang] || "–"}</span>
          <span className={`text-xs font-bold px-2 py-1 rounded-full ${r.kehadiran === "Hadir" ? "bg-green-50 text-green-600" : r.kehadiran === "Izin" ? "bg-yellow-50 text-yellow-600" : "bg-red-50 text-red-600"}`}>{r.kehadiran}</span>
        </div>
      </div>)}</div>
    </div>)}</div>
  </div>;
}

function Avatar({ name, size = "sm" }: { name: string; size?: "xs" | "sm" | "md" }) {
  const initials = name.split(" ").map((n: string) => n[0]).join("").slice(0, 2).toUpperCase();
  const sizeClass = size === "xs" ? "w-7 h-7 text-[10px]" : size === "md" ? "w-10 h-10 text-sm" : "w-8 h-8 text-xs";
  return <div className={`${sizeClass} rounded-full bg-gradient-to-br from-primary to-primary-light flex items-center justify-center text-white font-bold flex-shrink-0`}>{initials}</div>;
}

function Modal({ title, children, onClose }: { title: string; children: React.ReactNode; onClose: () => void }) {
  return <div className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center p-4" onClick={onClose}>
    <div className="bg-white rounded-2xl w-full max-w-xl shadow-xl max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
      <div className="flex items-center justify-between p-5 sm:p-6 border-b border-gray-100 sticky top-0 bg-white z-10">
        <h2 className="text-lg font-bold text-gray-900">{title}</h2>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600 p-1"><X size={20} /></button>
      </div>
      <div className="p-5 sm:p-6">{children}</div>
    </div>
  </div>;
}

const TABS = [
  { key: "daily", label: "Daily Report" },
  { key: "riwayat", label: "Riwayat" },
];

export default function DailyReportPage() {
  const [tab, setTab] = useState("daily");

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Daily Report</h1>
          <p className="text-gray-500 text-sm mt-1">Laporan harian siswa</p>
        </div>
        <div className="flex gap-1 bg-gray-100 rounded-xl p-1">
          {TABS.map(t => (
            <button key={t.key} onClick={() => setTab(t.key)}
              className={`text-sm font-bold px-4 py-2 rounded-lg transition-all ${tab === t.key ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}>
              {t.label}
            </button>
          ))}
        </div>
      </div>
      {tab === "daily" && <DailyReportSection />}
      {tab === "riwayat" && <RiwayatSection />}
    </div>
  );
}
