import { Play, Pause, Clock, DollarSign } from 'lucide-react';
import { useTimeStore } from '../../stores/timeStore';
import { Button } from '../common/Button';
import { formatDuration } from '../../utils/time';

interface TimeTrackerProps {
  taskId: string;
  userId?: string;
}

export const TimeTracker = ({ taskId, userId = 'default-user' }: TimeTrackerProps) => {
  const { entries, activeEntry, startTracking, stopTracking, getTaskTimeSummary, settings } =
    useTimeStore();

  const taskEntries = entries.filter((e) => e.taskId === taskId);
  const isActive = activeEntry && taskEntries.some((e) => e.id === activeEntry);
  const summary = getTaskTimeSummary(taskId);
  const taskSettings = settings[taskId];

  const handleToggle = () => {
    if (isActive) {
      stopTracking();
    } else {
      startTracking(taskId, userId);
    }
  };

  const totalCost = taskSettings?.hourlyRate
    ? (summary.totalHours * taskSettings.hourlyRate).toFixed(2)
    : null;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Clock size={18} className="text-gray-500" />
          <span className="text-sm font-medium">{formatDuration(summary.totalMinutes)}</span>
        </div>

        <Button variant={isActive ? 'danger' : 'primary'} size="sm" onClick={handleToggle}>
          {isActive ? (
            <>
              <Pause size={16} className="mr-1" />
              Durdur
            </>
          ) : (
            <>
              <Play size={16} className="mr-1" />
              Başlat
            </>
          )}
        </Button>
      </div>

      {summary.entriesCount > 0 && (
        <div className="flex items-center gap-4 text-xs text-gray-500">
          <span>{summary.entriesCount} kayıt</span>
          {taskSettings?.budget && (
            <span className={summary.totalHours > taskSettings.budget ? 'text-red-500' : ''}>
              {summary.totalHours.toFixed(1)}h / {taskSettings.budget}h
            </span>
          )}
          {totalCost && (
            <div className="flex items-center gap-1">
              <DollarSign size={12} />
              <span>${totalCost}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
