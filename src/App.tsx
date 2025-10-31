import { useState, useEffect } from 'react';
import { ErrorBoundary } from './components/common/ErrorBoundary';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { MainContent } from './components/layout/MainContent';
import { ProjectModal } from './components/project/ProjectModal';
import { TaskModal } from './components/task/TaskModal';
import { CommandPalette } from './components/common/CommandPalette';
import { KeyboardShortcutsHelp } from './components/common/KeyboardShortcutsHelp';
import { ToastContainer } from './components/common/Toast';
import { useStore } from './stores/useStore';
import { useThemeStore } from './stores/themeStore';
import { Task } from './types';

function App() {
  const { selectedProjectId } = useStore();
  const { theme } = useThemeStore();
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isShortcutsHelpOpen, setIsShortcutsHelpOpen] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState<string | undefined>();

  // Dark mode
  useEffect(() => {
    const root = document.documentElement;
    if (
      theme === 'dark' ||
      (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

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
      // CMD+K or CTRL+K: Command Palette
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
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

      // ?: Keyboard shortcuts help
      if (e.key === '?' && !e.shiftKey) {
        e.preventDefault();
        setIsShortcutsHelpOpen(true);
      }

      // ESC: Close modals
      if (
        e.key === 'Escape' &&
        (isProjectModalOpen || isTaskModalOpen || isCommandPaletteOpen || isShortcutsHelpOpen)
      ) {
        setIsProjectModalOpen(false);
        setIsTaskModalOpen(false);
        setIsCommandPaletteOpen(false);
        setIsShortcutsHelpOpen(false);
        setEditingTaskId(undefined);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [
    selectedProjectId,
    isProjectModalOpen,
    isTaskModalOpen,
    isCommandPaletteOpen,
    isShortcutsHelpOpen,
  ]);

  return (
    <ErrorBoundary>
      <div className="flex flex-col h-screen bg-neutral-50 dark:bg-neutral-900">
        <Header
          onNewProject={handleNewProject}
          onNewTask={selectedProjectId ? handleNewTask : undefined}
        />
        <div className="flex flex-1 overflow-hidden">
          <Sidebar />
          <MainContent onNewTask={handleNewTask} onEditTask={handleEditTask} />
        </div>

        <ProjectModal isOpen={isProjectModalOpen} onClose={() => setIsProjectModalOpen(false)} />

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

        <CommandPalette
          isOpen={isCommandPaletteOpen}
          onClose={() => setIsCommandPaletteOpen(false)}
          onNewProject={handleNewProject}
          onNewTask={handleNewTask}
        />

        <KeyboardShortcutsHelp
          isOpen={isShortcutsHelpOpen}
          onClose={() => setIsShortcutsHelpOpen(false)}
        />

        <ToastContainer />
      </div>
    </ErrorBoundary>
  );
}

export default App;
