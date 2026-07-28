-- Add parent_slug column for shareable parent links
ALTER TABLE students ADD COLUMN IF NOT EXISTS parent_slug text UNIQUE;

-- Generate slugs for existing students that don't have one
CREATE OR REPLACE FUNCTION generate_parent_slug()
RETURNS text AS $$
DECLARE
  slug text;
  done bool;
BEGIN
  done := false;
  WHILE NOT done LOOP
    slug := lower(substr(md5(random()::text || clock_timestamp()::text), 1, 8));
    done := NOT EXISTS (SELECT 1 FROM students WHERE parent_slug = slug);
  END LOOP;
  RETURN slug;
END;
$$ LANGUAGE plpgsql;

UPDATE students SET parent_slug = generate_parent_slug() WHERE parent_slug IS NULL;
