import { DEMO_STUDENTS } from "./data-master";

export const ASPEK_LIST = [
  { key: "motorik", label: "Motorik" },
  { key: "kognitif", label: "Kognitif" },
  { key: "bahasa", label: "Bahasa" },
  { key: "sosial", label: "Sosial Emosional" },
  { key: "seni", label: "Seni & Kreativitas" },
  { key: "agama", label: "Nilai Agama" },
  { key: "mandiri", label: "Kemandirian" },
  { key: "fisik", label: "Fisik" },
];

export const MOOD_OPTIONS = [
  { value: "senang", emoji: "😊", label: "Senang" },
  { value: "biasa", emoji: "😐", label: "Biasa" },
  { value: "sedih", emoji: "😢", label: "Sedih" },
  { value: "marah", emoji: "😤", label: "Marah" },
];

export const MOOD_EMOJI_MAP: Record<string, string> = { senang: "😊", biasa: "😐", sedih: "😢", marah: "😤" };

export const CAPAIAN_OPTIONS = [
  { value: "BSB", label: "Berkembang Sangat Baik (BSB)" },
  { value: "BSH", label: "Berkembang Sesuai Harapan (BSH)" },
  { value: "MB", label: "Mulai Berkembang (MB)" },
  { value: "BB", label: "Belum Berkembang (BB)" },
];

function randomMood() {
  return MOOD_OPTIONS[Math.floor(Math.random() * MOOD_OPTIONS.length)].value;
}

function randomSiswa() {
  return DEMO_STUDENTS[Math.floor(Math.random() * DEMO_STUDENTS.length)];
}

const dates = [
  "2026-07-27", "2026-07-26", "2026-07-25", "2026-07-24",
  "2026-07-22", "2026-07-21", "2026-07-19", "2026-07-18",
];

export const DEMO_DAILY_REPORTS = dates.map((date, i) => {
  const siswa = randomSiswa();
  const moodDatang = randomMood();
  const moodPulang = randomMood();
  return {
    id: `dr${i}`,
    siswa,
    tanggal: date,
    sesi: ["Pagi", "Siang", "Full Day"][Math.floor(Math.random() * 3)] as "Pagi" | "Siang" | "Full Day",
    kehadiran: ["Hadir", "Hadir", "Hadir", "Izin"][Math.floor(Math.random() * 4)] as "Hadir" | "Izin" | "Sakit",
    mood_datang: moodDatang,
    mood_pulang: moodPulang,
    kondisi_kesehatan: ["Sehat", "Sehat", "Sehat", "Batuk ringan"][Math.floor(Math.random() * 4)],
    suhu_tubuh: `${(36 + Math.random()).toFixed(1)}`,
    sarapan: ["Nasi goreng", "Bubur ayam", "Roti + susu", "–"][Math.floor(Math.random() * 4)],
    snack_pagi: ["Pisang", "Biskuit", "Yogurt", "–"][Math.floor(Math.random() * 4)],
    makan_siang: ["Nasi + ayam + sayur", "Nasi + ikan + tempe", "Sop + nasi"][Math.floor(Math.random() * 3)],
    snack_sore: ["Puding", "Buah potong", "Susu + crackers"][Math.floor(Math.random() * 3)],
    minum_gelas: 2 + Math.floor(Math.random() * 4),
    tidur_siang: ["Tidur", "Tidak tidur", "Tidur"][Math.floor(Math.random() * 3)],
    durasi_tidur: `${1 + Math.floor(Math.random() * 2)} jam`,
    bak_kali: 3 + Math.floor(Math.random() * 4),
    bab: ["Normal", "Normal", "Normal", "–"][Math.floor(Math.random() * 4)],
    ibadah_checklist: ["Doa sebelum makan", "Doa sebelum tidur", "Mengaji", "Salam", "Cuci tangan"],
    observasi_guru: [
      "Anak sangat antusias mengikuti kegiatan hari ini. Aktif bertanya dan bermain dengan teman-teman.",
      "Anak bermain dengan fokus, namun masih perlu dibimbing dalam kegiatan bersosialisasi.",
      "Anak ceria dan aktif hari ini. Menunjukkan minat besar pada kegiatan menggambar dan mewarnai.",
      "Anak sedikit kurang fokus hari ini, mungkin karena kurang tidur. Namun tetap mengikuti kegiatan dengan baik.",
      "Kegiatan berjalan lancar. Anak mampu mengikuti instruksi guru dengan baik.",
      "Anak menunjukkan perkembangan bagus dalam kemampuan berbahasa dan bersosialisasi.",
    ][i % 6],
    catatan_ortu: [
      "Terima kasih atas bimbingannya. Anak sangat senang sekolah.",
      "Mohon perhatikan asupan makan siang anak ya.",
      "Anak demam ringan, mohon dicek suhunya secara berkala.",
      "",
    ][i % 4],
    status: "terkirim" as const,
    dikirim_at: `${date}T14:${30 + i}:00`,
  };
});

