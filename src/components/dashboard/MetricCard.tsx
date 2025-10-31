import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: number;
  subtitle?: string;
  icon: string;
  color: 'blue' | 'green' | 'yellow' | 'red' | 'purple' | 'gray';
  trend?: {
    value: number;
    direction: 'up' | 'down';
  };
  onClick?: () => void;
}

const colorClasses = {
  blue: 'bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-300',
  green: 'bg-success-100 dark:bg-success-900/30 text-success-600 dark:text-success-300',
  yellow: 'bg-warning-100 dark:bg-warning-900/30 text-warning-600 dark:text-warning-300',
  red: 'bg-danger-100 dark:bg-danger-900/30 text-danger-600 dark:text-danger-300',
  purple: 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-300',
  gray: 'bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-300',
};

export const MetricCard = React.memo(
  ({ title, value, subtitle, icon, color, trend, onClick }: MetricCardProps) => {
    const isClickable = Boolean(onClick);

    return (
      <div
        className={`bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 p-6 
        transition-all duration-normal ${
          isClickable
            ? 'cursor-pointer hover:shadow-md hover:border-primary-300 dark:hover:border-primary-600'
            : ''
        }`}
        onClick={onClick}
        role={isClickable ? 'button' : undefined}
        tabIndex={isClickable ? 0 : undefined}
        onKeyDown={
          isClickable
            ? (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onClick?.();
                }
              }
            : undefined
        }
        aria-label={isClickable ? `${title} detaylarını görüntüle` : undefined}
      >
        <div className="flex items-center justify-between mb-4">
          <div
            className={`w-12 h-12 rounded-lg flex items-center justify-center text-2xl ${colorClasses[color]}`}
          >
            {icon}
          </div>
          {trend && (
            <div
              className={`flex items-center gap-1 text-sm font-medium ${
                trend.direction === 'up'
                  ? 'text-success-600 dark:text-success-400'
                  : 'text-danger-600 dark:text-danger-400'
              }`}
            >
              {trend.direction === 'up' ? (
                <TrendingUp className="w-4 h-4" />
              ) : (
                <TrendingDown className="w-4 h-4" />
              )}
              {Math.abs(trend.value)}%
            </div>
          )}
        </div>
        <div>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-1">{title}</p>
          <p className="text-3xl font-bold text-neutral-900 dark:text-white">{value}</p>
          {subtitle && (
            <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">{subtitle}</p>
          )}
        </div>
      </div>
    );
  }
);
