import React, { useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Task } from '../../types';
import { useStore, generateId } from '../../stores/useStore';
import { Trash2, Calendar, Link as LinkIcon } from 'lucide-react';
import { Button } from '../common/Button';
import { QuickStatusToggle } from './QuickStatusToggle';
import { QuickActions } from './QuickActions';
import { InlineEdit } from '../common/InlineEdit';

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  dragId?: string;
}

export const TaskCard = React.memo(
  ({ task, onEdit, dragId }: TaskCardProps) => {
    const { deleteTask, addTask, updateTask } = useStore();
    const [isEditingTitle, setIsEditingTitle] = useState(false);

    const handleDuplicate = () => {
      const duplicatedTask: Task = {
        ...task,
        id: generateId(),
        title: `${task.title} (Kopya)`,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      addTask(duplicatedTask);
    };

    const handleArchive = () => {
      // TODO: Implement archive functionality
      // For now, this is a placeholder
    };

    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
      id: dragId || task.id,
    });

    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
      opacity: isDragging ? 0.5 : 1,
    };

    const priorityColors = {
      low: 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200',
      medium: 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200',
      high: 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200',
    };

    const statusLabels = {
      todo: 'Yapılacak',
      'in-progress': 'Devam Ediyor',
      done: 'Tamamlandı',
    };

    const handleTitleUpdate = (newTitle: string) => {
      updateTask(task.id, { title: newTitle });
    };

    const cardInner = (
      <div
        ref={setNodeRef}
        style={style}
        onClick={() => !isEditingTitle && onEdit(task)}
        className={`bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 hover:shadow-md transition-all ${
          isEditingTitle ? '' : 'cursor-pointer hover:scale-[1]'
        } ${isDragging ? 'shadow-xl opacity-50' : ''}`}
        {...(isEditingTitle ? {} : attributes)}
        {...(isEditingTitle ? {} : listeners)}
      >
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1">
            {isEditingTitle ? (
              <InlineEdit
                value={task.title}
                onSave={handleTitleUpdate}
                onCancel={() => setIsEditingTitle(false)}
                placeholder="Görev başlığı"
                className="font-semibold"
              />
            ) : (
              <h4
                className="font-semibold text-gray-900 dark:text-white cursor-pointer hover:text-primary-600 dark:hover:text-primary-400"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsEditingTitle(true);
                }}
              >
                {task.title}
              </h4>
            )}
          </div>
          <div className="flex items-center gap-1">
            <QuickStatusToggle task={task} />
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                if (confirm('Görevi silmek istediğinize emin misiniz?')) {
                  deleteTask(task.id);
                }
              }}
            >
              <Trash2 size={16} />
            </Button>
          </div>
        </div>

        {task.description && (
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 line-clamp-2">
            {task.description}
          </p>
        )}

        {/* Tags */}
        {task.tags && task.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-2">
            {task.tags.map((tag, index) => (
              <span
                key={index}
                className="px-2 py-0.5 text-xs rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between gap-2 flex-wrap">
          <div className="flex items-center gap-2">
            <span
              className={`px-2 py-1 rounded text-xs font-medium ${priorityColors[task.priority]}`}
            >
              {task.priority === 'low' ? 'Düşük' : task.priority === 'medium' ? 'Orta' : 'Yüksek'}
            </span>
            <span className="px-2 py-1 rounded text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
              {statusLabels[task.status]}
            </span>

            {/* Bağımlılık göstergesi */}
            {task.dependsOn && task.dependsOn.length > 0 && (
              <div
                className="flex items-center gap-1 text-xs text-gray-500"
                title={`Bağımlı: ${task.dependsOn.length} görev`}
              >
                <LinkIcon size={12} />
                <span>{task.dependsOn.length}</span>
              </div>
            )}
          </div>

          {task.dueDate && (
            <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
              <Calendar size={14} />
              <span>{new Date(task.dueDate).toLocaleDateString('tr-TR')}</span>
            </div>
          )}
        </div>
      </div>
    );

    return (
      <QuickActions
        task={task}
        onEdit={() => onEdit(task)}
        onDelete={() => {
          if (confirm('Görevi silmek istediğinize emin misiniz?')) {
            deleteTask(task.id);
          }
        }}
        onDuplicate={handleDuplicate}
        onArchive={handleArchive}
      >
        {cardInner}
      </QuickActions>
    );
  },
  (prevProps, nextProps) => {
    // Custom comparison for better performance
    return (
      prevProps.task.id === nextProps.task.id &&
      prevProps.task.title === nextProps.task.title &&
      prevProps.task.status === nextProps.task.status &&
      prevProps.task.priority === nextProps.task.priority &&
      prevProps.task.updatedAt === nextProps.task.updatedAt &&
      prevProps.dragId === nextProps.dragId
    );
  }
);
