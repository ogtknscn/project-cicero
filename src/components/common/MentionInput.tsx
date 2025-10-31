import { useState, useRef, useEffect } from 'react';
import { Avatar } from './Avatar';

interface MentionOption {
  id: string;
  name: string;
  avatar?: string;
}

interface MentionInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  users: MentionOption[];
  onSubmit?: () => void;
  isSubmitting?: boolean;
}

export const MentionInput: React.FC<MentionInputProps> = ({
  value,
  onChange,
  placeholder = 'Yorum yazın...',
  users,
  onSubmit,
  isSubmitting = false,
}) => {
  const [showMentions, setShowMentions] = useState(false);
  const [mentionQuery, setMentionQuery] = useState('');
  const [selectedMentionIndex, setSelectedMentionIndex] = useState(0);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const mentionsRef = useRef<HTMLDivElement>(null);

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(mentionQuery.toLowerCase())
  );

  useEffect(() => {
    if (!showMentions || filteredUsers.length === 0) {
      setSelectedMentionIndex(0);
    }
  }, [showMentions, filteredUsers.length]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    onChange(newValue);

    // Check for @ mention trigger
    const cursorPos = e.target.selectionStart;
    const textBeforeCursor = newValue.substring(0, cursorPos);
    const lastAtIndex = textBeforeCursor.lastIndexOf('@');

    if (lastAtIndex !== -1) {
      const textAfterAt = textBeforeCursor.substring(lastAtIndex + 1);
      // Only show mentions if there's no space after @
      if (!textAfterAt.includes(' ') && lastAtIndex === cursorPos - 1) {
        setShowMentions(true);
        setMentionQuery('');
      } else if (!textAfterAt.includes(' ')) {
        setShowMentions(true);
        setMentionQuery(textAfterAt);
      } else {
        setShowMentions(false);
      }
    } else {
      setShowMentions(false);
    }
  };

  const insertMention = (user: MentionOption) => {
    if (!inputRef.current) return;

    const value = inputRef.current.value;
    const cursorPos = inputRef.current.selectionStart;
    const textBeforeCursor = value.substring(0, cursorPos);
    const lastAtIndex = textBeforeCursor.lastIndexOf('@');
    const textAfterCursor = value.substring(cursorPos);

    if (lastAtIndex !== -1) {
      const newValue = value.substring(0, lastAtIndex) + `@${user.name} ` + textAfterCursor;

      onChange(newValue);
      setShowMentions(false);

      // Move cursor after inserted mention
      setTimeout(() => {
        if (inputRef.current) {
          const newCursorPos = lastAtIndex + user.name.length + 2;
          inputRef.current.setSelectionRange(newCursorPos, newCursorPos);
          inputRef.current.focus();
        }
      }, 0);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (showMentions && filteredUsers.length > 0) {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedMentionIndex((prev) => (prev + 1) % filteredUsers.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedMentionIndex((prev) => (prev - 1 + filteredUsers.length) % filteredUsers.length);
      } else if (e.key === 'Enter' || e.key === 'Tab') {
        e.preventDefault();
        insertMention(filteredUsers[selectedMentionIndex]);
      } else if (e.key === 'Escape') {
        e.preventDefault();
        setShowMentions(false);
      }
    }

    // Submit on Cmd/Ctrl+Enter
    if ((e.metaKey || e.ctrlKey) && e.key === 'Enter' && onSubmit) {
      e.preventDefault();
      onSubmit();
    }
  };

  return (
    <div className="relative">
      {/* Textarea */}
      <textarea
        ref={inputRef}
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className="w-full px-4 py-3 border border-neutral-300 dark:border-neutral-600 
          rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 
          dark:bg-neutral-800 dark:text-white resize-none min-h-[100px]
          disabled:opacity-50 disabled:cursor-not-allowed"
        rows={3}
        disabled={isSubmitting}
      />

      {/* Mentions Dropdown */}
      {showMentions && filteredUsers.length > 0 && (
        <div
          ref={mentionsRef}
          className="absolute bottom-full left-0 mb-2 w-full max-h-48 overflow-y-auto 
          bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 
          rounded-lg shadow-lg z-50"
        >
          {filteredUsers.map((user, index) => {
            const isSelected = index === selectedMentionIndex;

            return (
              <button
                key={user.id}
                onClick={() => insertMention(user)}
                className={`w-full flex items-center gap-3 px-4 py-2 text-left 
                  hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors
                  ${isSelected ? 'bg-primary-50 dark:bg-primary-900/20' : ''}`}
              >
                <Avatar size="sm" name={user.name} src={user.avatar} className="flex-shrink-0" />
                <span className="text-sm font-medium text-neutral-900 dark:text-white">
                  {user.name}
                </span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
