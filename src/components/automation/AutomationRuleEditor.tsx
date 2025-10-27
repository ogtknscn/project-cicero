import React from 'react';
import { Button } from '../common/Button';
import { AutomationRule } from '../../types/automation';

interface AutomationRuleEditorProps {
  rule?: AutomationRule;
  onSave: (rule: AutomationRule) => void;
  onCancel: () => void;
}

export const AutomationRuleEditor = ({ rule, onSave, onCancel }: AutomationRuleEditorProps) => {
  const [name, setName] = React.useState(rule?.name || '');
  const [trigger, setTrigger] = React.useState(rule?.trigger || 'task-status-changed');
  const [action, setAction] = React.useState(rule?.action || 'change-status');
  const [actionValue, setActionValue] = React.useState(rule?.actionValue || '');
  const [enabled, setEnabled] = React.useState(rule?.enabled ?? true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) return;
    
    onSave({
      id: rule?.id || `rule-${Date.now()}`,
      name: name.trim(),
      trigger,
      action,
      actionValue,
      enabled,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Kural Adı
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          placeholder="Örn: Yüksek öncelikli görevleri 'Devam Ediyor' yap"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tetikleyici
          </label>
          <select
            value={trigger}
            onChange={(e) => setTrigger(e.target.value as any)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          >
            <option value="task-created">Görev oluşturulduğunda</option>
            <option value="task-status-changed">Durum değiştiğinde</option>
            <option value="task-due-date">Bitiş tarihi geldiğinde</option>
            <option value="task-priority-changed">Öncelik değiştiğinde</option>
            <option value="tag-added">Etiket eklendiğinde</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Eylem
          </label>
          <select
            value={action}
            onChange={(e) => setAction(e.target.value as any)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          >
            <option value="change-status">Durum değiştir</option>
            <option value="change-priority">Öncelik değiştir</option>
            <option value="add-tag">Etiket ekle</option>
            <option value="remove-tag">Etiket kaldır</option>
            <option value="assign-user">Kullanıcı ata</option>
            <option value="create-task">Görev oluştur</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Eylem Değeri
        </label>
        <input
          type="text"
          value={actionValue}
          onChange={(e) => setActionValue(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          placeholder="Örn: in-progress, high, Frontend"
        />
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          checked={enabled}
          onChange={(e) => setEnabled(e.target.checked)}
          className="w-4 h-4 text-primary-600 border-gray-300 rounded"
        />
        <label className="ml-2 text-sm text-gray-700">Kuralı etkinleştir</label>
      </div>

      <div className="flex justify-end gap-2 pt-4">
        <Button type="button" variant="secondary" onClick={onCancel}>
          İptal
        </Button>
        <Button type="submit">
          {rule ? 'Güncelle' : 'Oluştur'}
        </Button>
      </div>
    </form>
  );
};

