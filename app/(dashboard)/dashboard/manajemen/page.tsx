"use client";

import { useState, useEffect, useCallback } from "react";
import { Search, Plus, X, Loader2, Users, UserCheck, Calendar, Settings, Pencil, Trash2 } from "lucide-react";

type Siswa = { id: string; nama: string; nis: string; kelas?: string; ortu_nama: string; ortu_wa: string; status: string; classes?: { nama: string } | null; tempat_lahir: string; tanggal_lahir: string };
type Kelas = { id: string; nama: string; usia: string; wali_id: string; status: string };
type Guru = { id: string; nama: string; email: string; role: string; is_active: boolean; phone: string };

const emptySiswa = { nama: "", nis: "", ortu_nama: "", ortu_wa: "", status: "Aktif", tempat_lahir: "", tanggal_lahir: "" };
const emptyKelas = { nama: "", usia: "", wali_id: "", status: "Aktif" };

function SiswaTab() {
  const [data, setData] = useState<Siswa[]>([]);
  const [kelasList, setKelasList] = useState<Kelas[]>([]);
  const [search, setSearch] = useState("");
  const [filterKelas, setFilterKelas] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [modal, setModal] = useState<{ open: boolean; edit?: Siswa }>({ open: false });
  const [form, setForm] = useState(emptySiswa);
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    const [s, k] = await Promise.all([fetch("/api/siswa").then(r => r.json()), fetch("/api/kelas").then(r => r.json())]);
    setData(s); setKelasList(k);
  }, []);

  useEffect(() => { load(); }, [load]);

  useEffect(() => {
    if (modal.edit) {
      setForm({
        nama: modal.edit.nama ?? "",
        nis: modal.edit.nis ?? "",
        ortu_nama: modal.edit.ortu_nama ?? "",
        ortu_wa: modal.edit.ortu_wa ?? "",
        status: modal.edit.status ?? "Aktif",
        tempat_lahir: modal.edit.tempat_lahir ?? "",
        tanggal_lahir: modal.edit.tanggal_lahir ?? "",
      });
    } else {
      setForm(emptySiswa);
    }
  }, [modal]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const url = modal.edit ? `/api/siswa/${modal.edit.id}` : "/api/siswa";
    const method = modal.edit ? "PUT" : "POST";
    const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    if (res.ok) { setModal({ open: false }); load(); }
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Hapus siswa ini?")) return;
    await fetch(`/api/siswa/${id}`, { method: "DELETE" });
    load();
  };

  const filtered = data.filter(s => {
    if (search && !s.nama.toLowerCase().includes(search.toLowerCase())) return false;
    if (filterKelas && (s.classes?.nama ?? "") !== filterKelas) return false;
    if (filterStatus && s.status !== filterStatus) return false;
    return true;
  });

  const kelasOptions = [...new Set(data.map(s => s.classes?.nama).filter(Boolean))];

  return (<div className="max-w-6xl mx-auto">
    <div className="grid grid-cols-3 gap-4 mb-6">
      <StatBox value={data.length} label="Total Siswa" />
      <StatBox value={data.filter(s => s.status === "Aktif").length} label="Aktif" className="text-green-600" />
      <StatBox value={data.filter(s => s.status === "Alumni").length} label="Alumni" className="text-gray-400" />
    </div>

    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="p-4 sm:p-5 border-b border-gray-100 flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <div className="relative flex-1 max-w-xs">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Cari siswa..." className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
        </div>
        <div className="flex gap-2 flex-wrap">
          <select value={filterKelas} onChange={e => setFilterKelas(e.target.value)} className="text-sm border border-gray-200 rounded-lg px-3 py-2 text-gray-600 bg-white">
            <option value="">Semua Kelas</option>
            {kelasOptions.map(k => <option key={k} value={k!}>{k}</option>)}
          </select>
          <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} className="text-sm border border-gray-200 rounded-lg px-3 py-2 text-gray-600 bg-white">
            <option value="">Semua Status</option>
            <option value="Aktif">Aktif</option>
            <option value="Alumni">Alumni</option>
          </select>
          <button onClick={() => setModal({ open: true })} className="inline-flex items-center gap-1.5 bg-primary hover:bg-primary-light text-white text-sm font-bold px-4 py-2 rounded-lg transition-all"><Plus size={16} /> Tambah</button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead><tr className="bg-gray-50 text-left">
            <th className="px-5 py-3 font-semibold text-gray-600">Nama</th>
            <th className="px-5 py-3 font-semibold text-gray-600">NIS</th>
            <th className="px-5 py-3 font-semibold text-gray-600 hidden sm:table-cell">Kelas</th>
            <th className="px-5 py-3 font-semibold text-gray-600 hidden md:table-cell">Orang Tua</th>
            <th className="px-5 py-3 font-semibold text-gray-600 hidden lg:table-cell">No. WA</th>
            <th className="px-5 py-3 font-semibold text-gray-600">Status</th>
            <th className="px-5 py-3 font-semibold text-gray-600"></th>
          </tr></thead>
          <tbody className="divide-y divide-gray-50">
            {filtered.map(s => (<tr key={s.id} className="hover:bg-gray-50/50">
              <td className="px-5 py-3"><div className="flex items-center gap-3"><Avatar name={s.nama} /><span className="font-semibold text-gray-900">{s.nama}</span></div></td>
              <td className="px-5 py-3 text-gray-600">{s.nis || "–"}</td>
              <td className="px-5 py-3 text-gray-600 hidden sm:table-cell">{s.classes?.nama || "–"}</td>
              <td className="px-5 py-3 text-gray-600 hidden md:table-cell">{s.ortu_nama || "–"}</td>
              <td className="px-5 py-3 text-gray-600 hidden lg:table-cell">{s.ortu_wa || "–"}</td>
              <td className="px-5 py-3"><StatusBadge status={s.status} activeLabel="Aktif" inactiveLabel="Alumni" /></td>
              <td className="px-5 py-3"><div className="flex gap-1">
                <button onClick={() => setModal({ open: true, edit: s })} className="p-1.5 text-gray-400 hover:text-primary rounded-lg hover:bg-primary-pale transition-colors"><Pencil size={15} /></button>
                <button onClick={() => handleDelete(s.id)} className="p-1.5 text-gray-400 hover:text-red-500 rounded-lg hover:bg-red-50 transition-colors"><Trash2 size={15} /></button>
              </div></td>
            </tr>))}
            {filtered.length === 0 && <tr><td colSpan={7} className="px-5 py-8 text-center text-sm text-gray-400">Belum ada siswa</td></tr>}
          </tbody>
        </table>
      </div>
    </div>

    {modal.open && <Modal title={modal.edit ? "Edit Siswa" : "Tambah Siswa"} onClose={() => setModal({ open: false })}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div><label className="block text-sm font-semibold text-gray-700 mb-1">Nama Lengkap</label><input required value={form.nama} onChange={e => setForm(p => ({ ...p, nama: e.target.value }))} className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" /></div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div><label className="block text-sm font-semibold text-gray-700 mb-1">NIS</label><input value={form.nis} onChange={e => setForm(p => ({ ...p, nis: e.target.value }))} className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" /></div>
          <div><label className="block text-sm font-semibold text-gray-700 mb-1">Status</label><select value={form.status} onChange={e => setForm(p => ({ ...p, status: e.target.value }))} className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl text-gray-600 bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"><option value="Aktif">Aktif</option><option value="Alumni">Alumni</option></select></div>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div><label className="block text-sm font-semibold text-gray-700 mb-1">Tempat Lahir</label><input value={form.tempat_lahir} onChange={e => setForm(p => ({ ...p, tempat_lahir: e.target.value }))} className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" /></div>
          <div><label className="block text-sm font-semibold text-gray-700 mb-1">Tanggal Lahir</label><input type="date" value={form.tanggal_lahir} onChange={e => setForm(p => ({ ...p, tanggal_lahir: e.target.value }))} className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" /></div>
        </div>
        <div><label className="block text-sm font-semibold text-gray-700 mb-1">Nama Orang Tua</label><input value={form.ortu_nama} onChange={e => setForm(p => ({ ...p, ortu_nama: e.target.value }))} className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" /></div>
        <div><label className="block text-sm font-semibold text-gray-700 mb-1">No. WhatsApp Orang Tua</label><input value={form.ortu_wa} onChange={e => setForm(p => ({ ...p, ortu_wa: e.target.value }))} className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" /></div>
        <div className="flex justify-end gap-3 pt-2">
          <button type="button" onClick={() => setModal({ open: false })} className="text-sm font-semibold text-gray-500 px-4 py-2.5 rounded-xl hover:bg-gray-50 transition-all">Batal</button>
          <button type="submit" disabled={saving} className="inline-flex items-center gap-2 bg-primary hover:bg-primary-light disabled:opacity-50 text-white text-sm font-bold px-6 py-2.5 rounded-xl transition-all">{saving && <Loader2 size={16} className="animate-spin" />}Simpan</button>
        </div>
      </form>
    </Modal>}
  </div>);
}

