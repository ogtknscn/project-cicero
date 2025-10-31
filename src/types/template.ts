import { Task, Project } from './index';

export interface TaskTemplate {
  id: string;
  name: string;
  description?: string;
  template: Omit<Task, 'id' | 'projectId' | 'createdAt' | 'updatedAt'>;
  createdAt: Date;
}

export interface ProjectTemplate {
  id: string;
  name: string;
  description?: string;
  template: Omit<Project, 'id' | 'createdAt' | 'updatedAt' | 'tasks'>;
  taskTemplates?: Omit<Task, 'id' | 'projectId' | 'createdAt' | 'updatedAt'>[];
  createdAt: Date;
}
