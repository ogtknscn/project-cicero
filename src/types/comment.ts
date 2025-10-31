export interface Comment {
  id: string;
  taskId: string;
  userId?: string;
  userName: string;
  userAvatar?: string;
  content: string;
  mentions?: string[]; // User IDs
  createdAt: Date;
  updatedAt?: Date;
  isEdited?: boolean;
}

export interface CommentFormData {
  content: string;
  mentions?: string[];
}
