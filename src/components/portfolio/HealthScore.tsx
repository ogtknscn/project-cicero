import { ProjectHealth } from '../../types/portfolio';
import { getHealthColor, getHealthBgColor } from '../../utils/portfolio';
import { TrendingUp, TrendingDown, AlertCircle } from 'lucide-react';

interface HealthScoreProps {
  projects: ProjectHealth[];
}

export const HealthScore = ({ projects }: HealthScoreProps) => {
  if (projects.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Proje Sağlık Skorları
        </h3>
        <p className="text-gray-500 dark:text-gray-400 text-center py-8">
          Bu portfolio'da proje yok
        </p>
      </div>
    );
  }

  const getRiskIcon = (riskLevel: string) => {
    switch (riskLevel) {
      case 'high':
        return <AlertCircle size={16} className="text-red-600 dark:text-red-400" />;
      case 'medium':
        return <TrendingDown size={16} className="text-yellow-600 dark:text-yellow-400" />;
      default:
        return <TrendingUp size={16} className="text-green-600 dark:text-green-400" />;
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
        Proje Sağlık Skorları
      </h3>

      <div className="space-y-3">
        {projects.map((project) => (
          <div
            key={project.projectId}
            className={`p-4 rounded-lg border ${
              project.riskLevel === 'high'
                ? 'border-red-200 dark:border-red-800'
                : project.riskLevel === 'medium'
                  ? 'border-yellow-200 dark:border-yellow-800'
                  : 'border-green-200 dark:border-green-800'
            }`}
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                {getRiskIcon(project.riskLevel)}
                <h4 className="font-semibold text-gray-900 dark:text-white">
                  {project.projectName}
                </h4>
              </div>
              <div className={`text-2xl font-bold ${getHealthColor(project.healthScore)}`}>
                {project.healthScore}
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
              <div>
                <p className="text-gray-600 dark:text-gray-400">Tamamlanma</p>
                <p className="font-semibold text-gray-900 dark:text-white">
                  {project.completionRate}%
                </p>
              </div>
              <div>
                <p className="text-gray-600 dark:text-gray-400">Zamanında</p>
                <p
                  className={`font-semibold ${project.onTime ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}
                >
                  {project.onTime ? 'Evet' : 'Hayır'}
                </p>
              </div>
              <div>
                <p className="text-gray-600 dark:text-gray-400">Sorunlar</p>
                <p className="font-semibold text-gray-900 dark:text-white">{project.issueCount}</p>
              </div>
              <div>
                <p className="text-gray-600 dark:text-gray-400">Risk</p>
                <p
                  className={`font-semibold capitalize ${
                    project.riskLevel === 'high'
                      ? 'text-red-600 dark:text-red-400'
                      : project.riskLevel === 'medium'
                        ? 'text-yellow-600 dark:text-yellow-400'
                        : 'text-green-600 dark:text-green-400'
                  }`}
                >
                  {project.riskLevel === 'high'
                    ? 'Yüksek'
                    : project.riskLevel === 'medium'
                      ? 'Orta'
                      : 'Düşük'}
                </p>
              </div>
            </div>

            {/* Health Bar */}
            <div className="mt-3">
              <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all ${
                    project.healthScore >= 75
                      ? 'bg-green-500'
                      : project.healthScore >= 50
                        ? 'bg-yellow-500'
                        : 'bg-red-500'
                  }`}
                  style={{ width: `${project.healthScore}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
