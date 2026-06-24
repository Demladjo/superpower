"""Bauplan & bestaetigte Zuordnungen fuer das Blatt "Einstellrichtwerte".

TARGET_FIELDS = exakt die im Bild markierten Felder (plus Kavitaetenanzahl).
Jedes Feld hat einen Status:
  "arb"         -> Wert steht in der .arb, wird automatisch gefuellt
                   (Byte-Position wird ueber mehrere Beispiele festgenagelt)
  "ueberwachung"-> kein gemessener Live-Wert, aber der ueberwachte SOLL-/Referenz-
                   wert ist Teil der gespeicherten Einstellung -> Quelle in der
                   .arb suchen (kann minimal vom gemessenen Wert abweichen)
  "formel"      -> berechnet sich im ERW selbst (z.B. Prozessfenster +/- %)

`source` (Byte-Position + Kodierung) wird pro Feld eingetragen, sobald der
Abgleich (map_report.py) es ueber mehrere Beispiele eindeutig bestaetigt hat.
"""

SHEET = "Einstellrichtwerte"

TARGET_FIELDS = [
    # --- Kopf ---
    {"name": "Zylinder Ø (Schnecke)", "cell": "U7",  "status": "arb",
     "hinweis": "f32 @0x24 bestaetigt (30.0/20.0); als Text 'Ø 30' schreiben"},
    {"name": "Schliesskraft (kN)",   "cell": "AI8", "status": "arb"},
    {"name": "Kavitaetenanzahl",     "cell": "G6",  "status": "arb",
     "hinweis": "16/8 in beiden Beispielen – bitte Zelle noch bestaetigen"},

    # --- Einstellwerte ---
    {"name": "Spritzdruckbegrenzung (bar)", "cell": "I17", "status": "arb"},
    {"name": "Umschaltpunkt (ccm)",         "cell": "I18", "status": "arb"},
    {"name": "Dosierweg (ccm)",             "cell": "I19", "status": "arb"},
    {"name": "Kuehlzeit (s)",               "cell": "I20", "status": "arb"},
    {"name": "Nachdruckzeit (s)",           "cell": "I21", "status": "arb"},

    # --- Nachdruck (P1..P7 / Zeit1..7) ---
    {"name": "Nachdruckstrom (ccm/s)", "cell": "I23", "status": "arb"},
    {"name": "P1 (bar)",  "cell": "I24", "status": "arb"},
    {"name": "Zeit1 (s)", "cell": "L24", "status": "arb"},
    {"name": "P2 (bar)",  "cell": "I25", "status": "arb"},
    {"name": "Zeit2 (s)", "cell": "L25", "status": "arb"},
    {"name": "P3 (bar)",  "cell": "I26", "status": "arb"},
    {"name": "Zeit3 (s)", "cell": "L26", "status": "arb"},
    # P4..P7 / Zeit4..7 analog, falls genutzt (Zellen folgen, sobald bestaetigt)

    # --- Dosieren ---
    {"name": "Dosieren V1 (m/min)", "cell": "T18", "status": "arb"},
    {"name": "Dosieren S1 (ccm)",   "cell": "W18", "status": "arb"},
    {"name": "Dosieren P1 (bar)",   "cell": "Z18", "status": "arb"},
    {"name": "Dekompression (ccm)", "cell": "AA26", "status": "arb"},

    # --- Einspritzprofil (V1..V10 / S1..S10) ---
    {"name": "Einspritz V1 (ccm/s)", "cell": "AH19", "status": "arb"},
    {"name": "Einspritz S1 (ccm)",   "cell": "AK19", "status": "arb"},
    {"name": "Einspritz V2 (ccm/s)", "cell": "AH20", "status": "arb"},
    {"name": "Einspritz S2 (ccm)",   "cell": "AK20", "status": "arb"},
    # V3..V10 analog, falls genutzt

    # --- Zylinderheizung (Zone1..Zone5 + Trav.) ---
    {"name": "Zylinder Zone1 (°C)", "cell": "AB38", "status": "arb"},
    {"name": "Zylinder Zone2 (°C)", "cell": "AD38", "status": "arb"},
    {"name": "Zylinder Zone3 (°C)", "cell": "AF38", "status": "arb"},
    {"name": "Zylinder Zone4 (°C)", "cell": "AH38", "status": "arb"},
    {"name": "Zylinder Zone5 (°C)", "cell": "AJ38", "status": "arb"},
    {"name": "Zylinder Trav. (°C)", "cell": "AL38", "status": "arb",
     "hinweis": "Einzug/Trav. – Quelle noch zu bestaetigen (war 200 statt 40)"},

    # --- Heisskanal (Zone1..Zone11) – NUR falls das Programm einen hat ---
    {"name": "Heisskanal Zone1 (°C)",  "cell": "D42", "status": "arb", "nur_wenn_vorhanden": True},
    {"name": "Heisskanal Zone2 (°C)",  "cell": "F42", "status": "arb", "nur_wenn_vorhanden": True},
    {"name": "Heisskanal Zone3 (°C)",  "cell": "H42", "status": "arb", "nur_wenn_vorhanden": True},
    {"name": "Heisskanal Zone4 (°C)",  "cell": "J42", "status": "arb", "nur_wenn_vorhanden": True},
    {"name": "Heisskanal Zone5 (°C)",  "cell": "L42", "status": "arb", "nur_wenn_vorhanden": True},
    {"name": "Heisskanal Zone6 (°C)",  "cell": "N42", "status": "arb", "nur_wenn_vorhanden": True},
    {"name": "Heisskanal Zone7 (°C)",  "cell": "P42", "status": "arb", "nur_wenn_vorhanden": True},
    {"name": "Heisskanal Zone8 (°C)",  "cell": "R42", "status": "arb", "nur_wenn_vorhanden": True},
    {"name": "Heisskanal Zone9 (°C)",  "cell": "T42", "status": "arb", "nur_wenn_vorhanden": True},
    {"name": "Heisskanal Zone10 (°C)", "cell": "V42", "status": "arb", "nur_wenn_vorhanden": True},
    {"name": "Heisskanal Zone11 (°C)", "cell": "X42", "status": "arb", "nur_wenn_vorhanden": True},

    # --- "IST-Werte"-Spalte: die exakt gemessenen Zahlen (3,504 / 688 ...) stehen
    #     NICHT in der .arb. Aber laut Einrichter koennen die UEBERWACHUNGS-
    #     Sollwerte verwendet werden – diese sind Teil des Programms. Quelle muss
    #     noch lokalisiert werden (Ueberwachungswerte des naechsten Beispiels noetig).
    {"name": "Massepolster (ccm)",        "cell": "J33",  "status": "ueberwachung"},
    {"name": "max. Einspritzdruck (bar)", "cell": "J34",  "status": "ueberwachung"},
    {"name": "Umschaltdruck (bar)",       "cell": "J35",  "status": "ueberwachung"},
    {"name": "Einspritzzeit (s)",         "cell": "AG33", "status": "ueberwachung"},
    {"name": "Dosierzeit (s)",            "cell": "AG34", "status": "ueberwachung"},
    {"name": "Zykluszeit (s)",            "cell": "AG35", "status": "ueberwachung"},
    # Die Prozessfenster-Spalten daneben rechnen sich per Formel selbst aus.
]

# Aktiv genutzte Zuordnungen mit bereits bestaetigter Byte-Position.
# (Wird mit jedem ausgewerteten Beispiel groesser; Format wie in arb_reader.read_value.)
ERW_FILL = [
    # Beispiel-Eintrag (erst aktiv, wenn Position bestaetigt):
    # {"sheet": SHEET, "cell": "AB38", "source": {"offset": 0x..., "enc": "i16x10"}},
]
