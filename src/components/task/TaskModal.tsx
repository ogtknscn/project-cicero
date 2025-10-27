import { useState, useEffect } from 'react';
import { Task } from '../../types';
import { useStore, generateId } from '../../stores/useStore';
import { Modal } from '../common/Modal';
import { Input } from '../common/Input';
import { Textarea } from '../common/Textarea';
import { Button } from '../common/Button';
import { TaskDependencies } from './TaskDependencies';
import { TagSelector } from './TagSelector';
import { CustomFieldsEditor } from './CustomFieldsEditor';
import { TimeTracker } from '../time/TimeTracker';

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  taskId?: string;
  projectId: string;
}

export const TaskModal = ({ isOpen, onClose, taskId, projectId }: TaskModalProps) => {
  const { projects, addTask, updateTask } = useStore();
  const project = projects.find((p) => p.id === projectId);
  const task = project?.tasks.find((t) => t.id === taskId);
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<'todo' | 'in-progress' | 'done'>('todo');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [dueDate, setDueDate] = useState('');
  const [dependsOn, setDependsOn] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [customFieldValues, setCustomFieldValues] = useState<Record<string, string | number | boolean>>({});
  
  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description || '');
      setStatus(task.status);
      setPriority(task.priority);
      setDueDate(task.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : '');
      setDependsOn(task.dependsOn || []);
      setSelectedTags(task.tags || []);
      setCustomFieldValues(task.customFields || {});
    } else {
      setTitle('');
      setDescription('');
      setStatus('todo');
      setPriority('medium');
      setDueDate('');
      setDependsOn([]);
      setSelectedTags([]);
      setCustomFieldValues({});
    }
  }, [task, isOpen]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) return;
    
    if (task) {
      updateTask(task.id, {
        title: title.trim(),
        description: description.trim() || undefined,
        status,
        priority,
        dueDate: dueDate ? new Date(dueDate) : undefined,
        dependsOn: dependsOn.length > 0 ? dependsOn : undefined,
        tags: selectedTags,
        customFields: customFieldValues,
      });
    } else {
      const newTask: Task = {
        id: generateId(),
        projectId,
        title: title.trim(),
        description: description.trim() || undefined,
        status,
        priority,
        dueDate: dueDate ? new Date(dueDate) : undefined,
        dependsOn: dependsOn.length > 0 ? dependsOn : undefined,
        tags: selectedTags,
        customFields: customFieldValues,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      addTask(newTask);
    }
    
    onClose();
  };
  
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={task ? 'Görevi Düzenle' : 'Yeni Görev'}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Görev Başlığı"
          placeholder="Örn: Ana sayfa tasarımını tamamla"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        
        <Textarea
          label="Açıklama"
          placeholder="Görev detayları..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
        />
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Durum
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as any)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="todo">Yapılacak</option>
              <option value="in-progress">Devam Ediyor</option>
              <option value="done">Tamamlandı</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Öncelik
            </label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value as any)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="low">Düşük</option>
              <option value="medium">Orta</option>
              <option value="high">Yüksek</option>
            </select>
          </div>
        </div>
        
        <Input
          type="date"
          label="Bitiş Tarihi"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
        
        {/* Etiket seçimi */}
        {project && (
          <TagSelector
            tags={selectedTags}
            allTags={[
              { id: '1', name: 'Frontend', color: '#0ea5e9' },
              { id: '2', name: 'Backend', color: '#10b981' },
              { id: '3', name: 'Bug', color: '#ef4444' },
              { id: '4', name: 'Feature', color: '#8b5cf6' },
              { id: '5', name: 'Documentation', color: '#f59e0b' },
            ]}
            onUpdate={setSelectedTags}
          />
        )}
        
        {/* Custom Fields */}
        {project && project.customFields && project.customFields.length > 0 && (
          <CustomFieldsEditor
            customFields={project.customFields}
            values={customFieldValues}
            onUpdate={setCustomFieldValues}
          />
        )}
        
        {/* Bağımlılık yönetimi */}
        {project && (
          <TaskDependencies
            task={task || { id: '', title: '', projectId, status: 'todo', priority: 'medium', createdAt: new Date(), updatedAt: new Date(), tags: [] }}
            allTasks={project.tasks}
            onUpdateDependencies={setDependsOn}
          />
        )}
        
        {/* Time Tracking */}
        {task && (
          <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
              Zaman Takibi
            </h3>
            <TimeTracker taskId={task.id} />
          </div>
        )}
        
        <div className="flex justify-end gap-2 pt-4">
          <Button type="button" variant="secondary" onClick={onClose}>
            İptal
          </Button>
          <Button type="submit">
            {task ? 'Güncelle' : 'Oluştur'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

