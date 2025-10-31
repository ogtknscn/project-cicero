import { create } from 'zustand';
import { Comment } from '../types/comment';

interface CommentStore {
  comments: Comment[];
  addComment: (comment: Omit<Comment, 'id' | 'createdAt'>) => void;
  updateComment: (commentId: string, content: string) => void;
  deleteComment: (commentId: string) => void;
  getCommentsByTaskId: (taskId: string) => Comment[];
}

const generateId = () => `comment_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

export const useCommentStore = create<CommentStore>((set, get) => ({
  comments: [],

  addComment: (commentData) => {
    const newComment: Comment = {
      ...commentData,
      id: generateId(),
      createdAt: new Date(),
    };
    set((state) => ({
      comments: [...state.comments, newComment],
    }));
  },

  updateComment: (commentId, content) => {
    set((state) => ({
      comments: state.comments.map((comment) =>
        comment.id === commentId
          ? { ...comment, content, updatedAt: new Date(), isEdited: true }
          : comment
      ),
    }));
  },

  deleteComment: (commentId) => {
    set((state) => ({
      comments: state.comments.filter((comment) => comment.id !== commentId),
    }));
  },

  getCommentsByTaskId: (taskId) => {
    return get().comments.filter((comment) => comment.taskId === taskId);
  },
}));
