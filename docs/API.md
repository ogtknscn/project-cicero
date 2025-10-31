# Project Cicero - API Documentation

## Core Utilities

### Accessibility (`src/utils/accessibility.ts`)

#### `trapFocus(element: HTMLElement): () => void`

Traps keyboard focus within a modal or dialog element.

**Parameters:**

- `element` - The container element to trap focus within

**Returns:** Cleanup function to remove event listeners

**Example:**

```typescript
const cleanup = trapFocus(modalElement);
// Later when modal closes:
cleanup();
```

#### `announceToScreenReader(message: string, priority?: 'polite' | 'assertive'): void`

Announces a message to screen readers using ARIA live regions.

**Parameters:**

- `message` - The message to announce
- `priority` - Priority level (default: 'polite')

**Example:**

```typescript
announceToScreenReader('Task completed successfully', 'polite');
```

#### `generateAriaId(prefix?: string): string`

Generates unique IDs for ARIA attributes.

**Parameters:**

- `prefix` - Optional prefix for the ID (default: 'aria')

**Returns:** Unique ID string

---

### Error Handling (`src/utils/error.ts`)

#### `class AppError extends Error`

Custom error class for application-specific errors.

**Properties:**

- `code` - Error code for categorization
- `userMessage` - User-friendly error message

**Example:**

```typescript
throw new AppError('Database connection failed', 'DB_ERROR', 'Veritabanı bağlantısı başarısız');
```

#### `handleError(error: unknown, context?: string): void`

Global error handler that logs and displays errors appropriately.

**Parameters:**

- `error` - The error to handle
- `context` - Optional context string

---

### Sanitization (`src/utils/sanitize.ts`)

#### `sanitizeHtml(dirty: string, allowedTags?: string[]): string`

Sanitizes HTML content to prevent XSS attacks using DOMPurify.

**Parameters:**

- `dirty` - Untrusted HTML string
- `allowedTags` - Optional array of allowed HTML tags

**Returns:** Sanitized HTML string

**Example:**

```typescript
const clean = sanitizeHtml(userInput, ['p', 'strong', 'em']);
```

#### `sanitizeText(text: string): string`

Escapes HTML entities in plain text.

#### `sanitizeMarkdown(markdown: string): string`

Sanitizes markdown content while preserving safe markdown syntax.

---

### Validation (`src/validation/schemas.ts`)

#### Zod Schemas

**taskSchema**
Validates task data with the following rules:

- Title: 1-200 characters
- Description: max 2000 characters
- Status: 'todo' | 'in-progress' | 'done'
- Priority: 'low' | 'medium' | 'high'
- Tags: max 10 tags, each max 50 characters

**projectSchema**
Validates project data:

- Name: 1-100 characters
- Description: max 500 characters
- Color: hex color format (#RRGGBB)

**Example:**

```typescript
import { taskSchema } from './validation/schemas';

const result = taskSchema.safeParse(taskData);
if (!result.success) {
  console.error(result.error.errors);
}
```

---

## State Management

### Main Store (`src/stores/useStore.ts`)

**Actions:**

- `addProject(project: Project): void`
- `updateProject(id: string, updates: Partial<Project>): void`
- `deleteProject(id: string): void`
- `selectProject(id: string | null): void`
- `addTask(task: Task): void`
- `updateTask(id: string, updates: Partial<Task>): void`
- `deleteTask(id: string): void`
- `exportData(): string`
- `importData(data: string): void`

**Example:**

```typescript
const { addTask, updateTask, projects } = useStore();

addTask({
  id: generateId(),
  projectId: 'project-1',
  title: 'New Task',
  status: 'todo',
  priority: 'medium',
  createdAt: new Date(),
  updatedAt: new Date(),
});
```

---

### Toast Store (`src/stores/toastStore.ts`)

**Actions:**

- `addToast(toast: Omit<Toast, 'id'>): void`
- `removeToast(id: string): void`

**Example:**

```typescript
const { addToast } = useToastStore();

addToast({
  message: 'Task saved successfully',
  type: 'success',
});
```

---

## Components

### Modal Component (`src/components/common/Modal.tsx`)

**Props:**

- `isOpen: boolean` - Controls modal visibility
- `onClose: () => void` - Close handler
- `title: string` - Modal title
- `children: ReactNode` - Modal content

**Features:**

- Focus trapping
- ARIA support
- ESC key to close
- Backdrop click to close

**Example:**

```tsx
<Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Edit Task">
  <TaskForm />
</Modal>
```

---

### Button Component (`src/components/common/Button.tsx`)

**Props:**

- `variant?: 'primary' | 'secondary' | 'danger' | 'ghost'`
- `size?: 'sm' | 'md' | 'lg'`
- `ariaLabel?: string` - Accessibility label
- `disabled?: boolean`

**Example:**

```tsx
<Button variant="primary" size="md" ariaLabel="Save task" onClick={handleSave}>
  Save
</Button>
```

---

### Input Component (`src/components/common/Input.tsx`)

**Props:**

- `label?: string` - Input label
- `error?: string` - Error message
- `required?: boolean` - Mark as required

**Features:**

- Automatic ARIA associations
- Error announcements for screen readers
- Required field indicators

**Example:**

```tsx
<Input
  label="Task Title"
  required
  error={errors.title}
  value={title}
  onChange={(e) => setTitle(e.target.value)}
/>
```

---

## Performance Optimizations

### React.memo Usage

Components optimized with `React.memo`:

- `TaskCard` - Custom comparison for task properties
- `MetricCard` - Memoized dashboard metrics
- `ProjectCard` - Optimized project rendering

### Code Splitting

Lazy-loaded views:

- Dashboard
- Workload
- Portfolio
- Documents
- Automation
- Agile
- Notes

**Example:**

```typescript
const Dashboard = lazy(() =>
  import('../dashboard/Dashboard').then(m => ({ default: m.Dashboard }))
);

// Usage:
<Suspense fallback={<LoadingSpinner />}>
  <Dashboard />
</Suspense>
```

---

## Security Best Practices

1. **Input Sanitization**: All user inputs are sanitized using DOMPurify
2. **Validation**: Zod schemas validate all form data
3. **XSS Prevention**: HTML content is sanitized before rendering
4. **Type Safety**: Full TypeScript coverage
5. **Error Handling**: Global error boundaries catch runtime errors

---

## Accessibility Features

1. **ARIA Support**: All interactive elements have proper ARIA attributes
2. **Keyboard Navigation**: Full keyboard support with focus trapping
3. **Screen Readers**: Announcements and proper labeling
4. **Focus Management**: Automatic focus on modal open
5. **Required Fields**: Visual and ARIA indicators

---

## Mobile Responsiveness

- Responsive sidebar with hamburger menu (< 768px)
- Touch-friendly hit targets (minimum 44x44px)
- Breakpoint classes: `sm:` (640px), `md:` (768px), `lg:` (1024px)
- Mobile-first CSS approach

---

## Testing

### Unit Tests

```bash
npm run test
```

### E2E Tests

```bash
npm run test:e2e
```

---

## Version

Current Version: 1.0.0

Last Updated: October 31, 2025
