import { useState, useEffect } from 'react';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { MainContent } from './components/layout/MainContent';
import { ProjectModal } from './components/project/ProjectModal';
import { TaskModal } from './components/task/TaskModal';
import { SearchCommand } from './components/common/SearchCommand';
import { ToastContainer } from './components/common/Toast';
import { useStore } from './stores/useStore';
import { useViewStore } from './stores/viewStore';
import { useThemeStore } from './stores/themeStore';
import { Task } from './types';

function App() {
  const { selectedProjectId, selectProject, projects } = useStore();
  const { theme } = useThemeStore();
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState<string | undefined>();
  const { setView } = useViewStore();
  
  // Dark mode
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);
  
  const handleProjectSelect = (id: string) => {
    selectProject(id);
  };
  
  const handleNewProject = () => {
    setIsProjectModalOpen(true);
  };
  
  const handleNewTask = () => {
    setIsTaskModalOpen(true);
    setEditingTaskId(undefined);
  };
  
  const handleEditTask = (task: Task) => {
    setEditingTaskId(task.id);
    setIsTaskModalOpen(true);
  };
  
  // Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // CMD+K or CTRL+K: Search
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
      
      // CMD+N or CTRL+N: New task (if project selected)
      if ((e.metaKey || e.ctrlKey) && e.key === 'n' && selectedProjectId) {
        e.preventDefault();
        handleNewTask();
      }
      
      // CMD+P or CTRL+P: New project
      if ((e.metaKey || e.ctrlKey) && e.key === 'p') {
        e.preventDefault();
        handleNewProject();
      }
      
      // ESC: Close modals
      if (e.key === 'Escape' && (isProjectModalOpen || isTaskModalOpen || isSearchOpen)) {
        setIsProjectModalOpen(false);
        setIsTaskModalOpen(false);
        setIsSearchOpen(false);
        setEditingTaskId(undefined);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedProjectId, isProjectModalOpen, isTaskModalOpen, isSearchOpen]);
  
  const handleSearchSelectTask = (task: Task) => {
    // Find the project
    const project = projects.find((p) => p.tasks.some((t) => t.id === task.id));
    if (project) {
      selectProject(project.id);
      setEditingTaskId(task.id);
      setIsTaskModalOpen(true);
    }
  };
  
  return (
    <div className="flex flex-col h-screen">
      <Header onNewProject={handleNewProject} />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar onProjectSelect={handleProjectSelect} />
        <MainContent onNewTask={handleNewTask} onEditTask={handleEditTask} />
      </div>
      
      <ProjectModal
        isOpen={isProjectModalOpen}
        onClose={() => setIsProjectModalOpen(false)}
      />
      
      {selectedProjectId && (
        <TaskModal
          isOpen={isTaskModalOpen}
          onClose={() => {
            setIsTaskModalOpen(false);
            setEditingTaskId(undefined);
          }}
          taskId={editingTaskId}
          projectId={selectedProjectId}
        />
      )}
      
      <SearchCommand
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectTask={handleSearchSelectTask}
      />
      
      <ToastContainer />
    </div>
  );
}

export default App;

