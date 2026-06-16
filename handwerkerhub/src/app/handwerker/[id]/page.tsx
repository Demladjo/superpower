import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Handwerker, Bewertung, Dienstleistung } from '@/lib/types'

// Sample data – in production this would come from Supabase
const SAMPLE_HANDWERKER: Record<string, Handwerker & { dienstleistungen: Dienstleistung[]; bewertungen: Bewertung[] }> = {
  '1': {
    id: '1',
    name: 'Hans Müller Elektro GmbH',
    beruf: 'Elektriker',
    foto_url: null,
    beschreibung: `Erfahrener Elektriker mit über 20 Jahren Berufserfahrung in der Region Zürich und Umgebung.

Wir bieten ein umfassendes Leistungsangebot für Privat- und Gewerbekunden: von der Neuinstallation über Umbau und Renovation bis hin zur schnellen Störungsbehebung.

Unser Team aus qualifizierten Elektrikern steht Ihnen von Montag bis Freitag sowie an Wochenenden für Notfälle zur Verfügung. Wir arbeiten sauber, pünktlich und zu fairen Preisen.`,
    stadt: 'Zürich',
    latitude: 47.3769,
    longitude: 8.5417,
    telefon: '+41 44 123 45 67',
    email: 'info@mueller-elektro.ch',
    abo_status: 'aktiv',
    erstellt_am: '2024-01-15T10:00:00Z',
    dienstleistungen: [
      { id: 'd1', handwerker_id: '1', titel: 'Neuinstallation Elektrik', beschreibung: 'Komplette Elektroinstallation für Neu- und Umbauten', preis_ab: 120 },
      { id: 'd2', handwerker_id: '1', titel: 'Störungsbehebung', beschreibung: 'Schnelle Diagnose und Behebung von Elektrostörungen', preis_ab: 95 },
      { id: 'd3', handwerker_id: '1', titel: 'Sicherungskasten', beschreibung: 'Einbau und Modernisierung von Sicherungskästen', preis_ab: 350 },
      { id: 'd4', handwerker_id: '1', titel: 'Aussenbeleuchtung', beschreibung: 'Planung und Installation von Aussenbeleuchtung', preis_ab: 80 },
    ],
    bewertungen: [
      { id: 'b1', handwerker_id: '1', sterne: 5, kommentar: 'Sehr professionell und pünktlich. Die Arbeit wurde sauber und schnell erledigt. Absolute Empfehlung!', erstellt_am: '2024-05-10T14:00:00Z' },
      { id: 'b2', handwerker_id: '1', sterne: 5, kommentar: 'Haben unsere komplette Wohnung neu verkabeln lassen. Alles top, Preis-Leistungs-Verhältnis stimmt.', erstellt_am: '2024-04-22T09:00:00Z' },
      { id: 'b3', handwerker_id: '1', sterne: 4, kommentar: 'Gute Arbeit, aber etwas schwierig zu erreichen. Letztendlich wurde alles zu unserer Zufriedenheit gelöst.', erstellt_am: '2024-03-15T16:00:00Z' },
    ],
  },
}

