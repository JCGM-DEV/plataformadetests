#!/usr/bin/env python3
import re
from collections import Counter

files = [
  "test_bank_dwec.js",
  "test_bank_dwes.js",
  "test_bank_python.js",
  "test_bank_despliegue.js",
  "test_bank_diw.js",
  "test_bank_dig.js",
  "test_bank_sost.js",
  "test_bank_ipe.js",
  "test_bank_ingles.js"
]

grand_total = 0
for f in files:
    with open("data/" + f, "r", encoding="utf-8") as fp:
        txt = fp.read()
    m = re.search(r"const\s+([A-Z0-9_]+)\s*=", txt)
    var_name = m.group(1) if m else "UNKNOWN"
    
    # match concept_id and unit pairs (quoted or unquoted keys)
    matches = re.findall(r'["\']?concept_id["\']?\s*:\s*["\']([^"\']+)["\'].*?["\']?unit["\']?\s*:\s*(\d+)', txt, re.DOTALL)
    u_counts = Counter(int(u) for cid, u in matches)
    grand_total += len(matches)
    print(f"{f:28} ({var_name:20}): {len(matches):4d} questions. Units: {dict(sorted(u_counts.items()))}")

print("="*65)
print(f"GRAND TOTAL 2º DAW QUESTIONS: {grand_total}")
