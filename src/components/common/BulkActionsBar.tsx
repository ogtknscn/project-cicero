import React from 'react';
import { X, Trash2, Archive, Tag, UserPlus, Download, Move } from 'lucide-react';

interface BulkAction {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  onClick: () => void;
  variant?: 'default' | 'danger';
}

interface BulkActionsBarProps {
  selectedCount: number;
  onClearSelection: () => void;
  actions?: BulkAction[];
  customActions?: React.ReactNode;
}

const defaultActions: BulkAction[] = [
  { icon: Move, label: 'Taşı', onClick: () => {}, variant: 'default' },
  { icon: Tag, label: 'Etiketle', onClick: () => {}, variant: 'default' },
  { icon: UserPlus, label: 'Ata', onClick: () => {}, variant: 'default' },
  { icon: Download, label: 'Dışa Aktar', onClick: () => {}, variant: 'default' },
  { icon: Archive, label: 'Arşivle', onClick: () => {}, variant: 'default' },
  { icon: Trash2, label: 'Sil', onClick: () => {}, variant: 'danger' },
];

export const BulkActionsBar: React.FC<BulkActionsBarProps> = ({
  selectedCount,
  onClearSelection,
  actions = defaultActions,
  customActions,
}) => {
  if (selectedCount === 0) return null;

  return (
    <div
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 animate-slide-up"
      role="toolbar"
      aria-label="Toplu işlemler"
    >
      <div
        className="flex items-center gap-2 px-4 py-3 bg-white dark:bg-neutral-800 
        rounded-xl shadow-xl border border-neutral-200 dark:border-neutral-700"
      >
        {/* Selection count */}
        <div className="flex items-center gap-2 px-3 py-1 bg-primary-100 dark:bg-primary-900/30 rounded-lg">
          <span className="text-sm font-medium text-primary-900 dark:text-primary-100">
            {selectedCount} öğe seçildi
          </span>
        </div>

        <div className="w-px h-6 bg-neutral-300 dark:bg-neutral-600" />

        {/* Actions */}
        <div className="flex items-center gap-1">
          {actions.map((action, index) => (
            <button
              key={index}
              onClick={action.onClick}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium 
                transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500
                ${
                  action.variant === 'danger'
                    ? 'text-danger-600 hover:bg-danger-50 dark:text-danger-400 dark:hover:bg-danger-900/20'
                    : 'text-neutral-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-700'
                }`}
              aria-label={action.label}
            >
              <action.icon className="w-4 h-4" />
              <span className="hidden sm:inline">{action.label}</span>
            </button>
          ))}
          {customActions}
        </div>

        <div className="w-px h-6 bg-neutral-300 dark:bg-neutral-600" />

        {/* Clear selection */}
        <button
          onClick={onClearSelection}
          className="p-2 rounded-lg text-neutral-500 hover:text-neutral-700 hover:bg-neutral-100 
            dark:text-neutral-400 dark:hover:text-neutral-200 dark:hover:bg-neutral-700
            focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors"
          aria-label="Seçimi temizle"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
