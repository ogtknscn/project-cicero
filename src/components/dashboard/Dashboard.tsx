import { useStore } from '../../stores/useStore';
import { useTimeStore } from '../../stores/timeStore';
import { MetricCard } from './MetricCard';
import { CompletionChart } from './CompletionChart';
import { TaskDistributionChart } from './TaskDistributionChart';
import { RecentActivity } from './RecentActivity';

export const Dashboard = () => {
  const { projects, selectedProjectId } = useStore();
  const { getProjectTimeSummary } = useTimeStore();

  const selectedProject = projects.find((p) => p.id === selectedProjectId);

  if (!selectedProject) {
    return null;
  }

  const { tasks } = selectedProject;
  const todoCount = tasks.filter((t) => t.status === 'todo').length;
  const inProgressCount = tasks.filter((t) => t.status === 'in-progress').length;
  const doneCount = tasks.filter((t) => t.status === 'done').length;
  const totalTasks = tasks.length;
  const completedPercentage = totalTasks > 0 ? Math.round((doneCount / totalTasks) * 100) : 0;

  // Calculate overdue tasks
  const overdueTasks = tasks.filter((t) => {
    if (!t.dueDate) return false;
    return new Date(t.dueDate) < new Date() && t.status !== 'done';
  });

  // Time tracking summary
  const timeSummary = getProjectTimeSummary(
    selectedProject.id,
    tasks.map((t) => t.id)
  );

  return (
    <div className="space-y-6">
      {/* Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard title="Toplam Görevler" value={totalTasks} icon="📋" color="blue" />
        <MetricCard
          title="Tamamlanan"
          value={doneCount}
          subtitle={`${completedPercentage}%`}
          icon="✅"
          color="green"
        />
        <MetricCard title="Devam Eden" value={inProgressCount} icon="🔄" color="yellow" />
        <MetricCard title="Gecikmeli" value={overdueTasks.length} icon="⚠️" color="red" />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CompletionChart projects={projects} />
        <TaskDistributionChart todo={todoCount} inProgress={inProgressCount} done={doneCount} />
      </div>

      {/* Time Tracking Summary */}
      {timeSummary.totalHours > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            ⏱️ Zaman Takibi Özeti
          </h3>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Toplam Süre</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {timeSummary.totalHours.toFixed(1)}h
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Kayıt Sayısı</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {timeSummary.entriesCount}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Faturalanmayan</p>
              <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                {(timeSummary.unbilledMinutes / 60).toFixed(1)}h
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Priority Breakdown */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          📊 Öncelik Dağılımı
        </h3>
        <div className="grid grid-cols-3 gap-4">
          {[
            {
              priority: 'high',
              count: tasks.filter((t) => t.priority === 'high').length,
              color: 'red',
            },
            {
              priority: 'medium',
              count: tasks.filter((t) => t.priority === 'medium').length,
              color: 'yellow',
            },
            {
              priority: 'low',
              count: tasks.filter((t) => t.priority === 'low').length,
              color: 'blue',
            },
          ].map(({ priority, count, color }) => (
            <div key={priority} className="text-center">
              <p className="text-sm text-gray-500 dark:text-gray-400 capitalize">
                {priority} Öncelik
              </p>
              <p className={`text-2xl font-bold text-${color}-600 dark:text-${color}-400`}>
                {count}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <RecentActivity />
    </div>
  );
};
