# 🚀 Project Cicero

**Modern, Local-First Proje Yönetim Uygulaması**

Project Cicero, Asana, Jira ve ClickUp gibi popüler araçlardan ilham alarak geliştirilmiş, tamamen local çalışan ve ücretsiz bir proje yönetim platformudur. Verileriniz tamamen sizin kontrolünüzde!

![Project Cicero](https://img.shields.io/badge/version-1.0.0-blue)
![React](https://img.shields.io/badge/React-18.2.0-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.2.2-3178C6?logo=typescript)
![License](https://img.shields.io/badge/license-MIT-green)

## ✨ Özellikler

### 🎯 Temel Yönetim
- **Çoklu Görünümler**: Dashboard, Board, List, Timeline, Calendar, Agile, Workload, Portfolio, Documents, Automation, Wiki
- **Sürükle-Bırak**: Kanban board'da görevleri kolayca taşıyın
- **Tag Sistemi**: Görevleri etiketlerle organize edin
- **Özel Alanlar**: Görevlere özelleştirilmiş alanlar ekleyin
- **Görev Bağımlılıkları**: Görevler arası ilişkileri yönetin
- **Dark Mode**: Göz dostu karanlık tema desteği

### ⏱️ Zaman Yönetimi
- **Zaman Takibi**: Görev bazında zaman kayıtları tutun
- **Timeline Görünümü**: Gantt chart ile proje planlaması
- **Takvim Entegrasyonu**: Görevleri takvimde görüntüleyin

### 👥 Workload Management
- **Kapasite Planlama**: Haftalık/günlük kullanıcı kapasitesi belirleme
- **İş Yükü Isı Haritası**: Ekip üyelerinin yük durumunu görselleştirme
- **Aşırı Yükleme Uyarıları**: Otomatik kapasite aşımı tespiti
- **Kaynak Optimizasyonu**: İş yükü dengeleme önerileri

### 📊 Portfolio Management
- **Multi-Portfolio Yönetimi**: Projeleri portföy altında gruplama
- **Sağlık Skoru**: Proje sağlık ve risk analizi
- **Bütçe Takibi**: Proje bazında bütçe ve harcama yönetimi
- **Portfolio Dashboard**: Tüm projeler için genel bakış

### 📁 Document Management
- **Dosya Yükleme**: 10MB'a kadar dosya desteği
- **Versiyon Kontrolü**: Doküman versiyonlarını takip edin
- **Önizleme**: Resim, PDF ve metin dosyaları için önizleme
- **Klasör Yönetimi**: Renk kodlu klasörlerle organizasyon

### 🤖 Automation Engine
- **Trigger-Condition-Action**: Esnek otomasyon kuralları
- **7 Tetikleyici Tipi**: Durum değişimi, atama, tarih vb.
- **8 Eylem Tipi**: Durum değiştir, etiket ekle, bildirim gönder vb.
- **Otomasyon Logları**: Çalıştırma geçmişi ve hata takibi

### 🎯 Agile Package
- **Sprint Yönetimi**: Sprint planlama ve takibi
- **Epic Yönetimi**: Büyük özellikleri epic'lerde organize edin
- **Story Points**: Fibonacci bazlı tahminleme
- **Velocity Tracking**: Sprint hızı analizi
- **Burndown Charts**: Sprint ilerleme grafikleri

### 📝 Wiki & Notes
- **Markdown Desteği**: Zengin içerikli notlar
- **Proje Dokümantasyonu**: Her proje için wiki sistemi
- **Etiketleme**: Notları kategorize edin
- **Arama**: Tüm notlarda hızlı arama

### 🔍 Gelişmiş Özellikler
- **Global Arama (CMD+K)**: Komut paleti ile hızlı erişim
- **Klavye Kısayolları**: Hızlı navigasyon için kısayollar
- **Dışa Aktarım**: JSON, CSV, PDF formatlarında dışa aktarım
- **İçe Aktarım**: JSON ile veri aktarımı
- **Şablonlar**: Görev ve proje şablonları
- **Filtre Preset'leri**: Kayıtlı filtre ve görünümler

## 🛠️ Teknoloji Stack

- **Frontend**: React 18.2 + TypeScript
- **Build Tool**: Vite 5.0
- **Styling**: Tailwind CSS 3.4
- **State Management**: Zustand 4.4
- **Storage**: LocalStorage (IndexedDB planlanıyor)
- **Charts**: Recharts 3.0
- **Icons**: Lucide React
- **Drag & Drop**: @dnd-kit
- **PDF Export**: jsPDF
- **CSV Export**: PapaParse
- **Search**: FlexSearch

## 🚀 Kurulum

### Gereksinimler
- Node.js 16+
- npm veya yarn

### Adımlar

```bash
# Repository'yi klonlayın
git clone https://github.com/ogtknscn/project-cicero.git

# Proje dizinine gidin
cd project-cicero

# Bağımlılıkları yükleyin
npm install

# Development server'ı başlatın
npm run dev
```

Uygulama `http://localhost:5173` adresinde açılacaktır.

### Production Build

```bash
# Production build oluşturun
npm run build

# Preview yapın
npm run preview
```

## 📖 Kullanım

### Hızlı Başlangıç

1. **Proje Oluşturun**: Sol üst köşeden "Yeni Proje" butonuna tıklayın
2. **Görev Ekleyin**: Proje içinde "Yeni Görev" ile görev oluşturun
3. **Görünüm Seçin**: Üst menüden tercih ettiğiniz görünümü seçin
4. **Organize Edin**: Sürükle-bırak ile görevleri taşıyın

### Klavye Kısayolları

- `Ctrl/Cmd + K`: Komut paleti
- `Ctrl/Cmd + N`: Yeni görev
- `Ctrl/Cmd + P`: Yeni proje
- `Esc`: Modalları kapat

### Data Yönetimi

Tüm verileriniz tarayıcınızın LocalStorage'ında saklanır. Düzenli olarak JSON export alarak yedeğinizi oluşturabilirsiniz.

## 📁 Proje Yapısı

```
project-cicero/
├── src/
│   ├── components/        # React bileşenleri
│   │   ├── agile/        # Agile yönetim bileşenleri
│   │   ├── automation/   # Otomasyon bileşenleri
│   │   ├── common/       # Ortak bileşenler
│   │   ├── dashboard/    # Dashboard bileşenleri
│   │   ├── document/     # Doküman yönetimi
│   │   ├── export/       # Export bileşenleri
│   │   ├── filter/       # Filtre bileşenleri
│   │   ├── layout/       # Layout bileşenleri
│   │   ├── notes/        # Wiki/Notes bileşenleri
│   │   ├── portfolio/    # Portfolio bileşenleri
│   │   ├── project/      # Proje bileşenleri
│   │   ├── task/         # Görev bileşenleri
│   │   ├── template/     # Şablon bileşenleri
│   │   └── workload/     # İş yükü bileşenleri
│   ├── stores/           # Zustand state yönetimi
│   ├── types/            # TypeScript type tanımları
│   ├── utils/            # Yardımcı fonksiyonlar
│   ├── App.tsx           # Ana uygulama bileşeni
│   └── main.tsx          # Giriş noktası
├── docs/                 # Dokümantasyon
├── public/              # Statik dosyalar
└── package.json         # Proje bağımlılıkları
```

## 🎯 Roadmap

### Mevcut Özellikler (v1.0.0) ✅
- [x] Workload Management
- [x] Portfolio Management
- [x] Document Management
- [x] Automation Engine
- [x] Agile Package
- [x] Wiki/Notes System

### Gelecek Sürümler

#### v1.1.0 (Planlanıyor)
- [ ] **P2P Sync**: Peer-to-peer senkronizasyon (Yjs)
- [ ] **Real-time Collaboration**: Eş zamanlı düzenleme
- [ ] **End-to-End Encryption**: Güvenli veri paylaşımı
- [ ] **PWA Support**: Offline çalışma desteği

#### v1.2.0 (Araştırma Aşamasında)
- [ ] **Advanced Visualization**: Mermaid diyagramları
- [ ] **Mind Maps**: İlişki görselleştirme
- [ ] **AI Önerileri**: Görev önceliklendirme
- [ ] **Entegrasyonlar**: GitHub, Slack vb.

## 🤝 Katkıda Bulunma

Katkılarınızı bekliyoruz! Lütfen katkıda bulunmadan önce şu adımları takip edin:

1. Bu repository'yi fork edin
2. Feature branch'i oluşturun (`git checkout -b feature/AmazingFeature`)
3. Değişikliklerinizi commit edin (`git commit -m 'feat: Add some AmazingFeature'`)
4. Branch'inizi push edin (`git push origin feature/AmazingFeature`)
5. Pull Request açın

### Commit Konvansiyonu

- `feat:` Yeni özellik
- `fix:` Bug düzeltmesi
- `docs:` Dokümantasyon
- `style:` Kod formatı
- `refactor:` Kod düzenlemesi
- `test:` Test ekleme
- `chore:` Genel değişiklikler

## 📝 Lisans

Bu proje MIT lisansı altında lisanslanmıştır. Detaylar için [LICENSE](LICENSE) dosyasına bakın.

## 🙏 Teşekkürler

Bu proje, aşağıdaki harika proje yönetim araçlarından ilham almıştır:
- [Asana](https://asana.com)
- [Jira](https://www.atlassian.com/software/jira)
- [ClickUp](https://clickup.com)
- [Monday.com](https://monday.com)
- [Linear](https://linear.app)

## 📧 İletişim

Sorularınız veya önerileriniz için:
- **GitHub Issues**: [Issues](https://github.com/ogtknscn/project-cicero/issues)
- **GitHub Discussions**: [Discussions](https://github.com/ogtknscn/project-cicero/discussions)

## ⭐ Star History

Projeyi beğendiyseniz yıldız vermeyi unutmayın! ⭐

---

**Made with ❤️ by the Project Cicero Team**
