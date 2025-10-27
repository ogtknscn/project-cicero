export interface Task {
  id: string;
  projectId: string;
  title: string;
  description?: string;
  status: 'todo' | 'in-progress' | 'done';
  priority: 'low' | 'medium' | 'high';
  dueDate?: Date;
  createdAt: Date;
  updatedAt: Date;
  tags: string[];
  assignee?: string;
  checklist?: ChecklistItem[];
  // Task Dependencies - Bağımlılıklar
  dependsOn?: string[]; // Bu görevin bağımlı olduğu görevlerin ID'leri
  blockedBy?: string[]; // Bu görevi bloke eden görevlerin ID'leri
  startDate?: Date; // Başlangıç tarihi (Gantt chart için)
  customFields?: Record<string, string | number | boolean>; // Custom field values
}

export interface ChecklistItem {
  id: string;
  text: string;
  completed: boolean;
}

export interface Project {
  id: string;
  name: string;
  description?: string;
  color?: string;
  createdAt: Date;
  updatedAt: Date;
  status: 'active' | 'archived';
  tasks: Task[];
  metadata: {
    totalTasks: number;
    completedTasks: number;
  };
  customFields?: { id: string; name: string; type: 'text' | 'number' | 'date' | 'select' | 'checkbox' | 'url'; options?: string[] }[];
}

