import { Sprint, SprintMetrics, BurndownPoint, VelocityData } from '../types/agile';
import { Task } from '../types';
import { differenceInDays, eachDayOfInterval, format, isAfter, isBefore } from 'date-fns';

// Calculate sprint metrics
export const calculateSprintMetrics = (
  sprint: Sprint,
  tasks: Task[],
  getStoryPoints: (taskId: string) => number
): SprintMetrics => {
  const sprintTasks = tasks.filter((t) => sprint.taskIds.includes(t.id));
  
  const totalPoints = sprintTasks.reduce((sum, t) => sum + getStoryPoints(t.id), 0);
  const completedPoints = sprintTasks
    .filter((t) => t.status === 'done')
    .reduce((sum, t) => sum + getStoryPoints(t.id), 0);
  const remainingPoints = totalPoints - completedPoints;

  const now = new Date();
  const startDate = new Date(sprint.startDate);
  const endDate = new Date(sprint.endDate);

  const totalDays = Math.max(differenceInDays(endDate, startDate), 1);
  const daysElapsed = Math.min(Math.max(differenceInDays(now, startDate), 0), totalDays);
  const daysRemaining = Math.max(totalDays - daysElapsed, 0);

  const velocity = daysElapsed > 0 ? completedPoints / daysElapsed : 0;
  const completionRate = totalPoints > 0 ? (completedPoints / totalPoints) * 100 : 0;

  // Calculate burndown data
  const burndownData = calculateBurndown(sprint, sprintTasks, getStoryPoints);

  return {
    sprintId: sprint.id,
    totalPoints,
    completedPoints,
    remainingPoints,
    velocity,
    completionRate,
    daysRemaining,
    daysElapsed,
    totalDays,
    burndownData,
  };
};

// Calculate burndown chart data
export const calculateBurndown = (
  sprint: Sprint,
  tasks: Task[],
  getStoryPoints: (taskId: string) => number
): BurndownPoint[] => {
  const startDate = new Date(sprint.startDate);
  const endDate = new Date(sprint.endDate);
  const totalPoints = tasks.reduce((sum, t) => sum + getStoryPoints(t.id), 0);

  const days = eachDayOfInterval({ start: startDate, end: endDate });
  const totalDays = days.length - 1;

  return days.map((day, index) => {
    const idealRemaining = totalPoints - (totalPoints / totalDays) * index;

    // Calculate actual remaining based on task completion dates
    const completedByThisDay = tasks.filter((t) => {
      if (t.status !== 'done') return false;
      const completedDate = new Date(t.updatedAt);
      return isBefore(completedDate, day) || format(completedDate, 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd');
    });

    const completedPoints = completedByThisDay.reduce((sum, t) => sum + getStoryPoints(t.id), 0);
    const actualRemaining = totalPoints - completedPoints;

    return {
      date: format(day, 'yyyy-MM-dd'),
      idealRemaining: Math.max(idealRemaining, 0),
      actualRemaining: Math.max(actualRemaining, 0),
    };
  });
};

// Calculate velocity over multiple sprints
export const calculateVelocity = (
  sprints: Sprint[],
  allTasks: Task[],
  getStoryPoints: (taskId: string) => number
): VelocityData[] => {
  return sprints
    .filter((s) => s.status === 'completed')
    .map((sprint) => {
      const sprintTasks = allTasks.filter((t) => sprint.taskIds.includes(t.id));
      const plannedPoints = sprintTasks.reduce((sum, t) => sum + getStoryPoints(t.id), 0);
      const completedPoints = sprintTasks
        .filter((t) => t.status === 'done')
        .reduce((sum, t) => sum + getStoryPoints(t.id), 0);

      return {
        sprintName: sprint.name,
        plannedPoints,
        completedPoints,
        date: new Date(sprint.endDate),
      };
    })
    .sort((a, b) => a.date.getTime() - b.date.getTime());
};

// Get sprint status color
export const getSprintStatusColor = (status: Sprint['status']): string => {
  switch (status) {
    case 'planning':
      return 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300';
    case 'active':
      return 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400';
    case 'completed':
      return 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400';
    case 'cancelled':
      return 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400';
    default:
      return 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300';
  }
};

// Get sprint status label
export const getSprintStatusLabel = (status: Sprint['status']): string => {
  switch (status) {
    case 'planning':
      return 'Planlanıyor';
    case 'active':
      return 'Aktif';
    case 'completed':
      return 'Tamamlandı';
    case 'cancelled':
      return 'İptal';
    default:
      return status;
  }
};

