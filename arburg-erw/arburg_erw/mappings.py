"""Bestaetigte Zuordnungen: Arburg-.arb-Feld  ->  ERW-Zelle.

Jeder Eintrag wird erst aufgenommen, wenn `map_report.py` ihn ueber mehrere
unterschiedliche Beispiele eindeutig bestaetigt hat. Format:

    {"name": Klartext, "sheet": ERW-Blatt, "cell": Zelle,
     "source": {"offset": Byte-Position, "enc": Kodierung}}

Kodierungen: "i16" (ganzzahl), "i16x10" (Wert*10, z.B. Temperatur in 0.1 Grad),
"i16x100", "i32", "f32" (Gleitkomma).
"""

# Stand: 2 Beispiele ausgewertet.
#
# Sicher bestaetigt (fester Offset, Werte unterschiedlich), aber auf dem Blatt
# "Infos" (= Auftragsinfos) und daher laut Vorgabe NICHT ins ERW geschrieben:
#   - Schnecken-Durchmesser : f32 @ 0x24   (Beispiele 30.0 / 20.0)
#
# Echte Maschinenwerte (Temperaturen, Einspritzprofil ...) stecken in der .arb,
# liegen aber je Maschine an wechselnder Position. Sie kommen hier hinein, sobald
# weitere Beispiele die Position eindeutig festnageln.

ERW_FILL = [
    # noch leer - wird mit jedem bestaetigten Beispiel gefuellt
]

# Nur zur Doku / fuer Tests: bereits verifizierte Felder (auch wenn sie laut
# Vorgabe nicht ins ERW geschrieben werden).
CONFIRMED = [
    {"name": "Schnecken-Durchmesser (mm)", "sheet": "Infos", "cell": "D7",
     "source": {"offset": 0x24, "enc": "f32", "round": 1}, "ins_erw": False},
]
