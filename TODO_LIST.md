# Project Cicero — Yapılacaklar Listesi

**Oluşturulma Tarihi:** 2025-10-31  
**Kaynak:** Competitive UX/UI Analysis  
**Hedef:** ⭐⭐⭐⭐☆ (4.5/5) rating

---

## 🚨 P0 — Critical (v2.0 Launch Öncesi Zorunlu)

Bu özellikler olmadan production'a geçilemez.

### 1. ✅ Notification System + Inbox View

**Neden Önemli:** Tüm modern PM araçlarının temel özelliği  
**Estimasyon:** 5-7 gün

**Görevler:**

- [ ] Create `NotificationStore` (Zustand)
- [ ] Build `InboxView` component
- [ ] Add notification bell icon in header
- [ ] Notification types: task assigned, commented, due soon, completed
- [ ] Mark as read/unread functionality
- [ ] Email digest preferences

**Deliverables:**

- `src/stores/notificationStore.ts`
- `src/components/inbox/InboxView.tsx`
- `src/components/layout/NotificationBell.tsx`

---

### 2. ✅ Task Comments & @Mentions

**Neden Önemli:** Collaboration'ın temeli  
**Estimasyon:** 4-5 gün

**Görevler:**

- [ ] Add comments section to TaskModal
- [ ] Create `Comment` interface in types
- [ ] Build comment editor with markdown
- [ ] Implement @mentions with autocomplete
- [ ] Add notification on mention
- [ ] Threaded comments support

**Deliverables:**

- `src/types/comment.ts`
- `src/components/task/TaskComments.tsx`
- `src/components/common/MentionInput.tsx`

---

### 3. ✅ First-Run Onboarding Tour

**Neden Önemli:** Kullanıcı adoption'ı artırır  
**Estimasyon:** 3-4 gün

**Görevler:**

- [ ] Install `react-joyride` or `intro.js`
- [ ] Create onboarding steps config
- [ ] Highlight key features: Command palette, board view, new task
- [ ] Show keyboard shortcuts
- [ ] Create first project wizard
- [ ] Persist "completed" state in localStorage

**Deliverables:**

- `src/components/onboarding/OnboardingTour.tsx`
- `src/stores/onboardingStore.ts`
- `src/config/onboardingSteps.ts`

---

### 4. ✅ Global Quick-Add (+) Button

**Neden Önemli:** UX best practice, hızlı görev ekleme  
**Estimasyon:** 1-2 gün

**Görevler:**

- [ ] Add floating "+" button in header
- [ ] Click opens context menu: Task, Project, Note, etc.
- [ ] Keyboard shortcut: `Cmd/Ctrl + N`
- [ ] Mobile: bottom-right floating button

**Deliverables:**

- Update `src/components/layout/Header.tsx`
- `src/components/common/QuickAddMenu.tsx`

---

### 5. ✅ Inline Editing on Task Cards

**Neden Önemli:** Speed, modern UX pattern  
**Estimasyon:** 2-3 gün

**Görevler:**

- [ ] Use existing `InlineEdit` component on card titles
- [ ] Add hover state on cards
- [ ] Enable drag + inline edit simultaneously
- [ ] Auto-save on blur
- [ ] ESC to cancel

**Deliverables:**

- Update `src/components/task/TaskCard.tsx`
- Update `src/components/task/DraggableBoardView.tsx`

---

## 🔵 P1 — High Value (v2.0 Post-Launch)

Bu özellikler competitive parity sağlar.

### 6. 📅 Calendar View

**Estimasyon:** 4-5 gün  
**Görevler:**

- [ ] Install `react-big-calendar`
- [ ] Create `CalendarView` component
- [ ] Show tasks on dates
- [ ] Click to open task
- [ ] Drag task to reschedule
- [ ] Day/Week/Month view toggles

**Deliverables:**

- `src/components/calendar/CalendarView.tsx`
- Add to `MainContent.tsx` routing

---

### 7. 🔧 Drag-Drop Reschedule in Gantt

**Estimasyon:** 3-4 gün  
**Görevler:**

- [ ] Enable drag-to-move in `GanttView`
- [ ] Update start/end dates on drop
- [ ] Snap to day/week boundaries
- [ ] Show tooltip with new dates while dragging

**Deliverables:**

- Update `src/components/task/GanttView.tsx`
- Add `@dnd-kit` handlers

---

### 8. ☑️ Bulk Actions Integration

**Estimasyon:** 2-3 gün  
**Görevler:**

- [ ] Add checkbox to task cards
- [ ] Integrate existing `BulkActionsBar` component
- [ ] Select all / deselect all
- [ ] Keyboard: Ctrl+A to select
- [ ] Actions: Move, Assign, Tag, Archive, Delete

**Deliverables:**

- Update `src/components/task/DraggableBoardView.tsx`
- Update `src/components/task/ListView.tsx`

---

### 9. 🔍 Enhanced Search UI

**Estimasyon:** 3-4 gün  
**Görevler:**

- [ ] Add filter chips in CommandPalette
- [ ] Group search results: Tasks, Projects, Docs
- [ ] Show key counts per group
- [ ] Arrow to navigate, Enter to select
- [ ] Recent searches history

**Deliverables:**

- Update `src/components/common/SearchCommand.tsx`
- `src/stores/searchStore.ts` (recent searches)

---

### 10. 📚 Help Center Documentation

**Estimasyon:** 4-5 gün  
**Görevler:**

- [ ] Create help content structure
- [ ] Write articles: Getting Started, Keyboard Shortcuts, Views Guide
- [ ] Build `HelpCenterView` with search
- [ ] Add "?" button in header
- [ ] Context-sensitive help (tooltips)

**Deliverables:**

- `src/components/help/HelpCenterView.tsx`
- `src/content/help/` markdown files
- Help search with FlexSearch

