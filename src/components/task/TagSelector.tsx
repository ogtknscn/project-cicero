import { useState } from 'react';
import { X, Plus } from 'lucide-react';
import { Button } from '../common/Button';

const DEFAULT_TAG_COLORS = [
  '#ef4444', // red
  '#f59e0b', // orange
  '#eab308', // yellow
  '#10b981', // green
  '#0ea5e9', // blue
  '#8b5cf6', // purple
  '#ec4899', // pink
  '#6b7280', // gray
];

interface TagSelectorProps {
  tags: string[];
  allTags: { id: string; name: string; color: string }[];
  onUpdate: (tags: string[]) => void;
}

export const TagSelector = ({ tags, allTags, onUpdate }: TagSelectorProps) => {
  const [isCreating, setIsCreating] = useState(false);
  const [newTagName, setNewTagName] = useState('');
  const [newTagColor, setNewTagColor] = useState(DEFAULT_TAG_COLORS[0]);

  const selectedTags = allTags.filter((t) => tags.includes(t.id));

  const handleRemoveTag = (tagId: string) => {
    onUpdate(tags.filter((id) => id !== tagId));
  };

  const handleAddTag = (tagId: string) => {
    if (!tags.includes(tagId)) {
      onUpdate([...tags, tagId]);
    }
  };

  const handleCreateTag = () => {
    if (!newTagName.trim()) return;

    const newTag = {
      id: `tag-${Date.now()}`,
      name: newTagName.trim(),
      color: newTagColor,
    };

    // Add to allTags (would normally be added to store)
    onUpdate([...tags, newTag.id]);
    setNewTagName('');
    setNewTagColor(DEFAULT_TAG_COLORS[0]);
    setIsCreating(false);
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Etiketler</label>

      {/* Selected tags */}
      {selectedTags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-3">
          {selectedTags.map((tag) => (
            <div
              key={tag.id}
              className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium text-white"
              style={{ backgroundColor: tag.color }}
            >
              {tag.name}
              <button
                type="button"
                onClick={() => handleRemoveTag(tag.id)}
                className="hover:bg-black/20 rounded-full p-0.5"
              >
                <X size={12} />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Available tags */}
      <div className="border border-gray-300 rounded-lg p-3">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-gray-600">Mevcut Etiketler</span>
          <Button variant="ghost" size="sm" onClick={() => setIsCreating(!isCreating)}>
            <Plus size={14} />
          </Button>
        </div>

        <div className="flex flex-wrap gap-2">
          {allTags.map((tag) => {
            const isSelected = tags.includes(tag.id);
            return (
              <button
                key={tag.id}
                type="button"
                onClick={() => (isSelected ? handleRemoveTag(tag.id) : handleAddTag(tag.id))}
                className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
                  isSelected
                    ? 'bg-opacity-80 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                style={isSelected ? { backgroundColor: tag.color } : {}}
              >
                {tag.name}
              </button>
            );
          })}
        </div>

        {/* Create new tag */}
        {isCreating && (
          <div className="mt-3 pt-3 border-t border-gray-200">
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                placeholder="Etiket adı"
                value={newTagName}
                onChange={(e) => setNewTagName(e.target.value)}
                className="flex-1 px-2 py-1 text-sm border border-gray-300 rounded"
                onKeyDown={(e) => e.key === 'Enter' && handleCreateTag()}
                autoFocus
              />
              <select
                value={newTagColor}
                onChange={(e) => setNewTagColor(e.target.value)}
                className="px-2 py-1 text-sm border border-gray-300 rounded"
              >
                {DEFAULT_TAG_COLORS.map((color) => (
                  <option key={color} value={color} style={{ backgroundColor: color }}>
                    Color
                  </option>
                ))}
              </select>
            </div>
            <div className="flex gap-1">
              <Button size="sm" onClick={handleCreateTag}>
                Oluştur
              </Button>
              <Button size="sm" variant="secondary" onClick={() => setIsCreating(false)}>
                İptal
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
