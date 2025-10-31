import { useState } from 'react';
import { Plus, Download, Upload, Moon, Sun, CheckSquare, FolderPlus, FileText } from 'lucide-react';
import { Button } from '../common/Button';
import { ViewToggle } from '../common/ViewToggle';
import { FilterPresetManager } from '../filter/FilterPresetManager';
import { ViewPresetManager } from '../filter/ViewPresetManager';
import { TemplateManager } from '../template/TemplateManager';
import { ExportMenu } from '../export/ExportMenu';
import { QuickAddMenu } from '../common/QuickAddMenu';
import { useStore } from '../../stores/useStore';
import { useThemeStore } from '../../stores/themeStore';

interface HeaderProps {
  onNewProject: () => void;
  onNewTask?: () => void;
  onNewNote?: () => void;
}

export const Header = ({ onNewProject, onNewTask, onNewNote }: HeaderProps) => {
  const { exportData, importData } = useStore();
  const { theme, setTheme } = useThemeStore();
  const [isQuickAddOpen, setIsQuickAddOpen] = useState(false);
  const { selectedProjectId } = useStore();

  const quickAddOptions = [
    selectedProjectId && onNewTask
      ? {
          id: 'task',
          label: 'Yeni Görev',
          icon: CheckSquare,
          action: onNewTask,
          shortcut: 'N',
        }
      : null,
    {
      id: 'project',
      label: 'Yeni Proje',
      icon: FolderPlus,
      action: onNewProject,
      shortcut: 'P',
    },
    onNewNote
      ? {
          id: 'note',
          label: 'Yeni Not',
          icon: FileText,
          action: onNewNote,
        }
      : null,
  ].filter(Boolean);

  const handleQuickAddClick = () => {
    setIsQuickAddOpen(true);
  };

  const handleExport = () => {
    const data = exportData();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `project-cicero-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = () => {
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
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  return (
    <>
      <header className="bg-white dark:bg-neutral-800 border-b border-neutral-200 dark:border-neutral-700 px-4 md:px-6 py-3 md:py-4">
        <div className="flex items-center justify-between" role="banner">
          <div className="flex items-center gap-2 md:gap-3 ml-12 md:ml-0">
            <h1 className="text-lg md:text-2xl font-bold text-gray-900 dark:text-white">
              Project Cicero
            </h1>
            <span className="text-xs md:text-sm text-gray-500 dark:text-gray-400 hidden sm:inline">
              Proje Yönetimi
            </span>
          </div>

          <div className="flex items-center gap-1 md:gap-2 flex-wrap">
            {/* Quick Add Button - Desktop */}
            {quickAddOptions.length > 0 && (
              <Button
                variant="primary"
                size="sm"
                onClick={handleQuickAddClick}
                className="hidden sm:flex min-w-touch min-h-touch"
                ariaLabel="Hızlı oluşturma menüsünü aç"
              >
                <Plus size={18} className="mr-1" />
                <span className="hidden md:inline">Oluştur</span>
              </Button>
            )}
            <div className="hidden lg:flex items-center gap-2">
              <ViewToggle />
              <ViewPresetManager />
              <FilterPresetManager currentFilters={{}} />
              <TemplateManager />
              <ExportMenu />
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              ariaLabel="Tema değiştir"
            >
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={handleExport}
              className="hidden sm:flex"
              ariaLabel="JSON olarak dışa aktar"
            >
              <Download size={16} className="mr-1 md:mr-2" />
              <span className="hidden md:inline">JSON</span>
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={handleImport}
              className="hidden sm:flex"
              ariaLabel="JSON dosyasından içe aktar"
            >
              <Upload size={16} className="mr-1 md:mr-2" />
              <span className="hidden md:inline">JSON</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Quick Add Menu Modal */}
      <QuickAddMenu
        isOpen={isQuickAddOpen}
        onClose={() => setIsQuickAddOpen(false)}
        options={quickAddOptions as any}
      />

      {/* Mobile Floating Button */}
      {quickAddOptions.length > 0 && (
        <button
          onClick={handleQuickAddClick}
          className="sm:hidden fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-primary-600 
          text-white shadow-lg hover:bg-primary-700 focus:outline-none focus:ring-2 
          focus:ring-primary-500 focus:ring-offset-2 active:scale-95 transition-all duration-normal 
          flex items-center justify-center"
          aria-label="Hızlı oluşturma menüsünü aç"
        >
          <Plus size={24} />
        </button>
      )}
    </>
  );
};
