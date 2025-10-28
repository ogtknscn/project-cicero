import { useState } from 'react';
import { useAutomationStore } from '../../stores/automationStore';
import { Button } from '../common/Button';
import { Plus, Zap, AlertCircle, Play, Pause } from 'lucide-react';
import { AutomationRuleEditor } from './AutomationRuleEditor';
import { AutomationRuleList } from './AutomationRuleList';
import { AutomationLogs } from './AutomationLogs';

export const AutomationView = () => {
  const { rules } = useAutomationStore();
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingRuleId, setEditingRuleId] = useState<string | undefined>();
  const [showLogs, setShowLogs] = useState(false);

  const handleNewRule = () => {
    setEditingRuleId(undefined);
    setIsEditorOpen(true);
  };

  const handleEditRule = (ruleId: string) => {
    setEditingRuleId(ruleId);
    setIsEditorOpen(true);
  };

  const activeRules = rules.filter((r) => r.enabled).length;
  const totalExecutions = rules.reduce((sum, r) => sum + r.executionCount, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            Otomasyon Motorları
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            İş akışlarınızı otomatikleştirin
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" size="sm" onClick={() => setShowLogs(!showLogs)}>
            {showLogs ? 'Kurallar' : 'Loglar'}
          </Button>
          <Button onClick={handleNewRule}>
            <Plus size={16} className="mr-2" />
            Yeni Kural
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center gap-3">
            <Zap size={24} className="text-primary-600 dark:text-primary-400" />
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Toplam Kural</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{rules.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center gap-3">
            <Play size={24} className="text-green-600 dark:text-green-400" />
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Aktif Kural</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{activeRules}</p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center gap-3">
            <AlertCircle size={24} className="text-blue-600 dark:text-blue-400" />
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Toplam Çalıştırma</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{totalExecutions}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      {showLogs ? (
        <AutomationLogs />
      ) : rules.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-12 text-center">
          <Zap size={48} className="mx-auto text-gray-400 dark:text-gray-600 mb-4" />
          <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Henüz otomasyon kuralı yok
          </h3>
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            İş akışlarınızı otomatikleştirmek için bir kural oluşturun
          </p>
          <Button onClick={handleNewRule}>
            <Plus size={16} className="mr-2" />
            İlk Kuralı Oluştur
          </Button>
        </div>
      ) : (
        <AutomationRuleList onEdit={handleEditRule} />
      )}

      {/* Rule Editor Modal */}
      {isEditorOpen && (
        <AutomationRuleEditor
          isOpen={isEditorOpen}
          onClose={() => {
            setIsEditorOpen(false);
            setEditingRuleId(undefined);
          }}
          ruleId={editingRuleId}
        />
      )}
    </div>
  );
};

