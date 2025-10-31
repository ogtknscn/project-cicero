import { Project } from '../types';
import { Portfolio, ProjectHealth, PortfolioMetrics } from '../types/portfolio';

// Calculate project health score (0-100)
export const calculateProjectHealth = (project: Project): ProjectHealth => {
  const { tasks, metadata } = project;
  const completionRate =
    metadata.totalTasks > 0 ? (metadata.completedTasks / metadata.totalTasks) * 100 : 0;

  // Count overdue tasks
  const overdueTasks = tasks.filter(
    (t) => t.dueDate && new Date(t.dueDate) < new Date() && t.status !== 'done'
  ).length;

  // Count high priority incomplete tasks
  const highPriorityTasks = tasks.filter(
    (t) => t.priority === 'high' && t.status !== 'done'
  ).length;

  // Calculate health score
  let healthScore = 100;

  // Deduct for low completion
  if (completionRate < 50) healthScore -= 30;
  else if (completionRate < 75) healthScore -= 15;

  // Deduct for overdue tasks
  healthScore -= Math.min(overdueTasks * 5, 30);

  // Deduct for high priority tasks
  healthScore -= Math.min(highPriorityTasks * 3, 20);

  healthScore = Math.max(0, healthScore);

  // Determine risk level
  let riskLevel: 'low' | 'medium' | 'high' = 'low';
  if (healthScore < 50) riskLevel = 'high';
  else if (healthScore < 75) riskLevel = 'medium';

  return {
    projectId: project.id,
    projectName: project.name,
    healthScore: Math.round(healthScore),
    completionRate: Math.round(completionRate),
    onTime: overdueTasks === 0,
    overBudget: false, // Will be calculated with budget data
    issueCount: overdueTasks + highPriorityTasks,
    riskLevel,
  };
};

// Calculate portfolio metrics
export const calculatePortfolioMetrics = (
  portfolio: Portfolio,
  projects: Project[]
): PortfolioMetrics => {
  const portfolioProjects = projects.filter((p) => portfolio.projectIds.includes(p.id));

  const totalTasks = portfolioProjects.reduce((sum, p) => sum + p.metadata.totalTasks, 0);
  const completedTasks = portfolioProjects.reduce((sum, p) => sum + p.metadata.completedTasks, 0);

  const allTasks = portfolioProjects.flatMap((p) => p.tasks);
  const overdueTasks = allTasks.filter(
    (t) => t.dueDate && new Date(t.dueDate) < new Date() && t.status !== 'done'
  ).length;
  const highPriorityTasks = allTasks.filter(
    (t) => t.priority === 'high' && t.status !== 'done'
  ).length;

  const avgCompletionRate = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  // Calculate average health score
  const healthScores = portfolioProjects.map((p) => calculateProjectHealth(p).healthScore);
  const avgHealthScore =
    healthScores.length > 0
      ? healthScores.reduce((sum, s) => sum + s, 0) / healthScores.length
      : 100;

  // Risk score (inverse of health)
  const riskScore = 100 - avgHealthScore;

  return {
    portfolioId: portfolio.id,
    totalTasks,
    completedTasks,
    overdueTasks,
    highPriorityTasks,
    avgCompletionRate: Math.round(avgCompletionRate),
    budgetUtilization:
      portfolio.metadata.totalBudget > 0
        ? (portfolio.metadata.spentBudget / portfolio.metadata.totalBudget) * 100
        : 0,
    timeUtilization: avgCompletionRate, // Simplified
    riskScore: Math.round(riskScore),
  };
};

// Get health color
export const getHealthColor = (healthScore: number): string => {
  if (healthScore >= 75) return 'text-green-600 dark:text-green-400';
  if (healthScore >= 50) return 'text-yellow-600 dark:text-yellow-400';
  return 'text-red-600 dark:text-red-400';
};

// Get health background color
export const getHealthBgColor = (healthScore: number): string => {
  if (healthScore >= 75) return 'bg-green-100 dark:bg-green-900/20';
  if (healthScore >= 50) return 'bg-yellow-100 dark:bg-yellow-900/20';
  return 'bg-red-100 dark:bg-red-900/20';
};
