import { useAutomationStore } from '../../stores/automationStore';
import { Button } from '../common/Button';
import { Edit2, Play, Pause, Activity } from 'lucide-react';
import { TRIGGER_LABELS, ACTION_LABELS } from '../../types/automation';

interface AutomationRuleListProps {
  onEdit: (ruleId: string) => void;
}

export const AutomationRuleList = ({ onEdit }: AutomationRuleListProps) => {
  const { rules, toggleRule } = useAutomationStore();

  return (
    <div className="space-y-3">
      {rules.map((rule) => (
        <div
          key={rule.id}
          className={`bg-white dark:bg-gray-800 rounded-lg border ${
            rule.enabled
              ? 'border-green-200 dark:border-green-800'
              : 'border-gray-200 dark:border-gray-700'
          } p-6`}
        >
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {rule.name}
                </h3>
                {rule.enabled ? (
                  <span className="px-2 py-0.5 text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded">
                    Aktif
                  </span>
                ) : (
                  <span className="px-2 py-0.5 text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded">
                    Pasif
                  </span>
                )}
              </div>
              {rule.description && (
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  {rule.description}
                </p>
              )}
            </div>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => toggleRule(rule.id)}
                title={rule.enabled ? 'Devre dışı bırak' : 'Etkinleştir'}
              >
                {rule.enabled ? <Pause size={16} /> : <Play size={16} />}
              </Button>
              <Button variant="ghost" size="sm" onClick={() => onEdit(rule.id)} title="Düzenle">
                <Edit2 size={16} />
              </Button>
            </div>
          </div>

          {/* Rule Details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <p className="text-gray-600 dark:text-gray-400 mb-1">Tetikleyici</p>
              <p className="font-medium text-gray-900 dark:text-white">
                {TRIGGER_LABELS[rule.trigger.type]}
                {rule.trigger.value && ` (${rule.trigger.value})`}
              </p>
            </div>
            <div>
              <p className="text-gray-600 dark:text-gray-400 mb-1">Koşullar</p>
              <p className="font-medium text-gray-900 dark:text-white">
                {rule.conditions.length === 0
                  ? 'Yok (her zaman)'
                  : `${rule.conditions.length} koşul`}
              </p>
            </div>
            <div>
              <p className="text-gray-600 dark:text-gray-400 mb-1">Eylemler</p>
              <p className="font-medium text-gray-900 dark:text-white">
                {rule.actions.map((a) => ACTION_LABELS[a.type]).join(', ')}
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-4 mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 text-xs text-gray-600 dark:text-gray-400">
            <div className="flex items-center gap-1">
              <Activity size={12} />
              <span>{rule.executionCount} kez çalıştı</span>
            </div>
            {rule.lastExecuted && (
              <div>
                Son: {new Date(rule.lastExecuted).toLocaleString('tr-TR')}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

