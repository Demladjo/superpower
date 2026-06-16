import Link from "next/link";
import { BERUFE } from "@/lib/types";

const BERUF_ICONS: Record<string, string> = {
  Elektriker: "⚡",
  Maler: "🎨",
  Schreiner: "🪵",
  Sanitär: "🔧",
  Gärtner: "🌿",
  Maurer: "🧱",
  Dachdecker: "🏠",
  Schlosser: "🔒",
  Bodenleger: "🏗️",
  Gebäudereiniger: "🧹",
};

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-50 to-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
            Finden Sie den richtigen{" "}
            <span className="text-primary-500">Handwerker</span>
            <br />
            in Ihrer Nähe
          </h1>
          <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto">
            Verbinden Sie sich mit geprüften Handwerkern in der Schweiz.
            Kostenlos suchen und direkt Kontakt aufnehmen.
          </p>
          <form
            action="/suche"
            method="get"
            className="flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto"
          >
            <input
              type="text"
              name="stadt"
              placeholder="Stadt (z.B. Zürich, Bern, Basel)"
              className="input flex-1"
            />
            <select name="beruf" className="input sm:w-48">
              <option value="">Alle Berufe</option>
              {BERUFE.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
            <button type="submit" className="btn-primary whitespace-nowrap">
              Suchen
            </button>
          </form>
        </div>
      </section>

      {/* Berufe */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
          Beliebte Berufe
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {BERUFE.map((beruf) => (
            <Link
              key={beruf}
              href={`/suche?beruf=${encodeURIComponent(beruf)}`}
              className="card p-4 text-center hover:shadow-md transition-shadow group"
            >
              <div className="text-3xl mb-2">{BERUF_ICONS[beruf] ?? "🔨"}</div>
              <div className="text-sm font-medium text-gray-700 group-hover:text-primary-500 transition-colors">
                {beruf}
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Karte Platzhalter */}
      <section className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">
            Handwerker auf der Karte
          </h2>
          <p className="text-gray-500 text-center mb-6">
            Entdecken Sie Handwerker in Ihrer Region
          </p>
          <div className="bg-gray-300 rounded-2xl h-80 flex items-center justify-center text-gray-500">
            <div className="text-center">
              <div className="text-4xl mb-3">🗺️</div>
              <p className="font-medium">Interaktive Karte</p>
              <p className="text-sm mt-1">
                Wird nach Mapbox-Konfiguration angezeigt
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Wie es funktioniert */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-12 text-center">
          So funktioniert HandwerkerHub
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              nr: "1",
              titel: "Handwerker suchen",
              text: "Geben Sie Ihre Stadt und den gewünschten Beruf ein und finden Sie passende Handwerker in Ihrer Nähe.",
              icon: "🔍",
            },
            {
              nr: "2",
              titel: "Profil ansehen",
              text: "Lesen Sie Bewertungen, sehen Sie Dienstleistungen und Preise und wählen Sie den passenden Handwerker aus.",
              icon: "👤",
            },
            {
              nr: "3",
              titel: "Direkt Kontakt aufnehmen",
              text: "Kontaktieren Sie den Handwerker direkt per Telefon oder E-Mail — ohne Umwege über die Plattform.",
              icon: "📞",
            },
          ].map((step) => (
            <div key={step.nr} className="text-center">
              <div className="w-16 h-16 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">{step.icon}</span>
              </div>
              <div className="text-xs font-bold text-primary-500 uppercase tracking-widest mb-2">
                Schritt {step.nr}
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                {step.titel}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">{step.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA für Handwerker */}
      <section className="bg-primary-500 py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Sie sind Handwerker?
          </h2>
          <p className="text-primary-100 mb-8">
            Erstellen Sie Ihr Profil und werden Sie von Kunden in Ihrer Region
            gefunden. Ab CHF 29/Monat.
          </p>
          <Link
            href="/registrieren"
            className="bg-white text-primary-500 font-bold py-3 px-8 rounded-lg hover:bg-primary-50 transition-colors inline-block"
          >
            Jetzt anmelden
          </Link>
        </div>
      </section>
    </>
  );
}
