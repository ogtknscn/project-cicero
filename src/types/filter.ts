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

export interface ViewPreset {
  id: string;
  name: string;
  viewType: 'board' | 'list' | 'timeline' | 'calendar' | 'dashboard';
  filterPresetId?: string;
  sortBy?: 'dueDate' | 'priority' | 'createdAt' | 'updatedAt' | 'title';
  sortOrder?: 'asc' | 'desc';
  groupBy?: 'status' | 'priority' | 'assignee' | 'none';
  createdAt: Date;
}

