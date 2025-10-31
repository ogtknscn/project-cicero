import { Task } from '../../types';
import { format, differenceInDays } from 'date-fns';

interface GanttViewProps {
  tasks: Task[];
}

export const GanttView = ({ tasks }: GanttViewProps) => {
  // Get min and max dates
  const dates = tasks
    .filter((t) => t.startDate || t.dueDate)
    .map((t) => ({
      start: t.startDate ? new Date(t.startDate) : new Date(),
      end: t.dueDate ? new Date(t.dueDate) : new Date(),
    }));

  const minDate =
    dates.length > 0 ? new Date(Math.min(...dates.map((d) => d.start.getTime()))) : new Date();

  const maxDate =
    dates.length > 0
      ? new Date(Math.max(...dates.map((d) => d.end.getTime())))
      : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

  const totalDays = differenceInDays(maxDate, minDate) + 1;
  const today = new Date();

  const getTaskPosition = (task: Task) => {
    const start = task.startDate ? new Date(task.startDate) : task.createdAt;
    const end = task.dueDate
      ? new Date(task.dueDate)
      : new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    const left = differenceInDays(start, minDate);
    const width = differenceInDays(end, start);

    return {
      left: `${(left / totalDays) * 100}%`,
      width: `${Math.max((width / totalDays) * 100, 5)}%`,
    };
  };

  return (
    <div className="overflow-x-auto">
      <div className="min-w-[800px]">
        {/* Header */}
        <div className="flex border-b border-gray-300 bg-white sticky top-0 z-10">
          <div className="w-64 p-3 font-semibold border-r border-gray-300">Görev</div>
          <div className="flex-1 relative">
            <div className="grid grid-cols-12 gap-1 p-2 text-xs text-gray-600">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="text-center">
                  {i + 1}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Rows */}
        {tasks.map((task) => {
          const { left, width } = getTaskPosition(task);
          const isOverdue = task.dueDate && new Date(task.dueDate) < today;

          return (
            <div key={task.id} className="flex border-b border-gray-200 hover:bg-gray-50">
              <div className="w-64 p-3 border-r border-gray-300 flex items-center">
                <div className="flex-1">
                  <div className="font-medium text-sm">{task.title}</div>
                  <div className="text-xs text-gray-500">
                    {task.startDate ? format(new Date(task.startDate), 'dd MMM') : '-'} →{' '}
                    {task.dueDate ? format(new Date(task.dueDate), 'dd MMM') : '-'}
                  </div>
                </div>
              </div>
              <div className="flex-1 relative p-2">
                <div
                  className={`absolute h-6 rounded ${
                    task.status === 'done'
                      ? 'bg-green-500'
                      : task.status === 'in-progress'
                        ? 'bg-blue-500'
                        : task.priority === 'high'
                          ? 'bg-red-500'
                          : task.priority === 'medium'
                            ? 'bg-yellow-500'
                            : 'bg-gray-400'
                  } ${isOverdue ? 'ring-2 ring-red-600' : ''}`}
                  style={{ left, width, top: '8px' }}
                  title={`${task.title} - ${task.status}`}
                />
              </div>
            </div>
          );
        })}

        {tasks.length === 0 && (
          <div className="text-center py-12 text-gray-400 border-b border-gray-200">
            Henüz görev yok
          </div>
        )}
      </div>
    </div>
  );
};
