import { useMemo } from 'react';
import { useWorkloadStore } from '../../stores/workloadStore';
import { useStore } from '../../stores/useStore';
import { getWeeksArray, calculateWorkloadSummary, getUtilizationColor } from '../../utils/workload';

export const CapacityHeatmap = () => {
  const { userCapacities, workloadEntries } = useWorkloadStore();
  const { projects } = useStore();

  const weeks = useMemo(() => getWeeksArray(8), []);

  const heatmapData = useMemo(() => {
    return userCapacities.map((capacity) => {
      const weekData = weeks.map((week) => {
        const summary = calculateWorkloadSummary(
          capacity.userId,
          week,
          workloadEntries,
          capacity,
          projects
        );
        return {
          week,
          utilization: summary.utilization,
          totalHours: summary.totalEstimatedHours,
          capacityHours: summary.capacityHours,
          overload: summary.overload,
        };
      });
      return {
        userId: capacity.userId,
        userName: capacity.userName,
        weekData,
      };
    });
  }, [userCapacities, workloadEntries, weeks, projects]);

  if (userCapacities.length === 0) {
    return null;
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
        İş Yükü Isı Haritası
      </h3>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-left p-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                Kullanıcı
              </th>
              {weeks.map((week) => (
                <th
                  key={week}
                  className="p-2 text-center text-xs font-medium text-gray-700 dark:text-gray-300"
                >
                  {week.split('-')[1]}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {heatmapData.map((user) => (
              <tr key={user.userId} className="border-t border-gray-200 dark:border-gray-700">
                <td className="p-2 text-sm font-medium text-gray-900 dark:text-white">
                  {user.userName}
                </td>
                {user.weekData.map((data) => (
                  <td
                    key={data.week}
                    className="p-1"
                    title={`${data.totalHours}/${data.capacityHours} saat (%${data.utilization.toFixed(0)})`}
                  >
                    <div
                      className={`h-12 rounded flex flex-col items-center justify-center ${getUtilizationColor(
                        data.utilization
                      )}`}
                    >
                      <span className="text-xs font-semibold text-gray-900 dark:text-white">
                        {data.utilization.toFixed(0)}%
                      </span>
                      <span className="text-xs text-gray-600 dark:text-gray-400">
                        {data.totalHours}h
                      </span>
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center gap-4 mt-4 text-xs text-gray-600 dark:text-gray-400">
        <span>Yük Durumu:</span>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-gray-200 dark:bg-gray-700"></div>
          <span>&lt;50%</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-green-200 dark:bg-green-800"></div>
          <span>50-80%</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-yellow-200 dark:bg-yellow-800"></div>
          <span>80-100%</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-orange-200 dark:bg-orange-800"></div>
          <span>100-120%</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-red-200 dark:bg-red-800"></div>
          <span>&gt;120%</span>
        </div>
      </div>
    </div>
  );
};