---

## 🟡 P2 — Differentiators (v2.1)

Bunlar projeyi eşsiz kılar.

### 11. ⚡ Real-Time Collaboration

**Estimasyon:** 10-15 gün  
**Görevler:**

- [ ] Install `yjs` + `y-websocket` + `@syncedstore/core`
- [ ] Setup WebSocket server
- [ ] Share Yjs document per project
- [ ] Show live cursors
- [ ] Presence indicators
- [ ] Conflict resolution

**Deliverables:**

- `src/stores/syncStore.ts`
- `src/components/common/PresenceIndicator.tsx`
- Backend WebSocket server

---

### 12. 📱 Native Mobile Apps

**Estimasyon:** 20-30 gün  
**Görevler:**

- [ ] Setup React Native project
- [ ] Reuse components with `react-native-web`
- [ ] Build iOS app
- [ ] Build Android app
- [ ] Native navigation
- [ ] Push notifications

**Deliverables:**

- `mobile/` directory
- iOS/Android builds
- App stores deployment

---

### 13. 🔌 REST API + Webhooks

**Estimasyon:** 8-10 gün  
**Görevler:**

- [ ] Design REST API endpoints
- [ ] Build API layer (Express/Fastify)
- [ ] Authentication (JWT)
- [ ] Webhook system
- [ ] API documentation (Swagger)
- [ ] Rate limiting

**Deliverables:**

- `api/` directory
- `API.md` documentation
- Postman collection

---

### 14. 🎛️ Advanced Filter Builder

**Estimasyon:** 5-7 gün  
**Görevler:**

- [ ] Visual query builder UI
- [ ] AND/OR logic groups
- [ ] Drag-drop field selector
- [ ] Operator dropdowns
- [ ] Save as preset

**Deliverables:**

- `src/components/filter/AdvancedFilterBuilder.tsx`
- Update `FilterPresetManager.tsx`

---

### 15. 📊 Dashboard Templates

**Estimasyon:** 4-6 gün  
**Görevler:**

- [ ] Dashboard template system
- [ ] Pre-built templates: Product, Engineering, Marketing
- [ ] Drag-drop widgets
- [ ] Customizable layout
- [ ] Save/load templates

**Deliverables:**

- `src/types/dashboardTemplate.ts`
- `src/components/dashboard/DashboardTemplateManager.tsx`

---

## 🟢 P3 — Future (v2.2+)

Nice-to-have, long-term.

### 16. 🎯 Milestone Markers

**Estimasyon:** 2-3 gün  
**Görevler:**

- [ ] Add `Milestone` type
- [ ] Render milestones in Gantt
- [ ] Diamond-shaped markers
- [ ] Click to view milestone details

---

### 17. 📊 Table/Spreadsheet View

**Estimasyon:** 5-7 gün  
**Görevler:**

- [ ] Install `react-table` or `ag-grid`
- [ ] Create `TableView` component
- [ ] Sortable columns
- [ ] Grouping
- [ ] Formulas

---

### 18. 📈 Interactive Chart Drilldown

**Estimasyon:** 3-4 gün  
**Görevler:**

- [ ] Click metric to open drawer
- [ ] Show filtered task list
- [ ] Time period selector
- [ ] Export data

---

### 19. 🌐 PWA + Offline Support

**Estimasyon:** 5-7 gün  
**Görevler:**

- [ ] Add service worker
- [ ] Offline-first architecture
- [ ] IndexedDB for local storage
- [ ] Sync queue on reconnect
- [ ] "Offline" banner

---

### 20. ✍️ Rich Text Editor

**Estimasyon:** 4-6 gün  
**Görevler:**

- [ ] Install `TinyMCE` or `Quill`
- [ ] Add to document/note editor
- [ ] Markdown support
- [ ] Image upload
- [ ] Embed support

---

## 📊 Progress Tracking

### Completed ✅

- [x] Design tokens & system
- [x] Button enhancements
- [x] Input enhancements
- [x] Drawer component
- [x] EmptyState component
- [x] Keyboard shortcuts help
- [x] Breadcrumb component
- [x] InlineEdit component
- [x] BulkActionsBar component
- [x] ErrorRecovery component
- [x] AutomationTemplates
- [x] Enhanced skeletons
- [x] MetricCard drilldown
- [x] Competitive analysis

### In Progress 🚧

- [ ] None

### Pending ⏳

- P0: 5 tasks
- P1: 5 tasks
- P2: 5 tasks
- P3: 5 tasks

---

## 🎯 Milestones

### v2.0 Launch Ready (Target: 90 days)

**Must Have:**

- [ ] P0 tasks completed
- [ ] All tests passing
- [ ] Documentation complete
- [ ] Security audit
- [ ] Performance optimized

### v2.1 Collaboration (Target: +120 days)

**Must Have:**

- [ ] Real-time collaboration
- [ ] REST API
- [ ] Advanced filters
- [ ] Dashboard templates

### v2.2 Mobile & Enterprise (Target: +180 days)

**Must Have:**

- [ ] Native mobile apps
- [ ] PWA support
- [ ] Enterprise features (SSO, audit logs)
- [ ] White-labeling

---

## 📝 Notes

- **Estimasyonlar:** Uzman geliştirici için ideal günler. Learning curve dahil değil.
- **Bağımlılıklar:** Bazı görevler diğerlerini bloklar (P0 → P1 → P2).
- **Test:** Her özellik için unit + integration test gereklidir.
- **Documentation:** Her özellik için kullanım dokümantasyonu eklenmelidir.

---

**Son Güncelleme:** 2025-10-31  
**Toplam Görev:** 20  
**Tamamlanan:** 14 (70%)  
**Kalan:** 6 P0 + 10 P1-P3 = 16
