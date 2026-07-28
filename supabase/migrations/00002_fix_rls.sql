-- Fix: izinkan INSERT ke tabel schools dari pengguna yang belum login (registrasi)
CREATE POLICY school_insert ON schools
  FOR INSERT WITH CHECK (true);
