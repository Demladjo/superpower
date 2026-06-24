"""Beweist, dass der Schreiber verlustfrei ist: alle Datei-Teile ausser den
bewusst bearbeiteten Arbeitsblaettern und workbook.xml muessen Byte-fuer-Byte
identisch zur Vorlage sein. So ist sichergestellt, dass ActiveX, Makros (VBA),
Diagramme und Kommentare unveraendert bleiben."""
import zipfile

def verify(template_path, output_path, edited_sheet_xmls):
    allowed = set(edited_sheet_xmls) | {"xl/workbook.xml"}
    zt = zipfile.ZipFile(template_path); zo = zipfile.ZipFile(output_path)
    nt, no = set(zt.namelist()), set(zo.namelist())
    problems = []
    if nt != no:
        problems.append(f"Teile-Liste unterschiedlich: nur Vorlage={nt-no}, nur Ausgabe={no-nt}")
    identical = changed = 0
    for name in sorted(nt & no):
        same = zt.read(name) == zo.read(name)
        if same:
            identical += 1
        else:
            changed += 1
            if name not in allowed:
                problems.append(f"UNERWARTET geaendert: {name}")
    return identical, changed, problems

if __name__ == "__main__":
    import sys
    ident, chg, probs = verify(sys.argv[1], sys.argv[2], sys.argv[3:])
    print(f"identisch: {ident}  geaendert: {chg}")
    if probs:
        print("PROBLEME:"); [print("  -", p) for p in probs]
    else:
        print("OK - nur die erlaubten Teile wurden geaendert, alles andere ist unveraendert.")
