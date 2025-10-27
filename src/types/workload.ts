export interface UserCapacity {
  userId: string;
  userName: string;
  weeklyHours: number; // e.g., 40
  dailyHours: number; // e.g., 8
  availability: {
    monday: number;
    tuesday: number;
    wednesday: number;
    thursday: number;
    friday: number;
    saturday: number;
    sunday: number;
  };
  vacation?: {
    startDate: Date;
    endDate: Date;
    reason?: string;
  }[];
}

export interface WorkloadEntry {
  userId: string;
  taskId: string;
  projectId: string;
  estimatedHours: number;
  actualHours?: number;
  week: string; // ISO week format: YYYY-Www (e.g., "2025-W43")
  date: Date;
}

export interface WorkloadSummary {
  userId: string;
  week: string;
  totalEstimatedHours: number;
  totalActualHours: number;
  capacityHours: number;
  utilization: number; // percentage (0-100+)
  overload: boolean; // true if utilization > 100
  tasks: {
    taskId: string;
    taskTitle: string;
    projectName: string;
    estimatedHours: number;
    actualHours?: number;
  }[];
}

export interface WorkloadAlert {
  id: string;
  userId: string;
  week: string;
  type: 'overload' | 'underload' | 'vacation_conflict';
  severity: 'low' | 'medium' | 'high';
  message: string;
  createdAt: Date;
}

