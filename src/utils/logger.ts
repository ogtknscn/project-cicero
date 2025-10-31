/**
 * Simple logger utility for consistent logging across the application
 */

type LogLevel = 'info' | 'warn' | 'error' | 'debug';

interface LogEntry {
  level: LogLevel;
  message: string;
  timestamp: string;
  data?: unknown;
  context?: string;
}

class Logger {
  private isDevelopment = import.meta.env.DEV;
  private logs: LogEntry[] = [];
  private maxLogs = 100; // Keep last 100 logs in memory

  /**
   * Log an info message
   */
  info(message: string, data?: unknown, context?: string) {
    this.log('info', message, data, context);
  }

  /**
   * Log a warning message
   */
  warn(message: string, data?: unknown, context?: string) {
    this.log('warn', message, data, context);
  }

  /**
   * Log an error message
   */
  error(message: string, error?: unknown, context?: string) {
    this.log('error', message, error, context);
  }

  /**
   * Log a debug message (only in development)
   */
  debug(message: string, data?: unknown, context?: string) {
    if (this.isDevelopment) {
      this.log('debug', message, data, context);
    }
  }

  /**
   * Internal log method
   */
  private log(level: LogLevel, message: string, data?: unknown, context?: string) {
    const entry: LogEntry = {
      level,
      message,
      timestamp: new Date().toISOString(),
      data,
      context,
    };

    // Add to memory logs
    this.logs.push(entry);
    if (this.logs.length > this.maxLogs) {
      this.logs.shift(); // Remove oldest log
    }

    // Console output in development
    if (this.isDevelopment) {
      const prefix = context ? `[${context}]` : '';
      const emoji = this.getEmoji(level);

      switch (level) {
        case 'info':
          console.log(`${emoji} ${prefix} ${message}`, data || '');
          break;
        case 'warn':
          console.warn(`${emoji} ${prefix} ${message}`, data || '');
          break;
        case 'error':
          console.error(`${emoji} ${prefix} ${message}`, data || '');
          break;
        case 'debug':
          console.debug(`${emoji} ${prefix} ${message}`, data || '');
          break;
      }
    }

    // TODO: Send to logging service in production
    // if (!this.isDevelopment && level === 'error') {
    //   this.sendToLoggingService(entry);
    // }
  }

  /**
   * Get emoji for log level
   */
  private getEmoji(level: LogLevel): string {
    switch (level) {
      case 'info':
        return 'ℹ️';
      case 'warn':
        return '⚠️';
      case 'error':
        return '🔴';
      case 'debug':
        return '🐛';
    }
  }

  /**
   * Get all logs (useful for debugging)
   */
  getLogs(): LogEntry[] {
    return [...this.logs];
  }

  /**
   * Clear all logs
   */
  clearLogs() {
    this.logs = [];
  }

  /**
   * Export logs as JSON
   */
  exportLogs(): string {
    return JSON.stringify(this.logs, null, 2);
  }

  /**
   * Download logs as a file
   */
  downloadLogs() {
    const data = this.exportLogs();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `logs-${new Date().toISOString()}.json`;
    link.click();
    URL.revokeObjectURL(url);
  }
}

// Export singleton instance
export const logger = new Logger();

// Export for easy access
export default logger;
