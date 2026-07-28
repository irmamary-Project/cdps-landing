-- ============================================================
-- CDPS Database Schema
-- Supabase migration for production
-- ============================================================

-- 1. SCHOOLS (tenants / organisasi)
CREATE TABLE schools (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name        text NOT NULL,
  address     text,
  phone       text,
  email       text,
  logo_url    text,
  created_at  timestamptz NOT NULL DEFAULT now()
);

-- 2. SUBSCRIPTIONS
CREATE TYPE subscription_tier AS ENUM ('gratis', 'pro', 'enterprise');
CREATE TYPE subscription_status AS ENUM ('trial', 'active', 'expired', 'cancelled');

CREATE TABLE subscriptions (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id   uuid NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  tier        subscription_tier NOT NULL DEFAULT 'gratis',
  status      subscription_status NOT NULL DEFAULT 'trial',
  max_students integer NOT NULL DEFAULT 5,
  max_teachers integer NOT NULL DEFAULT 3,
  features    jsonb NOT NULL DEFAULT '["daily_report","portofolio","laporan"]',
  started_at  timestamptz,
  expires_at  timestamptz,
  created_at  timestamptz NOT NULL DEFAULT now(),
  updated_at  timestamptz NOT NULL DEFAULT now()
);

-- Auto-create subscription when a school is created
CREATE OR REPLACE FUNCTION auto_create_subscription()
RETURNS trigger AS $$
BEGIN
  INSERT INTO subscriptions (school_id, tier, max_students, max_teachers)
  VALUES (NEW.id, 'gratis', 5, 3);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER trg_auto_create_subscription
  AFTER INSERT ON schools
  FOR EACH ROW EXECUTE FUNCTION auto_create_subscription();

-- 3. PROFILES (extends auth.users)
CREATE TYPE user_role AS ENUM ('admin', 'guru', 'orang_tua');

CREATE TABLE profiles (
  id          uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  school_id   uuid NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  role        user_role NOT NULL DEFAULT 'guru',
  nama        text NOT NULL,
  email       text,
  phone       text,
  avatar_url  text,
  is_active   boolean NOT NULL DEFAULT true,
  created_at  timestamptz NOT NULL DEFAULT now(),
  updated_at  timestamptz NOT NULL DEFAULT now()
);

