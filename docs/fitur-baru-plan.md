# Rencana Implementasi Fitur Baru CDPS

## 1. Halaman Baru (5 halaman di `/fitur/`)

| Halaman                   | Route                         | Tipe Konten                   |
| ------------------------- | ----------------------------- | ----------------------------- |
| Manajemen Siswa           | `/fitur/manajemen-siswa`      | Tabel + search + filter       |
| Manajemen Kelas           | `/fitur/manajemen-kelas`      | Card grid per kelas           |
| Notifikasi Guru/Orang Tua | `/fitur/notifikasi`           | Timeline + filter + tabs role |
| Riwayat Daily Report      | `/fitur/riwayat-daily-report` | Timeline per siswa + filter   |
| Riwayat Portofolio        | `/fitur/riwayat-portofolio`   | Grid per siswa + filter       |

Semua halaman preview statis (bukan demo interaktif).

---

## 2. Data Baru — `app/demo/lib/data.ts`

### a. `DEMO_CLASSES` — Data kelas

- KB (usia 2-3 thn, 8 siswa, wali: Bu Rina, 2026/2027)
- TK A (usia 4-5 thn, 20 siswa, wali: Bu Sari, 2026/2027)
- TK B (usia 5-6 thn, 20 siswa, wali: Pak Budi, 2026/2027)

### b. `DEMO_NOTIFICATIONS` — 15-20 notifikasi

- Laporan baru daily report (guru → ortu)
- Catatan orang tua (ortu → guru)
- Pengingat sistem (laporan belum dikirim)
- Masing-masing: icon, judul, deskripsi, waktu, status baca

### c. `DEMO_HISTORY_REPORTS` — Riwayat daily report

- Per siswa (Aisyah, Budi, Citra) @ 5-6 laporan
- Field: id, siswa, tanggal, sesi, kehadiran, mood, observasi
- Filter: siswa + rentang tanggal

### d. `DEMO_HISTORY_PORTOFOLIO` — Riwayat portofolio

- Per siswa @ 4-5 entri
- Field: id, siswa, tanggal, fitrah, foto, observasi
- Filter: siswa + fitrah + rentang tanggal

---

## 3. Update Landing Page

### Features.tsx — Tambah 5 card baru (total: 4 → 9)

| #   | Icon Lucide  | Judul                | Deskripsi                                                                               |
| --- | ------------ | -------------------- | --------------------------------------------------------------------------------------- |
| 5   | `Users`      | Manajemen Siswa      | Data lengkap siswa, info orang tua, dan riwayat kesehatan dalam satu database terpusat. |
| 6   | `LayoutGrid` | Manajemen Kelas      | Atur kelompok belajar, wali kelas, dan tahun ajaran dengan mudah.                       |
| 7   | `Bell`       | Notifikasi Terpadu   | Notifikasi real-time, pesan 2 arah, dan pengingat otomatis untuk guru dan orang tua.    |
| 8   | `Clock`      | Riwayat Daily Report | Timeline historis laporan harian per siswa. Filter berdasarkan tanggal dan status.      |
| 9   | `Archive`    | Riwayat Portofolio   | Arsip portofolio digital per siswa. Filter berdasarkan fitrah dan periode.              |

Layout grid: `md:grid-cols-2 lg:grid-cols-3`

### Pricing.tsx — Update tabel fitur per paket

| Fitur                                                  | Gratis | Pro (Rp199rb) | Enterprise |
| ------------------------------------------------------ | ------ | ------------- | ---------- |
| 4 fitur inti (Daily Report, Portofolio, Laporan, CCTV) | ✅     | ✅            | ✅         |
| Manajemen Siswa                                        | ❌     | ✅            | ✅         |
| Manajemen Kelas                                        | ❌     | ✅            | ✅         |
| Notifikasi Guru/Orang Tua                              | ❌     | ✅            | ✅         |
| Riwayat Daily Report                                   | ❌     | ✅            | ✅         |
| Riwayat Portofolio                                     | ❌     | ❌            | ✅         |

### Navbar Landing — Tambah "Fitur"

- Baru: **Blog | Fitur | Harga | Kontak | Coba Demo**
- "Fitur" → scroll ke `#fitur`

### Footer — Tambah link 5 halaman fitur baru

- Di section Menu: Manajemen Siswa, Manajemen Kelas, Notifikasi, Riwayat Daily Report, Riwayat Portofolio

---

## 4. File yang Diubah

| File                              | Perubahan                                                                              |
| --------------------------------- | -------------------------------------------------------------------------------------- |
| `components/landing/Features.tsx` | Tambah 5 card baru, ubah grid ke 3 kolom                                               |
| `components/landing/Pricing.tsx`  | Update daftar fitur per tier                                                           |
| `app/demo/lib/data.ts`            | Tambah DEMO_CLASSES, DEMO_NOTIFICATIONS, DEMO_HISTORY_REPORTS, DEMO_HISTORY_PORTOFOLIO |
| `app/page.tsx`                    | Navbar — tambah link "Fitur"                                                           |
| `components/landing/Footer.tsx`   | Tambah link 5 halaman fitur baru                                                       |
| `app/sitemap.ts`                  | Tambah `/fitur/*` routes                                                               |

## 5. File Baru

| File                                      | Isi                                  |
| ----------------------------------------- | ------------------------------------ |
| `app/fitur/manajemen-siswa/page.tsx`      | Halaman preview manajemen siswa      |
| `app/fitur/manajemen-kelas/page.tsx`      | Halaman preview manajemen kelas      |
| `app/fitur/notifikasi/page.tsx`           | Halaman preview notifikasi           |
| `app/fitur/riwayat-daily-report/page.tsx` | Halaman preview riwayat daily report |
| `app/fitur/riwayat-portofolio/page.tsx`   | Halaman preview riwayat portofolio   |
