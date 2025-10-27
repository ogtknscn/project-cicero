import { useWorkloadStore } from '../../stores/workloadStore';
import { Button } from '../common/Button';
import { AlertTriangle, X } from 'lucide-react';

export const WorkloadAlerts = () => {
  const { alerts, dismissAlert } = useWorkloadStore();

  if (alerts.length === 0) {
    return null;
  }

  const severityColors = {
    low: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-200',
    medium: 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800 text-yellow-800 dark:text-yellow-200',
    high: 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-800 dark:text-red-200',
  };

  return (
    <div className="space-y-2">
      {alerts.map((alert) => (
        <div
          key={alert.id}
          className={`flex items-start gap-3 p-4 rounded-lg border ${severityColors[alert.severity]}`}
        >
          <AlertTriangle size={20} className="flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-sm font-medium">{alert.message}</p>
            <p className="text-xs mt-1 opacity-75">
              {alert.week} • {new Date(alert.createdAt).toLocaleDateString('tr-TR')}
            </p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => dismissAlert(alert.id)}
            className="flex-shrink-0"
          >
            <X size={16} />
          </Button>
        </div>
      ))}
    </div>
  );
};

