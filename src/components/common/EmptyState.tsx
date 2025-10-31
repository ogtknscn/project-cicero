import { LucideIcon } from 'lucide-react';
import { Button } from './Button';

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
    icon?: LucideIcon;
  };
  secondaryAction?: {
    label: string;
    onClick: () => void;
  };
}

export const EmptyState = ({
  icon: Icon,
  title,
  description,
  action,
  secondaryAction,
}: EmptyStateProps) => {
  return (
    <div
      className="flex flex-col items-center justify-center py-12 px-4 text-center animate-fade-in"
      role="status"
      aria-live="polite"
    >
      {Icon && (
        <div className="mb-4 p-4 rounded-full bg-neutral-100 dark:bg-neutral-800">
          <Icon className="w-12 h-12 text-neutral-400 dark:text-neutral-500" aria-hidden="true" />
        </div>
      )}

      <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">{title}</h3>

      {description && (
        <p className="text-sm text-neutral-600 dark:text-neutral-400 max-w-md mb-6">
          {description}
        </p>
      )}

      {(action || secondaryAction) && (
        <div className="flex items-center gap-3">
          {action && (
            <Button onClick={action.onClick} variant="primary" size="md">
              {action.icon && <action.icon className="w-4 h-4" />}
              {action.label}
            </Button>
          )}
          {secondaryAction && (
            <Button onClick={secondaryAction.onClick} variant="ghost" size="md">
              {secondaryAction.label}
            </Button>
          )}
        </div>
      )}
    </div>
  );
};
