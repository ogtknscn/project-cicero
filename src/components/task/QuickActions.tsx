import React from 'react';
import * as ContextMenu from '@radix-ui/react-context-menu';
import { Edit, Trash2, Copy, Archive } from 'lucide-react';
import { Task } from '../../types';

interface QuickActionsProps {
  task: Task;
  onEdit: () => void;
  onDelete: () => void;
  onDuplicate: () => void;
  onArchive: () => void;
  children: React.ReactNode;
}

export const QuickActions = ({
  onEdit,
  onDelete,
  onDuplicate,
  onArchive,
  children,
}: QuickActionsProps) => {
  return (
    <ContextMenu.Root>
      <ContextMenu.Trigger asChild>{children}</ContextMenu.Trigger>

      <ContextMenu.Portal>
        <ContextMenu.Content className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-2 min-w-[200px] z-50">
          <ContextMenu.Item
            onClick={onEdit}
            className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded cursor-pointer"
          >
            <Edit size={16} />
            Düzenle
          </ContextMenu.Item>

          <ContextMenu.Item
            onClick={onDuplicate}
            className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded cursor-pointer"
          >
            <Copy size={16} />
            Kopyala
          </ContextMenu.Item>

          <ContextMenu.Item
            onClick={onArchive}
            className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded cursor-pointer"
          >
            <Archive size={16} />
            Arşivle
          </ContextMenu.Item>

          <ContextMenu.Separator className="h-px bg-gray-200 dark:bg-gray-700 my-2" />

          <ContextMenu.Item
            onClick={onDelete}
            className="flex items-center gap-2 px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded cursor-pointer"
          >
            <Trash2 size={16} />
            Sil
          </ContextMenu.Item>
        </ContextMenu.Content>
      </ContextMenu.Portal>
    </ContextMenu.Root>
  );
};
