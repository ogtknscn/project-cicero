import { useState, useEffect } from 'react';
import { Project } from '../../types';
import { useStore, generateId } from '../../stores/useStore';
import { Modal } from '../common/Modal';
import { Input } from '../common/Input';
import { Textarea } from '../common/Textarea';
import { Button } from '../common/Button';

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectId?: string;
}

export const ProjectModal = ({ isOpen, onClose, projectId }: ProjectModalProps) => {
  const { projects, addProject, updateProject } = useStore();
  const project = projectId ? projects.find((p) => p.id === projectId) : null;
  
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [color, setColor] = useState('#0ea5e9');
  
  useEffect(() => {
    if (project) {
      setName(project.name);
      setDescription(project.description || '');
      setColor(project.color || '#0ea5e9');
    } else {
      setName('');
      setDescription('');
      setColor('#0ea5e9');
    }
  }, [project, isOpen]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) return;
    
    if (project) {
      updateProject(project.id, {
        name: name.trim(),
        description: description.trim() || undefined,
        color,
      });
    } else {
      const newProject: Project = {
        id: generateId(),
        name: name.trim(),
        description: description.trim() || undefined,
        color,
        createdAt: new Date(),
        updatedAt: new Date(),
        status: 'active',
        tasks: [],
        metadata: {
          totalTasks: 0,
          completedTasks: 0,
        },
      };
      addProject(newProject);
    }
    
    onClose();
  };
  
  const colors = [
    '#0ea5e9', '#8b5cf6', '#ef4444', '#10b981', '#f59e0b', '#ec4899'
  ];
  
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={project ? 'Projeyi Düzenle' : 'Yeni Proje'}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Proje Adı"
          placeholder="Örn: Web Sitesi Redesign"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        
        <Textarea
          label="Açıklama"
          placeholder="Proje hakkında notlar..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
        />
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Renk
          </label>
          <div className="flex gap-2">
            {colors.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setColor(c)}
                className={`w-10 h-10 rounded-lg ${
                  color === c ? 'ring-2 ring-offset-2 ring-primary-500' : ''
                }`}
                style={{ backgroundColor: c }}
              />
            ))}
          </div>
        </div>
        
        <div className="flex justify-end gap-2 pt-4">
          <Button type="button" variant="secondary" onClick={onClose}>
            İptal
          </Button>
          <Button type="submit">
            {project ? 'Güncelle' : 'Oluştur'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

