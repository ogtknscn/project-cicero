import { Check, X, Info, AlertTriangle } from 'lucide-react';
import { useToastStore, Toast as ToastType } from '../../stores/toastStore';

const iconMap = {
  success: Check,
  error: X,
  info: Info,
  warning: AlertTriangle,
};

const colorMap = {
  success: 'bg-green-500',
  error: 'bg-red-500',
  info: 'bg-blue-500',
  warning: 'bg-yellow-500',
};

export const Toast = ({ toast }: { toast: ToastType }) => {
  const { removeToast } = useToastStore();
  const Icon = iconMap[toast.type];

  return (
    <div
      className={`flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg text-white min-w-[300px] ${colorMap[toast.type]}`}
    >
      <Icon size={20} />
      <span className="flex-1 text-sm font-medium">{toast.message}</span>
      <button onClick={() => removeToast(toast.id)} className="text-white/80 hover:text-white">
        <X size={16} />
      </button>
    </div>
  );
};

export const ToastContainer = () => {
  const { toasts } = useToastStore();

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      {toasts.map((toast) => (
        <Toast key={toast.id} toast={toast} />
      ))}
    </div>
  );
};
