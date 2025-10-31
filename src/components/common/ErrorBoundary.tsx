import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import { Button } from './Button';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log error to console in development
    if (import.meta.env.DEV) {
      console.error('Error caught by boundary:', error, errorInfo);
    }

    // TODO: Send error to logging service in production
    // logErrorToService(error, errorInfo);

    this.setState({ error, errorInfo });
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  handleReload = () => {
    window.location.reload();
  };

  handleGoHome = () => {
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      // Custom fallback UI if provided
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default error UI
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
          <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-red-100 dark:bg-red-900/30 p-3 rounded-full">
                <AlertTriangle className="text-red-600 dark:text-red-400" size={32} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Bir Hata Oluştu</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Beklenmeyen bir hata oluştu
                </p>
              </div>
            </div>

            <div className="mb-6">
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Üzgünüz, uygulama beklenmeyen bir hatayla karşılaştı. Lütfen sayfayı yenileyin veya
                ana sayfaya dönün. Sorun devam ederse destek ekibiyle iletişime geçin.
              </p>

              {import.meta.env.DEV && this.state.error && (
                <details className="mb-4">
                  <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white mb-2">
                    Hata Detayları (Geliştirme Modu)
                  </summary>
                  <div className="mt-2 p-3 bg-gray-100 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
                    <pre className="text-xs overflow-auto max-h-48 text-red-600 dark:text-red-400">
                      {this.state.error.toString()}
                      {'\n\n'}
                      {this.state.errorInfo?.componentStack}
                    </pre>
                  </div>
                </details>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-2">
              <Button onClick={this.handleReload} className="flex-1 gap-2">
                <RefreshCw size={16} />
                Sayfayı Yenile
              </Button>
              <Button onClick={this.handleGoHome} variant="secondary" className="flex-1 gap-2">
                <Home size={16} />
                Ana Sayfa
              </Button>
            </div>

            {import.meta.env.DEV && (
              <button
                onClick={this.handleReset}
                className="mt-3 w-full text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
              >
                Sadece Error Boundary'yi Sıfırla (Dev)
              </button>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
