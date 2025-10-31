import React from 'react';
import { Project } from '../../types';
import { useStore } from '../../stores/useStore';
import { Calendar, CheckCircle } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
  isSelected?: boolean;
}

export const ProjectCard = React.memo(({ project, isSelected = false }: ProjectCardProps) => {
  const { selectProject } = useStore();

  const progressPercentage =
    project.metadata.totalTasks > 0
      ? Math.round((project.metadata.completedTasks / project.metadata.totalTasks) * 100)
      : 0;

  return (
    <div
      onClick={() => selectProject(project.id)}
      className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow cursor-pointer"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900">{project.name}</h3>
          {project.description && (
            <p className="text-sm text-gray-600 mt-1 line-clamp-2">{project.description}</p>
          )}
        </div>
        {project.color && (
          <div
            className="w-4 h-4 rounded-full flex-shrink-0"
            style={{ backgroundColor: project.color }}
          />
        )}
      </div>

      <div className="flex items-center gap-4 text-sm text-gray-600">
        <div className="flex items-center gap-1">
          <CheckCircle size={16} />
          <span>
            {project.metadata.completedTasks} / {project.metadata.totalTasks}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <Calendar size={16} />
          <span>{new Date(project.updatedAt).toLocaleDateString('tr-TR')}</span>
        </div>
      </div>

      <div className="mt-4">
        <div className="bg-gray-200 rounded-full h-2">
          <div
            className="bg-primary-600 h-2 rounded-full transition-all"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>
    </div>
  );
});
