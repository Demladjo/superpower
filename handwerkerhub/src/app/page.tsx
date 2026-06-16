import Link from 'next/link'

const BERUFE = [
  { name: 'Elektriker', icon: '⚡', slug: 'Elektriker', beschreibung: 'Installation & Reparatur' },
  { name: 'Maler', icon: '🖌️', slug: 'Maler', beschreibung: 'Innen & Aussen' },
  { name: 'Schreiner', icon: '🪚', slug: 'Schreiner', beschreibung: 'Möbel & Einbauküchen' },
  { name: 'Sanitär', icon: '🔧', slug: 'Sanitär', beschreibung: 'Bad & Heizung' },
  { name: 'Gärtner', icon: '🌿', slug: 'Gärtner', beschreibung: 'Garten & Landschaft' },
  { name: 'Dachdecker', icon: '🏠', slug: 'Dachdecker', beschreibung: 'Dach & Abdichtung' },
  { name: 'Bodenleger', icon: '📐', slug: 'Bodenleger', beschreibung: 'Parkett & Fliesen' },
  { name: 'Maurer', icon: '🧱', slug: 'Maurer', beschreibung: 'Bau & Renovation' },
]

const SCHRITTE = [
  {
    nummer: '01',
    titel: 'Handwerker suchen',
    beschreibung: 'Geben Sie Ihren Ort und die gewünschte Tätigkeit ein. Wir zeigen Ihnen qualifizierte Handwerker in Ihrer Nähe.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    ),
  },
  {
    nummer: '02',
    titel: 'Profil vergleichen',
    beschreibung: 'Lesen Sie Bewertungen, vergleichen Sie Dienstleistungen und Preise. Wählen Sie den Handwerker, der am besten zu Ihnen passt.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
  },
  {
    nummer: '03',
    titel: 'Direkt kontaktieren',
    beschreibung: 'Nehmen Sie direkt Kontakt auf und vereinbaren Sie einen Termin. Einfach, schnell und unkompliziert.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
  },
]

export default function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 text-white py-20 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-primary rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-primary/20 border border-primary/30 rounded-full px-4 py-2 text-sm text-primary-300 mb-6">
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              Über 1&apos;200 geprüfte Handwerker in der Schweiz
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance">
              Finden Sie den richtigen Handwerker{' '}
              <span className="text-primary">in Ihrer Nähe</span>
            </h1>
            <p className="text-lg md:text-xl text-neutral-300 mb-10 text-balance">
              Verbinden Sie sich mit qualifizierten Handwerkern in der ganzen Schweiz.
              Schnell, sicher und unkompliziert.
            </p>

            {/* Search Form */}
            <div className="bg-white rounded-2xl p-2 shadow-2xl flex flex-col sm:flex-row gap-2 max-w-2xl mx-auto">
              <div className="flex-1 flex items-center gap-3 px-4 py-2">
                <svg className="w-5 h-5 text-neutral-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Stadt oder PLZ"
                  className="w-full text-neutral-900 placeholder-neutral-400 focus:outline-none bg-transparent"
                  name="stadt"
                />
              </div>
              <div className="w-px bg-neutral-200 hidden sm:block" />
              <div className="flex-1 flex items-center gap-3 px-4 py-2">
                <svg className="w-5 h-5 text-neutral-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
                </svg>
                <select className="w-full text-neutral-900 focus:outline-none bg-transparent" name="beruf" defaultValue="">
                  <option value="" disabled>Beruf auswählen</option>
                  {BERUFE.map((b) => (
                    <option key={b.slug} value={b.slug}>{b.name}</option>
                  ))}
                </select>
              </div>
              <Link
                href="/suche"
                className="btn-primary rounded-xl justify-center sm:justify-start"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                Suchen
              </Link>
            </div>

            <p className="text-sm text-neutral-400 mt-4">
              Beliebt: Zürich, Bern, Basel, Genf, Lausanne
            </p>
          </div>
        </div>
      </section>

      {/* Popular Trades Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
              Beliebte Berufsgruppen
            </h2>
            <p className="text-neutral-500 text-lg max-w-2xl mx-auto">
              Von Elektrik bis Garten – finden Sie Fachleute für jeden Bedarf.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-6">
            {BERUFE.map((beruf) => (
              <Link
                key={beruf.slug}
                href={`/suche?beruf=${beruf.slug}`}
                className="card p-6 text-center group cursor-pointer"
              >
                <div className="text-4xl mb-3">{beruf.icon}</div>
                <h3 className="font-semibold text-neutral-900 group-hover:text-primary transition-colors">
                  {beruf.name}
                </h3>
                <p className="text-sm text-neutral-500 mt-1">{beruf.beschreibung}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-16 md:py-24 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
              So funktioniert HandwerkerHub
            </h2>
            <p className="text-neutral-500 text-lg max-w-2xl mx-auto">
              In drei einfachen Schritten zum richtigen Handwerker.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {SCHRITTE.map((schritt, index) => (
              <div key={index} className="relative">
                {index < SCHRITTE.length - 1 && (
                  <div className="hidden md:block absolute top-12 left-full w-full h-px bg-neutral-200 z-0 -translate-x-1/2" />
                )}
                <div className="relative bg-white rounded-2xl p-8 shadow-sm border border-neutral-200">
                  <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-6">
                    {schritt.icon}
                  </div>
                  <div className="text-5xl font-bold text-neutral-100 absolute top-6 right-6">
                    {schritt.nummer}
                  </div>
                  <h3 className="text-xl font-semibold text-neutral-900 mb-3">{schritt.titel}</h3>
                  <p className="text-neutral-500 leading-relaxed">{schritt.beschreibung}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Map Placeholder Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
              Handwerker in Ihrer Region
            </h2>
            <p className="text-neutral-500 text-lg">
              Entdecken Sie Fachleute auf der interaktiven Karte.
            </p>
          </div>

          <div className="relative rounded-2xl overflow-hidden border border-neutral-200 bg-neutral-100 h-96 flex items-center justify-center">
            <div className="text-center">
              <div className="w-20 h-20 bg-neutral-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
              </div>
              <p className="text-neutral-600 font-medium">Interaktive Karte</p>
              <p className="text-neutral-400 text-sm mt-1">
                Karte wird nach Konfiguration des Mapbox-API-Schlüssels angezeigt
              </p>
              <Link href="/suche" className="btn-primary mt-4 text-sm py-2">
                Handwerker in Liste ansehen
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-primary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Sind Sie Handwerker?
          </h2>
          <p className="text-xl text-primary-100 mb-8 text-balance">
            Registrieren Sie sich jetzt und werden Sie von tausenden Kunden in der Schweiz gefunden.
            Ihr erstes Monat ist kostenlos!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/registrieren" className="bg-white text-primary px-8 py-4 rounded-xl font-semibold hover:bg-primary-50 transition-colors text-lg">
              Jetzt kostenlos registrieren
            </Link>
            <Link href="/suche" className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/10 transition-colors text-lg">
              Mehr erfahren
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
