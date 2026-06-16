import Link from 'next/link'
import type { Handwerker } from '@/lib/types'

const BERUFE = [
  'Alle Berufe',
  'Elektriker',
  'Maler',
  'Schreiner',
  'Sanitär',
  'Gärtner',
  'Dachdecker',
  'Bodenleger',
  'Maurer',
  'Schlosser',
  'Hafner',
]

const STAEDTE = [
  'Alle Städte',
  'Zürich',
  'Bern',
  'Basel',
  'Genf',
  'Lausanne',
  'Luzern',
  'St. Gallen',
  'Winterthur',
  'Biel',
  'Thun',
]

const SAMPLE_HANDWERKER: Handwerker[] = [
  {
    id: '1',
    name: 'Hans Müller Elektro GmbH',
    beruf: 'Elektriker',
    foto_url: null,
    beschreibung: 'Erfahrener Elektriker mit über 20 Jahren Berufserfahrung. Spezialisiert auf Neuinstallationen, Renovierungen und Störungsbehebung im Raum Zürich.',
    stadt: 'Zürich',
    latitude: 47.3769,
    longitude: 8.5417,
    telefon: '+41 44 123 45 67',
    email: 'info@mueller-elektro.ch',
    abo_status: 'aktiv',
    erstellt_am: '2024-01-15T10:00:00Z',
  },
  {
    id: '2',
    name: 'Peter Baumann Malerei',
    beruf: 'Maler',
    foto_url: null,
    beschreibung: 'Professionelle Malerarbeiten für Privat und Gewerbe. Wir bieten Innen- und Aussenarbeiten, Tapezieren und dekorative Gestaltung in höchster Qualität.',
    stadt: 'Bern',
    latitude: 46.9481,
    longitude: 7.4474,
    telefon: '+41 31 987 65 43',
    email: 'peter@baumann-malerei.ch',
    abo_status: 'aktiv',
    erstellt_am: '2024-02-20T14:00:00Z',
  },
  {
    id: '3',
    name: 'Schreinerei Weber AG',
    beruf: 'Schreiner',
    foto_url: null,
    beschreibung: 'Massgeschneiderte Holzlösungen für Ihr Zuhause. Von der Einbauküche bis zum massiven Esstisch – wir fertigen alles nach Ihren Wünschen.',
    stadt: 'Basel',
    latitude: 47.5596,
    longitude: 7.5886,
    telefon: '+41 61 234 56 78',
    email: 'info@schreinerei-weber.ch',
    abo_status: 'aktiv',
    erstellt_am: '2024-03-10T09:00:00Z',
  },
  {
    id: '4',
    name: 'Sanitär Schneider',
    beruf: 'Sanitär',
    foto_url: null,
    beschreibung: 'Ihr Experte für Sanitärinstallationen, Badezimmer-Renovierungen und Heizungsanlagen. Schnell, zuverlässig, fair.',
    stadt: 'Zürich',
    latitude: 47.3769,
    longitude: 8.5417,
    telefon: '+41 44 876 54 32',
    email: 'kontakt@sanitaer-schneider.ch',
    abo_status: 'aktiv',
    erstellt_am: '2024-04-05T11:00:00Z',
  },
  {
    id: '5',
    name: 'GartenKunst Leuthold',
    beruf: 'Gärtner',
    foto_url: null,
    beschreibung: 'Wir gestalten Ihre Traum-Aussenanlage. Planung, Anlage und Pflege von Gärten, Terrassen und Grünflächen in der ganzen Zentralschweiz.',
    stadt: 'Luzern',
    latitude: 47.0502,
    longitude: 8.3093,
    telefon: '+41 41 345 67 89',
    email: 'info@gartenkunst-leuthold.ch',
    abo_status: 'aktiv',
    erstellt_am: '2024-04-20T08:00:00Z',
  },
  {
    id: '6',
    name: 'Dachdeckerei Frei',
    beruf: 'Dachdecker',
    foto_url: null,
    beschreibung: 'Kompetente Dacharbeiten für Neubauten und Sanierungen. Wir arbeiten mit allen gängigen Dachdeckmaterialien und bieten 10 Jahre Garantie.',
    stadt: 'Winterthur',
    latitude: 47.5,
    longitude: 8.7241,
    telefon: '+41 52 456 78 90',
    email: 'dach@frei-ag.ch',
    abo_status: 'aktiv',
    erstellt_am: '2024-05-01T13:00:00Z',
  },
]

