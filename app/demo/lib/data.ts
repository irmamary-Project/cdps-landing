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

export const FITRAH_LIST = [
  { key: "keimanan", label: "Keimanan" },
  { key: "belajar", label: "Belajar" },
  { key: "bakat", label: "Bakat" },
  { key: "seksualitas", label: "Seksualitas" },
  { key: "jasmani", label: "Jasmani" },
  { key: "bahasa", label: "Bahasa" },
  { key: "sosialitas", label: "Sosial" },
  { key: "adab", label: "Adab" },
];

export const MOOD_OPTIONS = [
  { value: "senang", emoji: "😊", label: "Senang" },
  { value: "biasa", emoji: "😐", label: "Biasa" },
  { value: "sedih", emoji: "😢", label: "Sedih" },
  { value: "marah", emoji: "😤", label: "Marah" },
];

export const CAPAIAN_OPTIONS = [
  { value: "BSB", label: "Berkembang Sangat Baik (BSB)" },
  { value: "BSH", label: "Berkembang Sesuai Harapan (BSH)" },
  { value: "MB", label: "Mulai Berkembang (MB)" },
  { value: "BB", label: "Belum Berkembang (BB)" },
];

const fitrahKeys = FITRAH_LIST.map((f) => f.key);

function randomMood() {
  return MOOD_OPTIONS[Math.floor(Math.random() * MOOD_OPTIONS.length)].value;
}

function randomFitrah() {
  const count = 2 + Math.floor(Math.random() * 4);
  const shuffled = [...fitrahKeys].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

function randomSiswa() {
  return DEMO_STUDENTS[Math.floor(Math.random() * DEMO_STUDENTS.length)];
}

const dates = [
  "2026-07-27",
  "2026-07-26",
  "2026-07-25",
  "2026-07-24",
  "2026-07-22",
  "2026-07-21",
  "2026-07-19",
  "2026-07-18",
];

export const DEMO_DAILY_REPORTS = dates.map((date, i) => {
  const siswa = randomSiswa();
  const moodDatang = randomMood();
  const moodPulang = randomMood();
  return {
    id: `dr${i}`,
    siswa,
    tanggal: date,
    sesi: ["Pagi", "Siang", "Full Day"][Math.floor(Math.random() * 3)] as
      | "Pagi"
      | "Siang"
      | "Full Day",
    kehadiran: ["Hadir", "Hadir", "Hadir", "Izin"][Math.floor(Math.random() * 4)] as
      | "Hadir"
      | "Izin"
      | "Sakit",
    mood_datang: moodDatang,
    mood_pulang: moodPulang,
    kondisi_kesehatan: ["Sehat", "Sehat", "Sehat", "Batuk ringan"][
      Math.floor(Math.random() * 4)
    ],
    suhu_tubuh: `${(36 + Math.random()).toFixed(1)}`,
    sarapan: ["Nasi goreng", "Bubur ayam", "Roti + susu", "–"][
      Math.floor(Math.random() * 4)
    ],
    snack_pagi: ["Pisang", "Biskuit", "Yogurt", "–"][Math.floor(Math.random() * 4)],
    makan_siang: ["Nasi + ayam + sayur", "Nasi + ikan + tempe", "Sop + nasi"][
      Math.floor(Math.random() * 3)
    ],
    snack_sore: ["Puding", "Buah potong", "Susu + crackers"][
      Math.floor(Math.random() * 3)
    ],
    minum_gelas: 2 + Math.floor(Math.random() * 4),
    tidur_siang: ["Tidur", "Tidak tidur", "Tidur"][Math.floor(Math.random() * 3)],
    durasi_tidur: `${1 + Math.floor(Math.random() * 2)} jam`,
    bak_kali: 3 + Math.floor(Math.random() * 4),
    bab: ["Normal", "Normal", "Normal", "–"][Math.floor(Math.random() * 4)],
    ibadah_checklist: [
      "Doa sebelum makan",
      "Doa sebelum tidur",
      "Mengaji",
      "Salam",
      "Cuci tangan",
    ],
    fitrah_distimulasi: randomFitrah(),
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
    fitrah: ["keimanan", "belajar", "bahasa"],
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
    fitrah: ["jasmani", "sosialitas"],
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
    fitrah: ["bakat", "belajar"],
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
    fitrah: ["adab", "keimanan"],
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
    keimanan: { capaian: "BSB" as const, catatan: "Hafal 5 surat pendek, rajin mengaji" },
    belajar: { capaian: "BSH" as const, catatan: "Mulai mengenal huruf hijaiyah dan angka 1-20" },
    bakat: { capaian: "BSH" as const, catatan: "Menunjukkan minat pada seni dan mewarnai" },
    seksualitas: { capaian: "MB" as const, catatan: "Mulai memahami perbedaan gender" },
    jasmani: { capaian: "BSB" as const, catatan: "Motorik kasar dan halus berkembang baik" },
    bahasa: { capaian: "BSH" as const, catatan: "Mampu bercerita dengan kalimat sederhana" },
    sosialitas: { capaian: "BSH" as const, catatan: "Mulai bisa bermain dan berbagi dengan teman" },
    adab: { capaian: "BSB" as const, catatan: "Selalu mengucapkan salam, tolong, dan terima kasih" },
  },
  catatan_umum:
    "Aisyah menunjukkan perkembangan yang sangat baik di semua aspek. Anak aktif, ceria, dan memiliki semangat belajar yang tinggi. Perlu terus didukung terutama dalam aspek sosialisasi dan interaksi dengan teman sebaya.",
  rekomendasi:
    "1. Lanjutkan stimulasi di rumah terutama untuk aspek bahasa dan bakat.\n2. Perbanyak interaksi dengan teman sebaya di luar sekolah.\n3. Latih kemandirian seperti memakai baju sendiri dan merapikan mainan.",
  status: "terkirim" as const,
};

export const DEMO_STATS = {
  total_siswa: 48,
  total_guru: 12,
  laporan_bulan_ini: 128,
  portofolio_bulan_ini: 256,
  kehadiran_hari_ini: "94%",
};
