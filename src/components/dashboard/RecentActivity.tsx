import { Clock } from 'lucide-react';

interface ActivityItem {
  id: string;
  type: 'task_created' | 'task_updated' | 'task_completed' | 'project_created';
  message: string;
  timestamp: Date;
}

export const RecentActivity = () => {
  // Placeholder activity data
  const activities: ActivityItem[] = [
    {
      id: '1',
      type: 'task_completed',
      message: 'Görev "Ana sayfa tasarımını tamamla" tamamlandı',
      timestamp: new Date(Date.now() - 1000 * 60 * 30),
    },
    {
      id: '2',
      type: 'task_created',
      message: 'Yeni görev oluşturuldu: "API entegrasyonu"',
      timestamp: new Date(Date.now() - 1000 * 60 * 60),
    },
    {
      id: '3',
      type: 'task_updated',
      message: 'Görev "Database yapılandırması" güncellendi',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
    },
  ];

  const formatTime = (date: Date) => {
    const diff = Date.now() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);

    if (minutes < 1) return 'Az önce';
    if (minutes < 60) return `${minutes} dakika önce`;
    if (hours < 24) return `${hours} saat önce`;
    return date.toLocaleDateString('tr-TR');
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        🔔 Son Aktiviteler
      </h3>
      <div className="space-y-3">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="flex items-start gap-3 pb-3 border-b border-gray-200 dark:border-gray-700 last:border-0 last:pb-0"
          >
            <div className="mt-1">
              <Clock size={16} className="text-gray-400 dark:text-gray-500" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-900 dark:text-white">{activity.message}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {formatTime(activity.timestamp)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
