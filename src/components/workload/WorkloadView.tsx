import { useState } from 'react';
import { useWorkloadStore } from '../../stores/workloadStore';
import { useStore } from '../../stores/useStore';
import { Button } from '../common/Button';
import { Plus, AlertTriangle } from 'lucide-react';
import { CapacityHeatmap } from './CapacityHeatmap';
import { CapacityEditor } from './CapacityEditor';
import { WorkloadAlerts } from './WorkloadAlerts';
import { getCurrentWeek } from '../../utils/workload';

export const WorkloadView = () => {
  const { userCapacities } = useWorkloadStore();
  const { projects, selectedProjectId } = useStore();
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingUserId, setEditingUserId] = useState<string | undefined>();

  const selectedProject = projects.find((p) => p.id === selectedProjectId);

  const handleNewCapacity = () => {
    setEditingUserId(undefined);
    setIsEditorOpen(true);
  };

  const handleEditCapacity = (userId: string) => {
    setEditingUserId(userId);
    setIsEditorOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            İş Yükü Yönetimi
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Takım kapasite ve iş yükü analizi
          </p>
        </div>
        <Button onClick={handleNewCapacity}>
          <Plus size={16} className="mr-2" />
          Kullanıcı Ekle
        </Button>
      </div>

      {/* Alerts */}
      <WorkloadAlerts />

      {/* Capacity List and Heatmap */}
      {userCapacities.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-12 text-center">
          <AlertTriangle size={48} className="mx-auto text-gray-400 dark:text-gray-600 mb-4" />
          <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Henüz kullanıcı kapasitesi yok
          </h3>
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            Başlamak için kullanıcı ekleyin ve haftalık kapasite belirleyin
          </p>
          <Button onClick={handleNewCapacity}>
            <Plus size={16} className="mr-2" />
            İlk Kullanıcıyı Ekle
          </Button>
        </div>
      ) : (
        <div className="space-y-6">
          {/* User Capacities Summary */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {userCapacities.map((capacity) => (
              <div
                key={capacity.userId}
                className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => handleEditCapacity(capacity.userId)}
              >
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  {capacity.userName}
                </h3>
                <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                  <p>Haftalık: {capacity.weeklyHours} saat</p>
                  <p>Günlük: {capacity.dailyHours} saat</p>
                  {capacity.vacation && capacity.vacation.length > 0 && (
                    <p className="text-yellow-600 dark:text-yellow-400">
                      {capacity.vacation.length} tatil planı
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Heatmap */}
          <CapacityHeatmap />
        </div>
      )}

      {/* Capacity Editor Modal */}
      {isEditorOpen && (
        <CapacityEditor
          isOpen={isEditorOpen}
          onClose={() => {
            setIsEditorOpen(false);
            setEditingUserId(undefined);
          }}
          userId={editingUserId}
        />
      )}
    </div>
  );
};

