# 🚀 Project Cicero - Detaylı Dokümantasyon

**Modern, Yerel-Öncelikli, Üretim Hazır Proje Yönetim Uygulaması**

[![Version](https://img.shields.io/badge/version-1.0.0-blue)](https://github.com/ogtknscn/project-cicero)
[![React](https://img.shields.io/badge/React-18.2.0-61DAFB?logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.2.2-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Build](https://img.shields.io/badge/build-passing-brightgreen)](https://github.com/ogtknscn/project-cicero)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)
[![Code Quality](https://img.shields.io/badge/code--quality-A-34D058)](https://github.com/ogtknscn/project-cicero)

Project Cicero, Asana, Jira, ClickUp ve Linear gibi popüler proje yönetim araçlarından ilham alarak geliştirilmiş, **tamamen yerel çalışan**, **ücretsiz** ve **açık kaynaklı** bir platformdur. Verileriniz tamamen sizin kontrolünüzde!

**[English README](./README.md)** | **[Detaylı Planlama](./IMPLEMENTATION_ROADMAP.md)** | **[API Docs](./docs/API.md)**

---

## 📑 İçindekiler

- [Özellikler](#-özellikler)
- [Teknoloji Stack](#️-teknoloji-stack)
- [Kurulum](#-kurulum)
- [Kullanım Kılavuzu](#-kullanım-kılavuzu)
- [Proje Yapısı](#-proje-yapısı)
- [Geliştirici Rehberi](#-geliştirici-rehberi)
- [Katkıda Bulunma](#-katkıda-bulunma)
- [Roadmap](#-roadmap)
- [Lisans](#-lisans)

---

## ✨ Özellikler

### 🎯 Temel Yönetim Özellikleri

#### Çoklu Görünüm Desteği

- **Dashboard** 📊 - Genel bakış, metrikler, grafikler
- **Board** 📋 - Kanban tarzı sürükle-bırak yönetimi
- **List** 📝 - Detaylı liste görünümü
- **Timeline** 📅 - Gantt chart ile proje planlaması
- **Calendar** 🗓️ - Takvim bazlı görünüm
- **Agile** 🏃 - Sprint ve Epic yönetimi
- **Workload** ⚖️ - İş yükü dengesi
- **Portfolio** 💼 - Çoklu proje yönetimi
- **Documents** 📁 - Doküman merkezi
- **Automation** 🤖 - Otomasyon motoru
- **Notes** 📝 - Wiki ve not sistemi

#### Görev Yönetimi

- ✅ Sürükle-bırak ile görev taşıma
- 🏷️ Etiket sistemi (renk kodlu)
- 🎯 Öncelik seviyeleri (Düşük, Orta, Yüksek)
- 📅 Bitiş tarihi takibi
- ⏱️ Görev bazlı zaman takibi
- 🔗 Görev bağımlılıkları
- ✍️ Checklist desteği
- 🎨 Özel alanlar (Custom fields)
- 📎 Dosya ekleme desteği
- 🔍 Gelişmiş arama (FlexSearch)

#### Proje Yönetimi

- 📁 Çoklu proje desteği
- 🎨 Renk kodlaması
- 📊 Proje metrikleri
- 📈 İlerleme takibi
- 🗂️ Proje arşivleme
- 🏷️ Proje şablonları
- 📋 Görev şablonları
- 📤 Dışa aktarma (JSON, CSV, PDF)
- 📥 İçe aktarma (JSON)

---

### ⏱️ Zaman Yönetimi

#### Zaman Takibi

- ⏰ Görev bazında zaman kaydı
- ⏯️ Başlat/Duraklat/Durdur kontrolü
- 📊 Zaman raporları
- 📈 Verimlilik analizi
- 🗓️ Günlük/Haftalık özetler
- 📝 Zaman notları
- 📊 Proje bazında toplam süre

#### Timeline & Gantt

- 📅 Gantt chart görünümü
- 🔗 Görev bağımlılıkları
- 📍 Milestone'lar
- 📊 Kritik yol analizi
- 🗓️ Tarih aralığı seçimi
- 🎨 Görsel proje planlaması

---

### 👥 Workload Management (İş Yükü Yönetimi)

#### Kapasite Planlama

- 👤 Kullanıcı bazında kapasite tanımlama
- 📅 Haftalık/Günlük çalışma saatleri
- 🗓️ Çalışma günleri seçimi
- 💼 İş yükü hesaplama
- 📊 Kapasite kullanım oranı

#### İş Yükü Görselleştirme

- 🔥 Isı haritası (Heatmap)
- 📈 Haftalık/Aylık görünüm
- ⚠️ Aşırı yükleme uyarıları
- 📊 Takım bazlı görünüm
- 🎯 Kaynak optimizasyonu

#### Workload Alerts

- ⚠️ Kapasite aşımı uyarıları
- 📧 Otomatik bildirimler
- 🎯 Yük dengeleme önerileri
- 📊 Risk analizi

---

### 📊 Portfolio Management

#### Multi-Portfolio Yönetimi

- 📁 Portfolio oluşturma ve yönetimi
- 🏷️ Projeleri portfolio'larda gruplama
- 📊 Portfolio bazında metrikler
- 📈 Genel portfolio özeti
- 🎯 Portfolio hedefleri

#### Sağlık Skoru & Risk Analizi

- 💚 Proje sağlık skoru (0-100)
- 📊 Otomatik sağlık hesaplama
  - ✅ Tamamlanma oranı
  - ⏰ Zaman takibi
  - ⚠️ Risk faktörleri
- 🎨 Renk kodlu gösterge (Yeşil/Sarı/Kırmızı)
- 📈 Trend analizi

#### Bütçe Takibi

- 💰 Proje bazında bütçe tanımlama
- 💳 Harcama takibi
- 📊 Bütçe kullanım oranı
- ⚠️ Bütçe aşımı uyarıları
- 💱 Multi-currency desteği (TRY, USD, EUR)
- 📈 Maliyet analizi

---

### 📁 Document Management

#### Dosya Yönetimi

- 📤 Dosya yükleme (max 10MB)
- 🎨 Desteklenen formatlar:
  - 🖼️ Resimler (JPEG, PNG, GIF)
  - 📄 PDF dokümanlar
  - 📝 Metin dosyaları
  - 📋 Markdown dosyaları
- 🗂️ Klasör yönetimi
- 🏷️ Doküman etiketleme
- 🔍 Doküman arama

#### Versiyon Kontrolü

- 📋 Doküman versiyon geçmişi
- 🔄 Versiyon karşılaştırma
- ⏪ Eski versiyona dönüş
- 📊 Versiyon timeline
- 💾 Otomatik yedekleme

#### Önizleme & İndirme

- 👁️ Resim önizleme
- 📄 PDF görüntüleme
- 📝 Metin okuma
- ⬇️ Toplu indirme
- 📤 Paylaşım linkleri

---

### 🤖 Automation Engine

#### Trigger-Condition-Action Sistemi

**7 Tetikleyici Tipi:**

1. 🔄 **task_status_changed** - Görev durumu değiştiğinde
2. 👤 **task_assigned** - Görev atandığında
3. ⏰ **task_due_date** - Bitiş tarihi yaklaştığında
4. ✅ **task_completed** - Görev tamamlandığında
5. 🏷️ **task_tagged** - Etiket eklendiğinde
6. 🆕 **task_created** - Yeni görev oluşturulduğunda
7. ⏱️ **scheduled** - Zamanlanmış tetikleme

**8 Eylem Tipi:**

1. 🔄 **change_status** - Durumu değiştir
2. 🏷️ **add_tag** - Etiket ekle
3. 👤 **assign_user** - Kullanıcı ata
4. 🔔 **send_notification** - Bildirim gönder
5. ✨ **create_task** - Yeni görev oluştur
6. ⏰ **update_due_date** - Tarihi güncelle
7. 🎨 **change_priority** - Önceliği değiştir
8. 📝 **add_comment** - Yorum ekle

#### Otomasyon Özellikleri

- ⚙️ Esnek kural tanımlama
- 🎯 Condition (koşul) sistemi
- ⏱️ Gecikmeli eylemler
- 📊 Otomasyon logları
- 🔄 Kural aktif/pasif kontrolü
- 🎨 Proje bazlı otomasyonlar

---

### 🏃 Agile Package

#### Sprint Yönetimi

- 📅 Sprint planlama
- 🗓️ Sprint tarihleri
- 🎯 Sprint hedefleri
- 📊 Sprint kapasitesi
- ✅ Sprint tamamlama
- 📈 Sprint retrospective

#### Epic Yönetimi

- 📚 Epic oluşturma
- 🔗 Story'leri epic'e bağlama
- 📊 Epic ilerleme takibi
- 🎯 Epic hedefleri
- ⏰ Epic teslim tarihleri
- 📈 Epic başarı metrikleri

#### Story Points & Estimation

- 🎲 Fibonacci bazlı tahminleme (1, 2, 3, 5, 8, 13, 21)
- 📊 Takım velocity hesaplama
- 📈 Sprint velocity trendi
- 🎯 Kapasite planlaması
- ⚖️ İş yükü dağılımı

#### Burndown Charts

- 📉 Sprint burndown chart
- 📊 İdeal vs gerçek çizgi
- 📅 Günlük ilerleme
- ⚠️ Risk göstergeleri
- 🎯 Tamamlanma tahmini

---

### 📝 Wiki & Notes

#### Markdown Desteği

- ✍️ Zengin metin editörü
- 📋 Markdown syntax
- 🎨 Sözdizimi vurgulama
- 📊 Tablo desteği
- 🔗 Link ekleme
- 🖼️ Resim ekleme

#### Proje Dokümantasyonu

- 📚 Proje bazında wiki
- 🗂️ Not kategorileri
- 🏷️ Not etiketleme
- 🔍 Not arama
- 📌 Not sabitleme
- 🗓️ Oluşturma/Güncelleme tarihleri

#### Bilgi Yönetimi

- 📖 Knowledge base
- 🎓 Best practices
- 📋 Meeting notları
- 💡 Idea tracking
- 📝 Technical docs

---

### 🔍 Gelişmiş Özellikler

#### Global Arama (CMD+K)

- ⚡ Komut paleti
- 🔍 Görev arama
- 📁 Proje arama
- 🎯 Hızlı aksiyonlar
- ⌨️ Klavye kısayolları
- 🎨 Kategori bazlı gruplandırma

#### Klavye Kısayolları

- `Ctrl/Cmd + K` - Komut paleti
- `Ctrl/Cmd + N` - Yeni görev
- `Ctrl/Cmd + P` - Yeni proje
- `Esc` - Modalları kapat
- `Ctrl/Cmd + S` - Kaydet
- `Ctrl/Cmd + E` - Dışa aktar

#### Dışa Aktarma

- 📄 **JSON** - Tam veri yedeği
- 📊 **CSV** - Excel uyumlu
- 📑 **PDF** - Raporlar ve baskı
- 🎨 Özelleştirilebilir export
- 📦 Toplu export

#### İçe Aktarma

- 📥 JSON ile veri içe aktarma
- 🔄 Veri merge desteği
- ✅ Otomatik validasyon
- ⚠️ Hata kontrolü
- 📊 Import özeti

#### Filtre & Preset Sistemi

- 🎯 Kayıtlı filtreler
- 👁️ Görünüm presetleri
- 🔍 Gelişmiş filtreleme
- 📊 Custom views
- 💾 Preset paylaşımı

---

## 🛠️ Teknoloji Stack

### Frontend Framework

```
React 18.2.0          - Modern UI library
TypeScript 5.2.2       - Type-safe development
Vite 5.0.8             - Lightning fast build tool
```

### State Management

```
Zustand 4.4.7          - Lightweight state manager
LocalStorage           - Client-side persistence
IndexedDB (Planned)    - Large data storage
```

### Styling & UI

```
Tailwind CSS 3.4.1     - Utility-first CSS
Lucide React 0.303.0   - Beautiful icons
@dnd-kit               - Drag and drop
```

### Data Visualization

```
Recharts 3.0.0         - Charts and graphs
React-Calendar         - Calendar component
```

### Form & Validation

```
Zod 4.1.12            - Schema validation
DOMPurify 3.3.0       - XSS protection
```

### Search & Export

```
FlexSearch 0.8.212    - Full-text search
jsPDF 3.0.3           - PDF generation
PapaParse 5.5.3       - CSV handling
```

### Development Tools

```
ESLint 8.55.0         - Code linting
Prettier 3.6.2        - Code formatting
Husky 9.1.7           - Git hooks
lint-staged 16.2.6    - Pre-commit checks
Commitlint 20.1.0     - Commit conventions
```

### Code Quality

```
React.memo            - Performance optimization
Code splitting        - Lazy loading
Tree shaking          - Bundle optimization
TypeScript strict     - Type safety
```

---

## 🚀 Kurulum

### Gereksinimler

- **Node.js** 16.x veya üzeri
- **npm** 8.x veya üzeri (veya yarn/pnpm)
- **Git** (klonlama için)

### Adım Adım Kurulum

#### 1. Repository'yi Klonlayın

```bash
git clone https://github.com/ogtknscn/project-cicero.git
cd project-cicero
```

#### 2. Bağımlılıkları Yükleyin

```bash
npm install
```

**Alternatif paket yöneticileri:**

```bash
# Yarn kullanarak
yarn install

# pnpm kullanarak
pnpm install
```

#### 3. Development Server'ı Başlatın

```bash
npm run dev
```

Uygulama şu adreste açılacak: **http://localhost:5173**

#### 4. Production Build (Opsiyonel)

```bash
# Build oluştur
npm run build

# Build'i test et
npm run preview
```

Build dosyaları `dist/` klasöründe oluşturulacaktır.

---

## 📖 Kullanım Kılavuzu

### Hızlı Başlangıç

#### 1. İlk Projenizi Oluşturun

1. Sol üst köşede **"Yeni Proje"** butonuna tıklayın
2. Proje adı ve açıklama girin
3. Renk seçin (opsiyonel)
4. **"Oluştur"** butonuna basın

#### 2. Görev Ekleyin

1. Proje seçildikten sonra **"Yeni Görev"** butonuna tıklayın
2. Görev detaylarını doldurun:
   - **Başlık** (zorunlu)
   - **Açıklama** (opsiyonel)
   - **Durum** (Yapılacak/Devam Ediyor/Tamamlandı)
   - **Öncelik** (Düşük/Orta/Yüksek)
   - **Bitiş Tarihi**
   - **Etiketler**
3. **"Oluştur"** butonuna basın

#### 3. Görünüm Değiştirin

Üst menüden istediğiniz görünümü seçin:

- 📊 Dashboard
- 📋 Board
- 📝 List
- 📅 Timeline
- 🗓️ Calendar

### Gelişmiş Kullanım

#### Sürükle-Bırak ile Görev Taşıma

- Board görünümünde görevleri sütunlar arası sürükleyin
- Durum otomatik olarak güncellenecektir

#### Zaman Takibi

1. Bir görev açın
2. Alt kısımda "Zaman Takibi" bölümüne gidin
3. **"Başlat"** butonuna basın
4. İşiniz bittiğinde **"Durdur"** butonuna basın
5. Toplam süre otomatik hesaplanacaktır

#### Otomasyon Oluşturma

1. **Automation** görünümüne gidin
2. **"Yeni Kural"** butonuna tıklayın
3. Trigger (tetikleyici) seçin
4. Condition (koşul) ekleyin (opsiyonel)
5. Action (eylem) tanımlayın
6. Kuralı **aktif** edin

#### Portfolio Yönetimi

1. **Portfolio** görünümüne gidin
2. **"Yeni Portfolio"** oluşturun
3. Projeleri portfolio'ya ekleyin
4. Sağlık skoru ve bütçe bilgilerini girin

### Veri Yönetimi

#### Export (Dışa Aktarma)

```
Header → Export → Format Seçin (JSON/CSV/PDF)
```

#### Import (İçe Aktarma)

```
Header → Import → JSON dosyası seçin
```

#### Yedekleme

**Önerilen yedekleme sıklığı:** Haftalık

```bash
# Otomatik yedekleme (JSON)
Header → Export → JSON → Save
```

---

## 📁 Proje Yapısı

```
project-cicero/
├── src/
│   ├── components/          # React bileşenleri
│   │   ├── agile/          # Agile yönetim bileşenleri
│   │   │   ├── AgileView.tsx
│   │   │   ├── EpicManager.tsx
│   │   │   ├── SprintBoard.tsx
│   │   │   └── VelocityChart.tsx
│   │   ├── automation/     # Otomasyon bileşenleri
│   │   │   ├── AutomationView.tsx
│   │   │   ├── AutomationRuleEditor.tsx
│   │   │   ├── AutomationRuleList.tsx
│   │   │   └── AutomationLogs.tsx
│   │   ├── common/         # Ortak bileşenler
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Modal.tsx
│   │   │   ├── Toast.tsx
│   │   │   ├── ErrorBoundary.tsx
│   │   │   ├── CommandPalette.tsx
│   │   │   └── Skeleton.tsx
│   │   ├── dashboard/      # Dashboard bileşenleri
│   │   │   ├── Dashboard.tsx
│   │   │   ├── MetricCard.tsx
│   │   │   ├── CompletionChart.tsx
│   │   │   └── TaskDistributionChart.tsx
│   │   ├── document/       # Doküman yönetimi
│   │   │   ├── DocumentManager.tsx
│   │   │   ├── DocumentUpload.tsx
│   │   │   ├── DocumentList.tsx
│   │   │   ├── DocumentPreview.tsx
│   │   │   ├── DocumentHistory.tsx
│   │   │   └── FolderManager.tsx
│   │   ├── export/         # Export bileşenleri
│   │   │   └── ExportMenu.tsx
│   │   ├── filter/         # Filtre bileşenleri
│   │   │   ├── FilterPresetManager.tsx
│   │   │   └── ViewPresetManager.tsx
│   │   ├── layout/         # Layout bileşenleri
│   │   │   ├── Header.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   └── MainContent.tsx
│   │   ├── notes/          # Wiki/Notes bileşenleri
│   │   │   ├── NotesView.tsx
│   │   │   ├── NoteEditor.tsx
│   │   │   └── NoteList.tsx
│   │   ├── portfolio/      # Portfolio bileşenleri
│   │   │   ├── PortfolioView.tsx
│   │   │   ├── PortfolioEditor.tsx
│   │   │   ├── HealthScore.tsx
│   │   │   └── BudgetTracker.tsx
│   │   ├── project/        # Proje bileşenleri
│   │   │   ├── ProjectCard.tsx
│   │   │   └── ProjectModal.tsx
│   │   ├── task/           # Görev bileşenleri
│   │   │   ├── TaskCard.tsx
│   │   │   ├── TaskModal.tsx
│   │   │   ├── BoardView.tsx
│   │   │   ├── DraggableBoardView.tsx
│   │   │   ├── ListView.tsx
│   │   │   ├── GanttView.tsx
│   │   │   ├── TaskDependencies.tsx
│   │   │   ├── TagSelector.tsx
│   │   │   ├── CustomFieldsEditor.tsx
│   │   │   ├── QuickActions.tsx
│   │   │   └── QuickStatusToggle.tsx
│   │   ├── template/       # Şablon bileşenleri
│   │   │   └── TemplateManager.tsx
│   │   ├── time/           # Zaman takibi
│   │   │   └── TimeTracker.tsx
│   │   └── workload/       # İş yükü bileşenleri
│   │       ├── WorkloadView.tsx
│   │       ├── CapacityEditor.tsx
│   │       ├── CapacityHeatmap.tsx
│   │       └── WorkloadAlerts.tsx
│   ├── stores/             # Zustand state yönetimi
│   │   ├── useStore.ts           # Ana store
│   │   ├── themeStore.ts         # Tema yönetimi
│   │   ├── viewStore.ts          # Görünüm durumu
│   │   ├── toastStore.ts         # Bildirimler
│   │   ├── timeStore.ts          # Zaman takibi
│   │   ├── workloadStore.ts      # İş yükü
│   │   ├── portfolioStore.ts     # Portfolio
│   │   ├── documentStore.ts      # Dokümanlar
│   │   ├── automationStore.ts    # Otomasyon
│   │   ├── agileStore.ts         # Agile
│   │   ├── notesStore.ts         # Notlar
│   │   ├── filterStore.ts        # Filtreler
│   │   └── templateStore.ts      # Şablonlar
│   ├── types/              # TypeScript type tanımları
│   │   ├── index.ts              # Ana tipler
│   │   ├── tag.ts                # Etiket tipleri
│   │   ├── customField.ts        # Custom field
│   │   ├── time.ts               # Zaman tipleri
│   │   ├── workload.ts           # İş yükü tipleri
│   │   ├── portfolio.ts          # Portfolio tipleri
│   │   ├── document.ts           # Doküman tipleri
│   │   ├── automation.ts         # Otomasyon tipleri
│   │   ├── agile.ts              # Agile tipleri
│   │   ├── notes.ts              # Not tipleri
│   │   ├── filter.ts             # Filtre tipleri
│   │   └── template.ts           # Şablon tipleri
│   ├── utils/              # Yardımcı fonksiyonlar
│   │   ├── export.ts             # Export fonksiyonları
│   │   ├── search.ts             # Arama fonksiyonları
│   │   ├── time.ts               # Zaman hesaplamaları
│   │   ├── workload.ts           # İş yükü hesaplamaları
│   │   ├── portfolio.ts          # Portfolio hesaplamaları
│   │   ├── agile.ts              # Agile hesaplamaları
│   │   ├── automation.ts         # Otomasyon mantığı
│   │   ├── error.ts              # Hata yönetimi
│   │   ├── logger.ts             # Loglama
│   │   ├── sanitize.ts           # XSS koruması
│   │   └── accessibility.ts      # Erişilebilirlik
│   ├── validation/         # Validation schemas
│   │   └── schemas.ts            # Zod schemas
│   ├── App.tsx             # Ana uygulama bileşeni
│   ├── main.tsx            # Giriş noktası
│   ├── index.css           # Global stiller
│   └── vite-env.d.ts       # Vite type definitions
├── docs/                   # Dokümantasyon
│   ├── API.md                    # API dokümantasyonu
│   └── EXTENSIONS_PLAN.md        # Extension planı
├── public/                 # Statik dosyalar
│   └── vite.svg
├── .husky/                 # Git hooks
│   ├── pre-commit
│   └── commit-msg
├── dist/                   # Build çıktısı
├── node_modules/           # Node paketleri
├── .eslintrc.cjs          # ESLint config
├── .prettierrc            # Prettier config
├── .gitignore             # Git ignore
├── commitlint.config.cjs  # Commitlint config
├── index.html             # HTML template
├── package.json           # NPM config
├── tsconfig.json          # TypeScript config
├── vite.config.ts         # Vite config
├── README.md              # English README
├── README.tr.md           # Turkish README (Bu dosya)
├── IMPLEMENTATION_ROADMAP.md  # Detaylı roadmap
├── CURRENT_STATUS.md      # Mevcut durum
├── SESSION_SUMMARY.md     # Session özeti
└── LICENSE                # MIT License
```

---

## 👨‍💻 Geliştirici Rehberi

### Development Workflow

#### 1. Branch Oluşturma

```bash
git checkout -b feature/my-feature
```

#### 2. Kod Yazma

```bash
# Formatlanmış kod yazın
npm run format

# Lint kontrolleri
npm run lint
npm run lint:fix
```

#### 3. Commit

```bash
# Conventional commits kullanın
git commit -m "feat: Add new feature"

# Commitlint otomatik kontrol yapar:
# feat: Yeni özellik
# fix: Bug düzeltmesi
# docs: Dokümantasyon
# style: Kod formatı
# refactor: Kod düzenlemesi
# test: Test ekleme
# chore: Genel değişiklikler
```

#### 4. Push

```bash
git push origin feature/my-feature
```

### Kod Standartları

#### TypeScript

```typescript
// ✅ İyi
interface User {
  id: string;
  name: string;
  email: string;
}

const user: User = {
  id: '1',
  name: 'John Doe',
  email: 'john@example.com',
};

// ❌ Kötü
const user = {
  id: '1',
  name: 'John Doe',
  email: 'john@example.com',
}; // Type annotation yok
```

#### React Components

```tsx
// ✅ İyi - Fonksiyon component + TypeScript
interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
}

export const Button = ({ onClick, children, variant = 'primary' }: ButtonProps) => {
  return (
    <button onClick={onClick} className={`btn-${variant}`}>
      {children}
    </button>
  );
};

// ❌ Kötü - Class component, type annotation yok
export class Button extends React.Component {
  render() {
    return <button>{this.props.children}</button>;
  }
}
```

#### State Management (Zustand)

```typescript
// ✅ İyi
interface UserStore {
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
}));

// ❌ Kötü - Type annotation yok
export const useUserStore = create((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));
```

### Testing (Gelecek)

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Coverage
npm run test:coverage
```

### Performance Optimization

#### React.memo kullanımı

```tsx
// Expensive component'ler için
export const TaskCard = React.memo(
  ({ task }: TaskCardProps) => {
    return <div>{task.title}</div>;
  },
  (prevProps, nextProps) => {
    return prevProps.task.id === nextProps.task.id;
  }
);
```

#### Code Splitting

```tsx
// Heavy component'leri lazy load edin
const Dashboard = lazy(() => import('./components/dashboard/Dashboard'));

// Suspense ile kullanın
<Suspense fallback={<Loading />}>
  <Dashboard />
</Suspense>;
```

### Debugging

#### Development Tools

- **React DevTools** - Component inspect
- **Redux DevTools** - State inspect (Zustand ile uyumlu)
- **Network Tab** - LocalStorage inspect

#### Console Logging

```typescript
// DEV mode'da log
if (import.meta.env.DEV) {
  console.log('Debug:', data);
}

// Production'da logger kullan
import { logger } from './utils/logger';
logger.info('Info message');
logger.error('Error message');
```

---

## 🤝 Katkıda Bulunma

Katkılarınızı bekliyoruz! Lütfen katkıda bulunmadan önce şu adımları takip edin:

### 1. Repository'yi Fork Edin

```bash
# GitHub'da "Fork" butonuna tıklayın
```

### 2. Branch Oluşturun

```bash
git checkout -b feature/AmazingFeature
```

### 3. Değişikliklerinizi Yapın

```bash
# Kod yazın
npm run format
npm run lint:fix
```

### 4. Commit Edin

```bash
git commit -m 'feat: Add some AmazingFeature'
```

### 5. Push Edin

```bash
git push origin feature/AmazingFeature
```

### 6. Pull Request Açın

GitHub'da Pull Request oluşturun

### Commit Konvansiyonu

```
feat: Yeni özellik
fix: Bug düzeltmesi
docs: Dokümantasyon
style: Kod formatı
refactor: Kod düzenlemesi
test: Test ekleme
chore: Genel değişiklikler
perf: Performans iyileştirmesi
ci: CI/CD değişiklikleri
```

### Code Review Süreci

1. ✅ Tüm testler geçmeli
2. ✅ Lint hataları olmamalı
3. ✅ TypeScript hataları olmamalı
4. ✅ Code coverage düşmemeli
5. ✅ Dokümantasyon güncellenm eli
6. ✅ En az 1 reviewer onayı

---

## 🗺️ Roadmap

### ✅ v1.0.0 (Tamamlandı)

- [x] Core features (13/18 premium)
- [x] Code quality improvements
- [x] Error handling & validation
- [x] Security & XSS protection
- [x] Performance optimization
- [x] Accessibility (ARIA)
- [x] Mobile responsive
- [x] Documentation

### 🚧 v2.0.0 (Q4 2025) - Production Ready

- [ ] **Test Coverage** (0% → 80%)
  - [ ] 825+ tests (unit, integration, E2E)
  - [ ] Vitest + Testing Library + Playwright
- [ ] **CI/CD Pipeline**
  - [ ] GitHub Actions
  - [ ] Automated testing
  - [ ] Automated deployment
- [ ] **Bundle Optimization**
  - [ ] <1.5MB initial load
  - [ ] Code splitting verification
- [ ] **Monitoring**
  - [ ] Sentry error tracking
  - [ ] Performance monitoring
  - [ ] Analytics
- [ ] **PWA Support**
  - [ ] Offline capability
  - [ ] Install prompt
  - [ ] Service worker

### 🔮 v2.1.0 (Q1 2026) - Collaboration

- [ ] **P2P Sync** (Yjs)
- [ ] **Real-time Collaboration**
- [ ] **End-to-End Encryption**
- [ ] **Multi-user** (Permission system)
- [ ] **Team Management**

### 🚀 v2.2.0 (Q2 2026) - Intelligence

- [ ] **Advanced Visualization** (Mermaid)
- [ ] **AI Suggestions**
- [ ] **Business Intelligence**
- [ ] **Advanced Analytics**
- [ ] **Integrations** (GitHub, Slack, Google Calendar)

**Detaylı Roadmap:** [IMPLEMENTATION_ROADMAP.md](./IMPLEMENTATION_ROADMAP.md)

---

## 📊 Proje İstatistikleri

### Kod Metrikleri

- **Toplam Satır:** ~15,000+
- **Component Sayısı:** 60+
- **Store Sayısı:** 13
- **Utility Fonksiyonları:** 50+
- **TypeScript Coverage:** %100
- **Test Coverage:** 0% (v2.0 hedefi: %80+)

### Bundle Size

- **Initial Bundle:** 846 KB
- **Code-Split Chunks:** 7
- **Largest Chunk:** 307 KB (Recharts)
- **Total Size:** ~1.5 MB
- **Build Time:** ~7.76s

### Performans

- **Lighthouse Score:** TBD (v2.0 hedefi: >90)
- **First Contentful Paint:** TBD (hedef: <1.5s)
- **Time to Interactive:** TBD (hedef: <3s)
- **Bundle Size:** TBD (hedef: <1.5MB)

---

## 🙏 Teşekkürler

Bu proje, aşağıdaki harika proje yönetim araçlarından ilham almıştır:

- [Asana](https://asana.com) - Görev yönetimi
- [Jira](https://www.atlassian.com/software/jira) - Agile yönetim
- [ClickUp](https://clickup.com) - Çok amaçlı platform
- [Monday.com](https://monday.com) - Görsel yönetim
- [Linear](https://linear.app) - Modern UI/UX

---

## 📧 İletişim

**Sorularınız veya önerileriniz için:**

- 🐛 **Bug Reports:** [GitHub Issues](https://github.com/ogtknscn/project-cicero/issues)
- 💡 **Feature Requests:** [GitHub Discussions](https://github.com/ogtknscn/project-cicero/discussions)
- 📧 **Email:** oguzhan@example.com (güncellenecek)
- 💬 **Discord:** TBD

---

## 📝 Lisans

Bu proje MIT lisansı altında lisanslanmıştır. Detaylar için [LICENSE](LICENSE) dosyasına bakın.

```
MIT License

Copyright (c) 2025 Project Cicero Team

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
```

---

## ⭐ Star History

Projeyi beğendiyseniz yıldız vermeyi unutmayın! ⭐

[![Star History Chart](https://api.star-history.com/svg?repos=ogtknscn/project-cicero&type=Date)](https://star-history.com/#ogtknscn/project-cicero&Date)

---

<div align="center">

**Made with ❤️ by the Project Cicero Team**

[⬆ Başa Dön](#-project-cicero---detaylı-dokümantasyon)

</div>
