'use client'

import { useState, FormEvent } from 'react'
import Link from 'next/link'

const BERUFE = [
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
  'Kaminfeger',
  'Klempner',
  'Gebäudereiniger',
  'Fensterputzer',
  'Spengler',
  'Zimmermann',
  'Stuckateur',
  'Glaserarbeiten',
  'Sonstiges',
]

interface FormData {
  vorname: string
  nachname: string
  firmenname: string
  email: string
  passwort: string
  passwortWiederholen: string
  beruf: string
  stadt: string
  plz: string
  telefon: string
  beschreibung: string
  selbstaendigCheck: boolean
  steuerCheck: boolean
}

export default function RegistrierenPage() {
  const [formData, setFormData] = useState<FormData>({
    vorname: '',
    nachname: '',
    firmenname: '',
    email: '',
    passwort: '',
    passwortWiederholen: '',
    beruf: '',
    stadt: '',
    plz: '',
    telefon: '',
    beschreibung: '',
    selbstaendigCheck: false,
    steuerCheck: false,
  })
  const [fehler, setFehler] = useState<Partial<Record<keyof FormData, string>>>({})
  const [isLoading, setIsLoading] = useState(false)
  const [erfolg, setErfolg] = useState(false)

  const validieren = (): boolean => {
    const neueFehler: Partial<Record<keyof FormData, string>> = {}

    if (!formData.vorname.trim()) neueFehler.vorname = 'Vorname ist erforderlich'
    if (!formData.nachname.trim()) neueFehler.nachname = 'Nachname ist erforderlich'
    if (!formData.email.trim()) {
      neueFehler.email = 'E-Mail ist erforderlich'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      neueFehler.email = 'Bitte geben Sie eine gültige E-Mail-Adresse ein'
    }
    if (!formData.passwort) {
      neueFehler.passwort = 'Passwort ist erforderlich'
    } else if (formData.passwort.length < 8) {
      neueFehler.passwort = 'Passwort muss mindestens 8 Zeichen lang sein'
    }
    if (formData.passwort !== formData.passwortWiederholen) {
      neueFehler.passwortWiederholen = 'Passwörter stimmen nicht überein'
    }
    if (!formData.beruf) neueFehler.beruf = 'Bitte wählen Sie einen Beruf aus'
    if (!formData.stadt.trim()) neueFehler.stadt = 'Stadt ist erforderlich'
    if (!formData.telefon.trim()) neueFehler.telefon = 'Telefonnummer ist erforderlich'
    if (!formData.beschreibung.trim()) {
      neueFehler.beschreibung = 'Beschreibung ist erforderlich'
    } else if (formData.beschreibung.trim().length < 50) {
      neueFehler.beschreibung = 'Beschreibung muss mindestens 50 Zeichen lang sein'
    }
    if (!formData.selbstaendigCheck) {
      neueFehler.selbstaendigCheck = 'Diese Bestätigung ist erforderlich'
    }
    if (!formData.steuerCheck) {
      neueFehler.steuerCheck = 'Diese Bestätigung ist erforderlich'
    }

    setFehler(neueFehler)
    return Object.keys(neueFehler).length === 0
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!validieren()) return

    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsLoading(false)
    setErfolg(true)
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
    if (fehler[name as keyof FormData]) {
      setFehler((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  if (erfolg) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center px-4 py-12">
        <div className="bg-white rounded-2xl border border-neutral-200 p-10 max-w-md w-full text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-neutral-900 mb-3">Registrierung erfolgreich!</h1>
          <p className="text-neutral-600 mb-2">
            Vielen Dank, <strong>{formData.vorname} {formData.nachname}</strong>!
          </p>
          <p className="text-neutral-500 text-sm mb-8">
            Wir haben Ihre Registrierung erhalten. Sie erhalten in Kürze eine Bestätigungs-E-Mail an <strong>{formData.email}</strong>. Ihr Profil wird nach Überprüfung freigeschaltet.
          </p>
          <div className="flex flex-col gap-3">
            <Link href="/" className="btn-primary justify-center">
              Zur Startseite
            </Link>
            <Link href="/suche" className="btn-secondary justify-center">
              Handwerker ansehen
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-neutral-50 min-h-screen py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-neutral-900 mb-3">
            Als Handwerker registrieren
          </h1>
          <p className="text-neutral-500 text-lg">
            Erstellen Sie Ihr Profil und werden Sie von tausenden Kunden in der Schweiz gefunden.
          </p>
          <div className="flex items-center justify-center gap-6 mt-4 text-sm">
            <div className="flex items-center gap-1.5 text-green-600">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Erstes Monat kostenlos
            </div>
            <div className="flex items-center gap-1.5 text-green-600">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Keine versteckten Kosten
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} noValidate className="bg-white rounded-2xl border border-neutral-200 p-6 md:p-8 space-y-6">
          {/* Personal Info */}
          <div>
            <h2 className="text-lg font-semibold text-neutral-900 mb-4 pb-2 border-b border-neutral-100">
              Persönliche Angaben
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="label" htmlFor="vorname">Vorname *</label>
                <input
                  type="text"
                  id="vorname"
                  name="vorname"
                  value={formData.vorname}
                  onChange={handleChange}
                  className={`input-field ${fehler.vorname ? 'border-red-400 focus:ring-red-400' : ''}`}
                  placeholder="Max"
                />
                {fehler.vorname && <p className="text-red-500 text-xs mt-1">{fehler.vorname}</p>}
              </div>
              <div>
                <label className="label" htmlFor="nachname">Nachname *</label>
                <input
                  type="text"
                  id="nachname"
                  name="nachname"
                  value={formData.nachname}
                  onChange={handleChange}
                  className={`input-field ${fehler.nachname ? 'border-red-400 focus:ring-red-400' : ''}`}
                  placeholder="Muster"
                />
                {fehler.nachname && <p className="text-red-500 text-xs mt-1">{fehler.nachname}</p>}
              </div>
            </div>

            <div className="mt-4">
              <label className="label" htmlFor="firmenname">Firmenname (optional)</label>
              <input
                type="text"
                id="firmenname"
                name="firmenname"
                value={formData.firmenname}
                onChange={handleChange}
                className="input-field"
                placeholder="Muster Elektro GmbH"
              />
            </div>
          </div>

          {/* Login Info */}
          <div>
            <h2 className="text-lg font-semibold text-neutral-900 mb-4 pb-2 border-b border-neutral-100">
              Anmeldedaten
            </h2>
            <div className="space-y-4">
              <div>
                <label className="label" htmlFor="email">E-Mail-Adresse *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`input-field ${fehler.email ? 'border-red-400 focus:ring-red-400' : ''}`}
                  placeholder="max@beispiel.ch"
                />
                {fehler.email && <p className="text-red-500 text-xs mt-1">{fehler.email}</p>}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="label" htmlFor="passwort">Passwort *</label>
                  <input
                    type="password"
                    id="passwort"
                    name="passwort"
                    value={formData.passwort}
                    onChange={handleChange}
                    className={`input-field ${fehler.passwort ? 'border-red-400 focus:ring-red-400' : ''}`}
                    placeholder="Min. 8 Zeichen"
                  />
                  {fehler.passwort && <p className="text-red-500 text-xs mt-1">{fehler.passwort}</p>}
                </div>
                <div>
                  <label className="label" htmlFor="passwortWiederholen">Passwort wiederholen *</label>
                  <input
                    type="password"
                    id="passwortWiederholen"
                    name="passwortWiederholen"
                    value={formData.passwortWiederholen}
                    onChange={handleChange}
                    className={`input-field ${fehler.passwortWiederholen ? 'border-red-400 focus:ring-red-400' : ''}`}
                    placeholder="Passwort bestätigen"
                  />
                  {fehler.passwortWiederholen && <p className="text-red-500 text-xs mt-1">{fehler.passwortWiederholen}</p>}
                </div>
              </div>
            </div>
          </div>

          {/* Professional Info */}
          <div>
            <h2 className="text-lg font-semibold text-neutral-900 mb-4 pb-2 border-b border-neutral-100">
              Berufliche Angaben
            </h2>
            <div className="space-y-4">
              <div>
                <label className="label" htmlFor="beruf">Beruf / Fachgebiet *</label>
                <select
                  id="beruf"
                  name="beruf"
                  value={formData.beruf}
                  onChange={handleChange}
                  className={`input-field ${fehler.beruf ? 'border-red-400 focus:ring-red-400' : ''}`}
                >
                  <option value="" disabled>Beruf auswählen...</option>
                  {BERUFE.map((b) => (
                    <option key={b} value={b}>{b}</option>
                  ))}
                </select>
                {fehler.beruf && <p className="text-red-500 text-xs mt-1">{fehler.beruf}</p>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="label" htmlFor="stadt">Stadt *</label>
                  <input
                    type="text"
                    id="stadt"
                    name="stadt"
                    value={formData.stadt}
                    onChange={handleChange}
                    className={`input-field ${fehler.stadt ? 'border-red-400 focus:ring-red-400' : ''}`}
                    placeholder="Zürich"
                  />
                  {fehler.stadt && <p className="text-red-500 text-xs mt-1">{fehler.stadt}</p>}
                </div>
                <div>
                  <label className="label" htmlFor="plz">Postleitzahl</label>
                  <input
                    type="text"
                    id="plz"
                    name="plz"
                    value={formData.plz}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="8001"
                    maxLength={4}
                  />
                </div>
              </div>

              <div>
                <label className="label" htmlFor="telefon">Telefonnummer *</label>
                <input
                  type="tel"
                  id="telefon"
                  name="telefon"
                  value={formData.telefon}
                  onChange={handleChange}
                  className={`input-field ${fehler.telefon ? 'border-red-400 focus:ring-red-400' : ''}`}
                  placeholder="+41 44 123 45 67"
                />
                {fehler.telefon && <p className="text-red-500 text-xs mt-1">{fehler.telefon}</p>}
              </div>

              <div>
                <label className="label" htmlFor="beschreibung">
                  Beschreibung *
                  <span className="text-neutral-400 font-normal ml-1">
                    ({formData.beschreibung.length}/500 Zeichen, min. 50)
                  </span>
                </label>
                <textarea
                  id="beschreibung"
                  name="beschreibung"
                  value={formData.beschreibung}
                  onChange={handleChange}
                  rows={5}
                  maxLength={500}
                  className={`input-field resize-none ${fehler.beschreibung ? 'border-red-400 focus:ring-red-400' : ''}`}
                  placeholder="Beschreiben Sie Ihre Dienstleistungen, Erfahrung und Ihr Einzugsgebiet. Was macht Sie besonders? Welche Projekte haben Sie erfolgreich umgesetzt?"
                />
                {fehler.beschreibung && <p className="text-red-500 text-xs mt-1">{fehler.beschreibung}</p>}
              </div>
            </div>
          </div>

          {/* Legal Checkboxes */}
          <div>
            <h2 className="text-lg font-semibold text-neutral-900 mb-4 pb-2 border-b border-neutral-100">
              Rechtliche Bestätigungen
            </h2>
            <div className="space-y-4">
              <label className={`flex items-start gap-3 p-4 rounded-xl border-2 cursor-pointer transition-colors ${formData.selbstaendigCheck ? 'border-primary bg-primary/5' : 'border-neutral-200 hover:border-neutral-300'}`}>
                <input
                  type="checkbox"
                  name="selbstaendigCheck"
                  checked={formData.selbstaendigCheck}
                  onChange={handleChange}
                  className="mt-0.5 w-5 h-5 accent-primary shrink-0"
                />
                <div>
                  <p className="font-medium text-neutral-900 text-sm">
                    Ich bin selbständig oder gewerblich angemeldet *
                  </p>
                  <p className="text-neutral-500 text-xs mt-1">
                    Ich bestätige, dass ich als selbständige Person oder als angemeldetes Gewerbe in der Schweiz tätig bin und über die notwendigen Qualifikationen verfüge.
                  </p>
                  {fehler.selbstaendigCheck && (
                    <p className="text-red-500 text-xs mt-1">{fehler.selbstaendigCheck}</p>
                  )}
                </div>
              </label>

              <label className={`flex items-start gap-3 p-4 rounded-xl border-2 cursor-pointer transition-colors ${formData.steuerCheck ? 'border-primary bg-primary/5' : 'border-neutral-200 hover:border-neutral-300'}`}>
                <input
                  type="checkbox"
                  name="steuerCheck"
                  checked={formData.steuerCheck}
                  onChange={handleChange}
                  className="mt-0.5 w-5 h-5 accent-primary shrink-0"
                />
                <div>
                  <p className="font-medium text-neutral-900 text-sm">
                    Ich bin selbst verantwortlich für meine Steuern und das Einhalten der Gewerbevorschriften *
                  </p>
                  <p className="text-neutral-500 text-xs mt-1">
                    Ich bestätige, dass ich alle steuerlichen Pflichten eigenständig erfülle und alle geltenden Gewerbevorschriften in der Schweiz einhalte. HandwerkerHub übernimmt keine Haftung für steuerliche oder rechtliche Belange.
                  </p>
                  {fehler.steuerCheck && (
                    <p className="text-red-500 text-xs mt-1">{fehler.steuerCheck}</p>
                  )}
                </div>
              </label>
            </div>
          </div>

          {/* Submit */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary w-full justify-center text-base py-4"
            >
              {isLoading ? (
                <>
                  <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Wird registriert...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Jetzt kostenlos registrieren
                </>
              )}
            </button>
            <p className="text-center text-xs text-neutral-400 mt-3">
              Mit der Registrierung stimmen Sie unseren{' '}
              <Link href="#" className="text-primary hover:underline">Nutzungsbedingungen</Link>
              {' '}und der{' '}
              <Link href="#" className="text-primary hover:underline">Datenschutzerklärung</Link>
              {' '}zu.
            </p>
          </div>
        </form>

        <p className="text-center text-sm text-neutral-500 mt-6">
          Bereits registriert?{' '}
          <Link href="#" className="text-primary hover:underline font-medium">
            Jetzt anmelden
          </Link>
        </p>
      </div>
    </div>
  )
}
