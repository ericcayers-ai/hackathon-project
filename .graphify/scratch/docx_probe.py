import docx
d = docx.Document('docs/SDG_Hackathon_Idea_Guide.docx')
with open('.graphify/scratch/inspect_out.txt', 'w', encoding='utf-8') as f:
    for idx in [137, 138, 139, 140, 144, 147, 149, 154, 155, 160, 161, 165, 166]:
        p = d.paragraphs[idx]
        f.write(f"IDX {idx} style={p.style.name} nruns={len(p.runs)}\n")
        for r in p.runs:
            f.write(f"  run: {r.text[:80]!r} bold={r.bold} size={r.font.size}\n")
