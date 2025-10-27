import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

interface TaskDistributionChartProps {
  todo: number;
  inProgress: number;
  done: number;
}

const COLORS = ['#3b82f6', '#f59e0b', '#10b981'];

export const TaskDistributionChart = ({ todo, inProgress, done }: TaskDistributionChartProps) => {
  const data = [
    { name: 'Yapılacaklar', value: todo },
    { name: 'Devam Eden', value: inProgress },
    { name: 'Tamamlanan', value: done },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        📊 Görev Dağılımı
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

