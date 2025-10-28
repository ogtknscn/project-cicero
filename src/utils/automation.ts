import { Task } from '../types';
import {
  AutomationRule,
  AutomationCondition,
  AutomationAction,
  TriggerType,
  ActionType,
} from '../types/automation';
import { useStore } from '../stores/useStore';
import { useAutomationStore } from '../stores/automationStore';
import { useToastStore } from '../stores/toastStore';

// Check if a task matches automation conditions
export const checkConditions = (task: Task, conditions: AutomationCondition[]): boolean => {
  if (conditions.length === 0) return true; // No conditions = always match

  return conditions.every((condition) => {
    if (condition.field === 'any') return true;

    const taskValue = task[condition.field];

    switch (condition.operator) {
      case 'equals':
        return taskValue === condition.value;
      case 'not_equals':
        return taskValue !== condition.value;
      case 'contains':
        if (Array.isArray(taskValue)) {
          return taskValue.includes(condition.value);
        }
        if (typeof taskValue === 'string') {
          return taskValue.includes(condition.value);
        }
        return false;
      case 'greater_than':
        return taskValue > condition.value;
      case 'less_than':
        return taskValue < condition.value;
      default:
        return false;
    }
  });
};

// Execute automation actions
export const executeActions = async (
  task: Task,
  actions: AutomationAction[],
  projectId: string
): Promise<{ success: boolean; error?: string; executedActions: ActionType[] }> => {
  const store = useStore.getState();
  const toastStore = useToastStore.getState();
  const executedActions: ActionType[] = [];

  try {
    for (const action of actions) {
      // Optional delay
      if (action.delay && action.delay > 0) {
        await new Promise((resolve) => setTimeout(resolve, action.delay * 60 * 1000));
      }

      switch (action.type) {
        case 'change_status':
          store.updateTask(task.id, { status: action.value });
          executedActions.push('change_status');
          break;

        case 'change_priority':
          store.updateTask(task.id, { priority: action.value });
          executedActions.push('change_priority');
          break;

        case 'add_tag':
          const currentTags = task.tags || [];
          if (!currentTags.includes(action.value)) {
            store.updateTask(task.id, { tags: [...currentTags, action.value] });
          }
          executedActions.push('add_tag');
          break;

        case 'remove_tag':
          if (task.tags && task.tags.includes(action.value)) {
            store.updateTask(task.id, { tags: task.tags.filter((t) => t !== action.value) });
          }
          executedActions.push('remove_tag');
          break;

        case 'send_notification':
          toastStore.addToast({
            message: action.value || `Otomasyon: ${task.title}`,
            type: 'info',
          });
          executedActions.push('send_notification');
          break;

        case 'create_task':
          // Create a related task
          const newTask: Partial<Task> = {
            title: action.value?.title || `Follow-up: ${task.title}`,
            description: action.value?.description || '',
            status: 'todo',
            priority: action.value?.priority || 'medium',
            projectId,
            tags: action.value?.tags || [],
          };
          store.addTask(newTask as Task);
          executedActions.push('create_task');
          break;

        default:
          console.warn(`Unknown action type: ${action.type}`);
      }
    }

    return { success: true, executedActions };
  } catch (error) {
    console.error('Automation execution error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      executedActions,
    };
  }
};

// Main automation processor - call this when a trigger event occurs
export const processAutomation = async (
  triggerType: TriggerType,
  task: Task,
  projectId: string,
  triggerValue?: string
) => {
  const automationStore = useAutomationStore.getState();
  const rules = automationStore.rules.filter(
    (r) =>
      r.enabled &&
      r.trigger.type === triggerType &&
      (!r.projectId || r.projectId === projectId) &&
      (!r.trigger.value || r.trigger.value === triggerValue)
  );

  for (const rule of rules) {
    // Check conditions
    if (checkConditions(task, rule.conditions)) {
      // Execute actions
      const result = await executeActions(task, rule.actions, projectId);

      // Log execution
      automationStore.addLog({
        ruleId: rule.id,
        ruleName: rule.name,
        taskId: task.id,
        taskTitle: task.title,
        success: result.success,
        error: result.error,
        triggerType,
        actionsExecuted: result.executedActions,
      });

      // Increment execution count
      if (result.success) {
        automationStore.incrementExecutionCount(rule.id);
      }
    }
  }
};