export const DEMO_PORTOFOLIO = [
  {
    id: "p1",
    siswa: DEMO_STUDENTS[0],
    tanggal: "2026-07-27",
    sesi: "Pagi",
    observasi: "Aisyah berhasil menghafal surat An-Nas dengan lancar. Juga aktif dalam kegiatan bercerita.",
    catatan_ortu: "Terima kasih sudah membimbing Aisyah.",
    media: [
      { id: "m1", url: "https://picsum.photos/seed/aisyah1/400/400", tipe: "foto" as const, nama_file: "Aisyah_mengaji.jpg" },
      { id: "m2", url: "https://picsum.photos/seed/aisyah2/400/400", tipe: "foto" as const, nama_file: "Aisyah_bermain.jpg" },
      { id: "m3", url: "https://picsum.photos/seed/aisyah3/400/400", tipe: "foto" as const, nama_file: "Aisyah_mewarnai.jpg" },
    ],
    status: "terkirim" as const,
  },
  {
    id: "p2",
    siswa: DEMO_STUDENTS[1],
    tanggal: "2026-07-26",
    sesi: "Siang",
    observasi: "Budi aktif dalam kegiatan olahraga dan bermain peran. Mulai bisa berbagi mainan dengan teman.",
    catatan_ortu: "",
    media: [
      { id: "m4", url: "https://picsum.photos/seed/budi1/400/400", tipe: "foto" as const, nama_file: "Budi_olahraga.jpg" },
      { id: "m5", url: "https://picsum.photos/seed/budi2/400/400", tipe: "foto" as const, nama_file: "Budi_bermain.jpg" },
    ],
    status: "terkirim" as const,
  },
  {
    id: "p3",
    siswa: DEMO_STUDENTS[2],
    tanggal: "2026-07-25",
    sesi: "Pagi",
    observasi: "Citra menunjukkan bakat seni yang luar biasa. Hasil mewarnainya sangat rapi dan penuh detail.",
    catatan_ortu: "Citra sangat suka menggambar di rumah juga.",
    media: [
      { id: "m6", url: "https://picsum.photos/seed/citra1/400/400", tipe: "foto" as const, nama_file: "Citra_mewarnai.jpg" },
      { id: "m7", url: "https://picsum.photos/seed/citra2/400/400", tipe: "foto" as const, nama_file: "Citra_berkebun.jpg" },
    ],
    status: "terkirim" as const,
  },
  {
    id: "p4",
    siswa: DEMO_STUDENTS[0],
    tanggal: "2026-07-22",
    sesi: "Full Day",
    observasi: "Aisyah menunjukkan adab yang baik. Selalu mengucapkan salam dan tolong saat meminta bantuan.",
    catatan_ortu: "Kami juga melatih adab di rumah. Senang melihat perkembangannya.",
    media: [
      { id: "m8", url: "https://picsum.photos/seed/aisyah4/400/400", tipe: "foto" as const, nama_file: "Aisyah_salam.jpg" },
      { id: "m9", url: "https://picsum.photos/seed/aisyah5/400/400", tipe: "foto" as const, nama_file: "Aisyah_makan.jpg" },
      { id: "m10", url: "https://picsum.photos/seed/aisyah6/400/400", tipe: "foto" as const, nama_file: "Aisyah_wudhu.jpg" },
    ],
    status: "terkirim" as const,
  },
];

