import { Plus, Download, Upload, Moon, Sun } from 'lucide-react';
import { Button } from '../common/Button';
import { ViewToggle } from '../common/ViewToggle';
import { FilterPresetManager } from '../filter/FilterPresetManager';
import { ViewPresetManager } from '../filter/ViewPresetManager';
import { TemplateManager } from '../template/TemplateManager';
import { ExportMenu } from '../export/ExportMenu';
import { useStore } from '../../stores/useStore';
import { useThemeStore } from '../../stores/themeStore';

interface HeaderProps {
  onNewProject: () => void;
}

export const Header = ({ onNewProject }: HeaderProps) => {
  const { exportData, importData } = useStore();
  const { theme, setTheme } = useThemeStore();

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
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Project Cicero</h1>
          <span className="text-sm text-gray-500 dark:text-gray-400">Proje Yönetimi</span>
        </div>

        <div className="flex items-center gap-2">
          <ViewToggle />
          <ViewPresetManager />
          <FilterPresetManager currentFilters={{}} />
          <TemplateManager />
          <ExportMenu />
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          >
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </Button>
          <Button variant="secondary" size="sm" onClick={handleExport}>
            <Download size={16} className="mr-2" />
            JSON
          </Button>
          <Button variant="secondary" size="sm" onClick={handleImport}>
            <Upload size={16} className="mr-2" />
            JSON
          </Button>
          <Button size="sm" onClick={onNewProject}>
            <Plus size={16} className="mr-2" />
            Yeni Proje
          </Button>
        </div>
      </div>
    </header>
  );
};
