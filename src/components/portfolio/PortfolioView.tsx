import { useState } from 'react';
import { usePortfolioStore } from '../../stores/portfolioStore';
import { useStore } from '../../stores/useStore';
import { Button } from '../common/Button';
import { Plus, TrendingUp, AlertTriangle } from 'lucide-react';
import { PortfolioEditor } from './PortfolioEditor';
import { HealthScore } from './HealthScore';
import { BudgetTracker } from './BudgetTracker';
import { calculatePortfolioMetrics, calculateProjectHealth } from '../../utils/portfolio';

export const PortfolioView = () => {
  const { portfolios, activePortfolioId, setActivePortfolio } = usePortfolioStore();
  const { projects } = useStore();
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingPortfolioId, setEditingPortfolioId] = useState<string | undefined>();

  const activePortfolio = portfolios.find((p) => p.id === activePortfolioId);

  const handleNewPortfolio = () => {
    setEditingPortfolioId(undefined);
    setIsEditorOpen(true);
  };

  const handleEditPortfolio = (portfolioId: string) => {
    setEditingPortfolioId(portfolioId);
    setIsEditorOpen(true);
  };

  // Calculate metrics for active portfolio
  const portfolioMetrics = activePortfolio
    ? calculatePortfolioMetrics(activePortfolio, projects)
    : null;

  const portfolioProjects = activePortfolio
    ? projects.filter((p) => activePortfolio.projectIds.includes(p.id))
    : [];

  const projectHealthData = portfolioProjects.map((project) => calculateProjectHealth(project));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Portfolio Yönetimi</h2>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Tüm projeleri tek yerden yönetin</p>
        </div>
        <Button onClick={handleNewPortfolio}>
          <Plus size={16} className="mr-2" />
          Yeni Portfolio
        </Button>
      </div>

      {/* Portfolio Selector */}
      {portfolios.length > 0 && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          {portfolios.map((portfolio) => (
            <button
              key={portfolio.id}
              onClick={() => setActivePortfolio(portfolio.id)}
              className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                activePortfolioId === portfolio.id
                  ? 'bg-primary-600 text-white'
                  : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              {portfolio.name}
            </button>
          ))}
        </div>
      )}

      {/* Empty State */}
      {portfolios.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-12 text-center">
          <TrendingUp size={48} className="mx-auto text-gray-400 dark:text-gray-600 mb-4" />
          <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Henüz portfolio yok
          </h3>
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            Projelerinizi gruplamak için bir portfolio oluşturun
          </p>
          <Button onClick={handleNewPortfolio}>
            <Plus size={16} className="mr-2" />
            İlk Portfolio'yu Oluştur
          </Button>
        </div>
      ) : !activePortfolio ? (
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-12 text-center">
          <AlertTriangle size={48} className="mx-auto text-gray-400 dark:text-gray-600 mb-4" />
          <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Portfolio seçin
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            Yukarıdan bir portfolio seçerek detayları görüntüleyin
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Portfolio Header */}
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {activePortfolio.name}
                </h3>
                {activePortfolio.description && (
                  <p className="text-gray-600 dark:text-gray-400 mt-1">
                    {activePortfolio.description}
                  </p>
                )}
              </div>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => handleEditPortfolio(activePortfolio.id)}
              >
                Düzenle
              </Button>
            </div>

            {/* Key Metrics */}
            {portfolioMetrics && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Toplam Proje</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {activePortfolio.metadata.totalProjects}
                  </p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Tamamlanma</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {portfolioMetrics.avgCompletionRate}%
                  </p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Gecikmiş</p>
                  <p className="text-2xl font-bold text-red-600 dark:text-red-400">
                    {portfolioMetrics.overdueTasks}
                  </p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Risk Skoru</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {portfolioMetrics.riskScore}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Health Score Grid */}
          <HealthScore projects={projectHealthData} />

          {/* Budget Tracker */}
          <BudgetTracker portfolioProjects={portfolioProjects} />
        </div>
      )}

      {/* Portfolio Editor Modal */}
      {isEditorOpen && (
        <PortfolioEditor
          isOpen={isEditorOpen}
          onClose={() => {
            setIsEditorOpen(false);
            setEditingPortfolioId(undefined);
          }}
          portfolioId={editingPortfolioId}
        />
      )}
    </div>
  );
};
