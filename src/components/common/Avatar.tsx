interface AvatarProps {
  name: string;
  src?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeMap = {
  xs: 'w-6 h-6 text-xs',
  sm: 'w-8 h-8 text-sm',
  md: 'w-10 h-10 text-base',
  lg: 'w-12 h-12 text-lg',
};

const getInitials = (name: string): string => {
  const parts = name.trim().split(' ');
  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
  }
  return name[0]?.toUpperCase() || '?';
};

const getColorClass = (name: string): string => {
  const colors = [
    'bg-primary-500',
    'bg-success-500',
    'bg-warning-500',
    'bg-danger-500',
    'bg-info-500',
    'bg-purple-500',
  ];
  const index = name.charCodeAt(0) % colors.length;
  return colors[index];
};

export const Avatar: React.FC<AvatarProps> = ({ name, src, size = 'md', className = '' }) => {
  const sizeClass = sizeMap[size];
  const colorClass = !src ? getColorClass(name) : '';

  return (
    <div
      className={`${sizeClass} rounded-full flex items-center justify-center 
        font-semibold text-white overflow-hidden flex-shrink-0 ${colorClass} ${className}`}
      title={name}
    >
      {src ? (
        <img src={src} alt={name} className="w-full h-full object-cover" />
      ) : (
        <span>{getInitials(name)}</span>
      )}
    </div>
  );
};