-- Auto-create profile on auth.users insert
CREATE OR REPLACE FUNCTION auto_create_profile()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, school_id, role, nama, email)
  VALUES (
    NEW.id,
    (NEW.raw_user_meta_data->>'school_id')::uuid,
    (NEW.raw_user_meta_data->>'role')::user_role,
    NEW.raw_user_meta_data->>'nama',
    NEW.email
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER trg_auto_create_profile
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION auto_create_profile();

-- 4. CLASSES
CREATE TABLE classes (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id   uuid NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  nama        text NOT NULL,
  usia        text,
  tahun       text,
  wali_id     uuid REFERENCES profiles(id) ON DELETE SET NULL,
  status      text NOT NULL DEFAULT 'Aktif',
  created_at  timestamptz NOT NULL DEFAULT now()
);

-- 5. STUDENTS
CREATE TABLE students (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id   uuid NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  class_id    uuid REFERENCES classes(id) ON DELETE SET NULL,
  nis         text,
  nama        text NOT NULL,
  tempat_lahir text,
  tanggal_lahir date,
  ortu_nama   text,
  ortu_wa     text,
  status      text NOT NULL DEFAULT 'Aktif',
  created_at  timestamptz NOT NULL DEFAULT now(),
  updated_at  timestamptz NOT NULL DEFAULT now()
);

-- 6. DAILY REPORTS
CREATE TABLE daily_reports (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id     uuid NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  student_id    uuid NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  tanggal       date NOT NULL DEFAULT CURRENT_DATE,
  sesi          text,
  kehadiran     text NOT NULL DEFAULT 'Hadir',
  mood_datang   text,
  suhu_tubuh    numeric(4,1),
  kondisi_kesehatan text,
  bak_kali      integer,
  bab           text,
  tidur_siang   text,
  durasi_tidur  text,
  sarapan       text,
  snack_pagi    text,
  makan_siang   text,
  snack_sore    text,
  minum_gelas   integer,
  ibadah_checklist jsonb DEFAULT '[]',
  observasi_guru text,
  catatan_ortu  text,
  status        text NOT NULL DEFAULT 'published',
  created_by    uuid REFERENCES profiles(id),
  created_at    timestamptz NOT NULL DEFAULT now(),
  updated_at    timestamptz NOT NULL DEFAULT now()
);

-- 7. PORTFOLIOS
CREATE TABLE portfolios (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  school_id     uuid NOT NULL REFERENCES schools(id) ON DELETE CASCADE,
  student_id    uuid NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  tanggal       date NOT NULL DEFAULT CURRENT_DATE,
  sesi          text,
  judul         text,
  observasi     text,
  catatan_ortu  text,
  media_urls    jsonb DEFAULT '[]',
  aspek         jsonb DEFAULT '[]',
  created_by    uuid REFERENCES profiles(id),
  created_at    timestamptz NOT NULL DEFAULT now()
);

-- 8. GROWTH RECORDS (tracking fisik)
CREATE TABLE growth_records (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id    uuid NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  bulan         date NOT NULL,
  bb            numeric(5,1),
  tb            numeric(5,1),
  created_by    uuid REFERENCES profiles(id),
  created_at    timestamptz NOT NULL DEFAULT now(),
  UNIQUE(student_id, bulan)
);

-- 9. ATTENDANCE (absensi guru)
CREATE TABLE attendance (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id    uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  tanggal       date NOT NULL DEFAULT CURRENT_DATE,
  check_in      timestamptz,
  check_out     timestamptz,
  status        text NOT NULL DEFAULT 'hadir',
  lat           numeric(10,7),
  lng           numeric(10,7),
  created_at    timestamptz NOT NULL DEFAULT now(),
  UNIQUE(profile_id, tanggal)
);

-- ============================================================
-- INDEXES
-- ============================================================
CREATE INDEX idx_profiles_school ON profiles(school_id);
CREATE INDEX idx_students_school ON students(school_id);
CREATE INDEX idx_students_class ON students(class_id);
CREATE INDEX idx_daily_reports_student ON daily_reports(student_id);
CREATE INDEX idx_daily_reports_tanggal ON daily_reports(tanggal);
CREATE INDEX idx_portfolios_student ON portfolios(student_id);
CREATE INDEX idx_growth_records_student ON growth_records(student_id);
CREATE INDEX idx_attendance_profile ON attendance(profile_id);
CREATE INDEX idx_attendance_tanggal ON attendance(tanggal);
CREATE INDEX idx_subscriptions_school ON subscriptions(school_id);

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================
ALTER TABLE schools ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE classes ENABLE ROW LEVEL SECURITY;
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolios ENABLE ROW LEVEL SECURITY;
ALTER TABLE growth_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE attendance ENABLE ROW LEVEL SECURITY;

-- Helper: get current user's school_id
CREATE OR REPLACE FUNCTION get_user_school_id()
RETURNS uuid
LANGUAGE sql STABLE SECURITY DEFINER
AS $$
  SELECT school_id FROM public.profiles WHERE id = auth.uid();
$$;

-- Schools: anyone can register (insert), only own school can read
CREATE POLICY school_insert ON schools
  FOR INSERT WITH CHECK (true);
CREATE POLICY school_select ON schools
  FOR SELECT USING (id = get_user_school_id());

-- Profiles: only own school's profiles
CREATE POLICY profile_select ON profiles
  FOR SELECT USING (school_id = get_user_school_id());
CREATE POLICY profile_update ON profiles
  FOR UPDATE USING (id = auth.uid());

-- Classes: scoped to school
CREATE POLICY class_select ON classes
  FOR SELECT USING (school_id = get_user_school_id());
CREATE POLICY class_insert ON classes
  FOR INSERT WITH CHECK (school_id = get_user_school_id());
CREATE POLICY class_update ON classes
  FOR UPDATE USING (school_id = get_user_school_id());

-- Students: scoped to school
CREATE POLICY student_select ON students
  FOR SELECT USING (school_id = get_user_school_id());
CREATE POLICY student_insert ON students
  FOR INSERT WITH CHECK (school_id = get_user_school_id());
CREATE POLICY student_update ON students
  FOR UPDATE USING (school_id = get_user_school_id());

-- Daily reports: scoped to school
CREATE POLICY daily_report_select ON daily_reports
  FOR SELECT USING (school_id = get_user_school_id());
CREATE POLICY daily_report_insert ON daily_reports
  FOR INSERT WITH CHECK (school_id = get_user_school_id());
CREATE POLICY daily_report_update ON daily_reports
  FOR UPDATE USING (school_id = get_user_school_id());

-- Portfolios: scoped to school
CREATE POLICY portfolio_select ON portfolios
  FOR SELECT USING (school_id = get_user_school_id());
CREATE POLICY portfolio_insert ON portfolios
  FOR INSERT WITH CHECK (school_id = get_user_school_id());

-- Growth records: via student's school
CREATE POLICY growth_select ON growth_records
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM students WHERE id = growth_records.student_id AND school_id = get_user_school_id())
  );
CREATE POLICY growth_insert ON growth_records
  FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM students WHERE id = growth_records.student_id AND school_id = get_user_school_id())
  );

-- Attendance: own profile or admin
CREATE POLICY attendance_select ON attendance
  FOR SELECT USING (
    profile_id = auth.uid() OR
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin' AND school_id = get_user_school_id())
  );
