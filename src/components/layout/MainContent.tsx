import React, { lazy, Suspense, useCallback, useMemo } from 'react';
import { Task } from '../../types';
import { useStore } from '../../stores/useStore';
import { useViewStore } from '../../stores/viewStore';
import { Button } from '../common/Button';
import { DraggableBoardView } from '../task/DraggableBoardView';
import { ListView } from '../task/ListView';
import { GanttView } from '../task/GanttView';
import { Skeleton } from '../common/Skeleton';
import { Plus } from 'lucide-react';

// Lazy load heavy components
const Dashboard = lazy(() =>
  import('../dashboard/Dashboard').then((m) => ({ default: m.Dashboard }))
);
const WorkloadView = lazy(() =>
  import('../workload/WorkloadView').then((m) => ({ default: m.WorkloadView }))
);
const PortfolioView = lazy(() =>
  import('../portfolio/PortfolioView').then((m) => ({ default: m.PortfolioView }))
);
const DocumentManager = lazy(() =>
  import('../document/DocumentManager').then((m) => ({ default: m.DocumentManager }))
);
const AutomationView = lazy(() =>
  import('../automation/AutomationView').then((m) => ({ default: m.AutomationView }))
);
const AgileView = lazy(() => import('../agile/AgileView').then((m) => ({ default: m.AgileView })));
const NotesView = lazy(() => import('../notes/NotesView').then((m) => ({ default: m.NotesView })));

interface MainContentProps {
  onNewTask: () => void;
  onEditTask: (task: Task) => void;
}

export const MainContent = ({ onNewTask, onEditTask }: MainContentProps) => {
  const { projects, selectedProjectId } = useStore();
  const { currentView } = useViewStore();
  const selectedProject = projects.find((p) => p.id === selectedProjectId);

  // Memoize filtered tasks (must be before early returns for hooks rules)
  const tasks = selectedProject?.tasks || [];
  const { todoTasks, inProgressTasks, doneTasks } = useMemo(
    () => ({
      todoTasks: tasks.filter((t) => t.status === 'todo'),
      inProgressTasks: tasks.filter((t) => t.status === 'in-progress'),
      doneTasks: tasks.filter((t) => t.status === 'done'),
    }),
    [tasks]
  );

  const renderView = useCallback(() => {
    const LoadingFallback = () => (
      <div className="p-6 space-y-4">
        <Skeleton.TaskCardSkeleton />
        <Skeleton.TaskCardSkeleton />
        <Skeleton.TaskCardSkeleton />
      </div>
    );

    switch (currentView) {
      case 'list':
        return <ListView tasks={tasks} onEdit={onEditTask} />;
      case 'board':
        return (
          <DraggableBoardView
            todoTasks={todoTasks}
            inProgressTasks={inProgressTasks}
            doneTasks={doneTasks}
            onEdit={onEditTask}
          />
        );
      case 'calendar':
        return (
          <div className="text-center py-12 text-gray-500 dark:text-gray-400">
            Takvim görünümü yakında...
          </div>
        );
      case 'timeline':
        return <GanttView tasks={tasks} />;
      case 'dashboard':
        return (
          <Suspense fallback={<LoadingFallback />}>
            <Dashboard />
          </Suspense>
        );
      case 'workload':
        return (
          <Suspense fallback={<LoadingFallback />}>
            <WorkloadView />
          </Suspense>
        );
      case 'portfolio':
        return (
          <Suspense fallback={<LoadingFallback />}>
            <PortfolioView />
          </Suspense>
        );
      case 'documents':
        return (
          <Suspense fallback={<LoadingFallback />}>
            <DocumentManager />
          </Suspense>
        );
      case 'automation':
        return (
          <Suspense fallback={<LoadingFallback />}>
            <AutomationView />
          </Suspense>
        );
      case 'agile':
        return (
          <Suspense fallback={<LoadingFallback />}>
            <AgileView />
          </Suspense>
        );
      case 'notes':
        return (
          <Suspense fallback={<LoadingFallback />}>
            <NotesView />
          </Suspense>
        );
      default:
        return (
          <DraggableBoardView
            todoTasks={todoTasks}
            inProgressTasks={inProgressTasks}
            doneTasks={doneTasks}
            onEdit={onEditTask}
          />
        );
    }
  }, [currentView, tasks, todoTasks, inProgressTasks, doneTasks, onEditTask]);

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

  return (
    <main className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-900">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              {selectedProject.name}
            </h1>
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
