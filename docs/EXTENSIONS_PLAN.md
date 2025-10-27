# ðŸ—ºï¸ Extensions & Customizations Plan

Bu dokÃ¼man, eklenecek geniÅŸletmeleri ve Ã¶zelleÅŸtirmeleri fazlara ayÄ±rarak uygulanabilir bir plan sunar.

## Fazlar

### Faz A (1-2 Hafta) â€“ HÄ±zlÄ± KazanÄ±mlar
- KayÄ±tlÄ± filtreler ve gÃ¶rÃ¼nÃ¼m ÅŸablonlarÄ±
- FlexSearch ile tam metin arama (local index)
- GÃ¶rev/Proje ÅŸablonlarÄ±
- PDF/CSV export butonlarÄ±
- Komut paletine ek eylemler

### Faz B (2-3 Hafta) â€“ Ä°ÅŸ YÃ¼kÃ¼ + Otomasyon (MVP)
- Workload Ä±sÄ± haritasÄ± ve kapasite planlama
- Basit kural motoru (Trigger-Condition-Action)
- ZamanlayÄ±cÄ± bazlÄ± hatÄ±rlatmalar (due yaklaÅŸtÄ±)

### Faz C (3-4 Hafta) â€“ Agile Paket
- Sprint/Epic/Story points
- Burndown/Burnup
- Backlog & Sprint board

### Faz D (4-6 Hafta) â€“ DokÃ¼man/Wiki + GÃ¶rselleÅŸtirme
- TipTap/Lexical tabanlÄ± proje dokÃ¼manlarÄ±
- Excalidraw/Mermaid diyagramlarÄ±
- Dosya sÃ¼rÃ¼mleme ve Ã¶nizleme

### Faz E (6-10 Hafta) â€“ P2P/CRDT ve GÃ¼venlik
- Yjs + IndexedDB ile eÅŸ dÃ¼zenleme
- UÃ§tan uca ÅŸifreleme (proje kasasÄ±)

## Kabul Kriterleri (Ã–rnek)
- Arama: 50k gÃ¶revde <150ms sonuÃ§ sÃ¼resi; accent/diacritics insensitive
- Workload: KullanÄ±cÄ± kapasitesi aÅŸÄ±mÄ± kÄ±rmÄ±zÄ± ile vurgulanÄ±r; haftalÄ±k gÃ¶rÃ¼nÃ¼m
- Otomasyon: 5 temel trigger, 5 temel eylem; log gÃ¶rÃ¼nÃ¼mÃ¼
- DokÃ¼man: Rich text + markdown + resim ekleme; sÃ¼rÃ¼m diff'i

## Teknik SeÃ§imler
- Arama: FlexSearch veya Lunr
- CRDT: Yjs + y-indexeddb
- DB: Dexie/TinyBase (IndexedDB)
- Grafik: Recharts (mevcut), ECharts opsiyonel
- PDF: jsPDF/PDFMake; CSV: Papaparse

