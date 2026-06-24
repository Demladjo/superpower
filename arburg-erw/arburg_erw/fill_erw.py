"""Kernablauf: Arburg-.arb-Datei einlesen -> ausgefuelltes ERW erzeugen.

Liest die aktuell sicher erkennbaren Maschinenwerte aus der .arb und schreibt
sie verlustfrei in eine Kopie der ERW-Vorlage. Nur das Blatt "Einstellrichtwerte"
wird befuellt; Auftragsinfos und Verschlauchung bleiben leer.
"""
import os
import sys

from .arb_reader import read_confident_fields
from .excel_writer import fill_workbook


def default_template():
    """Pfad zur Vorlage - funktioniert auch als gepacktes Windows-.exe (PyInstaller)."""
    base = getattr(sys, "_MEIPASS", None)
    if base:
        return os.path.join(base, "templates", "ERW_Vorlage.xlsm")
    return os.path.join(os.path.dirname(__file__), "..", "templates", "ERW_Vorlage.xlsm")


def generate(arb_path, out_path, template=None):
    """Erzeugt das ausgefuellte ERW. Gibt die Liste der gefuellten Felder zurueck."""
    template = template or default_template()
    values = read_confident_fields(arb_path)
    edits = {}
    for (sheet, cell), val in values.items():
        edits.setdefault(sheet, {})[cell] = val
    filled, missing = fill_workbook(template, out_path, edits)
    # menschliche Beschreibung je Feld
    info = [f"{sheet}!{cell} = {val}" for (sheet, cell), val in sorted(values.items())]
    return info, missing


def main(argv):
    if not argv:
        print("Aufruf: python -m arburg_erw.fill_erw  PROGRAMM.arb  [AUSGABE.xlsm]")
        return 1
    arb = argv[0]
    out = argv[1] if len(argv) > 1 else os.path.splitext(arb)[0] + "_ERW.xlsm"
    info, missing = generate(arb, out)
    print(f"Gefuellt: {len(info)} Feld(er) -> {out}")
    for line in info:
        print("  ", line)
    if missing:
        print("Nicht in Vorlage gefunden:", missing)
    return 0


if __name__ == "__main__":
    raise SystemExit(main(sys.argv[1:]))
