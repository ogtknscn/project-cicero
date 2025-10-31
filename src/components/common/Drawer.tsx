import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { trapFocus } from '../../utils/accessibility';

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  position?: 'left' | 'right';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  footer?: React.ReactNode;
}

const sizeMap = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
};

export const Drawer = ({
  isOpen,
  onClose,
  title,
  children,
  position = 'right',
  size = 'lg',
  footer,
}: DrawerProps) => {
  const drawerRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    // Focus trap
    const cleanup = drawerRef.current ? trapFocus(drawerRef.current) : undefined;

    // Focus close button on open
    setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 100);

    // Prevent body scroll
    document.body.style.overflow = 'hidden';

    // ESC key handler
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);

    return () => {
      document.body.style.overflow = 'unset';
      document.removeEventListener('keydown', handleEscape);
      cleanup?.();
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const slideAnimation = position === 'right' ? 'animate-slide-in-right' : 'animate-slide-in-left';

  return (
    <div
      className="fixed inset-0 z-50 overflow-hidden"
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? 'drawer-title' : undefined}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-neutral-900/50 dark:bg-neutral-950/70 animate-fade-in"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        ref={drawerRef}
        className={`absolute top-0 ${position === 'right' ? 'right-0' : 'left-0'} 
          h-full w-full ${sizeMap[size]} bg-white dark:bg-neutral-800 
          shadow-xl flex flex-col ${slideAnimation}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-200 dark:border-neutral-700">
          {title && (
            <h2
              id="drawer-title"
              className="text-xl font-semibold text-neutral-900 dark:text-white"
            >
              {title}
            </h2>
          )}
          <button
            ref={closeButtonRef}
            onClick={onClose}
            className="p-2 rounded-lg text-neutral-500 hover:text-neutral-700 hover:bg-neutral-100 
              dark:text-neutral-400 dark:hover:text-neutral-200 dark:hover:bg-neutral-700
              focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors duration-normal
              min-w-touch min-h-touch flex items-center justify-center"
            aria-label="Çıkış"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 py-4">{children}</div>

        {/* Footer */}
        {footer && (
          <div className="px-6 py-4 border-t border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};
