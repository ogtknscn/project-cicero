import { LucideIcon } from 'lucide-react';

interface SkeletonProps {
  className?: string;
}

export const Skeleton = ({ className = '' }: SkeletonProps) => (
  <div className={`animate-pulse bg-gray-200 rounded ${className}`} />
);

export const TaskCardSkeleton = () => (
  <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
    <div className="flex items-start justify-between mb-2">
      <Skeleton className="h-5 w-3/4" />
      <Skeleton className="h-4 w-4 rounded" />
    </div>
    <Skeleton className="h-3 w-full mb-2" />
    <Skeleton className="h-3 w-2/3 mb-4" />
    <div className="flex items-center gap-2">
      <Skeleton className="h-6 w-16 rounded" />
      <Skeleton className="h-6 w-20 rounded" />
    </div>
  </div>
);

export const ProjectCardSkeleton = () => (
  <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
    <div className="flex items-start justify-between mb-4">
      <div className="flex-1">
        <Skeleton className="h-6 w-1/2 mb-2" />
        <Skeleton className="h-4 w-3/4" />
      </div>
      <Skeleton className="h-4 w-4 rounded-full" />
    </div>
    <div className="flex items-center gap-4 mb-4">
      <Skeleton className="h-4 w-20" />
      <Skeleton className="h-4 w-24" />
    </div>
    <Skeleton className="h-2 w-full rounded-full" />
  </div>
);

export const ListItemSkeleton = () => (
  <div className="flex items-center gap-3 p-3 border-b border-gray-200 dark:border-gray-700">
    <Skeleton className="h-4 w-4 rounded" />
    <Skeleton className="h-5 w-3/4" />
    <div className="ml-auto flex gap-2">
      <Skeleton className="h-6 w-16 rounded" />
      <Skeleton className="h-6 w-20 rounded" />
    </div>
  </div>
);
