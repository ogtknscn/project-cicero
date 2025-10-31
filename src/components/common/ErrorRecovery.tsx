import React from 'react';
import {
  AlertTriangle,
  XCircle,
  WifiOff,
  RefreshCw,
  HelpCircle,
  Mail,
  FileText,
} from 'lucide-react';
import { Button } from './Button';

export type ErrorType = 'network' | 'validation' | 'permission' | 'notFound' | 'server' | 'unknown';

interface ErrorRecoveryProps {
  type?: ErrorType;
  title?: string;
  message: string;
  technicalDetails?: string;
  onRetry?: () => void;
  onContactSupport?: () => void;
  onViewDocs?: () => void;
  showDetails?: boolean;
}

const errorConfig: Record<
  ErrorType,
  {
    icon: React.ComponentType<{ className?: string }>;
    color: string;
    defaultTitle: string;
  }
> = {
  network: {
    icon: WifiOff,
    color: 'text-warning-600 dark:text-warning-400',
    defaultTitle: 'Bağlantı Hatası',
  },
  validation: {
    icon: AlertTriangle,
    color: 'text-warning-600 dark:text-warning-400',
    defaultTitle: 'Geçersiz Veri',
  },
  permission: {
    icon: XCircle,
    color: 'text-danger-600 dark:text-danger-400',
    defaultTitle: 'Yetki Hatası',
  },
  notFound: {
    icon: HelpCircle,
    color: 'text-info-600 dark:text-info-400',
    defaultTitle: 'Bulunamadı',
  },
  server: {
    icon: AlertTriangle,
    color: 'text-danger-600 dark:text-danger-400',
    defaultTitle: 'Sunucu Hatası',
  },
  unknown: {
    icon: XCircle,
    color: 'text-neutral-600 dark:text-neutral-400',
    defaultTitle: 'Bir Hata Oluştu',
  },
};

export const ErrorRecovery: React.FC<ErrorRecoveryProps> = ({
  type = 'unknown',
  title,
  message,
  technicalDetails,
  onRetry,
  onContactSupport,
  onViewDocs,
  showDetails = false,
}) => {
  const [showTechnical, setShowTechnical] = React.useState(showDetails);
  const config = errorConfig[type];
  const Icon = config.icon;

  return (
    <div
      className="flex flex-col items-center justify-center py-8 px-4 text-center"
      role="alert"
      aria-live="assertive"
    >
      {/* Icon */}
      <div className={`mb-4 p-4 rounded-full bg-neutral-100 dark:bg-neutral-800 ${config.color}`}>
        <Icon className="w-12 h-12" aria-hidden="true" />
      </div>

      {/* Title */}
      <h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-2">
        {title || config.defaultTitle}
      </h3>

      {/* Message */}
      <p className="text-sm text-neutral-600 dark:text-neutral-400 max-w-md mb-6">{message}</p>

      {/* Technical Details (collapsible) */}
      {technicalDetails && (
        <div className="w-full max-w-md mb-6">
          <button
            onClick={() => setShowTechnical(!showTechnical)}
            className="text-sm text-primary-600 dark:text-primary-400 hover:underline focus:outline-none focus:ring-2 focus:ring-primary-500 rounded px-2 py-1"
          >
            {showTechnical ? 'Teknik detayları gizle' : 'Teknik detayları göster'}
          </button>
          {showTechnical && (
            <div className="mt-3 p-4 bg-neutral-100 dark:bg-neutral-800 rounded-lg text-left">
              <pre className="text-xs text-neutral-700 dark:text-neutral-300 overflow-x-auto whitespace-pre-wrap break-words font-mono">
                {technicalDetails}
              </pre>
            </div>
          )}
        </div>
      )}

      {/* Actions */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        {onRetry && (
          <Button onClick={onRetry} variant="primary" size="md">
            <RefreshCw className="w-4 h-4" />
            Tekrar Dene
          </Button>
        )}
        {onViewDocs && (
          <Button onClick={onViewDocs} variant="tertiary" size="md">
            <FileText className="w-4 h-4" />
            Dokümantasyon
          </Button>
        )}
        {onContactSupport && (
          <Button onClick={onContactSupport} variant="ghost" size="md">
            <Mail className="w-4 h-4" />
            Destek
          </Button>
        )}
      </div>

      {/* Help text */}
      {type === 'network' && (
        <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-6 max-w-md">
          İnternet bağlantınızı kontrol edin. Sorun devam ederse, VPN veya güvenlik duvarı
          ayarlarınızı gözden geçirin.
        </p>
      )}
      {type === 'server' && (
        <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-6 max-w-md">
          Sunucu geçici olarak yanıt vermiyor. Lütfen birkaç dakika sonra tekrar deneyin veya destek
          ekibiyle iletişime geçin.
        </p>
      )}
    </div>
  );
};
