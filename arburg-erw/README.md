# ERW-Generator (Arburg)

Tool, das aus einem **Arburg-Maschinenprogramm (`.arb`)** automatisch das
**ERW-Excel** ausfüllt – **nur die Maschinenparameter**, ohne Auftragsinfos und
ohne Verschlauchung. Die Excel-Vorlage bleibt unverändert (gleiches Layout,
Makros, Diagramme).

Ziel-Bedienung später: **Windows-Programm** – `.arb`-Datei drauf ziehen, fertiges
ERW kommt heraus.

---

## Abgestimmte Entscheidungen (mit dem Einrichter)

- Es wird **nur** das Blatt **„Einstellrichtwerte"** befüllt (nicht Infos,
  Aggregat 2, Rüsthilfe).
- Befüllt werden genau die im Foto **markierten Felder** + **Kavitätenanzahl**.
- **Verschlauchung** (E1/A1, Kreise) und **Auftragsinfos** bleiben leer.
- **Heißkanal** nur, wenn das Programm einen hat – sonst leer.
- **IST-Werte** (Massepolster, Einspritz-/Umschaltdruck, Einspritz-/Dosier-/
  Zykluszeit): aus den **Überwachungs-Sollwerten** füllen (dürfen minimal vom
  gemessenen Wert abweichen).
- **Materialdichte, Gewichte, Materialnummer**: bleiben **manuell** (nicht im
  Programm gespeichert).
- Steuerung: zuerst **Arburg** (`.arb`), **Engel** später.
- Auslieferung: **Windows-Programm**.

---

## Aktueller Stand (ehrlich)

| Teil | Stand |
|------|-------|
| Verlustfreier Excel-Schreiber (Makros/ActiveX/Diagramme bleiben heil) | ✅ fertig & getestet |
| Excel-Vorlage + Zielzellen erkannt (Blatt „Einstellrichtwerte") | ✅ |
| Trennung Maschinenwerte / Auftragsinfos / Verschlauchung | ✅ geklärt |
| Auslesen aus der `.arb`: Schnecken-Ø + Zylindertemperaturen | ✅ erste Version (auf 2 Beispielen korrekt) |
| Auslesen der restlichen markierten Felder | 🚧 braucht mehr Beispiele |
| Windows-Programm (.exe-Build via GitHub Actions) | ✅ eingerichtet |

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

## Windows-Programm benutzen

Das fertige Programm (`ERW-Generator.exe`) wird automatisch von GitHub gebaut:

1. Auf GitHub im Reiter **Actions** den Lauf **„ERW-Generator Windows-Build"** öffnen.
2. Unten unter **Artifacts** **`ERW-Generator-Windows`** herunterladen und entpacken.
3. `ERW-Generator.exe` starten – entweder Datei über den Knopf wählen **oder eine
   `.arb`-Datei direkt auf die `.exe` ziehen**. Das fertige ERW wird daneben
   gespeichert (`…_ERW.xlsm`).

> Vorschau-Version: füllt Schnecken-Ø und Zylindertemperaturen. Weitere Felder
> kommen mit mehr Beispielen dazu.

Lokal/zum Testen ohne .exe:
```
python -m arburg_erw.fill_erw  PROGRAMM.arb  AUSGABE.xlsm
```

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