function SternBewertung({ sterne }: { sterne: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((stern) => (
        <svg
          key={stern}
          className={`w-4 h-4 ${stern <= sterne ? 'text-yellow-400 fill-yellow-400' : 'text-neutral-300 fill-neutral-300'}`}
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

function HandwerkerKarte({ handwerker }: { handwerker: Handwerker }) {
  const initials = handwerker.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  const randomRating = 4 + Math.random() * 1
  const roundedRating = Math.round(randomRating * 10) / 10
  const reviewCount = Math.floor(Math.random() * 50) + 5

  return (
    <div className="card p-6 flex flex-col sm:flex-row gap-4">
      <div className="flex-shrink-0">
        {handwerker.foto_url ? (
          <img
            src={handwerker.foto_url}
            alt={handwerker.name}
            className="w-20 h-20 rounded-xl object-cover"
          />
        ) : (
          <div className="w-20 h-20 rounded-xl bg-primary/10 flex items-center justify-center">
            <span className="text-2xl font-bold text-primary">{initials}</span>
          </div>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
          <div>
            <h3 className="font-semibold text-neutral-900 text-lg leading-tight">{handwerker.name}</h3>
            <span className="inline-block bg-primary/10 text-primary text-xs font-medium px-2 py-0.5 rounded-full mt-1">
              {handwerker.beruf}
            </span>
          </div>
          <div className="flex items-center gap-1 text-sm text-neutral-500">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {handwerker.stadt}
          </div>
        </div>

        <div className="flex items-center gap-2 mb-3">
          <SternBewertung sterne={Math.round(roundedRating)} />
          <span className="text-sm font-medium text-neutral-700">{roundedRating}</span>
          <span className="text-sm text-neutral-400">({reviewCount} Bewertungen)</span>
        </div>

        <p className="text-neutral-500 text-sm line-clamp-2 mb-4">{handwerker.beschreibung}</p>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            href={`/handwerker/${handwerker.id}`}
            className="btn-primary text-sm py-2 px-4"
          >
            Profil ansehen
          </Link>
          <a
            href={`tel:${handwerker.telefon}`}
            className="flex items-center gap-2 text-sm text-neutral-600 hover:text-primary transition-colors font-medium"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            {handwerker.telefon}
          </a>
        </div>
      </div>
    </div>
  )
}

export default function SuchePage({
  searchParams,
}: {
  searchParams: { stadt?: string; beruf?: string }
}) {
  const { stadt = '', beruf = '' } = searchParams

  const gefilterte = SAMPLE_HANDWERKER.filter((h) => {
    const stadtMatch = !stadt || h.stadt.toLowerCase().includes(stadt.toLowerCase())
    const berufMatch = !beruf || beruf === 'Alle Berufe' || h.beruf === beruf
    return stadtMatch && berufMatch
  })

  return (
    <div className="bg-neutral-50 min-h-screen">
      {/* Page Header */}
      <div className="bg-white border-b border-neutral-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold text-neutral-900 mb-1">
            Handwerker finden
          </h1>
          <p className="text-neutral-500">
            {gefilterte.length} Handwerker gefunden
            {beruf && beruf !== 'Alle Berufe' ? ` · ${beruf}` : ''}
            {stadt ? ` · ${stadt}` : ''}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filter Sidebar */}
          <aside className="w-full lg:w-72 shrink-0">
            <div className="bg-white rounded-xl border border-neutral-200 p-6 sticky top-24">
              <h2 className="font-semibold text-neutral-900 mb-4 text-lg">Filter</h2>

              <form method="GET" action="/suche">
                <div className="mb-5">
                  <label className="label" htmlFor="stadtFilter">
                    Stadt
                  </label>
                  <select
                    id="stadtFilter"
                    name="stadt"
                    defaultValue={stadt}
                    className="input-field"
                  >
                    {STAEDTE.map((s) => (
                      <option key={s} value={s === 'Alle Städte' ? '' : s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-5">
                  <label className="label" htmlFor="berufFilter">
                    Beruf
                  </label>
                  <select
                    id="berufFilter"
                    name="beruf"
                    defaultValue={beruf}
                    className="input-field"
                  >
                    {BERUFE.map((b) => (
                      <option key={b} value={b === 'Alle Berufe' ? '' : b}>
                        {b}
                      </option>
                    ))}
                  </select>
                </div>

                <button type="submit" className="btn-primary w-full justify-center">
                  Filter anwenden
                </button>

                {(stadt || beruf) && (
                  <a
                    href="/suche"
                    className="mt-3 text-sm text-neutral-500 hover:text-primary text-center block transition-colors"
                  >
                    Filter zurücksetzen
                  </a>
                )}
              </form>

              {/* Map Placeholder in sidebar */}
              <div className="mt-6 pt-6 border-t border-neutral-200">
                <h3 className="font-medium text-neutral-700 mb-3 text-sm">Kartenansicht</h3>
                <div className="rounded-lg bg-neutral-100 h-48 flex items-center justify-center border border-neutral-200">
                  <div className="text-center px-4">
                    <svg className="w-8 h-8 text-neutral-300 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                    </svg>
                    <p className="text-xs text-neutral-400">Karte nach Mapbox-Konfiguration</p>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Results List */}
          <div className="flex-1">
            {gefilterte.length === 0 ? (
              <div className="bg-white rounded-xl border border-neutral-200 p-12 text-center">
                <svg className="w-16 h-16 text-neutral-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <h3 className="text-lg font-semibold text-neutral-700 mb-2">Keine Handwerker gefunden</h3>
                <p className="text-neutral-500 mb-6">
                  Versuchen Sie andere Suchkriterien oder schauen Sie in einer anderen Stadt.
                </p>
                <a href="/suche" className="btn-primary">
                  Alle Handwerker anzeigen
                </a>
              </div>
            ) : (
              <div className="space-y-4">
                {gefilterte.map((handwerker) => (
                  <HandwerkerKarte key={handwerker.id} handwerker={handwerker} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
