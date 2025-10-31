import { useState } from 'react';
import { useAgileStore } from '../../stores/agileStore';
import { Button } from '../common/Button';
import { Plus } from 'lucide-react';
import { getSprintStatusLabel, getSprintStatusColor } from '../../utils/agile';

interface SprintBoardProps {
  projectId: string;
}

export const SprintBoard = ({ projectId }: SprintBoardProps) => {
  const { getSprintsByProject, addSprint } = useAgileStore();
  const sprints = getSprintsByProject(projectId);

  const [newSprintName, setNewSprintName] = useState('');

  const handleCreateSprint = () => {
    if (!newSprintName.trim()) return;

    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + 14); // 2 week sprint

    addSprint({
      name: newSprintName.trim(),
      projectId,
      status: 'planning',
      startDate,
      endDate,
    });
    setNewSprintName('');
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Sprint Yönetimi</h3>

      {/* Create Sprint */}
      <div className="flex gap-2 mb-6">
        <input
          type="text"
          value={newSprintName}
          onChange={(e) => setNewSprintName(e.target.value)}
          placeholder="Sprint adı..."
          className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
        />
        <Button onClick={handleCreateSprint}>
          <Plus size={16} className="mr-2" /> Sprint Oluştur
        </Button>
      </div>

      {/* Sprint List */}
      {sprints.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400 py-8">
          Henüz sprint oluşturulmadı
        </p>
      ) : (
        <div className="space-y-3">
          {sprints.map((sprint) => (
            <div
              key={sprint.id}
              className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold text-gray-900 dark:text-white">{sprint.name}</h4>
                    <span
                      className={`px-2 py-0.5 text-xs rounded ${getSprintStatusColor(sprint.status)}`}
                    >
                      {getSprintStatusLabel(sprint.status)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {new Date(sprint.startDate).toLocaleDateString('tr-TR')} -{' '}
                    {new Date(sprint.endDate).toLocaleDateString('tr-TR')}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {sprint.taskIds.length} görev
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
