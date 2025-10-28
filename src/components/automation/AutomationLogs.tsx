import { useAutomationStore } from '../../stores/automationStore';
import { Button } from '../common/Button';
import { CheckCircle, XCircle, Trash2, Clock } from 'lucide-react';
import { TRIGGER_LABELS, ACTION_LABELS } from '../../types/automation';

export const AutomationLogs = () => {
  const { logs, clearLogs } = useAutomationStore();

  if (logs.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-12 text-center">
        <Clock size={48} className="mx-auto text-gray-400 dark:text-gray-600 mb-4" />
        <p className="text-gray-600 dark:text-gray-400">Henüz otomasyon logu yok</p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Otomasyon Logları ({logs.length})
        </h3>
        <Button variant="secondary" size="sm" onClick={clearLogs}>
          <Trash2 size={14} className="mr-1" /> Temizle
        </Button>
      </div>

      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        {logs.map((log) => (
          <div key={log.id} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-900/50">
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-start gap-3">
                {log.success ? (
                  <CheckCircle size={20} className="text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                ) : (
                  <XCircle size={20} className="text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                )}
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {log.ruleName}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Görev: {log.taskTitle}
                  </p>
                </div>
              </div>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {new Date(log.executedAt).toLocaleString('tr-TR')}
              </span>
            </div>

            <div className="ml-8 space-y-1">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                <span className="font-medium">Tetikleyici:</span> {TRIGGER_LABELS[log.triggerType]}
              </p>
              {log.actionsExecuted.length > 0 && (
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  <span className="font-medium">Eylemler:</span>{' '}
                  {log.actionsExecuted.map((a) => ACTION_LABELS[a]).join(', ')}
                </p>
              )}
              {log.error && (
                <p className="text-sm text-red-600 dark:text-red-400">
                  <span className="font-medium">Hata:</span> {log.error}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

