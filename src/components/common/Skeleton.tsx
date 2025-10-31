interface SkeletonProps {
  className?: string;
  style?: React.CSSProperties;
}

export const Skeleton = ({ className = '', style }: SkeletonProps) => (
  <div
    className={`animate-pulse bg-neutral-200 dark:bg-neutral-700 rounded ${className}`}
    style={style}
    role="status"
    aria-label="Yükleniyor"
  />
);

export const TaskCardSkeleton = () => (
  <div className="bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 p-4 animate-fade-in">
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
  <div className="bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 p-6 animate-fade-in">
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
  <div className="flex items-center gap-3 p-3 border-b border-neutral-200 dark:border-neutral-700 animate-fade-in">
    <Skeleton className="h-4 w-4 rounded" />
    <Skeleton className="h-5 w-3/4" />
    <div className="ml-auto flex gap-2">
      <Skeleton className="h-6 w-16 rounded" />
      <Skeleton className="h-6 w-20 rounded" />
    </div>
  </div>
);

export const TableSkeleton = ({ rows = 5 }: { rows?: number }) => (
  <div className="space-y-3 animate-fade-in">
    {/* Header */}
    <div className="flex gap-4 p-4 bg-neutral-100 dark:bg-neutral-800 rounded-lg">
      <Skeleton className="h-4 w-1/4" />
      <Skeleton className="h-4 w-1/3" />
      <Skeleton className="h-4 w-1/6" />
      <Skeleton className="h-4 w-1/6" />
    </div>
    {/* Rows */}
    {Array.from({ length: rows }).map((_, i) => (
      <div key={i} className="flex gap-4 p-4 border-b border-neutral-200 dark:border-neutral-700">
        <Skeleton className="h-4 w-1/4" />
        <Skeleton className="h-4 w-1/3" />
        <Skeleton className="h-4 w-1/6" />
        <Skeleton className="h-4 w-1/6" />
      </div>
    ))}
  </div>
);

export const ChartSkeleton = () => (
  <div className="bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 p-6 animate-fade-in">
    <Skeleton className="h-6 w-1/3 mb-6" />
    <div className="flex items-end gap-2 h-64">
      {Array.from({ length: 7 }).map((_, i) => (
        <Skeleton key={i} className="flex-1" style={{ height: `${Math.random() * 80 + 20}%` }} />
      ))}
    </div>
    <div className="flex gap-4 mt-4">
      <Skeleton className="h-3 w-12" />
      <Skeleton className="h-3 w-12" />
      <Skeleton className="h-3 w-12" />
    </div>
  </div>
);

export const DashboardSkeleton = () => (
  <div className="space-y-6 animate-fade-in">
    {/* Metrics Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          className="bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 p-6"
        >
          <Skeleton className="h-12 w-12 rounded-lg mb-4" />
          <Skeleton className="h-4 w-20 mb-2" />
          <Skeleton className="h-8 w-16 mb-1" />
          <Skeleton className="h-3 w-24" />
        </div>
      ))}
    </div>
    {/* Charts */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <ChartSkeleton />
      <ChartSkeleton />
    </div>
  </div>
);

export const FormSkeleton = () => (
  <div className="space-y-4 animate-fade-in">
    {Array.from({ length: 5 }).map((_, i) => (
      <div key={i}>
        <Skeleton className="h-4 w-24 mb-2" />
        <Skeleton className="h-10 w-full rounded-lg" />
      </div>
    ))}
    <div className="flex gap-3 mt-6">
      <Skeleton className="h-10 w-24 rounded-lg" />
      <Skeleton className="h-10 w-20 rounded-lg" />
    </div>
  </div>
);
