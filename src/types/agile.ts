export interface Sprint {
  id: string;
  name: string;
  projectId: string;
  goal?: string;
  startDate: Date;
  endDate: Date;
  status: 'planning' | 'active' | 'completed' | 'cancelled';
  taskIds: string[];
  createdAt: Date;
  updatedAt: Date;
  velocity?: number; // Actual story points completed
}

export interface Epic {
  id: string;
  name: string;
  description?: string;
  projectId: string;
  status: 'todo' | 'in-progress' | 'done';
  priority: 'low' | 'medium' | 'high';
  taskIds: string[]; // Tasks/Stories belonging to this epic
  color?: string;
  startDate?: Date;
  targetDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface StoryPoints {
  taskId: string;
  points: number; // Story points (1, 2, 3, 5, 8, 13, 21...)
  estimatedHours?: number;
}

export interface SprintMetrics {
  sprintId: string;
  totalPoints: number;
  completedPoints: number;
  remainingPoints: number;
  velocity: number; // Points per day
  completionRate: number; // Percentage
  daysRemaining: number;
  daysElapsed: number;
  totalDays: number;
  burndownData: BurndownPoint[];
}

export interface BurndownPoint {
  date: string; // ISO date
  idealRemaining: number;
  actualRemaining: number;
}

export interface VelocityData {
  sprintName: string;
  plannedPoints: number;
  completedPoints: number;
  date: Date;
}

// Fibonacci sequence for story points
export const STORY_POINTS = [0, 1, 2, 3, 5, 8, 13, 21, 34];

export const getPointsLabel = (points: number): string => {
  if (points === 0) return 'Not Estimated';
  if (points === 1) return '1 Point (XS)';
  if (points === 2) return '2 Points (S)';
  if (points === 3) return '3 Points (M)';
  if (points === 5) return '5 Points (L)';
  if (points === 8) return '8 Points (XL)';
  if (points >= 13) return `${points} Points (XXL)`;
  return `${points} Points`;
};

