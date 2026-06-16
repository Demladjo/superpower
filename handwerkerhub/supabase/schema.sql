-- HandwerkerHub Datenbankschema für Supabase
-- Ausführen im Supabase SQL Editor

-- Enum für Abo-Status
CREATE TYPE abo_status AS ENUM ('aktiv', 'inaktiv');

-- Tabelle: handwerker
CREATE TABLE IF NOT EXISTS handwerker (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  beruf TEXT NOT NULL,
  foto_url TEXT,
  beschreibung TEXT,
  stadt TEXT NOT NULL,
  latitude DOUBLE PRECISION,
  longitude DOUBLE PRECISION,
  telefon TEXT,
  email TEXT NOT NULL UNIQUE,
  abo_status abo_status NOT NULL DEFAULT 'inaktiv',
  erstellt_am TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Tabelle: dienstleistungen
CREATE TABLE IF NOT EXISTS dienstleistungen (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  handwerker_id UUID NOT NULL REFERENCES handwerker(id) ON DELETE CASCADE,
  titel TEXT NOT NULL,
  beschreibung TEXT,
  preis_ab NUMERIC(10, 2),
  erstellt_am TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Tabelle: bewertungen
CREATE TABLE IF NOT EXISTS bewertungen (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  handwerker_id UUID NOT NULL REFERENCES handwerker(id) ON DELETE CASCADE,
  sterne INTEGER NOT NULL CHECK (sterne >= 1 AND sterne <= 5),
  kommentar TEXT,
  erstellt_am TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Indizes für bessere Performance
CREATE INDEX IF NOT EXISTS idx_handwerker_beruf ON handwerker(beruf);
CREATE INDEX IF NOT EXISTS idx_handwerker_stadt ON handwerker(stadt);
CREATE INDEX IF NOT EXISTS idx_handwerker_abo_status ON handwerker(abo_status);
CREATE INDEX IF NOT EXISTS idx_dienstleistungen_handwerker_id ON dienstleistungen(handwerker_id);
CREATE INDEX IF NOT EXISTS idx_bewertungen_handwerker_id ON bewertungen(handwerker_id);

-- Row Level Security aktivieren
ALTER TABLE handwerker ENABLE ROW LEVEL SECURITY;
ALTER TABLE dienstleistungen ENABLE ROW LEVEL SECURITY;
ALTER TABLE bewertungen ENABLE ROW LEVEL SECURITY;

-- RLS Policies: handwerker
CREATE POLICY "Aktive Handwerker sind öffentlich lesbar"
  ON handwerker FOR SELECT
  USING (abo_status = 'aktiv');

CREATE POLICY "Handwerker kann eigenes Profil erstellen"
  ON handwerker FOR INSERT
  WITH CHECK (true);

-- RLS Policies: dienstleistungen
CREATE POLICY "Dienstleistungen sind öffentlich lesbar"
  ON dienstleistungen FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM handwerker h
      WHERE h.id = handwerker_id AND h.abo_status = 'aktiv'
    )
  );

CREATE POLICY "Dienstleistungen können erstellt werden"
  ON dienstleistungen FOR INSERT
  WITH CHECK (true);

-- RLS Policies: bewertungen
CREATE POLICY "Bewertungen sind öffentlich lesbar"
  ON bewertungen FOR SELECT
  USING (true);

CREATE POLICY "Bewertungen können erstellt werden"
  ON bewertungen FOR INSERT
  WITH CHECK (true);
