import { Task } from '../../types';
import { TaskCard } from './TaskCard';

interface BoardViewProps {
  todoTasks: Task[];
  inProgressTasks: Task[];
  doneTasks: Task[];
  onEdit: (task: Task) => void;
}

export const BoardView = ({ todoTasks, inProgressTasks, doneTasks, onEdit }: BoardViewProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-700 mb-4">
          Yapılacaklar ({todoTasks.length})
        </h3>
        <div className="space-y-3">
          {todoTasks.map((task) => (
            <TaskCard key={task.id} task={task} onEdit={onEdit} />
          ))}
          {todoTasks.length === 0 && (
            <div className="text-center py-8 text-gray-400 border-2 border-dashed rounded-lg">
              Görev yok
            </div>
          )}
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold text-gray-700 mb-4">
          Devam Eden ({inProgressTasks.length})
        </h3>
        <div className="space-y-3">
          {inProgressTasks.map((task) => (
            <TaskCard key={task.id} task={task} onEdit={onEdit} />
          ))}
          {inProgressTasks.length === 0 && (
            <div className="text-center py-8 text-gray-400 border-2 border-dashed rounded-lg">
              Görev yok
            </div>
          )}
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold text-gray-700 mb-4">
          Tamamlanan ({doneTasks.length})
        </h3>
        <div className="space-y-3">
          {doneTasks.map((task) => (
            <TaskCard key={task.id} task={task} onEdit={onEdit} />
          ))}
          {doneTasks.length === 0 && (
            <div className="text-center py-8 text-gray-400 border-2 border-dashed rounded-lg">
              Görev yok
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

