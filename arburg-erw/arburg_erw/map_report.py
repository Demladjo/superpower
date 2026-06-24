"""Abgleich-Bericht: vergleicht mehrere (Arburg-Datei + fertiges ERW)-Paare und
zeigt, welche ERW-Maschinenwerte sich SICHER aus der .arb lesen lassen.

Wichtig: Eine Zelle gilt nur dann als 'sicher', wenn ein und dieselbe
Byte-Position+Kodierung in ALLEN Beispielen den richtigen Wert liefert UND die
Werte sich zwischen den Beispielen unterscheiden (sonst ist es ein Zufallstreffer
auf einen konstanten Kleinwert). Mehr/abwechslungsreichere Beispiele -> mehr
sichere Zuordnungen.
"""
import struct, warnings, openpyxl
warnings.filterwarnings("ignore")

# Laut Vorgabe wird NUR das Blatt "Einstellrichtwerte" befuellt
# (nicht Infos, Aggregat 2, Ruesthilfe ...).
PARAM_SHEETS = ["Einstellrichtwerte"]

def _encoders():
    def i16(v):
        iv = round(v); return struct.pack("<h", iv) if abs(iv-v) < 1e-9 and -32768 <= iv <= 32767 else None
    def i16x10(v):
        iv = round(v*10); return struct.pack("<h", iv) if abs(iv-v*10) < 1e-6 and -32768 <= iv <= 32767 else None
    def i16x100(v):
        iv = round(v*100); return struct.pack("<h", iv) if abs(iv-v*100) < 1e-6 and -32768 <= iv <= 32767 else None
    def i32(v):
        iv = round(v); return struct.pack("<i", iv) if abs(iv-v) < 1e-9 else None
    return [("i16", i16), ("i16x10", i16x10), ("i16x100", i16x100), ("i32", i32),
            ("f32", lambda v: struct.pack("<f", float(v))), ("f64", lambda v: struct.pack("<d", float(v)))]

def _find_all(buf, needle):
    out, s = [], 0
    while needle:
        i = buf.find(needle, s)
        if i < 0: break
        out.append(i); s = i + 1
    return out

def build_report(pairs):
    arbs = [open(a, "rb").read() for a, _ in pairs]
    wbs_v = [openpyxl.load_workbook(e, data_only=True) for _, e in pairs]
    wb_f = openpyxl.load_workbook(pairs[0][1], data_only=False)
    encs = _encoders()

    def is_formula(sh, co):
        v = wb_f[sh][co].value
        return isinstance(v, str) and v.startswith("=")

    cells = []
    for sh in PARAM_SHEETS:
        ws0 = wbs_v[0][sh]
        for r in range(1, ws0.max_row + 1):
            for c in range(1, ws0.max_column + 1):
                co = ws0.cell(r, c).coordinate
                if is_formula(sh, co): continue
                vals = []
                for wb in wbs_v:
                    v = wb[sh][co].value
                    vals.append(v if isinstance(v, (int, float)) and not isinstance(v, bool) else None)
                if any(v is not None for v in vals):
                    cells.append((sh, co, vals))

    reliable, shifting, manual = [], [], []
    for sh, co, vals in cells:
        if any(v is None for v in vals):
            manual.append((sh, co, vals, "nicht in allen Beispielen befuellt")); continue
        varies = len(set(vals)) > 1
        fixed = None
        for enc_name, enc in encs:
            bs = [enc(v) for v in vals]
            if any(b is None for b in bs): continue
            offs = set(_find_all(arbs[0], bs[0]))
            for ai in range(1, len(arbs)):
                offs = {o for o in offs if arbs[ai][o:o+len(bs[ai])] == bs[ai]}
            if len(offs) == 1:
                fixed = (enc_name, next(iter(offs))); break
        if fixed and varies:
            reliable.append((sh, co, vals, fixed)); continue
        found_each = all(any(enc(v) and _find_all(arbs[i], enc(v)) for _, enc in encs)
                         for i, v in enumerate(vals))
        if found_each:
            why = "Position wechselt" if varies else "konstant – braucht unterschiedliche Beispiele"
            shifting.append((sh, co, vals, why))
        else:
            manual.append((sh, co, vals, "nicht (sicher) in der .arb -> manuell"))
    return reliable, shifting, manual

if __name__ == "__main__":
    import sys
    pairs = [(sys.argv[i], sys.argv[i+1]) for i in range(1, len(sys.argv), 2)]
    rel, shi, man = build_report(pairs)
    print(f"=== Bericht ueber {len(pairs)} Beispiel-Paar(e) ===")
    print(f"\n[SICHER zuordenbar: {len(rel)}]")
    for sh, co, vals, fx in rel: print(f"  {sh}!{co}: {vals}  via {fx[0]}@0x{fx[1]:x}")
    print(f"\n[Im File, aber Position wechselt: {len(shi)}]  (echte Maschinenwerte – mehr Beispiele noetig)")
    for sh, co, vals, why in shi: print(f"  {sh}!{co}: {vals}  ({why})")
    print(f"\n[Manuell / nicht in .arb: {len(man)}]")
    for sh, co, vals, why in man: print(f"  {sh}!{co}: {vals}  ({why})")
    print(f"\nZusammenfassung: {len(rel)} sicher | {len(shi)} im File (Position wechselt) | {len(man)} manuell")
