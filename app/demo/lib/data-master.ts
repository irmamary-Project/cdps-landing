export const DEMO_SCHOOL = {
  name: "TK Pelita Harapan",
  address: "Jl. Merdeka No. 15, Jakarta",
  phone: "(021) 1234-5678",
};

export const DEMO_STUDENTS = [
  { id: "s1", nama: "Aisyah Putri", kelas: "TK A", jenis_kelamin: "P" as const, usia: "4 tahun" },
  { id: "s2", nama: "Budi Santoso", kelas: "TK B", jenis_kelamin: "L" as const, usia: "5 tahun" },
  { id: "s3", nama: "Citra Dewi", kelas: "TK A", jenis_kelamin: "P" as const, usia: "3 tahun" },
];

export const DEMO_STUDENTS_FULL = [
  { id: "s1", nama: "Aisyah Putri", kelas: "TK A", ortu: "Ibu Dewi", wa: "0812-3456-7890", status: "Aktif", tgl_masuk: "2025-07-15" },
  { id: "s2", nama: "Budi Santoso", kelas: "TK B", ortu: "Pak Joko", wa: "0812-3456-7891", status: "Aktif", tgl_masuk: "2024-07-15" },
  { id: "s3", nama: "Citra Dewi", kelas: "TK A", ortu: "Ibu Ani", wa: "0812-3456-7892", status: "Aktif", tgl_masuk: "2026-01-10" },
  { id: "s4", nama: "Dimas Prasetyo", kelas: "KB", ortu: "Pak Agus", wa: "0812-3456-7893", status: "Aktif", tgl_masuk: "2026-07-01" },
  { id: "s5", nama: "Erika Fitriani", kelas: "KB", ortu: "Ibu Sari", wa: "0812-3456-7894", status: "Aktif", tgl_masuk: "2026-07-01" },
  { id: "s6", nama: "Fajar Ramadhan", kelas: "TK B", ortu: "Pak Rudi", wa: "0812-3456-7895", status: "Alumni", tgl_masuk: "2024-07-15" },
];

export const DEMO_CLASSES = [
  { id: "c1", nama: "KB", usia: "2-3 tahun", siswa: 8, wali: "Bu Rina", tahun: "2026/2027", status: "Aktif" },
  { id: "c2", nama: "TK A", usia: "4-5 tahun", siswa: 20, wali: "Bu Sari", tahun: "2026/2027", status: "Aktif" },
  { id: "c3", nama: "TK B", usia: "5-6 tahun", siswa: 20, wali: "Pak Budi", tahun: "2026/2027", status: "Aktif" },
];

export const DEMO_STATS = {
  total_siswa: 48,
  total_guru: 12,
  laporan_bulan_ini: 128,
  portofolio_bulan_ini: 256,
  kehadiran_hari_ini: "94%",
};

export const DEMO_TEACHERS = [
  { id: "g1", nama: "Rina Wijaya", role: "Wali Kelas KB", email: "rina@tkpelita.sch.id", wa: "0812-1111-0001", status: "Aktif" },
  { id: "g2", nama: "Sari Indah", role: "Wali Kelas TK A", email: "sari@tkpelita.sch.id", wa: "0812-1111-0002", status: "Aktif" },
  { id: "g3", nama: "Budi Hartono", role: "Wali Kelas TK B", email: "budi@tkpelita.sch.id", wa: "0812-1111-0003", status: "Aktif" },
  { id: "g4", nama: "Dewi Lestari", role: "Guru Pendamping", email: "dewi@tkpelita.sch.id", wa: "0812-1111-0004", status: "Aktif" },
  { id: "g5", nama: "Agus Prasetyo", role: "Guru Olahraga", email: "agus@tkpelita.sch.id", wa: "0812-1111-0005", status: "Izin" },
  { id: "g6", nama: "Fitri Handayani", role: "Guru Seni", email: "fitri@tkpelita.sch.id", wa: "0812-1111-0006", status: "Aktif" },
  { id: "g7", nama: "Ani Rahmawati", role: "Staff Administrasi", email: "ani@tkpelita.sch.id", wa: "0812-1111-0007", status: "Aktif" },
];

export const DEMO_GROWTH_RECORDS: Record<string, Array<{ bulan: string; bb: number; tb: number }>> = {
  s1: [
    { bulan: "Jul '25", bb: 12.5, tb: 88 },
    { bulan: "Okt '25", bb: 13.0, tb: 90 },
    { bulan: "Jan '26", bb: 13.8, tb: 92 },
    { bulan: "Apr '26", bb: 14.2, tb: 94 },
    { bulan: "Jul '26", bb: 15.0, tb: 96 },
  ],
  s2: [
    { bulan: "Jul '25", bb: 15.2, tb: 98 },
    { bulan: "Okt '25", bb: 15.8, tb: 100 },
    { bulan: "Jan '26", bb: 16.5, tb: 102 },
    { bulan: "Apr '26", bb: 17.0, tb: 103 },
    { bulan: "Jul '26", bb: 17.8, tb: 105 },
  ],
  s3: [
    { bulan: "Jan '26", bb: 10.2, tb: 78 },
    { bulan: "Apr '26", bb: 10.8, tb: 81 },
    { bulan: "Jul '26", bb: 11.5, tb: 84 },
  ],
};
