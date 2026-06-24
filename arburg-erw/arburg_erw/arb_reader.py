"""Liest Maschinenparameter aus einer Arburg .arb-Binaerdatei.

Hintergrund
-----------
Das .arb-Format ist herstellereigen und nicht dokumentiert. Aus der Analyse von
Beispieldateien wissen wir:

* Es gibt einen festen Kopfbereich (Header) mit einigen Feldern an stabilen
  Byte-Positionen (z.B. Schnecken-Durchmesser).
* Die meisten Parameterbloecke (Temperaturen, Einspritzprofile ...) liegen je
  nach Maschine an UNTERSCHIEDLICHEN Positionen und es gibt Default-/Grenzwert-
  Bloecke, die eine reine Inhalts-Suche in die Irre fuehren.

Darum wird jede Zuordnung erst dann fest in `mappings.py` aufgenommen, wenn der
Abgleich-Bericht (`map_report.py`) sie ueber mehrere, unterschiedliche Beispiele
eindeutig bestaetigt hat. So schreibt das Tool nie einen geratenen Wert.
"""
import struct


def _read_f32(data, offset):
    return struct.unpack_from("<f", data, offset)[0]


def _read_i16(data, offset):
    return struct.unpack_from("<h", data, offset)[0]


def read_value(data, source):
    """Liest einen Wert anhand einer Quellen-Spezifikation aus `mappings.py`.

    source = {"offset": int, "enc": "i16"|"i16x10"|"i16x100"|"i32"|"f32"}
    """
    o, enc = source["offset"], source["enc"]
    if enc == "f32":
        return round(_read_f32(data, o), source.get("round", 2))
    if enc == "i32":
        return struct.unpack_from("<i", data, o)[0]
    v = _read_i16(data, o)
    if enc == "i16":
        return v
    if enc == "i16x10":
        return v / 10.0
    if enc == "i16x100":
        return v / 100.0
    raise ValueError("unbekannte Kodierung: %s" % enc)


def read_parameters(path, mappings):
    """Liest alle in `mappings` (Liste von Eintraegen mit 'source') hinterlegten
    Werte aus der .arb-Datei. Gibt {(sheet, cell): wert} zurueck."""
    data = open(path, "rb").read()
    out = {}
    for m in mappings:
        try:
            out[(m["sheet"], m["cell"])] = read_value(data, m["source"])
        except Exception:
            pass  # Feld in dieser Datei nicht vorhanden -> leer lassen
    return out


# --- bereits ueber 2 Beispiele bestaetigt (fester Offset, Werte unterschiedlich) ---
def read_schnecken_durchmesser(path):
    """Schnecken-Durchmesser in mm (float32 @ 0x24). Bestaetigt: 30.0 / 20.0."""
    data = open(path, "rb").read()
    return round(_read_f32(data, 0x24), 1)
