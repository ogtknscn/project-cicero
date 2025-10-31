import React, { useState, useRef, useEffect } from 'react';
import { Check, X } from 'lucide-react';

interface InlineEditProps {
  value: string;
  onSave: (newValue: string) => void;
  onCancel?: () => void;
  placeholder?: string;
  multiline?: boolean;
  className?: string;
  displayClassName?: string;
}

export const InlineEdit: React.FC<InlineEditProps> = ({
  value,
  onSave,
  onCancel,
  placeholder = 'Tıklayarak düzenle...',
  multiline = false,
  className = '',
  displayClassName = '',
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleSave = () => {
    if (editValue.trim() !== value) {
      onSave(editValue.trim());
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditValue(value);
    setIsEditing(false);
    onCancel?.();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !multiline) {
      e.preventDefault();
      handleSave();
    } else if (e.key === 'Enter' && multiline && e.ctrlKey) {
      e.preventDefault();
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  if (!isEditing) {
    return (
      <div
        className={`group cursor-pointer rounded-md px-2 py-1 -mx-2 -my-1
          hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors ${displayClassName}`}
        onClick={() => setIsEditing(true)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setIsEditing(true);
          }
        }}
      >
        {value || (
          <span className="text-neutral-400 dark:text-neutral-500 italic">{placeholder}</span>
        )}
      </div>
    );
  }

  return (
    <div className={`flex items-start gap-2 ${className}`}>
      {multiline ? (
        <textarea
          ref={inputRef as React.RefObject<HTMLTextAreaElement>}
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={handleSave}
          placeholder={placeholder}
          rows={3}
          className="flex-1 px-3 py-2 border border-primary-500 rounded-md 
            focus:outline-none focus:ring-2 focus:ring-primary-500 
            dark:bg-neutral-800 dark:text-white dark:border-primary-600
            resize-none"
        />
      ) : (
        <input
          ref={inputRef as React.RefObject<HTMLInputElement>}
          type="text"
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={handleSave}
          placeholder={placeholder}
          className="flex-1 px-3 py-2 border border-primary-500 rounded-md 
            focus:outline-none focus:ring-2 focus:ring-primary-500 
            dark:bg-neutral-800 dark:text-white dark:border-primary-600"
        />
      )}

      <div className="flex gap-1 pt-2">
        <button
          onClick={handleSave}
          className="p-1.5 rounded-md text-success-600 hover:bg-success-50 dark:text-success-400 
            dark:hover:bg-success-900/20 focus:outline-none focus:ring-2 focus:ring-success-500 
            transition-colors"
          aria-label="Kaydet"
          onMouseDown={(e) => e.preventDefault()} // Prevent blur before click
        >
          <Check className="w-4 h-4" />
        </button>
        <button
          onClick={handleCancel}
          className="p-1.5 rounded-md text-danger-600 hover:bg-danger-50 dark:text-danger-400 
            dark:hover:bg-danger-900/20 focus:outline-none focus:ring-2 focus:ring-danger-500 
            transition-colors"
          aria-label="İptal"
          onMouseDown={(e) => e.preventDefault()} // Prevent blur before click
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
