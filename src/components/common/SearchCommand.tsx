import { useState, useEffect, useMemo } from 'react';
import { Search, X } from 'lucide-react';
import { Task } from '../../types';
import { useStore } from '../../stores/useStore';
import { createTaskIndex, indexTasks, searchTasks } from '../../utils/search';

interface SearchCommandProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTask: (task: Task) => void;
}

export const SearchCommand = ({ isOpen, onClose, onSelectTask }: SearchCommandProps) => {
  const { projects } = useStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  
  // Get all tasks from all projects
  const allTasks = useMemo(() => 
    projects.flatMap((project) =>
      project.tasks.map((task) => ({
        ...task,
        projectName: project.name,
        projectColor: project.color,
      }))
    ),
    [projects]
  );

  // Create and populate FlexSearch index
  const taskIndex = useMemo(() => {
    const index = createTaskIndex();
    indexTasks(allTasks, index);
    return index;
  }, [allTasks]);
  
  // Filter tasks using FlexSearch
  const filteredTasks = useMemo(() => {
    if (!searchTerm.trim()) return allTasks;
    return searchTasks(searchTerm, allTasks, taskIndex);
  }, [searchTerm, allTasks, taskIndex]);
  
  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      
      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setSelectedIndex((prev) => Math.min(prev + 1, filteredTasks.length - 1));
          break;
        case 'ArrowUp':
          e.preventDefault();
          setSelectedIndex((prev) => Math.max(prev - 1, 0));
          break;
        case 'Enter':
          e.preventDefault();
          if (filteredTasks[selectedIndex]) {
            onSelectTask(filteredTasks[selectedIndex]);
            onClose();
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
  }, [isOpen, selectedIndex, filteredTasks, onSelectTask, onClose]);
  
  // Reset selected index when search term changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [searchTerm]);
  
  if (!isOpen) return null;
  
  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-20"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input */}
        <div className="flex items-center gap-2 p-4 border-b border-gray-200">
          <Search size={20} className="text-gray-400" />
          <input
            type="text"
            placeholder="Görevlerde ara..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 outline-none text-lg"
            autoFocus
          />
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X size={20} />
          </button>
        </div>
        
        {/* Results */}
        <div className="max-h-96 overflow-y-auto">
          {filteredTasks.length === 0 ? (
            <div className="text-center py-8 text-gray-400">
              {searchTerm ? 'Görev bulunamadı' : 'Görev ara...'}
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {filteredTasks.map((task, index) => (
                <button
                  key={`${task.projectId}-${task.id}`}
                  onClick={() => {
                    onSelectTask(task);
                    onClose();
                  }}
                  className={`w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors ${
                    index === selectedIndex ? 'bg-gray-50' : ''
                  }`}
                  onMouseEnter={() => setSelectedIndex(index)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: task.projectColor || '#0ea5e9' }}
                        />
                        <span className="text-xs text-gray-500">{task.projectName}</span>
                      </div>
                      <h4 className="font-semibold text-gray-900 mb-1">{task.title}</h4>
                      {task.description && (
                        <p className="text-sm text-gray-600 line-clamp-1">{task.description}</p>
                      )}
                    </div>
                    <span className="px-2 py-1 text-xs rounded bg-gray-100 text-gray-700 ml-2">
                      {task.status === 'todo' ? 'Yapılacak' : task.status === 'in-progress' ? 'Devam' : 'Tamamlandı'}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
        
        {/* Keyboard shortcuts hint */}
        <div className="px-4 py-2 border-t border-gray-200 bg-gray-50 text-xs text-gray-500 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span>↑↓ Navigate</span>
            <span>↵ Select</span>
            <span>Esc Close</span>
          </div>
          <span>{filteredTasks.length} sonuç</span>
        </div>
      </div>
    </div>
  );
};

