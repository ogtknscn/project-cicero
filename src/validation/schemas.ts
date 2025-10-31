import { z } from 'zod';

/**
 * Task validation schema
 */
export const taskSchema = z.object({
  title: z
    .string()
    .min(1, 'Görev başlığı boş olamaz')
    .max(200, 'Görev başlığı 200 karakterden uzun olamaz')
    .refine((val) => !/<script>/i.test(val), 'Geçersiz karakter tespit edildi'),
  description: z
    .string()
    .max(5000, 'Açıklama 5000 karakterden uzun olamaz')
    .optional()
    .or(z.literal('')),
  status: z.enum(['todo', 'in-progress', 'done'], {
    message: 'Geçersiz durum',
  }),
  priority: z.enum(['low', 'medium', 'high'], {
    message: 'Geçersiz öncelik',
  }),
  dueDate: z.date().optional().nullable(),
  tags: z
    .array(z.string().max(50, 'Etiket 50 karakterden uzun olamaz'))
    .max(10, 'Maksimum 10 etiket'),
  assignee: z
    .string()
    .max(100, 'Atanan kişi 100 karakterden uzun olamaz')
    .optional()
    .or(z.literal('')),
  dependsOn: z.array(z.string()).optional(),
  customFields: z.record(z.union([z.string(), z.number(), z.boolean()])).optional(),
});

export type TaskFormData = z.infer<typeof taskSchema>;

/**
 * Project validation schema
 */
export const projectSchema = z.object({
  name: z
    .string()
    .min(1, 'Proje adı boş olamaz')
    .max(100, 'Proje adı 100 karakterden uzun olamaz')
    .refine((val) => !/<script>/i.test(val), 'Geçersiz karakter tespit edildi'),
  description: z
    .string()
    .max(1000, 'Açıklama 1000 karakterden uzun olamaz')
    .optional()
    .or(z.literal('')),
  color: z
    .string()
    .regex(/^#[0-9A-Fa-f]{6}$/, 'Geçersiz renk formatı')
    .optional(),
  status: z.enum(['active', 'archived'], {
    message: 'Geçersiz durum',
  }),
});

export type ProjectFormData = z.infer<typeof projectSchema>;

/**
 * Document upload validation schema
 */
export const documentSchema = z.object({
  name: z.string().min(1, 'Dosya adı boş olamaz').max(255, 'Dosya adı 255 karakterden uzun olamaz'),
  type: z
    .string()
    .refine(
      (type) =>
        [
          'image/jpeg',
          'image/png',
          'image/gif',
          'application/pdf',
          'text/plain',
          'text/markdown',
        ].includes(type),
      'Desteklenmeyen dosya tipi'
    ),
  size: z.number().max(10 * 1024 * 1024, "Dosya boyutu 10MB'dan büyük olamaz"),
  description: z.string().max(500, 'Açıklama 500 karakterden uzun olamaz').optional(),
  tags: z.array(z.string().max(50)).max(10, 'Maksimum 10 etiket'),
  uploadedBy: z.string().max(100).optional(),
});

export type DocumentFormData = z.infer<typeof documentSchema>;

/**
 * User capacity validation schema (for workload management)
 */
export const capacitySchema = z.object({
  userId: z.string().min(1, 'Kullanıcı ID boş olamaz'),
  weeklyHours: z
    .number()
    .min(1, "Haftalık saat 1'den az olamaz")
    .max(168, "Haftalık saat 168'den fazla olamaz"),
  dailyHours: z
    .number()
    .min(0.5, "Günlük saat 0.5'ten az olamaz")
    .max(24, "Günlük saat 24'ten fazla olamaz"),
  workingDays: z
    .array(z.number().min(0).max(6))
    .min(1, 'En az 1 çalışma günü seçilmeli')
    .max(7, 'Maksimum 7 gün'),
});

export type CapacityFormData = z.infer<typeof capacitySchema>;

/**
 * Automation rule validation schema
 */
export const automationRuleSchema = z.object({
  name: z.string().min(1, 'Kural adı boş olamaz').max(100, 'Kural adı 100 karakterden uzun olamaz'),
  description: z.string().max(500, 'Açıklama 500 karakterden uzun olamaz').optional(),
  enabled: z.boolean(),
  trigger: z.object({
    type: z.enum([
      'task_created',
      'task_updated',
      'task_completed',
      'task_assigned',
      'due_date_approaching',
      'status_changed',
      'priority_changed',
    ]),
    conditions: z.array(z.any()).optional(),
  }),
  actions: z
    .array(
      z.object({
        type: z.enum([
          'change_status',
          'change_priority',
          'add_tag',
          'remove_tag',
          'send_notification',
          'create_task',
          'assign_task',
          'set_due_date',
        ]),
        value: z.any(),
        delay: z.number().min(0).max(1440).optional(), // Max 24 hours in minutes
      })
    )
    .min(1, 'En az bir eylem gerekli'),
});

export type AutomationRuleFormData = z.infer<typeof automationRuleSchema>;

/**
 * Note validation schema
 */
export const noteSchema = z.object({
  title: z
    .string()
    .min(1, 'Not başlığı boş olamaz')
    .max(200, 'Not başlığı 200 karakterden uzun olamaz'),
  content: z.string().max(50000, 'İçerik 50000 karakterden uzun olamaz'),
  tags: z.array(z.string().max(50)).max(10, 'Maksimum 10 etiket'),
  category: z.string().max(50).optional(),
});

export type NoteFormData = z.infer<typeof noteSchema>;

/**
 * Email validation (reusable)
 */
export const emailSchema = z.string().email('Geçersiz e-posta adresi');

/**
 * URL validation (reusable)
 */
export const urlSchema = z.string().url('Geçersiz URL formatı');

/**
 * Phone validation (reusable, Turkish format)
 */
export const phoneSchema = z
  .string()
  .regex(/^(\+90|0)?[0-9]{10}$/, 'Geçersiz telefon numarası (örn: 5551234567)');

/**
 * Helper function to validate data against schema
 */
export function validateData<T>(
  schema: z.Schema<T>,
  data: unknown
): {
  success: boolean;
  data?: T;
  errors?: Record<string, string>;
} {
  try {
    const validatedData = schema.parse(data);
    return { success: true, data: validatedData };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors: Record<string, string> = {};
      error.errors.forEach((err) => {
        const path = err.path.join('.');
        errors[path] = err.message;
      });
      return { success: false, errors };
    }
    return { success: false, errors: { _general: 'Doğrulama hatası' } };
  }
}

/**
 * Safe parse wrapper for better error handling
 */
export function safeValidate<T>(schema: z.ZodType<T>, data: unknown) {
  return schema.safeParse(data);
}
