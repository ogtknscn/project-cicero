export interface TimeEntry {
  id: string;
  taskId: string;
  userId: string;
  startTime: Date;
  endTime?: Date;
  duration: number; // minutes
  description?: string;
  billed: boolean;
}

export interface TimeTrackingSettings {
  taskId: string;
  hourlyRate?: number;
  budget?: number; // total budget in hours
  alertThreshold?: number; // alert when >X% of budget
}

export interface TimeSummary {
  taskId: string;
  totalMinutes: number;
  totalHours: number;
  entriesCount: number;
  billedMinutes: number;
  unbilledMinutes: number;
}
