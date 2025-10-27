import { Task } from '../../types';
import { X, Link2 } from 'lucide-react';
import { Button } from '../common/Button';

interface TaskDependenciesProps {
  task: Task;
  allTasks: Task[];
  onUpdateDependencies: (dependsOn: string[]) => void;
}

export const TaskDependencies = ({ task, allTasks, onUpdateDependencies }: TaskDependenciesProps) => {
  const availableTasks = allTasks.filter((t) => t.id !== task.id);
  const selectedDependencies = task.dependsOn || [];
  
  const toggleDependency = (taskId: string) => {
    const isSelected = selectedDependencies.includes(taskId);
    
    if (isSelected) {
      // Kaldır
      onUpdateDependencies(selectedDependencies.filter((id) => id !== taskId));
    } else {
      // Ekle
      onUpdateDependencies([...selectedDependencies, taskId]);
    }
  };
  
  const getTaskTitle = (taskId: string) => {
    return allTasks.find((t) => t.id === taskId)?.title || taskId;
  };
  
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        <Link2 size={16} className="inline mr-2" />
        Bağımlılıklar
      </label>
      
      {/* Seçili bağımlılıklar */}
      {selectedDependencies.length > 0 && (
        <div className="mb-3 flex flex-wrap gap-2">
          {selectedDependencies.map((depId) => {
            const depTask = allTasks.find((t) => t.id === depId);
            if (!depTask) return null;
            
            return (
              <div
                key={depId}
                className="inline-flex items-center gap-1 px-2 py-1 bg-primary-100 text-primary-800 rounded-lg text-sm"
              >
                {depTask.title}
                <button
                  type="button"
                  onClick={() => toggleDependency(depId)}
                  className="hover:bg-primary-200 rounded-full p-0.5"
                >
                  <X size={14} />
                </button>
              </div>
            );
          })}
        </div>
      )}
      
      {/* Mevcut görevler listesi */}
      <div className="border border-gray-300 rounded-lg max-h-40 overflow-y-auto">
        {availableTasks.length === 0 ? (
          <p className="text-sm text-gray-500 p-3 text-center">
            Bağımlılık seçmek için görev yok
          </p>
        ) : (
          <ul className="divide-y divide-gray-200">
            {availableTasks.map((t) => {
              const isSelected = selectedDependencies.includes(t.id);
              
              return (
                <li key={t.id}>
                  <button
                    type="button"
                    onClick={() => toggleDependency(t.id)}
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${
                      isSelected ? 'bg-primary-50' : ''
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className={isSelected ? 'font-medium' : ''}>{t.title}</span>
                      {isSelected && <span className="text-primary-600">✓</span>}
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>
      
      {selectedDependencies.length > 0 && (
        <p className="text-xs text-gray-500 mt-2">
          Bu görev, seçili görevler tamamlanmadan başlayamaz
        </p>
      )}
    </div>
  );
};

