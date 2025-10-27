import React from 'react';

interface MetricCardProps {
  title: string;
  value: number;
  subtitle?: string;
  icon: string;
  color: 'blue' | 'green' | 'yellow' | 'red' | 'purple' | 'gray';
}

const colorClasses = {
  blue: 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300',
  green: 'bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300',
  yellow: 'bg-yellow-100 dark:bg-yellow-900 text-yellow-600 dark:text-yellow-300',
  red: 'bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-300',
  purple: 'bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300',
  gray: 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300',
};

export const MetricCard = ({ title, value, subtitle, icon, color }: MetricCardProps) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-2xl ${colorClasses[color]}`}>
          {icon}
        </div>
      </div>
      <div>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{title}</p>
        <p className="text-3xl font-bold text-gray-900 dark:text-white">{value}</p>
        {subtitle && (
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{subtitle}</p>
        )}
      </div>
    </div>
  );
};

