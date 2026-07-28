"use client";

import { useState, useEffect, useCallback } from "react";
import { Search, CalendarDays, Plus, X, Loader2 } from "lucide-react";

const ASPEK_LIST = [
  { key: "motorik", label: "Motorik" },
  { key: "kognitif", label: "Kognitif" },
  { key: "bahasa", label: "Bahasa" },
  { key: "sosial", label: "Sosial Emosional" },
  { key: "seni", label: "Seni & Kreativitas" },
  { key: "agama", label: "Nilai Agama" },
  { key: "mandiri", label: "Kemandirian" },
  { key: "fisik", label: "Fisik" },
];

function PortofolioSection() {
  const [data, setData] = useState<any[]>([]);
  const [lightbox, setLightbox] = useState<{ url: string; nama: string } | null>(null);
  const [modal, setModal] = useState(false);
  const [saving, setSaving] = useState(false);
  const [siswaList, setSiswaList] = useState<any[]>([]);

  const load = useCallback(async () => {
    const [d, s] = await Promise.all([fetch("/api/portofolio").then(r => r.json()), fetch("/api/siswa").then(r => r.json())]);
    setData(d); setSiswaList(s);
  }, []);

  useEffect(() => { load(); }, [load]);

  const [form, setForm] = useState<any>({
    student_id: "", tanggal: new Date().toISOString().split("T")[0], sesi: "Pagi",
    judul: "", observasi: "", catatan_ortu: "", aspek: [], media_urls: [],
  });
  const resetForm = () => setForm({
    student_id: "", tanggal: new Date().toISOString().split("T")[0], sesi: "Pagi",
    judul: "", observasi: "", catatan_ortu: "", aspek: [], media_urls: [],
  });

  const toggleAspek = (key: string) => {
    setForm((p: any) => ({ ...p, aspek: p.aspek.includes(key) ? p.aspek.filter((a: string) => a !== key) : [...p.aspek, key] }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const res = await fetch("/api/portofolio", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    if (res.ok) { setModal(false); resetForm(); load(); }
    setSaving(false);
  };

  const [mediaInput, setMediaInput] = useState("");

  return (<div className="max-w-6xl mx-auto">
    <div className="mb-6 flex justify-end">
      <button onClick={() => setModal(true)} className="inline-flex items-center gap-1.5 bg-primary hover:bg-primary-light text-white text-sm font-bold px-4 py-2 rounded-lg transition-all"><Plus size={16} /> Portofolio Baru</button>
    </div>
    {data.length === 0 ? <div className="bg-white rounded-xl p-8 text-center text-sm text-gray-400 border border-gray-100">Belum ada portofolio</div>
    : <div className="grid md:grid-cols-2 gap-6">{data.map((p: any) => <div key={p.id} className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="p-4 sm:p-5 border-b border-gray-50">
        <div className="flex items-center gap-3">
          <Avatar name={p.students?.nama || ""} />
          <div><div className="text-sm font-bold text-gray-900">{p.students?.nama}</div><div className="text-xs text-gray-400">{p.tanggal} · {p.sesi}</div></div>
        </div>
      </div>
      <div className="p-4 sm:p-5">
        <div className="grid grid-cols-3 gap-2">
          {(p.media_urls || []).slice(0, 6).map((m: any, i: number) => {
            const url = typeof m === "string" ? m : m.url;
            return <button key={i} onClick={() => setLightbox({ url, nama: p.judul || "Foto" })} className="aspect-square rounded-lg overflow-hidden bg-gray-100 group relative">
              <img src={url} alt="" className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105" loading="lazy" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center"><span className="text-white text-xl opacity-0 group-hover:opacity-100 transition-opacity">+</span></div>
            </button>;
          })}
        </div>
        <p className="text-xs text-gray-600 mt-3 leading-relaxed">{p.observasi}</p>
        <div className="flex flex-wrap gap-1.5 mt-3">
          {(p.aspek || []).map((k: string) => { const label = ASPEK_LIST.find(a => a.key === k)?.label || k; return <span key={k} className="text-[11px] bg-primary-pale text-primary px-2 py-0.5 rounded-full">{label}</span>; })}
        </div>
        {p.catatan_ortu && <p className="text-xs text-gray-400 mt-2 italic">"{p.catatan_ortu}"</p>}
      </div>
    </div>)}</div>}

    {lightbox && <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4" onClick={() => setLightbox(null)}>
      <button className="absolute top-4 right-4 text-white/70 hover:text-white text-3xl z-10" onClick={() => setLightbox(null)}>✕</button>
      <img src={lightbox.url} alt={lightbox.nama} className="max-w-full max-h-[90vh] rounded-lg object-contain shadow-2xl" onClick={e => e.stopPropagation()} />
      <div className="absolute bottom-4 text-white/60 text-sm">{lightbox.nama}</div>
    </div>}

    {modal && <Modal title="Portofolio Baru" onClose={() => { setModal(false); resetForm(); }}>
      <form onSubmit={handleSubmit} className="space-y-4">
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
        <div className="grid sm:grid-cols-2 gap-4">
          <div><label className="block text-sm font-semibold text-gray-700 mb-1">Sesi</label>
            <select value={form.sesi} onChange={e => setForm((p: any) => ({ ...p, sesi: e.target.value }))} className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl text-gray-600 bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary">
              <option value="Pagi">Pagi</option><option value="Siang">Siang</option><option value="Full Day">Full Day</option>
            </select>
          </div>
          <div><label className="block text-sm font-semibold text-gray-700 mb-1">Judul</label>
            <input value={form.judul} onChange={e => setForm((p: any) => ({ ...p, judul: e.target.value }))} className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
          </div>
        </div>
        <div><label className="block text-sm font-semibold text-gray-700 mb-1">Observasi</label>
          <textarea rows={3} value={form.observasi} onChange={e => setForm((p: any) => ({ ...p, observasi: e.target.value }))} className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none" />
        </div>
        <div><label className="block text-sm font-semibold text-gray-700 mb-1">Aspek Perkembangan</label>
          <div className="flex flex-wrap gap-2">
            {ASPEK_LIST.map(a => <button key={a.key} type="button" onClick={() => toggleAspek(a.key)} className={`text-xs px-3 py-1.5 rounded-lg border transition-all ${form.aspek.includes(a.key) ? "bg-primary-pale border-primary/30 text-primary" : "border-gray-200 text-gray-500 hover:border-gray-300"}`}>{a.label}</button>)}
          </div>
        </div>
        <div><label className="block text-sm font-semibold text-gray-700 mb-1">Foto (URL)</label>
          <div className="flex gap-2 mb-2">
            <input value={mediaInput} onChange={e => setMediaInput(e.target.value)} placeholder="https://..." className="flex-1 px-4 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
            <button type="button" onClick={() => { if (mediaInput) { setForm((p: any) => ({ ...p, media_urls: [...(p.media_urls || []), mediaInput] })); setMediaInput(""); } }} className="bg-gray-100 text-gray-600 text-sm font-bold px-4 py-2 rounded-xl hover:bg-gray-200 transition-all">Tambah</button>
          </div>
          <div className="flex flex-wrap gap-2">
            {(form.media_urls || []).map((url: string, i: number) => <div key={i} className="flex items-center gap-1 text-xs bg-gray-50 px-3 py-1.5 rounded-lg"><span className="text-gray-600 truncate max-w-[200px]">{url}</span>
              <button type="button" onClick={() => setForm((p: any) => ({ ...p, media_urls: p.media_urls.filter((_: any, j: number) => j !== i) }))} className="text-red-400 hover:text-red-600 ml-1">✕</button>
            </div>)}
          </div>
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

function RiwayatPortofolioSection() {
  const [data, setData] = useState<any[]>([]);
  const [siswa, setSiswa] = useState("");
  const [aspek, setAspek] = useState("");
  const [tanggalAwal, setTanggalAwal] = useState("");
  const [tanggalAkhir, setTanggalAkhir] = useState("");
  const [lightbox, setLightbox] = useState<string | null>(null);
  const [siswaList, setSiswaList] = useState<any[]>([]);

  const load = useCallback(async () => {
    const params = new URLSearchParams();
    if (siswa) params.set("siswa_id", siswa);
    if (tanggalAwal) params.set("from", tanggalAwal);
    if (tanggalAkhir) params.set("to", tanggalAkhir);
    params.set("limit", "100");
    const [d, s] = await Promise.all([fetch(`/api/portofolio?${params}`).then(r => r.json()), fetch("/api/siswa").then(r => r.json())]);
    setData(d); setSiswaList(s);
  }, [siswa, tanggalAwal, tanggalAkhir]);

  useEffect(() => { load(); }, [load]);

  const filtered = aspek ? data.filter((p: any) => (p.aspek || []).includes(aspek)) : data;

  return <div className="max-w-6xl mx-auto">
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 sm:p-5 mb-6">
      <div className="flex flex-col sm:flex-row gap-3 flex-wrap">
        <select value={siswa} onChange={e => setSiswa(e.target.value)} className="text-sm border border-gray-200 rounded-lg px-3 py-2 text-gray-600 bg-white">
          <option value="">Semua Siswa</option>{siswaList.map((s: any) => <option key={s.id} value={s.id}>{s.nama}</option>)}
        </select>
        <select value={aspek} onChange={e => setAspek(e.target.value)} className="text-sm border border-gray-200 rounded-lg px-3 py-2 text-gray-600 bg-white">
          <option value="">Semua Aspek</option>{ASPEK_LIST.map(a => <option key={a.key} value={a.key}>{a.label}</option>)}
        </select>
        <input type="date" value={tanggalAwal} onChange={e => setTanggalAwal(e.target.value)} className="text-sm border border-gray-200 rounded-lg px-3 py-2 text-gray-600 bg-white" />
        <span className="hidden sm:inline text-gray-300 self-center">–</span>
        <input type="date" value={tanggalAkhir} onChange={e => setTanggalAkhir(e.target.value)} className="text-sm border border-gray-200 rounded-lg px-3 py-2 text-gray-600 bg-white" />
      </div>
    </div>
    {filtered.length === 0 ? <div className="bg-white rounded-xl p-8 text-center text-sm text-gray-400 border border-gray-100">Tidak ada portofolio</div>
    : <div className="grid md:grid-cols-2 gap-6">{filtered.map((p: any) => {
      const firstMedia = Array.isArray(p.media_urls) && p.media_urls.length > 0 ? (typeof p.media_urls[0] === "string" ? p.media_urls[0] : p.media_urls[0].url) : null;
      return <div key={p.id} className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        {firstMedia && <button onClick={() => setLightbox(firstMedia)} className="w-full aspect-video bg-gray-100 overflow-hidden group">
          <img src={firstMedia} alt={p.judul} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
        </button>}
        <div className="p-4 sm:p-5">
          <div className="flex items-center gap-2 mb-2">
            <Avatar name={p.students?.nama || ""} size="sm" />
            <div><div className="text-sm font-semibold text-gray-900">{p.students?.nama}</div><div className="text-xs text-gray-400">{p.tanggal}</div></div>
          </div>
          {p.judul && <h3 className="text-sm font-bold text-gray-900 mb-1">{p.judul}</h3>}
          <p className="text-xs text-gray-500 leading-relaxed mb-3">{p.observasi}</p>
          <div className="flex flex-wrap gap-1.5">
            {(p.aspek || []).map((k: string) => { const label = ASPEK_LIST.find(a => a.key === k)?.label || k; return <span key={k} className="text-[11px] bg-primary-pale text-primary px-2 py-0.5 rounded-full">{label}</span>; })}
          </div>
        </div>
      </div>;
    })}</div>}

    {lightbox && <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4" onClick={() => setLightbox(null)}>
      <button className="absolute top-4 right-4 text-white/70 hover:text-white text-3xl z-10" onClick={() => setLightbox(null)}>✕</button>
      <img src={lightbox} alt="Preview" className="max-w-full max-h-[90vh] rounded-lg object-contain shadow-2xl" onClick={e => e.stopPropagation()} />
    </div>}
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
  { key: "portofolio", label: "Portofolio" },
  { key: "riwayat", label: "Riwayat" },
];

export default function PortofolioPage() {
  const [tab, setTab] = useState("portofolio");

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Portofolio</h1>
          <p className="text-gray-500 text-sm mt-1">Dokumentasi foto kegiatan siswa</p>
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
      {tab === "portofolio" && <PortofolioSection />}
      {tab === "riwayat" && <RiwayatPortofolioSection />}
    </div>
  );
}
