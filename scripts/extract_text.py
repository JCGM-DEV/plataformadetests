"""
Extractor de texto de PDFs de 2º DAW.
Lee todos los PDFs en 'pdfs DAW 2/' y genera extracted_text/ con el texto de cada unidad.
"""
import os
import json
import re

try:
    import pdfplumber
except ImportError:
    raise RuntimeError("Instala pdfplumber: pip install pdfplumber")

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
PDF_ROOT = os.path.join(BASE_DIR, "..", "pdfs DAW 2")
OUT_DIR = os.path.join(BASE_DIR, "extracted_text")

SUBJECT_MAP = {
    "DWEC":                                     "dwec",
    "DWES":                                     "dwes",
    "PYTHON":                                   "python",
    "DESPLIEGUE_DE_APLICACIONES_WEB":           "despliegue_aplicaciones_web",
    "DIGITALIZACION_APLICADA_A_LOS_SECTORES_PRODUCTIVOS": "digitalizacion",
    "DISEÑO_DE_INTERFACES_WEB":                 "diseno_interfaces_web",
    "INGLES_PROFESIONAL":                       "ingles",
    "ITINERARIO_PERSONAL_PARA_LA_EMPLEABILIDAD":"empleabilidad_2",
    "SOSTENIBILIDAD_APLICADA_AL_SISTEMA_PRODUCTIVO": "sostenibilidad",
}

os.makedirs(OUT_DIR, exist_ok=True)

results = {}  # subject_id -> {unit_num -> text}

for folder_name, subject_id in SUBJECT_MAP.items():
    folder_path = os.path.join(PDF_ROOT, folder_name)
    if not os.path.isdir(folder_path):
        print(f"[WARN] Carpeta no encontrada: {folder_path}")
        continue

    results[subject_id] = {}

    pdf_files = [f for f in os.listdir(folder_path) if f.endswith(".pdf")]
    # Sort by trying to extract unit numbers
    def sort_key(f):
        m = re.search(r'(\d+)', f)
        return int(m.group(1)) if m else 999
    pdf_files.sort(key=sort_key)

    for pdf_file in pdf_files:
        pdf_path = os.path.join(folder_path, pdf_file)
        unit_match = re.search(r'(\d+)', pdf_file)
        unit_num = int(unit_match.group(1)) if unit_match else 0

        print(f"  -> Leyendo: {folder_name}/{pdf_file} (UD{unit_num})")
        try:
            text_pages = []
            with pdfplumber.open(pdf_path) as pdf:
                for page in pdf.pages:
                    t = page.extract_text()
                    if t:
                        text_pages.append(t)
            full_text = "\n".join(text_pages)
            results[subject_id][unit_num] = full_text
        except Exception as e:
            print(f"  [ERROR] {pdf_file}: {e}")
            results[subject_id][unit_num] = ""

# Save to JSON files per subject
for subject_id, units in results.items():
    out_path = os.path.join(OUT_DIR, f"{subject_id}.json")
    with open(out_path, "w", encoding="utf-8") as f:
        json.dump(units, f, ensure_ascii=False, indent=2)
    print(f"[OK] {subject_id}: {len(units)} unidades -> {out_path}")

print("\n✅ Extracción completada.")
