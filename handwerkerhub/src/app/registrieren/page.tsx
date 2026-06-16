"use client";

import { useState } from "react";
import Link from "next/link";
import { BERUFE } from "@/lib/types";

export default function RegistrierenPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    passwort: "",
    beruf: "",
    stadt: "",
    telefon: "",
    beschreibung: "",
    checkbox1: false,
    checkbox2: false,
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) {
    const target = e.target;
    const value =
      target instanceof HTMLInputElement && target.type === "checkbox"
        ? target.checked
        : target.value;
    setForm((prev) => ({ ...prev, [target.name]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!form.checkbox1 || !form.checkbox2) {
      setError(
        "Bitte bestätigen Sie beide Pflichtangaben zur gewerblichen Tätigkeit."
      );
      return;
    }
    if (!form.beruf) {
      setError("Bitte wählen Sie einen Beruf aus.");
      return;
    }

    // Hier kommt später die Supabase-Logik
    setSuccess(true);
  }

  if (success) {
    return (
      <div className="max-w-lg mx-auto px-4 py-16 text-center">
        <div className="text-5xl mb-4">🎉</div>
        <h1 className="text-2xl font-bold text-gray-900 mb-3">
          Registrierung erfolgreich!
        </h1>
        <p className="text-gray-600 mb-6">
          Ihr Profil wurde erstellt. Im nächsten Schritt können Sie Ihr Abonnement
          aktivieren, um für Kunden sichtbar zu sein.
        </p>
        <Link href="/" className="btn-primary">
          Zur Startseite
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Als Handwerker anmelden</h1>
        <p className="text-gray-600 mt-2">
          Erstellen Sie Ihr Profil und werden Sie von Kunden in Ihrer Region gefunden.
        </p>
      </div>

      <div className="card p-6 md:p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Konto */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">
              Konto-Informationen
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Vollständiger Name *
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={form.name}
                  onChange={handleChange}
                  placeholder="z.B. Thomas Meier"
                  className="input"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  E-Mail-Adresse *
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  placeholder="ihre@email.ch"
                  className="input"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Passwort *
                </label>
                <input
                  type="password"
                  name="passwort"
                  required
                  minLength={8}
                  value={form.passwort}
                  onChange={handleChange}
                  placeholder="Mindestens 8 Zeichen"
                  className="input"
                />
              </div>
            </div>
          </div>

          {/* Beruf & Standort */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">
              Beruf & Standort
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Beruf *
                </label>
                <select
                  name="beruf"
                  required
                  value={form.beruf}
                  onChange={handleChange}
                  className="input"
                >
                  <option value="">Bitte auswählen</option>
                  {BERUFE.map((b) => (
                    <option key={b} value={b}>
                      {b}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Stadt *
                </label>
                <input
                  type="text"
                  name="stadt"
                  required
                  value={form.stadt}
                  onChange={handleChange}
                  placeholder="z.B. Zürich"
                  className="input"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Telefonnummer
                </label>
                <input
                  type="tel"
                  name="telefon"
                  value={form.telefon}
                  onChange={handleChange}
                  placeholder="+41 44 123 45 67"
                  className="input"
                />
              </div>
            </div>
          </div>

          {/* Beschreibung */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">
              Über mich
            </h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Beschreibung
              </label>
              <textarea
                name="beschreibung"
                rows={4}
                value={form.beschreibung}
                onChange={handleChange}
                placeholder="Beschreiben Sie Ihre Erfahrung, Spezialisierungen und was Sie von anderen abhebt..."
                className="input resize-none"
              />
            </div>
          </div>

          {/* Pflicht-Checkboxen */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">
              Gewerbliche Bestätigung *
            </h2>
            <div className="space-y-4">
              <label className="flex items-start gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  name="checkbox1"
                  checked={form.checkbox1}
                  onChange={handleChange}
                  className="mt-0.5 w-5 h-5 rounded border-gray-300 text-primary-500 focus:ring-primary-500 cursor-pointer"
                />
                <span className="text-sm text-gray-700 group-hover:text-gray-900 transition-colors">
                  Ich bestätige, dass ich{" "}
                  <strong>selbständig oder gewerblich angemeldet</strong> bin und
                  berechtigt bin, Handwerksleistungen gewerbsmässig anzubieten.
                </span>
              </label>
              <label className="flex items-start gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  name="checkbox2"
                  checked={form.checkbox2}
                  onChange={handleChange}
                  className="mt-0.5 w-5 h-5 rounded border-gray-300 text-primary-500 focus:ring-primary-500 cursor-pointer"
                />
                <span className="text-sm text-gray-700 group-hover:text-gray-900 transition-colors">
                  Ich bin mir bewusst, dass ich{" "}
                  <strong>
                    selbst verantwortlich bin für meine Steuern und das Einhalten
                    der Gewerbevorschriften
                  </strong>{" "}
                  in der Schweiz. HandwerkerHub übernimmt keine Haftung in diesem
                  Bereich.
                </span>
              </label>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="btn-primary w-full py-3 text-base"
          >
            Profil erstellen & weiter zur Zahlung
          </button>

          <p className="text-center text-sm text-gray-500">
            Bereits registriert?{" "}
            <Link href="/login" className="text-primary-500 hover:underline font-medium">
              Hier anmelden
            </Link>
          </p>
        </form>
      </div>

      <p className="text-center text-xs text-gray-400 mt-6">
        Mit der Registrierung stimmen Sie unseren{" "}
        <Link href="/agb" className="hover:underline">AGB</Link> und der{" "}
        <Link href="/datenschutz" className="hover:underline">Datenschutzerklärung</Link> zu.
      </p>
    </div>
  );
}
