import { Home, Menu, X } from 'lucide-react';
import { useStore } from '../../stores/useStore';
import { ProjectCard } from '../project/ProjectCard';
import { useState, useEffect } from 'react';

export const Sidebar = () => {
  const { projects } = useStore();
  const activeProjects = projects.filter((p) => p.status === 'active');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Close mobile menu when window is resized to desktop size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-primary-600 text-white rounded-lg shadow-lg hover:bg-primary-700 transition-colors"
        aria-label="Menüyü aç/kapat"
      >
        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Overlay for mobile */}
      {isMobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed md:static inset-y-0 left-0 z-40
          bg-gray-50 dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 
          w-80 flex flex-col transform transition-transform duration-300 ease-in-out
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}
      >
        <div className="p-4">
          <div className="flex items-center gap-2 mb-4">
            <Home size={20} className="text-gray-600 dark:text-gray-400" />
            <h2 className="font-semibold text-gray-900 dark:text-white">Projeler</h2>
            <span className="ml-auto text-sm text-gray-500 dark:text-gray-400">
              {activeProjects.length}
            </span>
          </div>

          <div className="space-y-3 max-h-[calc(100vh-150px)] overflow-y-auto">
            {activeProjects.length === 0 ? (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                <p>Henüz proje yok</p>
                <p className="text-sm mt-2">Yeni proje oluşturun!</p>
              </div>
            ) : (
              activeProjects.map((project) => <ProjectCard key={project.id} project={project} />)
            )}
          </div>
        </div>
      </aside>
    </>
  );
};
