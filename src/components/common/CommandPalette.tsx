import { useState, useEffect, useMemo } from 'react';
import { 
  Search, 
  Plus, 
  Download, 
  Upload, 
  Moon, 
  Sun, 
  LayoutGrid, 
  List, 
  Calendar, 
  GanttChart,
  BarChart3,
  FileText,
  FilePlus,
  Save,
  Eye
} from 'lucide-react';
import { useStore } from '../../stores/useStore';
import { useViewStore } from '../../stores/viewStore';
import { useThemeStore } from '../../stores/themeStore';
import { useToastStore } from '../../stores/toastStore';
import { exportProjectsToCSV, exportAllProjectsToPDF } from '../../utils/export';

interface Command {
  id: string;
  label: string;
  icon: any;
  keywords: string[];
  action: () => void;
  category: 'navigation' | 'action' | 'view' | 'export' | 'theme';
}

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onNewProject: () => void;
  onNewTask: () => void;
}

export const CommandPalette = ({ isOpen, onClose, onNewProject, onNewTask }: CommandPaletteProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { exportData, importData, projects, selectedProjectId } = useStore();
  const { setView, currentView } = useViewStore();
  const { theme, setTheme } = useThemeStore();
  const { addToast } = useToastStore();

  const handleExportJSON = () => {
    const data = exportData();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `project-cicero-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    onClose();
  };

  const handleImportJSON = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const content = event.target?.result as string;
          if (confirm('Mevcut veriler üzerine yazılacak. Devam etmek istiyor musunuz?')) {
            importData(content);
            onClose();
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  // Define all available commands
  const commands: Command[] = useMemo(() => [
    // Navigation
    {
      id: 'view-dashboard',
      label: 'Dashboard Görünümü',
      icon: BarChart3,
      keywords: ['dashboard', 'panel', 'overview'],
      action: () => { setView('dashboard'); onClose(); },
      category: 'view',
    },
    {
      id: 'view-board',
      label: 'Board Görünümü',
      icon: LayoutGrid,
      keywords: ['board', 'kanban', 'panel'],
      action: () => { setView('board'); onClose(); },
      category: 'view',
    },
    {
      id: 'view-list',
      label: 'Liste Görünümü',
      icon: List,
      keywords: ['list', 'liste'],
      action: () => { setView('list'); onClose(); },
      category: 'view',
    },
    {
      id: 'view-timeline',
      label: 'Timeline Görünümü',
      icon: GanttChart,
      keywords: ['timeline', 'gantt', 'zaman'],
      action: () => { setView('timeline'); onClose(); },
      category: 'view',
    },
    {
      id: 'view-calendar',
      label: 'Takvim Görünümü',
      icon: Calendar,
      keywords: ['calendar', 'takvim'],
      action: () => { setView('calendar'); onClose(); },
      category: 'view',
    },
    // Actions
    {
      id: 'new-project',
      label: 'Yeni Proje Oluştur',
      icon: Plus,
      keywords: ['new', 'project', 'yeni', 'proje'],
      action: () => { onNewProject(); onClose(); },
      category: 'action',
    },
    {
      id: 'new-task',
      label: 'Yeni Görev Oluştur',
      icon: FilePlus,
      keywords: ['new', 'task', 'yeni', 'görev'],
      action: () => { onNewTask(); onClose(); },
      category: 'action',
    },
    // Export
    {
      id: 'export-json',
      label: 'JSON Olarak Dışa Aktar',
      icon: Download,
      keywords: ['export', 'download', 'json', 'dışa', 'aktar'],
      action: handleExportJSON,
      category: 'export',
    },
    {
      id: 'export-csv',
      label: 'CSV Olarak Dışa Aktar',
      icon: FileText,
      keywords: ['export', 'csv', 'excel', 'dışa', 'aktar'],
      action: () => { exportProjectsToCSV(projects); onClose(); },
      category: 'export',
    },
    {
      id: 'export-pdf',
      label: 'PDF Olarak Dışa Aktar',
      icon: FileText,
      keywords: ['export', 'pdf', 'dışa', 'aktar'],
      action: () => { exportAllProjectsToPDF(projects); onClose(); },
      category: 'export',
    },
    {
      id: 'import-json',
      label: 'JSON İçe Aktar',
      icon: Upload,
      keywords: ['import', 'upload', 'json', 'içe', 'aktar'],
      action: handleImportJSON,
      category: 'action',
    },
    // Theme
    {
      id: 'theme-light',
      label: 'Açık Tema',
      icon: Sun,
      keywords: ['theme', 'light', 'tema', 'açık'],
      action: () => { setTheme('light'); onClose(); },
      category: 'theme',
    },
    {
      id: 'theme-dark',
      label: 'Koyu Tema',
      icon: Moon,
      keywords: ['theme', 'dark', 'tema', 'koyu'],
      action: () => { setTheme('dark'); onClose(); },
      category: 'theme',
    },
  ], [setView, onNewProject, onNewTask, exportData, importData, projects, setTheme]);

  // Filter commands based on search term
  const filteredCommands = useMemo(() => {
    if (!searchTerm.trim()) return commands;
    
    const term = searchTerm.toLowerCase();
    return commands.filter((cmd) =>
      cmd.label.toLowerCase().includes(term) ||
      cmd.keywords.some((keyword) => keyword.toLowerCase().includes(term))
    );
  }, [searchTerm, commands]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      
      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setSelectedIndex((prev) => Math.min(prev + 1, filteredCommands.length - 1));
          break;
        case 'ArrowUp':
          e.preventDefault();
          setSelectedIndex((prev) => Math.max(prev - 1, 0));
          break;
        case 'Enter':
          e.preventDefault();
          if (filteredCommands[selectedIndex]) {
            filteredCommands[selectedIndex].action();
          }
          break;
        case 'Escape':
          e.preventDefault();
          onClose();
          break;
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, selectedIndex, filteredCommands, onClose]);

  // Reset selected index when search term changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [searchTerm]);

  // Reset search term when modal opens
  useEffect(() => {
    if (isOpen) {
      setSearchTerm('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const categoryLabels = {
    navigation: 'Gezinme',
    action: 'İşlemler',
    view: 'Görünümler',
    export: 'Dışa Aktar',
    theme: 'Tema',
  };

  // Group commands by category
  const groupedCommands = filteredCommands.reduce((acc, cmd) => {
    if (!acc[cmd.category]) {
      acc[cmd.category] = [];
    }
    acc[cmd.category].push(cmd);
    return acc;
  }, {} as Record<string, Command[]>);

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 bg-black/50"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-2xl mx-4 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input */}
        <div className="flex items-center gap-3 p-4 border-b border-gray-200 dark:border-gray-700">
          <Search size={20} className="text-gray-400" />
          <input
            type="text"
            placeholder="Komut ara... (örn: yeni proje, export, tema)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            autoFocus
            className="flex-1 bg-transparent border-none outline-none text-gray-900 dark:text-white placeholder-gray-400"
          />
          <span className="text-xs text-gray-400">ESC</span>
        </div>

        {/* Commands List */}
        <div className="max-h-[400px] overflow-y-auto">
          {Object.keys(groupedCommands).length === 0 ? (
            <div className="p-8 text-center text-gray-500 dark:text-gray-400">
              Komut bulunamadı
            </div>
          ) : (
            Object.entries(groupedCommands).map(([category, cmds]) => (
              <div key={category} className="py-2">
                <div className="px-4 py-1 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">
                  {categoryLabels[category as keyof typeof categoryLabels]}
                </div>
                {cmds.map((cmd, index) => {
                  const globalIndex = filteredCommands.indexOf(cmd);
                  const Icon = cmd.icon;
                  return (
                    <button
                      key={cmd.id}
                      onClick={cmd.action}
                      className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${
                        globalIndex === selectedIndex
                          ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-900 dark:text-primary-100'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                      }`}
                    >
                      <Icon size={18} />
                      <span className="flex-1">{cmd.label}</span>
                      {globalIndex === selectedIndex && (
                        <span className="text-xs text-gray-400">↵</span>
                      )}
                    </button>
                  );
                })}
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-4 py-3 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 text-xs text-gray-500 dark:text-gray-400">
          <div className="flex gap-4">
            <span><kbd className="px-1.5 py-0.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded">↑↓</kbd> navigate</span>
            <span><kbd className="px-1.5 py-0.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded">↵</kbd> select</span>
            <span><kbd className="px-1.5 py-0.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded">esc</kbd> close</span>
          </div>
        </div>
      </div>
    </div>
  );
};