function KelasTab() {
  const [data, setData] = useState<Kelas[]>([]);
  const [guruList, setGuruList] = useState<Guru[]>([]);
  const [siswaMap, setSiswaMap] = useState<Record<string, number>>({});
  const [modal, setModal] = useState<{ open: boolean; edit?: Kelas }>({ open: false });
  const [form, setForm] = useState(emptyKelas);
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    const [k, g, s] = await Promise.all([fetch("/api/kelas").then(r => r.json()), fetch("/api/guru").then(r => r.json()), fetch("/api/siswa").then(r => r.json())]);
    setData(k);
    setGuruList(g);
    const map: Record<string, number> = {};
    for (const siswa of s) {
      const namaKelas = siswa.classes?.nama;
      if (namaKelas) map[namaKelas] = (map[namaKelas] || 0) + 1;
    }
    setSiswaMap(map);
  }, []);

  useEffect(() => { load(); }, [load]);

  useEffect(() => {
    if (modal.edit) { setForm({ nama: modal.edit.nama, usia: modal.edit.usia ?? "", wali_id: modal.edit.wali_id ?? "", status: modal.edit.status ?? "Aktif" }); }
    else { setForm(emptyKelas); }
  }, [modal]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const res = await fetch("/api/kelas", { method: modal.edit ? "PUT" : "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(modal.edit ? { id: modal.edit.id, ...form } : form) });
    if (res.ok) { setModal({ open: false }); load(); }
    setSaving(false);
  };

  return (<div className="max-w-6xl mx-auto">
    <div className="flex justify-between items-center mb-6">
      <div className="grid grid-cols-3 gap-4 flex-1">
        <StatBox value={data.length} label="Total Kelas" />
        <StatBox value={data.filter(k => k.status === "Aktif").length} label="Aktif" className="text-green-600" />
        <StatBox value={Object.values(siswaMap).reduce((a, b) => a + b, 0)} label="Total Siswa" />
      </div>
      <button onClick={() => setModal({ open: true })} className="ml-4 inline-flex items-center gap-1.5 bg-primary hover:bg-primary-light text-white text-sm font-bold px-4 py-2 rounded-lg transition-all"><Plus size={16} /> Tambah</button>
    </div>
    <div className="grid md:grid-cols-3 gap-6">
      {data.map(cls => (<div key={cls.id} className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-5 sm:p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">{cls.nama}</h2>
            <span className="text-xs font-bold bg-primary-pale text-primary px-3 py-1 rounded-full">{cls.usia}</span>
          </div>
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-sm"><Users size={16} className="text-primary" /><span className="text-gray-600"><strong className="text-gray-900">{siswaMap[cls.nama] || 0}</strong> siswa</span></div>
            <div className="flex items-center gap-3 text-sm"><UserCheck size={16} className="text-accent" /><span className="text-gray-600">Wali: <strong className="text-gray-900">{guruList.find(g => g.id === cls.wali_id)?.nama || "–"}</strong></span></div>
            <div className="flex items-center gap-3 text-sm"><Calendar size={16} className="text-secondary" /><span className="text-gray-600">2026/2027</span></div>
          </div>
          <div className="mt-5 pt-4 border-t border-gray-50 flex items-center justify-between">
            <StatusBadge status={cls.status} activeLabel="Aktif" inactiveLabel="Nonaktif" />
            <button onClick={() => setModal({ open: true, edit: cls })} className="inline-flex items-center gap-1.5 text-xs text-primary font-semibold hover:bg-primary-pale px-3 py-1.5 rounded-lg transition-colors"><Settings size={14} /> Atur</button>
          </div>
        </div>
      </div>))}
      {data.length === 0 && <div className="col-span-full bg-white rounded-xl p-8 text-center text-sm text-gray-400 border border-gray-100">Belum ada kelas</div>}
    </div>

    {modal.open && <Modal title={modal.edit ? "Edit Kelas" : "Tambah Kelas"} onClose={() => setModal({ open: false })}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div><label className="block text-sm font-semibold text-gray-700 mb-1">Nama Kelas</label><input required value={form.nama} onChange={e => setForm(p => ({ ...p, nama: e.target.value }))} className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" /></div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div><label className="block text-sm font-semibold text-gray-700 mb-1">Usia</label><input value={form.usia} onChange={e => setForm(p => ({ ...p, usia: e.target.value }))} placeholder="2-3 tahun" className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" /></div>
          <div><label className="block text-sm font-semibold text-gray-700 mb-1">Status</label><select value={form.status} onChange={e => setForm(p => ({ ...p, status: e.target.value }))} className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl text-gray-600 bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"><option value="Aktif">Aktif</option><option value="Nonaktif">Nonaktif</option></select></div>
        </div>
        <div><label className="block text-sm font-semibold text-gray-700 mb-1">Wali Kelas</label><select value={form.wali_id} onChange={e => setForm(p => ({ ...p, wali_id: e.target.value }))} className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl text-gray-600 bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"><option value="">– Pilih Guru –</option>{guruList.map(g => <option key={g.id} value={g.id}>{g.nama}</option>)}</select></div>
        <div className="flex justify-end gap-3 pt-2">
          <button type="button" onClick={() => setModal({ open: false })} className="text-sm font-semibold text-gray-500 px-4 py-2.5 rounded-xl hover:bg-gray-50 transition-all">Batal</button>
          <button type="submit" disabled={saving} className="inline-flex items-center gap-2 bg-primary hover:bg-primary-light disabled:opacity-50 text-white text-sm font-bold px-6 py-2.5 rounded-xl transition-all">{saving && <Loader2 size={16} className="animate-spin" />}Simpan</button>
        </div>
      </form>
    </Modal>}
  </div>);
}

function GuruTab() {
  const [data, setData] = useState<Guru[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => { fetch("/api/guru").then(r => r.json()).then(setData); }, []);

  const filtered = data.filter(g => !search || g.nama.toLowerCase().includes(search.toLowerCase()));
  const aktif = data.filter(g => g.is_active).length;

  return (<div className="max-w-6xl mx-auto">
    <div className="grid grid-cols-3 gap-4 mb-6">
      <StatBox value={data.length} label="Total Guru" />
      <StatBox value={aktif} label="Aktif" className="text-green-600" />
      <StatBox value={data.length - aktif} label="Nonaktif / Izin" className="text-gray-400" />
    </div>
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="p-4 sm:p-5 border-b border-gray-100">
        <div className="relative max-w-xs">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Cari guru..." className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead><tr className="bg-gray-50 text-left">
            <th className="px-5 py-3 font-semibold text-gray-600">Nama</th>
            <th className="px-5 py-3 font-semibold text-gray-600">Role</th>
            <th className="px-5 py-3 font-semibold text-gray-600 hidden sm:table-cell">Email</th>
            <th className="px-5 py-3 font-semibold text-gray-600 hidden md:table-cell">No. WA</th>
            <th className="px-5 py-3 font-semibold text-gray-600">Status</th>
          </tr></thead>
          <tbody className="divide-y divide-gray-50">
            {filtered.map(g => (<tr key={g.id} className="hover:bg-gray-50/50">
              <td className="px-5 py-3"><div className="flex items-center gap-3"><Avatar name={g.nama} /><span className="font-semibold text-gray-900">{g.nama}</span></div></td>
              <td className="px-5 py-3 text-gray-600">{g.role}</td>
              <td className="px-5 py-3 text-gray-600 hidden sm:table-cell">{g.email || "–"}</td>
              <td className="px-5 py-3 text-gray-600 hidden md:table-cell">{g.phone || "–"}</td>
              <td className="px-5 py-3"><StatusBadge status={g.is_active ? "Aktif" : "Nonaktif"} activeLabel="Aktif" inactiveLabel="Nonaktif" /></td>
            </tr>))}
            {filtered.length === 0 && <tr><td colSpan={5} className="px-5 py-8 text-center text-sm text-gray-400">Belum ada guru</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  </div>);
}

function StatBox({ value, label, className = "text-gray-900" }: { value: number | string; label: string; className?: string }) {
  return <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm"><div className={`text-2xl font-bold ${className}`}>{value}</div><div className="text-xs text-gray-400 mt-1">{label}</div></div>;
}

function StatusBadge({ status, activeLabel, inactiveLabel }: { status: string; activeLabel: string; inactiveLabel: string }) {
  const isActive = status === "Aktif";
  return <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${isActive ? "bg-green-50 text-green-600" : "bg-gray-100 text-gray-500"}`}>{isActive ? activeLabel : inactiveLabel}</span>;
}

function Avatar({ name }: { name: string }) {
  const initials = name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase();
  return <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-primary-light flex items-center justify-center text-white font-bold text-xs flex-shrink-0">{initials}</div>;
}

function Modal({ title, children, onClose }: { title: string; children: React.ReactNode; onClose: () => void }) {
  return <div className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center p-4" onClick={onClose}>
    <div className="bg-white rounded-2xl w-full max-w-lg shadow-xl max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
      <div className="flex items-center justify-between p-5 sm:p-6 border-b border-gray-100">
        <h2 className="text-lg font-bold text-gray-900">{title}</h2>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600 p-1"><X size={20} /></button>
      </div>
      <div className="p-5 sm:p-6">{children}</div>
    </div>
  </div>;
}

const TABS = [
  { key: "siswa", label: "Siswa" },
  { key: "kelas", label: "Kelas" },
  { key: "guru", label: "Guru" },
];

export default function ManajemenPage() {
  const [tab, setTab] = useState("siswa");

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Manajemen</h1>
          <p className="text-gray-500 text-sm mt-1">Kelola data siswa, kelas, dan guru</p>
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

      {tab === "siswa" && <SiswaTab />}
      {tab === "kelas" && <KelasTab />}
      {tab === "guru" && <GuruTab />}
    </div>
  );
}
