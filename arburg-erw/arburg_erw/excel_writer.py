"""Verlustfreier Schreiber fuer komplexe .xlsm-Dateien.

openpyxl kann diese Vorlage (ActiveX, Makros, Diagramme, Kommentare) nicht
speichern, ohne sie zu beschaedigen. Darum editieren wir nur das XML der
Ziel-Arbeitsblaetter direkt und kopieren ALLE anderen Teile Byte fuer Byte.
"""
import re, zipfile, shutil
from xml.sax.saxutils import escape

def _numfmt(v):
    if isinstance(v, bool):
        return "1" if v else "0"
    if isinstance(v, int):
        return str(v)
    if float(v).is_integer():
        return str(int(v))
    return repr(float(v))

def _set_cell(xml, cell, value):
    pat = re.compile(r'<c r="%s"([^>]*?)(/>|>.*?</c>)' % re.escape(cell), re.DOTALL)
    m = pat.search(xml)
    if not m:
        return xml, False
    attrs = re.sub(r'\s+t="[^"]*"', '', m.group(1))  # drop any type attr
    if isinstance(value, (int, float)) and not isinstance(value, bool):
        new = '<c r="%s"%s><v>%s</v></c>' % (cell, attrs, _numfmt(value))
    else:
        txt = escape(str(value))
        new = ('<c r="%s"%s t="inlineStr"><is><t xml:space="preserve">%s'
               '</t></is></c>' % (cell, attrs, txt))
    return xml[:m.start()] + new + xml[m.end():], True

def _sheetmap(zf):
    wb = zf.read("xl/workbook.xml").decode("utf8")
    rels = zf.read("xl/_rels/workbook.xml.rels").decode("utf8")
    relmap = dict(re.findall(r'<Relationship[^>]*Id="([^"]+)"[^>]*Target="([^"]+)"', rels))
    out = {}
    for nm, rid in re.findall(r'<sheet[^>]*name="([^"]+)"[^>]*r:id="([^"]+)"', wb):
        nm = nm.replace("&amp;", "&")
        tgt = relmap[rid]
        out[nm] = "xl/" + tgt if not tgt.startswith("/") else tgt[1:]
    return out

def _force_recalc(wbxml):
    if "<calcPr" in wbxml:
        if "fullCalcOnLoad" in wbxml:
            return wbxml
        return re.sub(r'<calcPr', '<calcPr fullCalcOnLoad="1"', wbxml, count=1)
    return re.sub(r'(<sheets>)', r'<calcPr fullCalcOnLoad="1"/>\1', wbxml, count=1)

def fill_workbook(template_path, output_path, edits):
    """edits = {sheet_name: {cell: value}}.  Returns (filled, missing) lists."""
    zin = zipfile.ZipFile(template_path, "r")
    name2path = _sheetmap(zin)
    edited = {}
    filled, missing = [], []
    for sheet, cells in edits.items():
        path = name2path[sheet]
        xml = zin.read(path).decode("utf8")
        for cell, val in cells.items():
            xml, ok = _set_cell(xml, cell, val)
            (filled if ok else missing).append(f"{sheet}!{cell}")
        edited[path] = xml.encode("utf8")
    edited["xl/workbook.xml"] = _force_recalc(
        zin.read("xl/workbook.xml").decode("utf8")).encode("utf8")

    with zipfile.ZipFile(output_path, "w") as zout:
        for item in zin.infolist():
            data = edited.get(item.filename, zin.read(item.filename))
            zout.writestr(item, data)  # keep original ZipInfo (compression etc.)
    zin.close()
    return filled, missing
