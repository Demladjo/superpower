-- HandwerkerHub Database Schema
-- PostgreSQL / Supabase

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ===========================================
-- ENUMS
-- ===========================================

CREATE TYPE abo_status_enum AS ENUM ('aktiv', 'inaktiv');

-- ===========================================
-- TABLES
-- ===========================================

-- Handwerker (Craftsmen) table
CREATE TABLE IF NOT EXISTS handwerker (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name            TEXT NOT NULL,
    beruf           TEXT NOT NULL,
    foto_url        TEXT,
    beschreibung    TEXT,
    stadt           TEXT NOT NULL,
    latitude        NUMERIC(9, 6),
    longitude       NUMERIC(9, 6),
    telefon         TEXT,
    email           TEXT UNIQUE NOT NULL,
    abo_status      abo_status_enum NOT NULL DEFAULT 'inaktiv',
    user_id         UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    erstellt_am     TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    aktualisiert_am TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Dienstleistungen (Services) table
CREATE TABLE IF NOT EXISTS dienstleistungen (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    handwerker_id   UUID NOT NULL REFERENCES handwerker(id) ON DELETE CASCADE,
    titel           TEXT NOT NULL,
    beschreibung    TEXT,
    preis_ab        NUMERIC(10, 2),
    erstellt_am     TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Bewertungen (Reviews) table
CREATE TABLE IF NOT EXISTS bewertungen (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    handwerker_id   UUID NOT NULL REFERENCES handwerker(id) ON DELETE CASCADE,
    sterne          SMALLINT NOT NULL CHECK (sterne >= 1 AND sterne <= 5),
    kommentar       TEXT,
    autor_name      TEXT,
    erstellt_am     TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ===========================================
-- INDEXES
-- ===========================================

CREATE INDEX IF NOT EXISTS idx_handwerker_beruf ON handwerker(beruf);
CREATE INDEX IF NOT EXISTS idx_handwerker_stadt ON handwerker(stadt);
CREATE INDEX IF NOT EXISTS idx_handwerker_abo_status ON handwerker(abo_status);
CREATE INDEX IF NOT EXISTS idx_dienstleistungen_handwerker_id ON dienstleistungen(handwerker_id);
CREATE INDEX IF NOT EXISTS idx_bewertungen_handwerker_id ON bewertungen(handwerker_id);
CREATE INDEX IF NOT EXISTS idx_handwerker_beruf_stadt ON handwerker(beruf, stadt);

-- ===========================================
-- FUNCTIONS
-- ===========================================

CREATE OR REPLACE FUNCTION update_aktualisiert_am()
RETURNS TRIGGER AS $$
BEGIN
    NEW.aktualisiert_am = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_handwerker_aktualisiert_am
    BEFORE UPDATE ON handwerker
    FOR EACH ROW
    EXECUTE FUNCTION update_aktualisiert_am();

CREATE OR REPLACE FUNCTION durchschnittssterne(handwerker_uuid UUID)
RETURNS NUMERIC AS $$
    SELECT ROUND(AVG(sterne)::NUMERIC, 1)
    FROM bewertungen
    WHERE handwerker_id = handwerker_uuid;
$$ LANGUAGE sql STABLE;

-- ===========================================
-- ROW LEVEL SECURITY (RLS)
-- ===========================================

ALTER TABLE handwerker ENABLE ROW LEVEL SECURITY;
ALTER TABLE dienstleistungen ENABLE ROW LEVEL SECURITY;
ALTER TABLE bewertungen ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Aktive Handwerker sind öffentlich sichtbar"
    ON handwerker FOR SELECT
    USING (abo_status = 'aktiv');

CREATE POLICY "Handwerker kann eigenes Profil sehen"
    ON handwerker FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Handwerker kann eigenes Profil bearbeiten"
    ON handwerker FOR UPDATE
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Authentifizierter Nutzer kann Profil erstellen"
    ON handwerker FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Handwerker kann eigenes Profil löschen"
    ON handwerker FOR DELETE
    USING (auth.uid() = user_id);

CREATE POLICY "Dienstleistungen aktiver Handwerker sind öffentlich"
    ON dienstleistungen FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM handwerker h
            WHERE h.id = handwerker_id AND h.abo_status = 'aktiv'
        )
    );

CREATE POLICY "Handwerker kann eigene Dienstleistungen sehen"
    ON dienstleistungen FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM handwerker h
            WHERE h.id = handwerker_id AND h.user_id = auth.uid()
        )
    );

CREATE POLICY "Handwerker kann eigene Dienstleistungen verwalten"
    ON dienstleistungen FOR ALL
    USING (
        EXISTS (
            SELECT 1 FROM handwerker h
            WHERE h.id = handwerker_id AND h.user_id = auth.uid()
        )
    )
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM handwerker h
            WHERE h.id = handwerker_id AND h.user_id = auth.uid()
        )
    );

CREATE POLICY "Bewertungen aktiver Handwerker sind öffentlich"
    ON bewertungen FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM handwerker h
            WHERE h.id = handwerker_id AND h.abo_status = 'aktiv'
        )
    );

CREATE POLICY "Authentifizierter Nutzer kann Bewertung erstellen"
    ON bewertungen FOR INSERT
    WITH CHECK (auth.uid() IS NOT NULL);
