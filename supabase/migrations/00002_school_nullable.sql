-- Make school_id nullable (user registers first, sets up school later)
ALTER TABLE profiles ALTER COLUMN school_id DROP NOT NULL;
ALTER TABLE profiles ALTER COLUMN school_id SET DEFAULT NULL;

-- Update trigger to handle nullable school_id
CREATE OR REPLACE FUNCTION auto_create_profile()
RETURNS trigger AS $$
DECLARE
  meta jsonb := NEW.raw_user_meta_data;
BEGIN
  INSERT INTO public.profiles (id, school_id, role, nama, email)
  VALUES (
    NEW.id,
    (meta->>'school_id')::uuid,
    COALESCE((meta->>'role')::public.user_role, 'admin'::public.user_role),
    COALESCE(meta->>'nama', NEW.email),
    NEW.email
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
