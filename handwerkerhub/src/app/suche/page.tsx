import Link from "next/link";
import { BERUFE } from "@/lib/types";
import type { Handwerker } from "@/lib/types";

const SAMPLE_HANDWERKER: Handwerker[] = [
  {
    id: "1",
    name: "Thomas Meier",
    beruf: "Elektriker",
    foto_url: null,
    beschreibung: "15 Jahre Erfahrung im Bereich Elektroinstallationen für Privat und Gewerbe.",
    stadt: "Zürich",
    latitude: 47.3769,
    longitude: 8.5417,
    telefon: "+41 44 123 45 67",
    email: "thomas.meier@example.com",
    abo_status: "aktiv",
    erstellt_am: "2024-01-15",
  },
  {
    id: "2",
    name: "Sandra Keller",
    beruf: "Malerin",
    foto_url: null,
    beschreibung: "Professionelle Malerarbeiten – Innen und Aussen.",
    stadt: "Bern",
    latitude: 46.9481,
    longitude: 7.4474,
    telefon: "+41 31 987 65 43",
    email: "sandra.keller@example.com",
    abo_status: "aktiv",
    erstellt_am: "2024-02-01",
  },
  {
    id: "3",
    name: "Marco Schneider",
    beruf: "Schreiner",
    foto_url: null,
    beschreibung: "Massanfertigungen und Reparaturen aller Art.",
    stadt: "Basel",
    latitude: 47.5596,
    longitude: 7.5886,
    telefon: "+41 61 456 78 90",
    email: "marco.schneider@example.com",
    abo_status: "aktiv",
    erstellt_am: "2024-02-10",
  },
];

function SterneAnzeige({ sterne }: { sterne: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <span key={s} className={s <= sterne ? "text-yellow-400" : "text-gray-300"}>
          ★
        </span>
      ))}
    </div>
  );
}

function HandwerkerKarte({ handwerker }: { handwerker: Handwerker }) {
  return (
    <Link href={`/handwerker/${handwerker.id}`}>
      <div className="card p-5 hover:shadow-md transition-shadow flex gap-4">
        <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
          <span className="text-2xl font-bold text-primary-500">
            {handwerker.name.charAt(0)}
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="font-semibold text-gray-900">{handwerker.name}</h3>
              <span className="inline-block text-xs bg-primary-50 text-primary-600 font-medium px-2 py-0.5 rounded-full mt-0.5">
                {handwerker.beruf}
              </span>
            </div>
            <SterneAnzeige sterne={4} />
          </div>
          <p className="text-sm text-gray-500 mt-1">📍 {handwerker.stadt}</p>
          <p className="text-sm text-gray-600 mt-2 line-clamp-2">
            {handwerker.beschreibung}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default async function SuchePage({
  searchParams,
}: {
  searchParams: Promise<{ stadt?: string; beruf?: string }>;
}) {
  const params = await searchParams;
  const { stadt = "", beruf = "" } = params;

  const gefiltert = SAMPLE_HANDWERKER.filter((h) => {
    const stadtMatch = !stadt || h.stadt.toLowerCase().includes(stadt.toLowerCase());
    const berufMatch = !beruf || h.beruf.toLowerCase() === beruf.toLowerCase();
    return stadtMatch && berufMatch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">
        Handwerker suchen
        {beruf && <span className="text-primary-500"> – {beruf}</span>}
        {stadt && <span className="text-gray-500 font-normal text-lg"> in {stadt}</span>}
      </h1>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Filter Sidebar */}
        <aside className="lg:w-64 flex-shrink-0">
          <div className="card p-5">
            <h2 className="font-semibold text-gray-900 mb-4">Filter</h2>
            <form action="/suche" method="get">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Stadt
                  </label>
                  <input
                    type="text"
                    name="stadt"
                    defaultValue={stadt}
                    placeholder="z.B. Zürich"
                    className="input"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Beruf
                  </label>
                  <select name="beruf" className="input">
                    <option value="">Alle Berufe</option>
                    {BERUFE.map((b) => (
                      <option key={b} value={b} selected={b === beruf}>
                        {b}
                      </option>
                    ))}
                  </select>
                </div>
                <button type="submit" className="btn-primary w-full">
                  Filtern
                </button>
              </div>
            </form>
          </div>
        </aside>

        {/* Ergebnisse */}
        <div className="flex-1">
          <div className="flex flex-col xl:flex-row gap-6">
            {/* Liste */}
            <div className="flex-1">
              <p className="text-sm text-gray-500 mb-4">
                {gefiltert.length} Handwerker gefunden
              </p>
              {gefiltert.length > 0 ? (
                <div className="space-y-4">
                  {gefiltert.map((h) => (
                    <HandwerkerKarte key={h.id} handwerker={h} />
                  ))}
                </div>
              ) : (
                <div className="card p-12 text-center">
                  <div className="text-4xl mb-3">🔍</div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    Keine Handwerker gefunden
                  </h3>
                  <p className="text-gray-500 text-sm">
                    Versuchen Sie es mit anderen Suchbegriffen.
                  </p>
                </div>
              )}
            </div>

            {/* Karte Platzhalter */}
            <div className="xl:w-96 flex-shrink-0">
              <div className="card h-80 xl:h-full min-h-64 flex items-center justify-center bg-gray-50 text-gray-400">
                <div className="text-center">
                  <div className="text-4xl mb-2">🗺️</div>
                  <p className="text-sm font-medium">Kartenansicht</p>
                  <p className="text-xs mt-1">Nach Mapbox-Konfiguration</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
