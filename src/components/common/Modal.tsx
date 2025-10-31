import { ReactNode, useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { trapFocus, generateAriaId } from '../../utils/accessibility';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

export const Modal = ({ isOpen, onClose, title, children }: ModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const titleId = useRef(generateAriaId('modal-title'));
  const descId = useRef(generateAriaId('modal-desc'));

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';

      if (modalRef.current) {
        const cleanup = trapFocus(modalRef.current);
        return () => {
          cleanup();
          document.body.style.overflow = 'unset';
        };
      }
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId.current}
      aria-describedby={descId.current}
    >
      <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose} aria-hidden="true" />
      <div
        ref={modalRef}
        className="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto m-4"
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 id={titleId.current} className="text-xl font-semibold text-gray-900 dark:text-white">
            {title}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            aria-label="Modalı kapat"
          >
            <X size={24} />
          </button>
        </div>
        <div id={descId.current} className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
};
