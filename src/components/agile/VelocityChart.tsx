import { useAgileStore } from '../../stores/agileStore';
import { useStore } from '../../stores/useStore';
import { calculateVelocity } from '../../utils/agile';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

interface VelocityChartProps {
  projectId: string;
}

export const VelocityChart = ({ projectId }: VelocityChartProps) => {
  const { getSprintsByProject, getStoryPoints } = useAgileStore();
  const { projects } = useStore();

  const sprints = getSprintsByProject(projectId);
  const project = projects.find((p) => p.id === projectId);
  const velocityData = project ? calculateVelocity(sprints, project.tasks, getStoryPoints) : [];

  if (velocityData.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-12 text-center">
        <p className="text-gray-600 dark:text-gray-400">Henüz tamamlanmış sprint yok</p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Sprint Velocity</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={velocityData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="sprintName" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="plannedPoints" fill="#3b82f6" name="Planlanan" />
          <Bar dataKey="completedPoints" fill="#10b981" name="Tamamlanan" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
