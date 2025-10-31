export interface Note {
  id: string;
  title: string;
  content: string; // Markdown content
  projectId: string;
  taskId?: string;
  tags?: string[];
  createdAt: Date;
  updatedAt: Date;
  createdBy?: string;
}

export interface NoteCategory {
  id: string;
  name: string;
  projectId: string;
  color?: string;
  noteIds: string[];
}
