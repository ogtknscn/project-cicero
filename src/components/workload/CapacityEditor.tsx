import { useState, useEffect } from 'react';
import { useWorkloadStore } from '../../stores/workloadStore';
import { Modal } from '../common/Modal';
import { Input } from '../common/Input';
import { Button } from '../common/Button';

interface CapacityEditorProps {
  isOpen: boolean;
  onClose: () => void;
  userId?: string;
}

export const CapacityEditor = ({ isOpen, onClose, userId }: CapacityEditorProps) => {
  const { userCapacities, addUserCapacity, updateUserCapacity, deleteUserCapacity } =
    useWorkloadStore();
  const existingCapacity = userCapacities.find((c) => c.userId === userId);

  const [userName, setUserName] = useState('');
  const [weeklyHours, setWeeklyHours] = useState(40);
  const [dailyHours, setDailyHours] = useState(8);
  const [availability, setAvailability] = useState({
    monday: 8,
    tuesday: 8,
    wednesday: 8,
    thursday: 8,
    friday: 8,
    saturday: 0,
    sunday: 0,
  });

  useEffect(() => {
    if (existingCapacity) {
      setUserName(existingCapacity.userName);
      setWeeklyHours(existingCapacity.weeklyHours);
      setDailyHours(existingCapacity.dailyHours);
      setAvailability(existingCapacity.availability);
    } else {
      setUserName('');
      setWeeklyHours(40);
      setDailyHours(8);
      setAvailability({
        monday: 8,
        tuesday: 8,
        wednesday: 8,
        thursday: 8,
        friday: 8,
        saturday: 0,
        sunday: 0,
      });
    }
  }, [existingCapacity, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!userName.trim()) return;

    const capacityData = {
      userName: userName.trim(),
      weeklyHours,
      dailyHours,
      availability,
    };

    if (userId) {
      updateUserCapacity(userId, capacityData);
    } else {
      addUserCapacity(capacityData);
    }

    onClose();
  };

  const handleDelete = () => {
    if (userId && confirm('Bu kullanıcıyı silmek istediğinize emin misiniz?')) {
      deleteUserCapacity(userId);
      onClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={userId ? 'Kapasiteyi Düzenle' : 'Yeni Kullanıcı Ekle'}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Kullanıcı Adı"
          placeholder="Örn: Ahmet Yılmaz"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          required
        />

        <div className="grid grid-cols-2 gap-4">
          <Input
            type="number"
            label="Haftalık Kapasite (saat)"
            value={weeklyHours}
            onChange={(e) => setWeeklyHours(Number(e.target.value))}
            min={1}
            max={168}
            required
          />
          <Input
            type="number"
            label="Günlük Kapasite (saat)"
            value={dailyHours}
            onChange={(e) => setDailyHours(Number(e.target.value))}
            min={1}
            max={24}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Günlük Müsaitlik (saat/gün)
          </label>
          <div className="grid grid-cols-7 gap-2">
            {Object.entries(availability).map(([day, hours]) => (
              <div key={day}>
                <label className="block text-xs text-gray-600 dark:text-gray-400 mb-1 capitalize">
                  {day.substring(0, 3)}
                </label>
                <input
                  type="number"
                  value={hours}
                  onChange={(e) =>
                    setAvailability({
                      ...availability,
                      [day]: Number(e.target.value),
                    })
                  }
                  min={0}
                  max={24}
                  className="w-full px-2 py-1 text-center border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-between gap-2 pt-4">
          <div>
            {userId && (
              <Button type="button" variant="danger" onClick={handleDelete}>
                Sil
              </Button>
            )}
          </div>
          <div className="flex gap-2">
            <Button type="button" variant="secondary" onClick={onClose}>
              İptal
            </Button>
            <Button type="submit" disabled={!userName.trim()}>
              {userId ? 'Güncelle' : 'Ekle'}
            </Button>
          </div>
        </div>
      </form>
    </Modal>
  );
};
