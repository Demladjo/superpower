# ERW-Generator (Arburg)

Tool, das aus einem **Arburg-Maschinenprogramm (`.arb`)** automatisch das
**ERW-Excel** ausfüllt – **nur die Maschinenparameter**, ohne Auftragsinfos und
ohne Verschlauchung. Die Excel-Vorlage bleibt unverändert (gleiches Layout,
Makros, Diagramme).

Ziel-Bedienung später: **Windows-Programm** – `.arb`-Datei drauf ziehen, fertiges
ERW kommt heraus.

---

## Aktueller Stand (ehrlich)

| Teil | Stand |
|------|-------|
| Verlustfreier Excel-Schreiber (Makros/ActiveX/Diagramme bleiben heil) | ✅ fertig & getestet |
| Excel-Vorlage + Zielzellen erkannt (Blatt „Einstellrichtwerte") | ✅ |
| Trennung Maschinenwerte / Auftragsinfos / Verschlauchung | ✅ geklärt |
| Auslesen der Parameter aus der `.arb` | 🚧 im Aufbau – **braucht mehr Beispiele** |
| Windows-Programm (Verpackung) | ⏳ später (PyInstaller) |

**Warum „braucht mehr Beispiele"?** Das `.arb`-Format ist herstellereigen. Die
Werte *stehen* in der Datei (nachgewiesen), aber die Parameterblöcke liegen je
nach Maschine an **wechselnden Byte-Positionen**, und es gibt Default-Blöcke, die
eine einfache Suche täuschen. Erst der Abgleich über **mehrere unterschiedliche
Beispiele** legt jede Position eindeutig fest. Dann – und erst dann – schreibt das
Tool den Wert. So wird **nie geraten**.

Auswertung der bisher 2 Beispiele:
**0 sicher zuordenbar · 60 Maschinenwerte in der `.arb` (Position wechselt) · 14 manuell**
(Dichte, Gewichte, Materialnummer stehen nicht in der `.arb` → bleiben manuell.)

---

## Aufbau

```
arburg-erw/
├── arburg_erw/
│   ├── excel_writer.py   # schreibt Werte verlustfrei ins .xlsm (fertig)
│   ├── arb_reader.py     # liest Werte aus der .arb (nach mappings.py)
│   ├── mappings.py       # bestätigte Zuordnung: .arb-Feld -> ERW-Zelle
│   ├── map_report.py     # Analyse: welche Werte sind schon sicher?
│   └── fill_erw.py       # Hauptprogramm (CLI)
├── templates/
│   └── ERW_Vorlage.xlsm  # die leere Vorlage
└── examples/             # (lokal) echte Beispiel-Paare – NICHT eingecheckt
```

## Neues Beispiel hinzufügen (so wird das Tool besser)

1. Lege das Paar in `examples/` ab: die **`.arb`-Datei** und das **dazu fertig
   ausgefüllte ERW** (`.xlsm`).
2. Abgleich laufen lassen:
   ```
   python -m arburg_erw.map_report  prog1.arb erw1.xlsm  prog2.arb erw2.xlsm  ...
   ```
3. Felder, die jetzt „SICHER zuordenbar" sind, in `mappings.py` → `ERW_FILL`
   eintragen.

Je mehr **verschiedene** Werkzeuge (andere Maschine, Schneckengröße, mit/ohne
Heißkanal, 1-/2-Komponenten), desto mehr Felder werden sicher.

## ERW erzeugen

```
python -m arburg_erw.fill_erw  PROGRAMM.arb  AUSGABE.xlsm
```

---

## Verifiziert

- **Excel verlustfrei**: Schreiben eines Werts und Vergleich – alle 109
  Datei-Teile (ActiveX, VBA, Diagramme, Kommentare) bleiben erhalten, XML gültig.
- **Schnecken-Durchmesser**: float32 @ Byte 0x24 (Beispiele 30.0 / 20.0 mm).

## Bleibt manuell (nicht in der `.arb`)

Materialdichte, Schuss-/Teilegewichte, Materialnummer u. ä. – diese trägt der
Einrichter weiterhin selbst ein (Datenblatt / Waage).
