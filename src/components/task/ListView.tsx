import { Task } from '../../types';
import { TaskCard } from './TaskCard';

interface ListViewProps {
  tasks: Task[];
  onEdit: (task: Task) => void;
}

export const ListView = ({ tasks, onEdit }: ListViewProps) => {
  return (
    <div className="space-y-3">
      {tasks.length === 0 ? (
        <div className="text-center py-12 text-gray-400 border-2 border-dashed rounded-lg">
          Henüz görev yok
        </div>
      ) : (
        tasks.map((task) => (
          <TaskCard key={task.id} task={task} onEdit={onEdit} />
        ))
      )}
    </div>
  );
};

