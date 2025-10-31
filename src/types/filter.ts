export interface FilterPreset {
  id: string;
  name: string;
  filters: {
    status?: ('todo' | 'in-progress' | 'done')[];
    priority?: ('low' | 'medium' | 'high')[];
    tags?: string[];
    dueDate?: {
      from?: Date;
      to?: Date;
    };
    search?: string;
  };
  createdAt: Date;
}

import { ViewType } from './index';

export interface ViewPreset {
  id: string;
  name: string;
  viewType: ViewType;
  filterPresetId?: string;
  sortBy?: 'dueDate' | 'priority' | 'createdAt' | 'updatedAt' | 'title';
  sortOrder?: 'asc' | 'desc';
  groupBy?: 'status' | 'priority' | 'assignee' | 'none';
  createdAt: Date;
}
