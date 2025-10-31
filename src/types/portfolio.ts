export interface Portfolio {
  id: string;
  name: string;
  description?: string;
  projectIds: string[];
  owner?: string;
  createdAt: Date;
  updatedAt: Date;
  metadata: {
    totalProjects: number;
    activeProjects: number;
    completedProjects: number;
    totalBudget: number;
    spentBudget: number;
    healthScore: number; // 0-100
  };
}

export interface PortfolioMetrics {
  portfolioId: string;
  totalTasks: number;
  completedTasks: number;
  overdueTasks: number;
  highPriorityTasks: number;
  avgCompletionRate: number;
  budgetUtilization: number;
  timeUtilization: number;
  riskScore: number; // 0-100
}

export interface ProjectHealth {
  projectId: string;
  projectName: string;
  healthScore: number;
  completionRate: number;
  onTime: boolean;
  overBudget: boolean;
  issueCount: number;
  riskLevel: 'low' | 'medium' | 'high';
}

export interface BudgetEntry {
  projectId: string;
  allocated: number;
  spent: number;
  currency: string;
  lastUpdated: Date;
}
