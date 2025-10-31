import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { Project } from '../../types';

interface CompletionChartProps {
  projects: Project[];
}

export const CompletionChart = ({ projects }: CompletionChartProps) => {
  const data = projects.slice(0, 6).map((project) => ({
    name: project.name.substring(0, 10),
    completed: project.metadata.completedTasks,
    total: project.metadata.totalTasks,
    percentage:
      project.metadata.totalTasks > 0
        ? Math.round((project.metadata.completedTasks / project.metadata.totalTasks) * 100)
        : 0,
  }));

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        📈 Proje İlerlemesi
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e0e7ff" />
          <XAxis dataKey="name" stroke="#6b7280" />
          <YAxis stroke="#6b7280" />
          <Tooltip
            contentStyle={{
              backgroundColor: '#fff',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
            }}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="percentage"
            stroke="#3b82f6"
            strokeWidth={2}
            name="Tamamlanma %"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
