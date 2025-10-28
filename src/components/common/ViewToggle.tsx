import { LayoutGrid, List, Calendar, GanttChart, BarChart3, Users, Briefcase } from 'lucide-react';
import { useViewStore, ViewType } from '../../stores/viewStore';
import { Button } from './Button';

export const ViewToggle = () => {
  const { currentView, setView } = useViewStore();
  
  const views = [
    { id: 'dashboard' as ViewType, icon: BarChart3, label: 'Dashboard' },
    { id: 'board' as ViewType, icon: LayoutGrid, label: 'Board' },
    { id: 'list' as ViewType, icon: List, label: 'Liste' },
    { id: 'timeline' as ViewType, icon: GanttChart, label: 'Timeline' },
    { id: 'workload' as ViewType, icon: Users, label: 'Workload' },
    { id: 'portfolio' as ViewType, icon: Briefcase, label: 'Portfolio' },
    { id: 'calendar' as ViewType, icon: Calendar, label: 'Takvim' },
  ];
  
  return (
    <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-lg">
      {views.map((view) => {
        const Icon = view.icon;
        const isActive = currentView === view.id;
        
        return (
          <button
            key={view.id}
            onClick={() => setView(view.id)}
            className={`flex items-center gap-1 px-3 py-1.5 rounded transition-colors ${
              isActive
                ? 'bg-white text-primary-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
            title={view.label}
          >
            <Icon size={16} />
            <span className="hidden md:inline text-sm font-medium">{view.label}</span>
          </button>
        );
      })}
    </div>
  );
};

