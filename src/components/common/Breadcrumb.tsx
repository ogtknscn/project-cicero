import React from 'react';
import { ChevronRight, Home } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  onClick?: () => void;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  showHome?: boolean;
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ items, showHome = true }) => {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center space-x-1 text-sm">
      <ol className="flex items-center space-x-1">
        {showHome && (
          <li>
            <button
              onClick={items[0]?.onClick}
              className="p-1.5 rounded-md text-neutral-500 hover:text-neutral-700 hover:bg-neutral-100 
                dark:text-neutral-400 dark:hover:text-neutral-200 dark:hover:bg-neutral-800 
                focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors"
              aria-label="Ana sayfa"
            >
              <Home className="w-4 h-4" />
            </button>
          </li>
        )}

        {items.map((item, index) => (
          <React.Fragment key={index}>
            {(index > 0 || showHome) && (
              <li>
                <ChevronRight
                  className="w-4 h-4 text-neutral-400 dark:text-neutral-500"
                  aria-hidden="true"
                />
              </li>
            )}
            <li>
              {index === items.length - 1 ? (
                <span
                  className="px-2 py-1 text-neutral-900 dark:text-white font-medium"
                  aria-current="page"
                >
                  {item.label}
                </span>
              ) : (
                <button
                  onClick={item.onClick}
                  className="px-2 py-1 rounded-md text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 
                    dark:text-neutral-400 dark:hover:text-white dark:hover:bg-neutral-800 
                    focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors"
                >
                  {item.label}
                </button>
              )}
            </li>
          </React.Fragment>
        ))}
      </ol>
    </nav>
  );
};
