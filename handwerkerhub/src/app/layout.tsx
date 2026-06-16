import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "HandwerkerHub – Handwerker in der Schweiz finden",
  description:
    "Finden Sie zuverlässige Handwerker in Ihrer Nähe. Elektriker, Maler, Schreiner und mehr.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de">
      <body className={inter.className}>
        <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <Link href="/" className="flex items-center gap-2">
                <span className="text-2xl font-bold text-primary-500">⚒</span>
                <span className="text-xl font-bold text-gray-900">
                  Handwerker<span className="text-primary-500">Hub</span>
                </span>
              </Link>
              <nav className="hidden md:flex items-center gap-6">
                <Link
                  href="/"
                  className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
                >
                  Startseite
                </Link>
                <Link
                  href="/suche"
                  className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
                >
                  Handwerker finden
                </Link>
                <Link href="/registrieren" className="btn-primary">
                  Als Handwerker anmelden
                </Link>
              </nav>
              <button className="md:hidden p-2 text-gray-600">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </header>
        <main>{children}</main>
        <footer className="bg-gray-900 text-gray-400 mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <div className="text-white font-bold text-lg mb-3">
                  ⚒ HandwerkerHub
                </div>
                <p className="text-sm">
                  Die Vermittlungsplattform für Handwerker und Kunden in der
                  Schweiz.
                </p>
              </div>
              <div>
                <h3 className="text-white font-semibold mb-3">Links</h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link href="/suche" className="hover:text-white transition-colors">
                      Handwerker finden
                    </Link>
                  </li>
                  <li>
                    <Link href="/registrieren" className="hover:text-white transition-colors">
                      Als Handwerker anmelden
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-white font-semibold mb-3">Rechtliches</h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link href="/datenschutz" className="hover:text-white transition-colors">
                      Datenschutz
                    </Link>
                  </li>
                  <li>
                    <Link href="/agb" className="hover:text-white transition-colors">
                      AGB
                    </Link>
                  </li>
                  <li>
                    <Link href="/impressum" className="hover:text-white transition-colors">
                      Impressum
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-800 mt-8 pt-8 text-sm text-center">
              © {new Date().getFullYear()} HandwerkerHub. Alle Rechte vorbehalten.
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
