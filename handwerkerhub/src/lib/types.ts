export type AboStatus = 'aktiv' | 'inaktiv'

export interface Handwerker {
  id: string
  name: string
  beruf: string
  foto_url: string | null
  beschreibung: string
  stadt: string
  latitude: number
  longitude: number
  telefon: string
  email: string
  abo_status: AboStatus
  erstellt_am: string
}

export interface Dienstleistung {
  id: string
  handwerker_id: string
  titel: string
  beschreibung: string
  preis_ab: number
}

export interface Bewertung {
  id: string
  handwerker_id: string
  sterne: number // 1-5
  kommentar: string | null
  erstellt_am: string
}

export interface HandwerkerMitDetails extends Handwerker {
  dienstleistungen: Dienstleistung[]
  bewertungen: Bewertung[]
  durchschnittssterne?: number
}

export interface SuchParameter {
  stadt?: string
  beruf?: string
  seite?: number
  proSeite?: number
}

export interface SuchErgebnis {
  handwerker: Handwerker[]
  gesamt: number
  seite: number
  proSeite: number
}
