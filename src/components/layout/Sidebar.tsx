import { Home, Archive } from 'lucide-react';
import { useStore } from '../../stores/useStore';
import { ProjectCard } from '../project/ProjectCard';

interface SidebarProps {
  onProjectSelect: (id: string) => void;
}

export const Sidebar = ({ onProjectSelect }: SidebarProps) => {
  const { projects } = useStore();
  const activeProjects = projects.filter((p) => p.status === 'active');
  
  return (
    <aside className="bg-gray-50 border-r border-gray-200 w-80 flex flex-col">
      <div className="p-4">
        <div className="flex items-center gap-2 mb-4">
          <Home size={20} className="text-gray-600" />
          <h2 className="font-semibold text-gray-900">Projeler</h2>
          <span className="ml-auto text-sm text-gray-500">{activeProjects.length}</span>
        </div>
        
        <div className="space-y-3 max-h-[calc(100vh-150px)] overflow-y-auto">
          {activeProjects.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p>Henüz proje yok</p>
              <p className="text-sm mt-2">Yeni proje oluşturun!</p>
            </div>
          ) : (
            activeProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))
          )}
        </div>
      </div>
    </aside>
  );
};

