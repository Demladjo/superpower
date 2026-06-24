"""ERW-Generator (Arburg) - einfaches Fenster-Programm.

Bedienung:
  * Arburg-.arb-Datei auf das Programm ziehen  -> ERW wird daneben gespeichert
  * oder Programm starten und Datei ueber den Knopf auswaehlen.

Diese Vorschau-Version fuellt die bereits sicher erkannten Werte
(Schnecken-Durchmesser, Zylinder-Temperaturen). Weitere Felder kommen dazu,
sobald mehr Beispiele ausgewertet sind.
"""
import os
import sys
import traceback

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from arburg_erw.fill_erw import generate  # noqa: E402

APP_TITLE = "ERW-Generator (Arburg) - Vorschau"


def _process(arb_path):
    out = os.path.splitext(arb_path)[0] + "_ERW.xlsm"
    info, _ = generate(arb_path, out)
    return out, info


def _summary(out, info):
    lines = [f"Fertig! ERW gespeichert als:\n{out}", "", f"Gefuellte Felder ({len(info)}):"]
    lines += ["  - " + i for i in info] if info else ["  (noch keine - Datei pruefen)"]
    lines += ["",
              "Hinweis: Dies ist eine Vorschau. Auftragsinfos, Verschlauchung und",
              "noch nicht zugeordnete Werte bleiben leer und folgen mit weiteren",
              "Beispielen. Bitte die gefuellten Werte gegenpruefen."]
    return "\n".join(lines)


def run_gui(initial_file=None):
    import tkinter as tk
    from tkinter import filedialog, messagebox

    root = tk.Tk()
    root.title(APP_TITLE)
    root.geometry("560x260")

    def choose_and_run(path=None):
        path = path or filedialog.askopenfilename(
            title="Arburg-Programm auswaehlen",
            filetypes=[("Arburg-Datei", "*.arb"), ("Alle Dateien", "*.*")])
        if not path:
            return
        try:
            out, info = _process(path)
            messagebox.showinfo(APP_TITLE, _summary(out, info))
        except Exception:
            messagebox.showerror(APP_TITLE, "Fehler beim Verarbeiten:\n\n" + traceback.format_exc())

    tk.Label(root, text="Arburg-Programm (.arb) auswaehlen\noder Datei auf das Programm-Symbol ziehen.",
             font=("Segoe UI", 11), justify="center").pack(pady=20)
    tk.Button(root, text="Arburg-Datei (.arb) waehlen ...", font=("Segoe UI", 11),
              command=lambda: choose_and_run(), height=2, width=34).pack(pady=10)
    tk.Label(root, text="Vorschau-Version: fuellt Schnecken-Ø und Zylindertemperaturen.\n"
                        "Weitere Felder folgen mit mehr Beispielen.",
             font=("Segoe UI", 9), fg="#555").pack(side="bottom", pady=12)

    if initial_file:
        root.after(300, lambda: choose_and_run(initial_file))
    root.mainloop()


def main(argv):
    # Datei per Drag&Drop auf die .exe -> kommt als Argument an
    if argv and os.path.isfile(argv[0]):
        try:
            out, info = _process(argv[0])
        except Exception:
            try:
                from tkinter import messagebox
                messagebox.showerror(APP_TITLE, traceback.format_exc())
            except Exception:
                print(traceback.format_exc())
            return 1
        # Ergebnis trotzdem im Fenster zeigen
        try:
            from tkinter import Tk, messagebox
            Tk().withdraw()
            messagebox.showinfo(APP_TITLE, _summary(out, info))
        except Exception:
            print(_summary(out, info))
        return 0
    run_gui()
    return 0


if __name__ == "__main__":
    raise SystemExit(main(sys.argv[1:]))
