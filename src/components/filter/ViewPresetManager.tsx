import { useState } from 'react';
import { useFilterStore } from '../../stores/filterStore';
import { useViewStore, ViewType } from '../../stores/viewStore';
import { Button } from '../common/Button';
import { Input } from '../common/Input';
import { Modal } from '../common/Modal';
import { Save, Trash2, Eye } from 'lucide-react';

export const ViewPresetManager = () => {
  const { viewPresets, activeViewPresetId, addViewPreset, deleteViewPreset, setActiveViewPreset } =
    useFilterStore();

  const { currentView, setView } = useViewStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [presetName, setPresetName] = useState('');
  const [sortBy, setSortBy] = useState<
    'dueDate' | 'priority' | 'createdAt' | 'updatedAt' | 'title'
  >('createdAt');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [groupBy, setGroupBy] = useState<'status' | 'priority' | 'assignee' | 'none'>('none');

  const handleSavePreset = () => {
    if (!presetName.trim()) return;

    addViewPreset({
      name: presetName.trim(),
      viewType: currentView,
      sortBy,
      sortOrder,
      groupBy,
    });

    setPresetName('');
    setIsModalOpen(false);
  };

  const handleLoadPreset = (presetId: string) => {
    const preset = viewPresets.find((p) => p.id === presetId);
    if (preset) {
      setView(preset.viewType);
      setActiveViewPreset(presetId);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="secondary"
        size="sm"
        onClick={() => setIsModalOpen(true)}
        title="Mevcut görünümü kaydet"
      >
        <Eye size={16} />
        <span className="hidden sm:inline ml-2">Görünümü Kaydet</span>
      </Button>

      {viewPresets.length > 0 && (
        <div className="flex items-center gap-2">
          <select
            value={activeViewPresetId || ''}
            onChange={(e) => handleLoadPreset(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="">Kaydedilmiş Görünümler</option>
            {viewPresets.map((preset) => (
              <option key={preset.id} value={preset.id}>
                {preset.name}
              </option>
            ))}
          </select>

          {activeViewPresetId && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                if (confirm('Bu görünümü silmek istediğinize emin misiniz?')) {
                  deleteViewPreset(activeViewPresetId);
                }
              }}
              title="Aktif görünümü sil"
            >
              <Trash2 size={16} className="text-red-500" />
            </Button>
          )}
        </div>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setPresetName('');
        }}
        title="Görünümü Kaydet"
      >
        <div className="space-y-4">
          <Input
            label="Görünüm Adı"
            placeholder="Örn: Sprint Board"
            value={presetName}
            onChange={(e) => setPresetName(e.target.value)}
            required
          />

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Sıralama
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="dueDate">Bitiş Tarihi</option>
                <option value="priority">Öncelik</option>
                <option value="createdAt">Oluşturma Tarihi</option>
                <option value="updatedAt">Güncelleme Tarihi</option>
                <option value="title">Başlık</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Sıralama Yönü
              </label>
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="asc">Artan</option>
                <option value="desc">Azalan</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Gruplama
            </label>
            <select
              value={groupBy}
              onChange={(e) => setGroupBy(e.target.value as any)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="none">Grupsuz</option>
              <option value="status">Duruma Göre</option>
              <option value="priority">Önceliğe Göre</option>
              <option value="assignee">Atanana Göre</option>
            </select>
          </div>

          <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg text-sm">
            <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-2">
              Kaydedilecek Görünüm:
            </h4>
            <ul className="space-y-1 text-gray-600 dark:text-gray-400">
              <li>• Görünüm Tipi: {currentView}</li>
              <li>
                • Sıralama: {sortBy} ({sortOrder})
              </li>
              <li>• Gruplama: {groupBy}</li>
            </ul>
          </div>

          <div className="flex justify-end gap-2">
            <Button
              variant="secondary"
              onClick={() => {
                setIsModalOpen(false);
                setPresetName('');
              }}
            >
              İptal
            </Button>
            <Button onClick={handleSavePreset} disabled={!presetName.trim()}>
              <Save size={16} className="mr-2" />
              Kaydet
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
