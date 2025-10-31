import { useState } from 'react';
import { useAgileStore } from '../../stores/agileStore';
import { useStore } from '../../stores/useStore';
import { Button } from '../common/Button';
import { Plus, Target, Zap } from 'lucide-react';
import { SprintBoard } from './SprintBoard';
import { EpicManager } from './EpicManager';
import { VelocityChart } from './VelocityChart';

export const AgileView = () => {
  const { selectedProjectId, projects } = useStore();
  const { getSprintsByProject, getEpicsByProject } = useAgileStore();
  const [showVelocity, setShowVelocity] = useState(false);

  const project = projects.find((p) => p.id === selectedProjectId);
  const sprints = selectedProjectId ? getSprintsByProject(selectedProjectId) : [];
  const epics = selectedProjectId ? getEpicsByProject(selectedProjectId) : [];

  const activeSprint = sprints.find((s) => s.status === 'active');

  if (!selectedProjectId || !project) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-12 text-center">
        <Zap size={48} className="mx-auto text-gray-400 dark:text-gray-600 mb-4" />
        <p className="text-gray-600 dark:text-gray-400">Agile görünümü için bir proje seçin</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Agile Board</h2>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Sprint ve Epic yönetimi</p>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" size="sm" onClick={() => setShowVelocity(!showVelocity)}>
            {showVelocity ? 'Sprint Board' : 'Velocity'}
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center gap-3">
            <Zap size={24} className="text-primary-600 dark:text-primary-400" />
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Toplam Sprint</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{sprints.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center gap-3">
            <Target size={24} className="text-green-600 dark:text-green-400" />
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Aktif Sprint</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {activeSprint ? 1 : 0}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center gap-3">
            <Target size={24} className="text-blue-600 dark:text-blue-400" />
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Epic'ler</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{epics.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      {showVelocity ? (
        <VelocityChart projectId={selectedProjectId} />
      ) : (
        <>
          <EpicManager projectId={selectedProjectId} />
          <SprintBoard projectId={selectedProjectId} />
        </>
      )}
    </div>
  );
};
