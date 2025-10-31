import { useState } from 'react';
import { MessageSquare, Send, MoreVertical, Trash2, Edit2 } from 'lucide-react';
import { useCommentStore } from '../../stores/commentStore';
import { Comment } from '../../types/comment';
import { MentionInput } from '../common/MentionInput';
import { Avatar } from '../common/Avatar';
import { Button } from '../common/Button';
import { formatDistanceToNow } from 'date-fns';
import { tr } from 'date-fns/locale';

interface TaskCommentsProps {
  taskId: string;
  currentUserId: string;
  currentUserName: string;
  users: { id: string; name: string; avatar?: string }[];
}

export const TaskComments: React.FC<TaskCommentsProps> = ({
  taskId,
  currentUserId,
  currentUserName,
  users,
}) => {
  const [newComment, setNewComment] = useState('');
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [editingContent, setEditingContent] = useState('');
  const [showMenuId, setShowMenuId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { addComment, updateComment, deleteComment, getCommentsByTaskId } = useCommentStore();

  const taskComments = getCommentsByTaskId(taskId);

  const handleSubmit = async () => {
    if (!newComment.trim()) return;

    setIsSubmitting(true);
    addComment({
      taskId,
      userId: currentUserId,
      userName: currentUserName,
      content: newComment.trim(),
    });
    setNewComment('');
    setIsSubmitting(false);
  };

  const handleEdit = (comment: Comment) => {
    setEditingCommentId(comment.id);
    setEditingContent(comment.content);
    setShowMenuId(null);
  };

  const handleSaveEdit = () => {
    if (editingCommentId && editingContent.trim()) {
      updateComment(editingCommentId, editingContent.trim());
      setEditingCommentId(null);
      setEditingContent('');
    }
  };

  const handleCancelEdit = () => {
    setEditingCommentId(null);
    setEditingContent('');
  };

  const handleDelete = (commentId: string) => {
    if (confirm('Bu yorumu silmek istediğinizden emin misiniz?')) {
      deleteComment(commentId);
      setShowMenuId(null);
    }
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center gap-2">
        <MessageSquare className="w-5 h-5 text-neutral-600 dark:text-neutral-400" />
        <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">
          Yorumlar ({taskComments.length})
        </h3>
      </div>

      {/* Comments List */}
      <div className="space-y-4">
        {taskComments.length === 0 ? (
          <div className="text-center py-8 text-neutral-500 dark:text-neutral-400">
            Henüz yorum yok. İlk yorumu sen yap!
          </div>
        ) : (
          taskComments.map((comment) => {
            const isEditing = editingCommentId === comment.id;
            const isOwner = comment.userId === currentUserId;

            return (
              <div
                key={comment.id}
                className="flex gap-3 p-4 rounded-lg bg-neutral-50 dark:bg-neutral-800/50 
                  hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors group"
              >
                {/* Avatar */}
                <Avatar
                  size="sm"
                  name={comment.userName}
                  src={comment.userAvatar}
                  className="flex-shrink-0"
                />

                {/* Content */}
                <div className="flex-1 min-w-0">
                  {/* Header */}
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <div>
                      <span className="text-sm font-semibold text-neutral-900 dark:text-white">
                        {comment.userName}
                      </span>
                      {comment.isEdited && (
                        <span className="text-xs text-neutral-500 dark:text-neutral-400 ml-2">
                          (düzenlendi)
                        </span>
                      )}
                    </div>

                    {/* Actions Menu */}
                    {isOwner && (
                      <div className="relative flex-shrink-0">
                        <button
                          onClick={() =>
                            setShowMenuId(showMenuId === comment.id ? null : comment.id)
                          }
                          className="p-1 rounded-md hover:bg-neutral-200 dark:hover:bg-neutral-700 
                            opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <MoreVertical className="w-4 h-4 text-neutral-500" />
                        </button>

                        {showMenuId === comment.id && (
                          <>
                            <div
                              className="fixed inset-0 z-40"
                              onClick={() => setShowMenuId(null)}
                            />
                            <div
                              className="absolute right-0 top-8 z-50 w-40 bg-white dark:bg-neutral-800 
                              border border-neutral-200 dark:border-neutral-700 rounded-lg shadow-lg py-1"
                            >
                              <button
                                onClick={() => handleEdit(comment)}
                                className="w-full flex items-center gap-2 px-4 py-2 text-sm 
                                  hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
                              >
                                <Edit2 className="w-4 h-4 text-neutral-500" />
                                <span>Düzenle</span>
                              </button>
                              <button
                                onClick={() => handleDelete(comment.id)}
                                className="w-full flex items-center gap-2 px-4 py-2 text-sm text-danger-600 
                                  hover:bg-danger-50 dark:hover:bg-danger-900/20 transition-colors"
                              >
                                <Trash2 className="w-4 h-4" />
                                <span>Sil</span>
                              </button>
                            </div>
                          </>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Comment Text */}
                  {isEditing ? (
                    <div className="space-y-2">
                      <MentionInput
                        value={editingContent}
                        onChange={setEditingContent}
                        users={users}
                        onSubmit={handleSaveEdit}
                      />
                      <div className="flex gap-2">
                        <Button size="sm" onClick={handleSaveEdit}>
                          Kaydet
                        </Button>
                        <Button size="sm" variant="ghost" onClick={handleCancelEdit}>
                          İptal
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <p className="text-sm text-neutral-700 dark:text-neutral-300 whitespace-pre-wrap break-words">
                      {comment.content}
                    </p>
                  )}

                  {/* Timestamp */}
                  <span className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                    {formatDistanceToNow(new Date(comment.createdAt), {
                      addSuffix: true,
                      locale: tr,
                    })}
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Add Comment */}
      <div className="space-y-2">
        <MentionInput
          value={newComment}
          onChange={setNewComment}
          placeholder="Yorum yazın... (@ kullanarak birini etiketleyebilirsiniz)"
          users={users}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
        />
        <div className="flex justify-end">
          <Button onClick={handleSubmit} disabled={!newComment.trim() || isSubmitting} size="sm">
            <Send className="w-4 h-4 mr-1" />
            Gönder
          </Button>
        </div>
      </div>
    </div>
  );
};
