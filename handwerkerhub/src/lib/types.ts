export type AboStatus = "aktiv" | "inaktiv";

export interface Handwerker {
  id: string;
  name: string;
  beruf: string;
  foto_url: string | null;
  beschreibung: string | null;
  stadt: string;
  latitude: number | null;
  longitude: number | null;
  telefon: string | null;
  email: string;
  abo_status: AboStatus;
  erstellt_am: string;
  dienstleistungen?: Dienstleistung[];
  bewertungen?: Bewertung[];
}

export interface Dienstleistung {
  id: string;
  handwerker_id: string;
  titel: string;
  beschreibung: string | null;
  preis_ab: number | null;
}

export interface Bewertung {
  id: string;
  handwerker_id: string;
  sterne: number;
  kommentar: string | null;
  erstellt_am: string;
}

export const BERUFE = [
  "Elektriker",
  "Maler",
  "Schreiner",
  "Sanitär",
  "Gärtner",
  "Maurer",
  "Dachdecker",
  "Schlosser",
  "Bodenleger",
  "Gebäudereiniger",
] as const;

export type Beruf = (typeof BERUFE)[number];
