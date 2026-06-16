import type { Metadata } from 'next'
import './globals.css'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'HandwerkerHub – Handwerker in der Schweiz finden',
  description: 'Finden Sie qualifizierte Handwerker in Ihrer Nähe. Elektriker, Maler, Schreiner und viele mehr in der ganzen Schweiz.',
  keywords: 'Handwerker, Schweiz, Elektriker, Maler, Schreiner, Sanitär, Handwerk',
  openGraph: {
    title: 'HandwerkerHub – Handwerker in der Schweiz finden',
    description: 'Finden Sie qualifizierte Handwerker in Ihrer Nähe.',
    locale: 'de_CH',
    type: 'website',
  },
}

function Header() {
  return (
    <header className="bg-white border-b border-neutral-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
              </svg>
            </div>
            <span className="text-xl font-bold text-neutral-900">
              Handwerker<span className="text-primary">Hub</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-neutral-600 hover:text-primary font-medium transition-colors">
              Startseite
            </Link>
            <Link href="/suche" className="text-neutral-600 hover:text-primary font-medium transition-colors">
              Handwerker finden
            </Link>
            <Link href="/registrieren" className="btn-primary text-sm py-2 px-4">
              Als Handwerker anmelden
            </Link>
          </nav>

          <button className="md:hidden p-2 rounded-lg text-neutral-600 hover:bg-neutral-100" aria-label="Menü öffnen">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  )
}

function Footer() {
  return (
    <footer className="bg-neutral-900 text-neutral-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
                </svg>
              </div>
              <span className="text-xl font-bold text-white">
                Handwerker<span className="text-primary">Hub</span>
              </span>
            </Link>
            <p className="text-sm text-neutral-400 max-w-xs">
              Die führende Plattform für Handwerker und Kunden in der Schweiz. Qualität trifft Vertrauen.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Für Kunden</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/suche" className="hover:text-white transition-colors">Handwerker finden</Link></li>
              <li><Link href="/suche?beruf=Elektriker" className="hover:text-white transition-colors">Elektriker</Link></li>
              <li><Link href="/suche?beruf=Maler" className="hover:text-white transition-colors">Maler</Link></li>
              <li><Link href="/suche?beruf=Schreiner" className="hover:text-white transition-colors">Schreiner</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Für Handwerker</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/registrieren" className="hover:text-white transition-colors">Profil erstellen</Link></li>
              <li><Link href="/registrieren" className="hover:text-white transition-colors">Preise & Abonnements</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-neutral-800 mt-8 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
          <p className="text-neutral-500">
            © {new Date().getFullYear()} HandwerkerHub. Alle Rechte vorbehalten.
          </p>
          <div className="flex items-center gap-6 text-neutral-500">
            <Link href="#" className="hover:text-white transition-colors">Datenschutz</Link>
            <Link href="#" className="hover:text-white transition-colors">Nutzungsbedingungen</Link>
            <Link href="#" className="hover:text-white transition-colors">Kontakt</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="de">
      <body>
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
