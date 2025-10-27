import { WorkloadEntry, UserCapacity, WorkloadSummary } from '../types/workload';
import { Task, Project } from '../types';

// Get ISO week string (YYYY-Www)
export const getISOWeek = (date: Date): string => {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() + 4 - (d.getDay() || 7));
  const yearStart = new Date(d.getFullYear(), 0, 1);
  const weekNo = Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
  return `${d.getFullYear()}-W${weekNo.toString().padStart(2, '0')}`;
};

// Get current week
export const getCurrentWeek = (): string => {
  return getISOWeek(new Date());
};

// Calculate workload summary for a user and week
export const calculateWorkloadSummary = (
  userId: string,
  week: string,
  workloadEntries: WorkloadEntry[],
  capacity: UserCapacity,
  projects: Project[]
): WorkloadSummary => {
  const entries = workloadEntries.filter(
    (e) => e.userId === userId && e.week === week
  );

  const totalEstimatedHours = entries.reduce((sum, e) => sum + e.estimatedHours, 0);
  const totalActualHours = entries.reduce((sum, e) => sum + (e.actualHours || 0), 0);
  const utilization = (totalEstimatedHours / capacity.weeklyHours) * 100;

  const tasks = entries.map((entry) => {
    const project = projects.find((p) => p.id === entry.projectId);
    const task = project?.tasks.find((t) => t.id === entry.taskId);
    return {
      taskId: entry.taskId,
      taskTitle: task?.title || 'Unknown Task',
      projectName: project?.name || 'Unknown Project',
      estimatedHours: entry.estimatedHours,
      actualHours: entry.actualHours,
    };
  });

  return {
    userId,
    week,
    totalEstimatedHours,
    totalActualHours,
    capacityHours: capacity.weeklyHours,
    utilization,
    overload: utilization > 100,
    tasks,
  };
};

// Get color based on utilization
export const getUtilizationColor = (utilization: number): string => {
  if (utilization < 50) return 'bg-gray-200 dark:bg-gray-700';
  if (utilization < 80) return 'bg-green-200 dark:bg-green-800';
  if (utilization < 100) return 'bg-yellow-200 dark:bg-yellow-800';
  if (utilization < 120) return 'bg-orange-200 dark:bg-orange-800';
  return 'bg-red-200 dark:bg-red-800';
};

// Get weeks array (current week + next N weeks)
export const getWeeksArray = (count: number = 8): string[] => {
  const weeks: string[] = [];
  const today = new Date();
  
  for (let i = 0; i < count; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() + (i * 7));
    weeks.push(getISOWeek(date));
  }
  
  return weeks;
};

// Estimate hours from task (based on priority and complexity)
export const estimateTaskHours = (task: Task): number => {
  // Simple estimation logic
  let baseHours = 4; // default

  if (task.priority === 'high') baseHours = 8;
  else if (task.priority === 'medium') baseHours = 4;
  else baseHours = 2;

  // Adjust based on description length (rough complexity indicator)
  if (task.description && task.description.length > 200) {
    baseHours *= 1.5;
  }

  return Math.round(baseHours);
};

