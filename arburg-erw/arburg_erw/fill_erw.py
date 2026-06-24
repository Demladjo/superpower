"""Hauptprogramm: Arburg-.arb-Datei einlesen -> ausgefuelltes ERW erzeugen.

Aufruf:
    python -m arburg_erw.fill_erw  PROGRAMM.arb  [AUSGABE.xlsm]

Liest die in mappings.ERW_FILL bestaetigten Maschinenwerte aus der .arb und
schreibt sie verlustfrei in eine Kopie der ERW-Vorlage. Auftragsinfos und
Verschlauchung werden bewusst NICHT befuellt.
"""
import os
import sys

from . import mappings
from .arb_reader import read_parameters
from .excel_writer import fill_workbook

HERE = os.path.dirname(__file__)
TEMPLATE = os.path.join(HERE, "..", "templates", "ERW_Vorlage.xlsm")


def generate(arb_path, out_path, template=TEMPLATE):
    values = read_parameters(arb_path, mappings.ERW_FILL)
    edits = {}
    for (sheet, cell), val in values.items():
        edits.setdefault(sheet, {})[cell] = val
    filled, missing = fill_workbook(template, out_path, edits)
    return filled, missing


def main(argv):
    if len(argv) < 1:
        print(__doc__)
        return 1
    arb = argv[0]
    out = argv[1] if len(argv) > 1 else os.path.splitext(arb)[0] + "_ERW.xlsm"
    if not mappings.ERW_FILL:
        print("HINWEIS: Es sind noch KEINE Maschinenwerte sicher zugeordnet.")
        print("Bitte weitere (.arb + fertiges ERW)-Beispiele liefern; mit")
        print("map_report.py werden daraus die sicheren Zuordnungen ermittelt.")
        print("Es wird vorerst nur eine unveraenderte Kopie der Vorlage erzeugt.")
    filled, missing = generate(arb, out)
    print(f"\nGeschrieben: {len(filled)} Zelle(n) -> {out}")
    if missing:
        print(f"Nicht gefunden (Vorlage?): {missing}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main(sys.argv[1:]))
