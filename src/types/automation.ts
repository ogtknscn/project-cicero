import { Task } from './index';

// Trigger types
export type TriggerType =
  | 'task_status_changed'
  | 'task_priority_changed'
  | 'task_assigned'
  | 'task_due_date_reached'
  | 'task_created'
  | 'tag_added'
  | 'tag_removed';

// Condition operators
export type ConditionOperator = 'equals' | 'not_equals' | 'contains' | 'greater_than' | 'less_than';

// Action types
export type ActionType =
  | 'change_status'
  | 'change_priority'
  | 'assign_task'
  | 'add_tag'
  | 'remove_tag'
  | 'create_task'
  | 'send_notification'
  | 'add_comment';

// Trigger definition
export interface AutomationTrigger {
  type: TriggerType;
  value?: string; // e.g., specific status, priority, etc.
}

// Condition definition
export interface AutomationCondition {
  field: keyof Task | 'any'; // Task field to check
  operator: ConditionOperator;
  value: any;
}

// Action definition
export interface AutomationAction {
  type: ActionType;
  value?: any; // Action-specific value
  delay?: number; // Optional delay in minutes
}

// Complete automation rule
export interface AutomationRule {
  id: string;
  name: string;
  description?: string;
  projectId?: string; // If undefined, applies to all projects
  enabled: boolean;
  trigger: AutomationTrigger;
  conditions: AutomationCondition[]; // All conditions must be true (AND logic)
  actions: AutomationAction[];
  createdAt: Date;
  updatedAt: Date;
  lastExecuted?: Date;
  executionCount: number;
}

// Execution log
export interface AutomationLog {
  id: string;
  ruleId: string;
  ruleName: string;
  taskId: string;
  taskTitle: string;
  executedAt: Date;
  success: boolean;
  error?: string;
  triggerType: TriggerType;
  actionsExecuted: ActionType[];
}

// Friendly labels
export const TRIGGER_LABELS: Record<TriggerType, string> = {
  task_status_changed: 'Görev durumu değiştiğinde',
  task_priority_changed: 'Görev önceliği değiştiğinde',
  task_assigned: 'Görev atandığında',
  task_due_date_reached: 'Son tarih geldiğinde',
  task_created: 'Yeni görev oluşturulduğunda',
  tag_added: 'Etiket eklendiğinde',
  tag_removed: 'Etiket kaldırıldığında',
};

export const ACTION_LABELS: Record<ActionType, string> = {
  change_status: 'Durumu değiştir',
  change_priority: 'Önceliği değiştir',
  assign_task: 'Görevi ata',
  add_tag: 'Etiket ekle',
  remove_tag: 'Etiket kaldır',
  create_task: 'Yeni görev oluştur',
  send_notification: 'Bildirim gönder',
  add_comment: 'Yorum ekle',
};
