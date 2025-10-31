import { CustomFieldDefinition } from '../../types/customField';

interface CustomFieldsEditorProps {
  customFields: CustomFieldDefinition[];
  values: Record<string, string | number | boolean>;
  onUpdate: (values: Record<string, string | number | boolean>) => void;
}

export const CustomFieldsEditor = ({ customFields, values, onUpdate }: CustomFieldsEditorProps) => {
  if (customFields.length === 0) return null;

  const updateField = (fieldId: string, value: string | number | boolean) => {
    onUpdate({ ...values, [fieldId]: value });
  };

  const renderField = (field: CustomFieldDefinition) => {
    const value = values[field.id];

    switch (field.type) {
      case 'text':
        return (
          <input
            type="text"
            value={(value as string) || ''}
            onChange={(e) => updateField(field.id, e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            placeholder={field.name}
          />
        );
      case 'number':
        return (
          <input
            type="number"
            value={(value as number) || ''}
            onChange={(e) => updateField(field.id, parseFloat(e.target.value) || 0)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            placeholder={field.name}
          />
        );
      case 'date':
        return (
          <input
            type="date"
            value={(value as string) || ''}
            onChange={(e) => updateField(field.id, e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
          />
        );
      case 'select':
        return (
          <select
            value={(value as string) || ''}
            onChange={(e) => updateField(field.id, e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
          >
            <option value="">Seçin...</option>
            {field.options?.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        );
      case 'checkbox':
        return (
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={(value as boolean) || false}
              onChange={(e) => updateField(field.id, e.target.checked)}
              className="w-4 h-4 text-primary-600 border-gray-300 rounded"
            />
            <span className="text-sm text-gray-700">{field.name}</span>
          </label>
        );
      case 'url':
        return (
          <input
            type="url"
            value={(value as string) || ''}
            onChange={(e) => updateField(field.id, e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            placeholder="https://..."
          />
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Özel Alanlar</label>
      <div className="space-y-3">
        {customFields.map((field) => (
          <div key={field.id}>
            {field.type !== 'checkbox' && (
              <label className="block text-xs text-gray-600 mb-1">{field.name}</label>
            )}
            {renderField(field)}
          </div>
        ))}
      </div>
    </div>
  );
};