function SternBewertung({ sterne, gross = false }: { sterne: number; gross?: boolean }) {
  const groesse = gross ? 'w-6 h-6' : 'w-4 h-4'
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((stern) => (
        <svg
          key={stern}
          className={`${groesse} ${stern <= sterne ? 'text-yellow-400 fill-yellow-400' : 'text-neutral-300 fill-neutral-300'}`}
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

export default function HandwerkerProfilPage({ params }: { params: { id: string } }) {
  const handwerker = SAMPLE_HANDWERKER[params.id]

  if (!handwerker) {
    notFound()
  }

  const durchschnittsSterne =
    handwerker.bewertungen.length > 0
      ? Math.round(
          (handwerker.bewertungen.reduce((sum, b) => sum + b.sterne, 0) /
            handwerker.bewertungen.length) *
            10
        ) / 10
      : 0

  const initials = handwerker.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  const datumFormatieren = (isoString: string) => {
    return new Date(isoString).toLocaleDateString('de-CH', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
  }

  return (
    <div className="bg-neutral-50 min-h-screen py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-neutral-500 mb-6">
          <Link href="/" className="hover:text-primary transition-colors">Startseite</Link>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <Link href="/suche" className="hover:text-primary transition-colors">Handwerker finden</Link>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <span className="text-neutral-900 font-medium">{handwerker.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile Header Card */}
            <div className="bg-white rounded-xl border border-neutral-200 p-6 md:p-8">
              <div className="flex flex-col sm:flex-row gap-6">
                {handwerker.foto_url ? (
                  <img
                    src={handwerker.foto_url}
                    alt={handwerker.name}
                    className="w-28 h-28 rounded-2xl object-cover shrink-0"
                  />
                ) : (
                  <div className="w-28 h-28 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                    <span className="text-4xl font-bold text-primary">{initials}</span>
                  </div>
                )}

                <div className="flex-1">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h1 className="text-2xl font-bold text-neutral-900">{handwerker.name}</h1>
                      <span className="inline-block bg-primary/10 text-primary text-sm font-medium px-3 py-1 rounded-full mt-2">
                        {handwerker.beruf}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 bg-yellow-50 border border-yellow-200 rounded-lg px-3 py-2">
                      <SternBewertung sterne={Math.round(durchschnittsSterne)} />
                      <span className="text-sm font-semibold text-neutral-700 ml-1">{durchschnittsSterne}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 mt-4 text-sm text-neutral-600">
                    <div className="flex items-center gap-1">
                      <svg className="w-4 h-4 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {handwerker.stadt}, Schweiz
                    </div>
                    <div className="flex items-center gap-1">
                      <svg className="w-4 h-4 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                      {handwerker.bewertungen.length} Bewertungen
                    </div>
                    <div className="flex items-center gap-1 text-green-600">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Verifiziertes Profil
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-xl border border-neutral-200 p-6 md:p-8">
              <h2 className="text-xl font-semibold text-neutral-900 mb-4">Über uns</h2>
              <div className="text-neutral-600 leading-relaxed whitespace-pre-line">
                {handwerker.beschreibung}
              </div>
            </div>

            {/* Services */}
            <div className="bg-white rounded-xl border border-neutral-200 p-6 md:p-8">
              <h2 className="text-xl font-semibold text-neutral-900 mb-6">Dienstleistungen</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {handwerker.dienstleistungen.map((dl) => (
                  <div key={dl.id} className="border border-neutral-200 rounded-xl p-4 hover:border-primary/30 hover:bg-primary/5 transition-colors">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="font-medium text-neutral-900">{dl.titel}</h3>
                      <span className="text-sm font-semibold text-primary whitespace-nowrap">
                        ab CHF {dl.preis_ab}.–
                      </span>
                    </div>
                    <p className="text-sm text-neutral-500">{dl.beschreibung}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Reviews */}
            <div className="bg-white rounded-xl border border-neutral-200 p-6 md:p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-neutral-900">
                  Bewertungen ({handwerker.bewertungen.length})
                </h2>
                <div className="flex items-center gap-2">
                  <SternBewertung sterne={Math.round(durchschnittsSterne)} gross />
                  <span className="text-lg font-bold text-neutral-900">{durchschnittsSterne}</span>
                </div>
              </div>

              <div className="space-y-6">
                {handwerker.bewertungen.map((bewertung) => (
                  <div key={bewertung.id} className="border-b border-neutral-100 last:border-0 pb-6 last:pb-0">
                    <div className="flex items-center justify-between mb-2">
                      <SternBewertung sterne={bewertung.sterne} />
                      <span className="text-sm text-neutral-400">
                        {datumFormatieren(bewertung.erstellt_am)}
                      </span>
                    </div>
                    {bewertung.kommentar && (
                      <p className="text-neutral-600 text-sm leading-relaxed mt-2">
                        &ldquo;{bewertung.kommentar}&rdquo;
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar – Contact */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-neutral-200 p-6 sticky top-24">
              <h2 className="text-lg font-semibold text-neutral-900 mb-5">Kontakt aufnehmen</h2>

              <div className="space-y-4 mb-6">
                <a
                  href={`tel:${handwerker.telefon}`}
                  className="btn-primary w-full justify-center"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Anrufen
                </a>
                <a
                  href={`mailto:${handwerker.email}`}
                  className="btn-secondary w-full justify-center"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  E-Mail senden
                </a>
              </div>

              <div className="border-t border-neutral-100 pt-5 space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <svg className="w-5 h-5 text-neutral-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <div>
                    <p className="text-neutral-500 text-xs">Telefon</p>
                    <p className="font-medium text-neutral-800">{handwerker.telefon}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <svg className="w-5 h-5 text-neutral-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <div>
                    <p className="text-neutral-500 text-xs">E-Mail</p>
                    <p className="font-medium text-neutral-800 break-all">{handwerker.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <svg className="w-5 h-5 text-neutral-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <div>
                    <p className="text-neutral-500 text-xs">Standort</p>
                    <p className="font-medium text-neutral-800">{handwerker.stadt}, Schweiz</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Back to search */}
            <Link
              href="/suche"
              className="flex items-center gap-2 text-sm text-neutral-500 hover:text-primary transition-colors font-medium"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Zurück zur Suche
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
