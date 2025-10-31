import React from 'react';
import { X, Command } from 'lucide-react';

interface Shortcut {
  keys: string[];
  description: string;
  category: string;
}

interface KeyboardShortcutsHelpProps {
  isOpen: boolean;
  onClose: () => void;
}

const shortcuts: Shortcut[] = [
  // Navigation
  { keys: ['Ctrl/Cmd', 'K'], description: 'Komut paletini aç', category: 'Navigasyon' },
  { keys: ['G', 'D'], description: "Dashboard'a git", category: 'Navigasyon' },
  { keys: ['G', 'B'], description: "Board'a git", category: 'Navigasyon' },
  { keys: ['G', 'L'], description: "List'e git", category: 'Navigasyon' },
  { keys: ['G', 'C'], description: "Calendar'a git", category: 'Navigasyon' },
  { keys: ['G', 'T'], description: "Timeline'a git", category: 'Navigasyon' },

  // Actions
  { keys: ['N'], description: 'Yeni görev oluştur', category: 'Aksiyonlar' },
  { keys: ['P'], description: 'Yeni proje oluştur', category: 'Aksiyonlar' },
  { keys: ['E'], description: 'Dışa aktar menüsünü aç', category: 'Aksiyonlar' },
  { keys: ['/'], description: 'Arama yap', category: 'Aksiyonlar' },

  // General
  { keys: ['Esc'], description: "Modal/Drawer'ı kapat", category: 'Genel' },
  { keys: ['?'], description: 'Klavye kısayollarını göster', category: 'Genel' },
  { keys: ['Ctrl/Cmd', 'S'], description: 'Kaydet', category: 'Genel' },
  { keys: ['Ctrl/Cmd', 'Z'], description: 'Geri al', category: 'Genel' },

  // Board/List
  { keys: ['Space'], description: 'Sürükle-bırak başlat/bitir', category: 'Board/List' },
  { keys: ['Arrow Keys'], description: 'Öğeler arası gezin', category: 'Board/List' },
  { keys: ['Shift', 'Click'], description: 'Çoklu seçim', category: 'Board/List' },
];

const categories = Array.from(new Set(shortcuts.map((s) => s.category)));

export const KeyboardShortcutsHelp: React.FC<KeyboardShortcutsHelpProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-900/50 dark:bg-neutral-950/70 animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="shortcuts-title"
    >
      <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-xl max-w-2xl w-full max-h-[80vh] overflow-hidden animate-scale-in">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-200 dark:border-neutral-700">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary-100 dark:bg-primary-900/30">
              <Command className="w-5 h-5 text-primary-600 dark:text-primary-400" />
            </div>
            <h2
              id="shortcuts-title"
              className="text-xl font-semibold text-neutral-900 dark:text-white"
            >
              Klavye Kısayolları
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-neutral-500 hover:text-neutral-700 hover:bg-neutral-100 
              dark:text-neutral-400 dark:hover:text-neutral-200 dark:hover:bg-neutral-700
              focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors"
            aria-label="Kapat"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(80vh-80px)] px-6 py-4">
          {categories.map((category) => (
            <div key={category} className="mb-6 last:mb-0">
              <h3 className="text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-3 uppercase tracking-wide">
                {category}
              </h3>
              <div className="space-y-2">
                {shortcuts
                  .filter((s) => s.category === category)
                  .map((shortcut, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-700/50 transition-colors"
                    >
                      <span className="text-sm text-neutral-600 dark:text-neutral-400">
                        {shortcut.description}
                      </span>
                      <div className="flex items-center gap-1">
                        {shortcut.keys.map((key, keyIdx) => (
                          <React.Fragment key={keyIdx}>
                            <kbd
                              className="px-2 py-1 text-xs font-semibold text-neutral-700 dark:text-neutral-300 
                                bg-neutral-100 dark:bg-neutral-700 border border-neutral-300 dark:border-neutral-600 
                                rounded shadow-sm min-w-[28px] text-center"
                            >
                              {key}
                            </kbd>
                            {keyIdx < shortcut.keys.length - 1 && (
                              <span className="text-neutral-400 dark:text-neutral-500 mx-1">+</span>
                            )}
                          </React.Fragment>
                        ))}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900">
          <p className="text-xs text-neutral-500 dark:text-neutral-400 text-center">
            <kbd className="px-1.5 py-0.5 text-xs bg-neutral-200 dark:bg-neutral-700 rounded">
              ?
            </kbd>{' '}
            tuşuna basarak bu paneli her zaman açabilirsiniz
          </p>
        </div>
      </div>
    </div>
  );
};
