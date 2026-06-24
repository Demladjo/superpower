"""Liest Maschinenparameter aus einer Arburg .arb-Binaerdatei.

Das .arb-Format ist herstellereigen. Die Parameterbloecke liegen je nach
Maschine an unterschiedlichen Byte-Positionen, darum werden sie ueber ihren
Inhalt lokalisiert (z.B. der Zylinder-Temperaturblock). Werte, deren feste
Position ueber mehrere Beispiele bestaetigt ist, kommen zusaetzlich ueber
mappings.ERW_FILL dazu.

Stand: erste Version, sicher erkannt werden Schnecken-Durchmesser und das
Zylinder-Temperaturprofil. Weitere Felder folgen mit mehr Beispielen.
"""
import struct


def _i16(d, o):
    return struct.unpack_from("<h", d, o)[0]


def _f32(d, o):
    return struct.unpack_from("<f", d, o)[0]


def _round_temp_blocks(data):
    """Alle Stellen mit >=5 aufeinanderfolgenden 'runden' Temperaturen
    (Vielfache von 5 Grad, 150..350 Grad). Gibt (offset, [werte_x10]) zurueck."""
    n = len(data)
    out = []
    o = 0
    while o < n - 12:
        if all(1500 <= _i16(data, o + 2 * k) <= 3500 and _i16(data, o + 2 * k) % 50 == 0
               for k in range(5)):
            blk = []
            k = 0
            while o + 2 * k + 1 < n:
                v = _i16(data, o + 2 * k)
                if 1500 <= v <= 3500 and v % 50 == 0:
                    blk.append(v)
                else:
                    break
                k += 1
            out.append((o, blk))
            o += 2 * len(blk)
        else:
            o += 2
    return out


def find_cylinder_setpoints(data):
    """Findet den Zylinder-Sollwertblock. Der echte Block kommt doppelt vor
    (gespeichert + aktiv) und hat ein abgestuftes Profil; Default-/Grenzwert-
    Bloecke werden so aussortiert. Gibt Temperaturen [Zone1..ZoneN] (Duese->hinten)."""
    cands = _round_temp_blocks(data)
    tup_pos = {}
    for o, blk in cands:
        tup_pos.setdefault(tuple(blk[:5]), []).append(o)
    best = None  # (5-tupel, positionen)
    for t, poss in tup_pos.items():
        if len(poss) >= 2 and (best is None or len(set(t)) > len(set(best[0]))):
            best = (t, poss)
    if best:
        feed_to_nozzle = list(best[0])
    elif cands:
        feed_to_nozzle = cands[0][1][:5]
    else:
        return []
    # .arb speichert Einzug->Duese; ERW zeigt Duese->Einzug -> umdrehen
    return [v / 10.0 for v in reversed(feed_to_nozzle)]


def read_schnecken_durchmesser(data):
    """Schnecken-Durchmesser in mm (float32 @ 0x24). Bestaetigt: 30.0 / 20.0."""
    return round(_f32(data, 0x24), 1)


# Zylinder-Zonen Zone1..Zone5 -> ERW-Zellen (Duese -> hinten)
_CYL_CELLS = ["AB38", "AD38", "AF38", "AH38", "AJ38"]


def read_confident_fields(path):
    """Liefert {(blatt, zelle): wert} fuer die aktuell SICHER erkennbaren Felder.
    Erste Version: Schnecken-Durchmesser und Zylinder-Temperaturprofil."""
    data = open(path, "rb").read()
    out = {}

    try:
        d = read_schnecken_durchmesser(data)
        if 5 <= d <= 200:
            out[("Einstellrichtwerte", "U7")] = "Ø %g" % d
    except Exception:
        pass

    zonen = find_cylinder_setpoints(data)
    for cell, temp in zip(_CYL_CELLS, zonen):
        out[("Einstellrichtwerte", cell)] = int(temp) if float(temp).is_integer() else temp

    return out
