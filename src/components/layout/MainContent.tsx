import { Task } from '../../types';
import { useStore } from '../../stores/useStore';
import { useViewStore } from '../../stores/viewStore';
import { Button } from '../common/Button';
import { BoardView } from '../task/BoardView';
import { DraggableBoardView } from '../task/DraggableBoardView';
import { ListView } from '../task/ListView';
import { GanttView } from '../task/GanttView';
import { Dashboard } from '../dashboard/Dashboard';
import { Plus } from 'lucide-react';

interface MainContentProps {
  onNewTask: () => void;
  onEditTask: (task: Task) => void;
}

export const MainContent = ({ onNewTask, onEditTask }: MainContentProps) => {
  const { projects, selectedProjectId } = useStore();
  const { currentView } = useViewStore();
  const selectedProject = projects.find((p) => p.id === selectedProjectId);
  
  if (!selectedProjectId) {
    return (
      <div className="flex items-center justify-center h-full bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-400 dark:text-gray-500 mb-2">
            Proje Seçin
          </h2>
          <p className="text-gray-500 dark:text-gray-400">
            Sol menüden bir proje seçerek görevlerini görüntüleyebilirsiniz
          </p>
        </div>
      </div>
    );
  }
  
  if (!selectedProject) {
    return (
      <div className="flex items-center justify-center h-full bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-red-400 dark:text-red-500 mb-2">
            Proje bulunamadı
          </h2>
        </div>
      </div>
    );
  }
  
  const { tasks } = selectedProject;
  const todoTasks = tasks.filter((t) => t.status === 'todo');
  const inProgressTasks = tasks.filter((t) => t.status === 'in-progress');
  const doneTasks = tasks.filter((t) => t.status === 'done');
  
  const renderView = () => {
    switch (currentView) {
      case 'list':
        return <ListView tasks={tasks} onEdit={onEditTask} />;
      case 'board':
        return <DraggableBoardView todoTasks={todoTasks} inProgressTasks={inProgressTasks} doneTasks={doneTasks} onEdit={onEditTask} />;
      case 'calendar':
        return <div className="text-center py-12 text-gray-500 dark:text-gray-400">Takvim görünümü yakında...</div>;
      case 'timeline':
        return <GanttView tasks={tasks} />;
      case 'dashboard':
        return <Dashboard />;
      default:
        return <DraggableBoardView todoTasks={todoTasks} inProgressTasks={inProgressTasks} doneTasks={doneTasks} onEdit={onEditTask} />;
    }
  };
  
  return (
    <main className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-900">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{selectedProject.name}</h1>
            {selectedProject.description && (
              <p className="text-gray-600 dark:text-gray-400 mt-1">{selectedProject.description}</p>
            )}
          </div>
          <Button onClick={onNewTask}>
            <Plus size={16} className="mr-2" />
            Yeni Görev
          </Button>
        </div>
        
        {renderView()}
      </div>
    </main>
  );
};
