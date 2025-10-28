import { useState } from 'react';
import { useAgileStore } from '../../stores/agileStore';
import { Button } from '../common/Button';
import { Plus, Target } from 'lucide-react';

interface EpicManagerProps {
  projectId: string;
}

export const EpicManager = ({ projectId }: EpicManagerProps) => {
  const { getEpicsByProject, addEpic } = useAgileStore();
  const epics = getEpicsByProject(projectId);
  const [newEpicName, setNewEpicName] = useState('');

  const handleCreateEpic = () => {
    if (!newEpicName.trim()) return;
    addEpic({
      name: newEpicName.trim(),
      projectId,
      status: 'todo',
      priority: 'medium',
    });
    setNewEpicName('');
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Epic Yönetimi</h3>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={newEpicName}
          onChange={(e) => setNewEpicName(e.target.value)}
          placeholder="Epic adı..."
          className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
        />
        <Button onClick={handleCreateEpic}>
          <Plus size={16} className="mr-2" /> Epic Oluştur
        </Button>
      </div>

      {epics.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400 py-4">Henüz epic oluşturulmadı</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {epics.map((epic) => (
            <div
              key={epic.id}
              className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
            >
              <div className="flex items-start gap-2">
                <Target size={18} className="text-primary-600 dark:text-primary-400 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900 dark:text-white">{epic.name}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {epic.taskIds.length} story
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