export const DEMO_LAPORAN = {
  siswa: DEMO_STUDENTS[0],
  periode: "Triwulan 2",
  tahun: 2026,
  penilaian: {
    motorik: { capaian: "BSB" as const, catatan: "Motorik kasar dan halus berkembang baik. Mampu memegang pensil dengan benar." },
    kognitif: { capaian: "BSH" as const, catatan: "Mulai mengenal huruf dan angka 1-20. Mampu mencocokkan gambar." },
    bahasa: { capaian: "BSH" as const, catatan: "Mampu bercerita dengan kalimat sederhana dan mengekspresikan keinginan." },
    sosial: { capaian: "BSH" as const, catatan: "Mulai bisa bermain dan berbagi dengan teman. Perlu didampingi saat konflik." },
    seni: { capaian: "BSB" as const, catatan: "Menunjukkan minat besar pada seni dan mewarnai. Hasil karya rapi." },
    agama: { capaian: "BSB" as const, catatan: "Hafal 5 surat pendek, rajin mengaji, dan selalu mengucapkan salam." },
    mandiri: { capaian: "MB" as const, catatan: "Mulai belajar memakai baju sendiri dan merapikan mainan." },
    fisik: { capaian: "BSB" as const, catatan: "Berlari, melompat, dan menaiki tangga dengan baik." },
  },
  catatan_umum:
    "Aisyah menunjukkan perkembangan yang sangat baik di semua aspek. Anak aktif, ceria, dan memiliki semangat belajar yang tinggi. Perlu terus didukung terutama dalam aspek sosialisasi dan interaksi dengan teman sebaya.",
  rekomendasi:
    "1. Lanjutkan stimulasi di rumah terutama untuk aspek bahasa dan bakat.\n2. Perbanyak interaksi dengan teman sebaya di luar sekolah.\n3. Latih kemandirian seperti memakai baju sendiri dan merapikan mainan.",
  status: "terkirim" as const,
};

export const DEMO_HISTORY_REPORTS = [
  { id: "hr1", siswa: "Aisyah Putri", avatar: "A", kelas: "TK A", tanggal: "2026-07-28", sesi: "Pagi", kehadiran: "Hadir", mood: "senang", observasi: "Aisyah sangat antusias mengikuti kegiatan hari ini. Hafal surat An-Nas dengan lancar.", status: "terkirim" },
  { id: "hr2", siswa: "Aisyah Putri", avatar: "A", kelas: "TK A", tanggal: "2026-07-27", sesi: "Full Day", kehadiran: "Hadir", mood: "senang", observasi: "Mengikuti kegiatan memasak dengan baik. Bisa bergiliran dengan teman.", status: "terkirim" },
  { id: "hr3", siswa: "Aisyah Putri", avatar: "A", kelas: "TK A", tanggal: "2026-07-25", sesi: "Pagi", kehadiran: "Hadir", mood: "biasa", observasi: "Sedikit kurang fokus hari ini. Mungkin kurang tidur.", status: "terkirim" },
  { id: "hr4", siswa: "Aisyah Putri", avatar: "A", kelas: "TK A", tanggal: "2026-07-24", sesi: "Siang", kehadiran: "Izin", mood: "–", observasi: "Izin karena demam ringan.", status: "terkirim" },
  { id: "hr5", siswa: "Budi Santoso", avatar: "B", kelas: "TK B", tanggal: "2026-07-28", sesi: "Pagi", kehadiran: "Hadir", mood: "senang", observasi: "Budi aktif dalam kegiatan olahraga. Mulai bisa berbagi mainan dengan teman.", status: "terkirim" },
  { id: "hr6", siswa: "Budi Santoso", avatar: "B", kelas: "TK B", tanggal: "2026-07-27", sesi: "Pagi", kehadiran: "Hadir", mood: "marah", observasi: "Budi sedikit rewel hari ini. Masih belajar mengelola emosi saat bergantian mainan.", status: "terkirim" },
  { id: "hr7", siswa: "Budi Santoso", avatar: "B", kelas: "TK B", tanggal: "2026-07-24", sesi: "Full Day", kehadiran: "Hadir", mood: "senang", observasi: "Hari yang baik! Budi mau berbagi bekal dengan teman.", status: "terkirim" },
  { id: "hr8", siswa: "Citra Dewi", avatar: "C", kelas: "TK A", tanggal: "2026-07-28", sesi: "Pagi", kehadiran: "Hadir", mood: "biasa", observasi: "Citra menunjukkan bakat seni. Hasil mewarnainya rapi dan penuh detail.", status: "terkirim" },
  { id: "hr9", siswa: "Citra Dewi", avatar: "C", kelas: "TK A", tanggal: "2026-07-26", sesi: "Pagi", kehadiran: "Hadir", mood: "senang", observasi: "Citra sangat menikmati kegiatan berkebun. Senang menyiram tanaman.", status: "terkirim" },
  { id: "hr10", siswa: "Citra Dewi", avatar: "C", kelas: "TK A", tanggal: "2026-07-22", sesi: "Full Day", kehadiran: "Sakit", mood: "–", observasi: "Citra pulang lebih awal karena demam.", status: "terkirim" },
];

