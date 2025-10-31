export interface Tag {
  id: string;
  name: string;
  color: string; // Hex color
  projectId?: string; // Optional: Project-specific tag
}

export interface TagUsage {
  tagId: string;
  count: number;
}
