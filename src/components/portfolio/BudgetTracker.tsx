import { useState } from 'react';
import { Project } from '../../types';
import { usePortfolioStore } from '../../stores/portfolioStore';
import { Button } from '../common/Button';
import { Input } from '../common/Input';
import { DollarSign, Edit2, Save, X } from 'lucide-react';

interface BudgetTrackerProps {
  portfolioProjects: Project[];
}

export const BudgetTracker = ({ portfolioProjects }: BudgetTrackerProps) => {
  const { budgets, setBudget, updateSpent, getBudget } = usePortfolioStore();
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  const [allocated, setAllocated] = useState('');
  const [spent, setSpent] = useState('');
  const [currency, setCurrency] = useState('TRY');

  const handleEdit = (projectId: string) => {
    const budget = getBudget(projectId);
    if (budget) {
      setAllocated(budget.allocated.toString());
      setSpent(budget.spent.toString());
      setCurrency(budget.currency);
    } else {
      setAllocated('');
      setSpent('');
      setCurrency('TRY');
    }
    setEditingProjectId(projectId);
  };

  const handleSave = (projectId: string) => {
    const allocatedNum = parseFloat(allocated) || 0;
    const spentNum = parseFloat(spent) || 0;

    setBudget(projectId, allocatedNum, currency);
    updateSpent(projectId, spentNum);
    setEditingProjectId(null);
  };

  const handleCancel = () => {
    setEditingProjectId(null);
  };

  const totalAllocated = portfolioProjects.reduce((sum, p) => {
    const budget = getBudget(p.id);
    return sum + (budget?.allocated || 0);
  }, 0);

  const totalSpent = portfolioProjects.reduce((sum, p) => {
    const budget = getBudget(p.id);
    return sum + (budget?.spent || 0);
  }, 0);

  const totalUtilization = totalAllocated > 0 ? (totalSpent / totalAllocated) * 100 : 0;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Bütçe Takibi</h3>
        <DollarSign size={24} className="text-green-600 dark:text-green-400" />
      </div>

      {/* Total Summary */}
      <div className="grid grid-cols-3 gap-4 mb-6 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
        <div>
          <p className="text-sm text-gray-600 dark:text-gray-400">Toplam Bütçe</p>
          <p className="text-xl font-bold text-gray-900 dark:text-white">
            {totalAllocated.toLocaleString('tr-TR')} ₺
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-600 dark:text-gray-400">Harcanan</p>
          <p className="text-xl font-bold text-gray-900 dark:text-white">
            {totalSpent.toLocaleString('tr-TR')} ₺
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-600 dark:text-gray-400">Kullanım</p>
          <p
            className={`text-xl font-bold ${
              totalUtilization > 100
                ? 'text-red-600 dark:text-red-400'
                : totalUtilization > 80
                  ? 'text-yellow-600 dark:text-yellow-400'
                  : 'text-green-600 dark:text-green-400'
            }`}
          >
            {totalUtilization.toFixed(0)}%
          </p>
        </div>
      </div>

      {/* Project Budgets */}
      <div className="space-y-3">
        {portfolioProjects.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400 text-center py-4">
            Bu portfolio'da proje yok
          </p>
        ) : (
          portfolioProjects.map((project) => {
            const budget = getBudget(project.id);
            const isEditing = editingProjectId === project.id;
            const utilization =
              budget && budget.allocated > 0 ? (budget.spent / budget.allocated) * 100 : 0;

            return (
              <div
                key={project.id}
                className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
              >
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-semibold text-gray-900 dark:text-white">{project.name}</h4>
                  {!isEditing && (
                    <Button variant="ghost" size="sm" onClick={() => handleEdit(project.id)}>
                      <Edit2 size={14} />
                    </Button>
                  )}
                </div>

                {isEditing ? (
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <Input
                        type="number"
                        label="Bütçe"
                        placeholder="0"
                        value={allocated}
                        onChange={(e) => setAllocated(e.target.value)}
                        min="0"
                        step="0.01"
                      />
                      <Input
                        type="number"
                        label="Harcanan"
                        placeholder="0"
                        value={spent}
                        onChange={(e) => setSpent(e.target.value)}
                        min="0"
                        step="0.01"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Para Birimi
                      </label>
                      <select
                        value={currency}
                        onChange={(e) => setCurrency(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                      >
                        <option value="TRY">TRY (₺)</option>
                        <option value="USD">USD ($)</option>
                        <option value="EUR">EUR (€)</option>
                      </select>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" onClick={() => handleSave(project.id)}>
                        <Save size={14} className="mr-1" /> Kaydet
                      </Button>
                      <Button variant="secondary" size="sm" onClick={handleCancel}>
                        <X size={14} className="mr-1" /> İptal
                      </Button>
                    </div>
                  </div>
                ) : budget ? (
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600 dark:text-gray-400">
                        {budget.spent.toLocaleString('tr-TR')} /{' '}
                        {budget.allocated.toLocaleString('tr-TR')} {budget.currency}
                      </span>
                      <span
                        className={`font-semibold ${
                          utilization > 100
                            ? 'text-red-600 dark:text-red-400'
                            : utilization > 80
                              ? 'text-yellow-600 dark:text-yellow-400'
                              : 'text-green-600 dark:text-green-400'
                        }`}
                      >
                        {utilization.toFixed(0)}%
                      </span>
                    </div>
                    <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all ${
                          utilization > 100
                            ? 'bg-red-500'
                            : utilization > 80
                              ? 'bg-yellow-500'
                              : 'bg-green-500'
                        }`}
                        style={{ width: `${Math.min(utilization, 100)}%` }}
                      />
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-gray-500 dark:text-gray-400">Bütçe belirlenmedi</p>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