export const DEMO_HISTORY_PORTOFOLIO = [
  { id: "hp1", siswa: "Aisyah Putri", avatar: "A", kelas: "TK A", tanggal: "2026-07-27", aspek: ["agama", "bahasa"], foto: "https://picsum.photos/seed/haisyah1/400/400", judul: "Mengaji & Bercerita", observasi: "Aisyah berhasil menghafal surat An-Nas dan aktif bercerita di depan kelas." },
  { id: "hp2", siswa: "Aisyah Putri", avatar: "A", kelas: "TK A", tanggal: "2026-07-22", aspek: ["agama", "sosial"], foto: "https://picsum.photos/seed/haisyah2/400/400", judul: "Praktik Salam & Tolong", observasi: "Aisyah selalu mengucapkan salam dan tolong saat meminta bantuan kepada guru." },
  { id: "hp3", siswa: "Aisyah Putri", avatar: "A", kelas: "TK A", tanggal: "2026-07-18", aspek: ["seni", "motorik"], foto: "https://picsum.photos/seed/haisyah3/400/400", judul: "Hasil Mewarnai", observasi: "Aisyah mewarnai gambar pemandangan dengan rapi dan penuh detail." },
  { id: "hp4", siswa: "Budi Santoso", avatar: "B", kelas: "TK B", tanggal: "2026-07-26", aspek: ["fisik", "sosial"], foto: "https://picsum.photos/seed/hbudi1/400/400", judul: "Olahraga & Bermain Peran", observasi: "Budi aktif dalam kegiatan olahraga dan bermain peran sebagai dokter." },
  { id: "hp5", siswa: "Budi Santoso", avatar: "B", kelas: "TK B", tanggal: "2026-07-20", aspek: ["sosial", "kognitif"], foto: "https://picsum.photos/seed/hbudi2/400/400", judul: "Bermain Bersama", observasi: "Budi mulai mau berbagi mainan dengan teman tanpa diminta." },
  { id: "hp6", siswa: "Citra Dewi", avatar: "C", kelas: "TK A", tanggal: "2026-07-25", aspek: ["seni", "kognitif"], foto: "https://picsum.photos/seed/hcitra1/400/400", judul: "Mewarnai & Menggambar", observasi: "Citra menunjukkan bakat seni. Hasil mewarnainya sangat rapi." },
  { id: "hp7", siswa: "Citra Dewi", avatar: "C", kelas: "TK A", tanggal: "2026-07-19", aspek: ["fisik", "agama"], foto: "https://picsum.photos/seed/hcitra2/400/400", judul: "Berkebun & Mengaji", observasi: "Citra senang menyiram tanaman dan mengaji dengan suara merdu." },
];
