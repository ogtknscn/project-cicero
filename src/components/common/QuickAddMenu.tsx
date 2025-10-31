import { useState, useRef, useEffect } from 'react';
import { generateAriaId } from '../../utils/accessibility';

interface QuickAddOption {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  action: () => void;
  shortcut?: string;
}

interface QuickAddMenuProps {
  isOpen: boolean;
  onClose: () => void;
  options: QuickAddOption[];
}

export const QuickAddMenu: React.FC<QuickAddMenuProps> = ({ isOpen, onClose, options }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const menuRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const menuId = useRef(generateAriaId('quick-add'));

  // Filter options based on search
  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Reset selection when filtered results change
  useEffect(() => {
    setSelectedIndex(0);
  }, [searchQuery, filteredOptions.length]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % filteredOptions.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filteredOptions.length) % filteredOptions.length);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredOptions[selectedIndex]) {
          filteredOptions[selectedIndex].action();
          onClose();
        }
      } else if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, selectedIndex, filteredOptions, onClose]);

  if (!isOpen) return null;

  const handleOptionClick = (action: () => void) => {
    action();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-900/50 dark:bg-neutral-950/70 animate-fade-in">
      <div
        ref={menuRef}
        className="bg-white dark:bg-neutral-800 rounded-xl shadow-xl w-full max-w-md animate-scale-in"
        role="dialog"
        aria-modal="true"
        aria-labelledby={menuId.current}
      >
        {/* Search Input */}
        <div className="px-6 py-4 border-b border-neutral-200 dark:border-neutral-700">
          <input
            ref={inputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Ne oluşturmak istersiniz?"
            className="w-full text-lg bg-transparent border-none outline-none text-neutral-900 dark:text-white placeholder-neutral-500"
            aria-label="Hızlı oluşturma araması"
          />
        </div>

        {/* Options List */}
        <div
          className="max-h-80 overflow-y-auto py-2"
          role="listbox"
          aria-label="Oluşturma seçenekleri"
        >
          {filteredOptions.length === 0 ? (
            <div className="px-6 py-8 text-center text-neutral-500 dark:text-neutral-400">
              Sonuç bulunamadı
            </div>
          ) : (
            filteredOptions.map((option, index) => {
              const Icon = option.icon;
              const isSelected = index === selectedIndex;

              return (
                <button
                  key={option.id}
                  onClick={() => handleOptionClick(option.action)}
                  className={`w-full flex items-center gap-3 px-6 py-3 text-left 
                    hover:bg-neutral-100 dark:hover:bg-neutral-700
                    transition-colors duration-normal
                    focus:outline-none focus:bg-neutral-100 dark:focus:bg-neutral-700
                    ${isSelected ? 'bg-primary-50 dark:bg-primary-900/20' : ''}`}
                  role="option"
                  aria-selected={isSelected}
                >
                  <Icon className="w-5 h-5 text-neutral-500 dark:text-neutral-400" />
                  <span className="flex-1 text-neutral-900 dark:text-white font-medium">
                    {option.label}
                  </span>
                  {option.shortcut && (
                    <kbd className="px-2 py-1 text-xs font-semibold text-neutral-500 dark:text-neutral-400 bg-neutral-100 dark:bg-neutral-700 rounded border border-neutral-300 dark:border-neutral-600">
                      {option.shortcut}
                    </kbd>
                  )}
                </button>
              );
            })
          )}
        </div>

        {/* Footer Hint */}
        {filteredOptions.length > 0 && (
          <div className="px-6 py-3 border-t border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900">
            <div className="flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400">
              <span>
                <kbd className="px-1.5 py-0.5 bg-white dark:bg-neutral-800 rounded border border-neutral-300 dark:border-neutral-600">
                  ↑↓
                </kbd>{' '}
                <kbd className="px-1.5 py-0.5 bg-white dark:bg-neutral-800 rounded border border-neutral-300 dark:border-neutral-600">
                  Enter
                </kbd>
              </span>
              <kbd className="px-1.5 py-0.5 bg-white dark:bg-neutral-800 rounded border border-neutral-300 dark:border-neutral-600">
                Esc
              </kbd>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
