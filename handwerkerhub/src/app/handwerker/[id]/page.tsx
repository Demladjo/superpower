import Link from "next/link";
import type { Handwerker, Dienstleistung, Bewertung } from "@/lib/types";

const SAMPLE: Handwerker & {
  dienstleistungen: Dienstleistung[];
  bewertungen: Bewertung[];
} = {
  id: "1",
  name: "Thomas Meier",
  beruf: "Elektriker",
  foto_url: null,
  beschreibung:
    "Ich bin seit 15 Jahren als selbständiger Elektriker tätig und biete professionelle Elektroinstallationen für Privat- und Gewerbekunden an. Zuverlässigkeit, saubere Arbeit und Pünktlichkeit sind meine Prioritäten.",
  stadt: "Zürich",
  latitude: 47.3769,
  longitude: 8.5417,
  telefon: "+41 44 123 45 67",
  email: "thomas.meier@example.com",
  abo_status: "aktiv",
  erstellt_am: "2024-01-15",
  dienstleistungen: [
    {
      id: "d1",
      handwerker_id: "1",
      titel: "Elektroinstallation Neubau",
      beschreibung: "Komplette Elektroplanung und Installation für Neubauten.",
      preis_ab: 500,
    },
    {
      id: "d2",
      handwerker_id: "1",
      titel: "Störungsbehebung",
      beschreibung: "Schnelle Behebung von elektrischen Störungen.",
      preis_ab: 120,
    },
    {
      id: "d3",
      handwerker_id: "1",
      titel: "Beleuchtungsinstallation",
      beschreibung: "LED-Umrüstung und neue Beleuchtungskonzepte.",
      preis_ab: 200,
    },
  ],
  bewertungen: [
    {
      id: "b1",
      handwerker_id: "1",
      sterne: 5,
      kommentar:
        "Sehr professionell und pünktlich. Herr Meier hat die Arbeit sauber und schnell erledigt. Gerne wieder!",
      erstellt_am: "2024-05-10",
    },
    {
      id: "b2",
      handwerker_id: "1",
      sterne: 4,
      kommentar: "Gute Arbeit, faire Preise. Kann ich weiterempfehlen.",
      erstellt_am: "2024-04-22",
    },
  ],
};

function SterneAnzeige({ sterne }: { sterne: number }) {
  return (
    <div className="flex gap-0.5 text-lg">
      {[1, 2, 3, 4, 5].map((s) => (
        <span key={s} className={s <= sterne ? "text-yellow-400" : "text-gray-300"}>
          ★
        </span>
      ))}
    </div>
  );
}

export default function HandwerkerProfilPage() {
  const h = SAMPLE;
  const durchschnitt =
    h.bewertungen.length > 0
      ? h.bewertungen.reduce((sum, b) => sum + b.sterne, 0) / h.bewertungen.length
      : 0;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link href="/suche" className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1 mb-6">
        ← Zurück zur Suche
      </Link>

      {/* Profil-Header */}
      <div className="card p-6 mb-6">
        <div className="flex flex-col sm:flex-row gap-6">
          <div className="w-24 h-24 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
            {h.foto_url ? (
              <img
                src={h.foto_url}
                alt={h.name}
                className="w-24 h-24 rounded-full object-cover"
              />
            ) : (
              <span className="text-4xl font-bold text-primary-500">
                {h.name.charAt(0)}
              </span>
            )}
          </div>
          <div className="flex-1">
            <div className="flex flex-wrap items-start gap-3 justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{h.name}</h1>
                <span className="inline-block text-sm bg-primary-50 text-primary-600 font-medium px-3 py-1 rounded-full mt-1">
                  {h.beruf}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <SterneAnzeige sterne={Math.round(durchschnitt)} />
                <span className="text-gray-500 text-sm">
                  ({h.bewertungen.length} Bewertungen)
                </span>
              </div>
            </div>
            <p className="text-gray-500 mt-2 flex items-center gap-1">
              📍 {h.stadt}
            </p>
            <p className="text-gray-700 mt-3 leading-relaxed">{h.beschreibung}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Links: Dienstleistungen + Bewertungen */}
        <div className="md:col-span-2 space-y-6">
          {/* Dienstleistungen */}
          <div className="card p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Dienstleistungen</h2>
            <div className="space-y-4">
              {h.dienstleistungen.map((d) => (
                <div key={d.id} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                  <div className="flex justify-between items-start gap-2">
                    <h3 className="font-medium text-gray-900">{d.titel}</h3>
                    {d.preis_ab && (
                      <span className="text-sm font-semibold text-primary-500 whitespace-nowrap">
                        ab CHF {d.preis_ab}
                      </span>
                    )}
                  </div>
                  {d.beschreibung && (
                    <p className="text-sm text-gray-500 mt-1">{d.beschreibung}</p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Bewertungen */}
          <div className="card p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">
              Bewertungen ({h.bewertungen.length})
            </h2>
            {h.bewertungen.length > 0 ? (
              <div className="space-y-4">
                {h.bewertungen.map((b) => (
                  <div key={b.id} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                    <div className="flex items-center justify-between mb-2">
                      <SterneAnzeige sterne={b.sterne} />
                      <span className="text-xs text-gray-400">
                        {new Date(b.erstellt_am).toLocaleDateString("de-CH")}
                      </span>
                    </div>
                    {b.kommentar && (
                      <p className="text-sm text-gray-700">{b.kommentar}</p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm">Noch keine Bewertungen vorhanden.</p>
            )}
          </div>
        </div>

        {/* Rechts: Kontakt */}
        <div className="space-y-4">
          <div className="card p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Kontakt</h2>
            <div className="space-y-3">
              {h.telefon && (
                <a
                  href={`tel:${h.telefon}`}
                  className="btn-primary w-full text-center flex items-center justify-center gap-2"
                >
                  📞 Anrufen
                </a>
              )}
              <a
                href={`mailto:${h.email}`}
                className="btn-secondary w-full text-center flex items-center justify-center gap-2"
              >
                ✉️ E-Mail schreiben
              </a>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-100 space-y-2 text-sm text-gray-600">
              {h.telefon && (
                <p>
                  <span className="font-medium">Telefon:</span> {h.telefon}
                </p>
              )}
              <p>
                <span className="font-medium">E-Mail:</span> {h.email}
              </p>
              <p>
                <span className="font-medium">Standort:</span> {h.stadt}
              </p>
            </div>
          </div>
          <div className="card p-4 bg-green-50 border-green-200">
            <p className="text-sm text-green-700 font-medium flex items-center gap-2">
              ✓ Aktives Profil
            </p>
            <p className="text-xs text-green-600 mt-1">
              Dieser Handwerker ist auf HandwerkerHub aktiv registriert.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
