export type AutomationTrigger = 
  | 'task-created'
  | 'task-status-changed'
  | 'task-due-date'
  | 'task-priority-changed'
  | 'tag-added';

export type AutomationAction = 
  | 'change-status'
  | 'change-priority'
  | 'add-tag'
  | 'remove-tag'
  | 'assign-user'
  | 'create-task';

export interface AutomationRule {
  id: string;
  name: string;
  trigger: AutomationTrigger;
  triggerValue?: string; // For specific conditions
  action: AutomationAction;
  actionValue: string; // Value for the action
  enabled: boolean;
}

