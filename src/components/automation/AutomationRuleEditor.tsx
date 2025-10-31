import { useState, useEffect } from 'react';
import { useAutomationStore } from '../../stores/automationStore';
import { useStore } from '../../stores/useStore';
import { Modal } from '../common/Modal';
import { Input } from '../common/Input';
import { Button } from '../common/Button';
import { Plus, X } from 'lucide-react';
import { TRIGGER_LABELS, ACTION_LABELS, TriggerType } from '../../types/automation';

interface AutomationRuleEditorProps {
  isOpen: boolean;
  onClose: () => void;
  ruleId?: string;
}

export const AutomationRuleEditor = ({ isOpen, onClose, ruleId }: AutomationRuleEditorProps) => {
  const { rules, addRule, updateRule, deleteRule } = useAutomationStore();
  const { projects } = useStore();
  const existingRule = rules.find((r) => r.id === ruleId);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [projectId, setProjectId] = useState('');
  const [enabled, setEnabled] = useState(true);
  const [triggerType, setTriggerType] = useState<TriggerType>('task_status_changed');
  const [triggerValue, setTriggerValue] = useState('');
  const [conditions, setConditions] = useState<any[]>([]);
  const [actions, setActions] = useState<any[]>([{ type: 'change_status', value: '' }]);

  useEffect(() => {
    if (existingRule) {
      setName(existingRule.name);
      setDescription(existingRule.description || '');
      setProjectId(existingRule.projectId || '');
      setEnabled(existingRule.enabled);
      setTriggerType(existingRule.trigger.type);
      setTriggerValue(existingRule.trigger.value || '');
      setConditions(existingRule.conditions);
      setActions(existingRule.actions);
    } else {
      setName('');
      setDescription('');
      setProjectId('');
      setEnabled(true);
      setTriggerType('task_status_changed');
      setTriggerValue('');
      setConditions([]);
      setActions([{ type: 'change_status', value: '' }]);
    }
  }, [existingRule, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const ruleData = {
      name: name.trim(),
      description: description.trim() || undefined,
      projectId: projectId || undefined,
      enabled,
      trigger: {
        type: triggerType,
        value: triggerValue || undefined,
      },
      conditions: conditions.filter((c) => c.field && c.value),
      actions: actions.filter((a) => a.type && (a.value !== '' || a.type === 'send_notification')),
    };

    if (ruleId) {
      updateRule(ruleId, ruleData);
    } else {
      addRule(ruleData);
    }

    onClose();
  };

  const handleDelete = () => {
    if (ruleId && confirm('Bu otomasyon kuralını silmek istediğinize emin misiniz?')) {
      deleteRule(ruleId);
      onClose();
    }
  };

  const addCondition = () => {
    setConditions([...conditions, { field: 'status', operator: 'equals', value: '' }]);
  };

  const removeCondition = (index: number) => {
    setConditions(conditions.filter((_, i) => i !== index));
  };

  const updateCondition = (index: number, updates: any) => {
    setConditions(conditions.map((c, i) => (i === index ? { ...c, ...updates } : c)));
  };

  const addAction = () => {
    setActions([...actions, { type: 'change_status', value: '' }]);
  };

  const removeAction = (index: number) => {
    setActions(actions.filter((_, i) => i !== index));
  };

  const updateAction = (index: number, updates: any) => {
    setActions(actions.map((a, i) => (i === index ? { ...a, ...updates } : a)));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={ruleId ? 'Kuralı Düzenle' : 'Yeni Kural'}>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Info */}
        <div className="space-y-4">
          <Input
            label="Kural Adı"
            placeholder="Örn: Tamamlanan görevlere tag ekle"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Açıklama
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={2}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="Kural açıklaması (opsiyonel)"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Proje (Opsiyonel)
            </label>
            <select
              value={projectId}
              onChange={(e) => setProjectId(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="">Tüm projeler</option>
              {projects.map((project) => (
                <option key={project.id} value={project.id}>
                  {project.name}
                </option>
              ))}
            </select>
          </div>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={enabled}
              onChange={(e) => setEnabled(e.target.checked)}
              className="rounded border-gray-300 dark:border-gray-600 text-primary-600 focus:ring-primary-500"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">Kuralı aktif et</span>
          </label>
        </div>

        {/* Trigger */}
        <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Tetikleyici</h3>
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Ne zaman çalışsın?
              </label>
              <select
                value={triggerType}
                onChange={(e) => setTriggerType(e.target.value as TriggerType)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                {Object.entries(TRIGGER_LABELS).map(([key, label]) => (
                  <option key={key} value={key}>
                    {label}
                  </option>
                ))}
              </select>
            </div>

            {(triggerType === 'task_status_changed' || triggerType === 'task_priority_changed') && (
              <Input
                label="Değer (opsiyonel)"
                placeholder={triggerType === 'task_status_changed' ? 'örn: done' : 'örn: high'}
                value={triggerValue}
                onChange={(e) => setTriggerValue(e.target.value)}
              />
            )}
          </div>
        </div>

        {/* Conditions */}
        <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Koşullar (İsteğe bağlı)
            </h3>
            <Button type="button" variant="secondary" size="sm" onClick={addCondition}>
              <Plus size={14} className="mr-1" /> Koşul Ekle
            </Button>
          </div>
          {conditions.length === 0 ? (
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Koşul yok (her zaman çalışır)
            </p>
          ) : (
            <div className="space-y-2">
              {conditions.map((condition, index) => (
                <div key={index} className="flex gap-2 items-start">
                  <select
                    value={condition.field}
                    onChange={(e) => updateCondition(index, { field: e.target.value })}
                    className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="status">Durum</option>
                    <option value="priority">Öncelik</option>
                    <option value="tags">Etiketler</option>
                  </select>
                  <select
                    value={condition.operator}
                    onChange={(e) => updateCondition(index, { operator: e.target.value })}
                    className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="equals">Eşit</option>
                    <option value="not_equals">Eşit Değil</option>
                    <option value="contains">İçerir</option>
                  </select>
                  <input
                    type="text"
                    value={condition.value}
                    onChange={(e) => updateCondition(index, { value: e.target.value })}
                    placeholder="Değer"
                    className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeCondition(index)}
                  >
                    <X size={16} />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Eylemler</h3>
            <Button type="button" variant="secondary" size="sm" onClick={addAction}>
              <Plus size={14} className="mr-1" /> Eylem Ekle
            </Button>
          </div>
          <div className="space-y-2">
            {actions.map((action, index) => (
              <div key={index} className="flex gap-2 items-start">
                <select
                  value={action.type}
                  onChange={(e) => updateAction(index, { type: e.target.value })}
                  className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  {Object.entries(ACTION_LABELS).map(([key, label]) => (
                    <option key={key} value={key}>
                      {label}
                    </option>
                  ))}
                </select>
                <input
                  type="text"
                  value={action.value}
                  onChange={(e) => updateAction(index, { value: e.target.value })}
                  placeholder={action.type === 'send_notification' ? 'Mesaj (opsiyonel)' : 'Değer'}
                  className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
                {actions.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeAction(index)}
                  >
                    <X size={16} />
                  </Button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-between gap-2 pt-4 border-t border-gray-200 dark:border-gray-700">
          <div>
            {ruleId && (
              <Button type="button" variant="danger" onClick={handleDelete}>
                Sil
              </Button>
            )}
          </div>
          <div className="flex gap-2">
            <Button type="button" variant="secondary" onClick={onClose}>
              İptal
            </Button>
            <Button type="submit" disabled={!name.trim() || actions.length === 0}>
              {ruleId ? 'Güncelle' : 'Oluştur'}
            </Button>
          </div>
        </div>
      </form>
    </Modal>
  );
};
