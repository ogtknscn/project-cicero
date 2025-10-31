import { Check, Clock } from 'lucide-react';
import { Task } from '../../types';
import { useStore } from '../../stores/useStore';

interface QuickStatusToggleProps {
  task: Task;
}

export const QuickStatusToggle = ({ task }: QuickStatusToggleProps) => {
  const { updateTask } = useStore();

  const statusIcons = {
    todo: <Clock size={14} className="text-gray-500" />,
    'in-progress': <Clock size={14} className="text-blue-500" />,
    done: <Check size={14} className="text-green-500" />,
  };

  const nextStatus = {
    todo: 'in-progress',
    'in-progress': 'done',
    done: 'todo',
  }[task.status] as 'todo' | 'in-progress' | 'done';

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    updateTask(task.id, { status: nextStatus });
  };

  return (
    <button
      onClick={handleToggle}
      className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
      title={`Durumu değiştir: ${nextStatus}`}
    >
      {statusIcons[task.status]}
    </button>
  );
};
