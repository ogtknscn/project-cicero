/**
 * Custom application error class with error codes
 */
export class AppError extends Error {
  constructor(
    message: string,
    public code: string,
    public statusCode?: number,
    public details?: unknown
  ) {
    super(message);
    this.name = 'AppError';
    Object.setPrototypeOf(this, AppError.prototype);
  }
}

/**
 * Standard error messages for the application
 */
export const ErrorMessages = {
  // General errors
  UNKNOWN_ERROR: 'Bilinmeyen bir hata oluştu',
  NETWORK_ERROR: 'Ağ bağlantısı hatası',
  TIMEOUT_ERROR: 'İşlem zaman aşımına uğradı',

  // Data errors
  TASK_NOT_FOUND: 'Görev bulunamadı',
  PROJECT_NOT_FOUND: 'Proje bulunamadı',
  INVALID_DATA: 'Geçersiz veri',
  DATA_CORRUPTED: 'Veri bozuk',

  // File errors
  FILE_TOO_LARGE: 'Dosya boyutu çok büyük',
  INVALID_FILE_TYPE: 'Geçersiz dosya tipi',
  FILE_UPLOAD_FAILED: 'Dosya yüklenemedi',

  // Storage errors
  STORAGE_FULL: 'Depolama alanı dolu',
  STORAGE_ACCESS_DENIED: 'Depolama erişimi reddedildi',
  STORAGE_QUOTA_EXCEEDED: 'Depolama kotası aşıldı',

  // Validation errors
  REQUIRED_FIELD: 'Bu alan zorunludur',
  INVALID_EMAIL: 'Geçersiz e-posta adresi',
  INVALID_DATE: 'Geçersiz tarih',
  INVALID_FORMAT: 'Geçersiz format',

  // Permission errors
  PERMISSION_DENIED: 'İzin reddedildi',
  UNAUTHORIZED: 'Yetkisiz erişim',
} as const;

/**
 * Error codes for categorizing errors
 */
export const ErrorCodes = {
  // Client errors (4xx)
  BAD_REQUEST: 'BAD_REQUEST',
  UNAUTHORIZED: 'UNAUTHORIZED',
  FORBIDDEN: 'FORBIDDEN',
  NOT_FOUND: 'NOT_FOUND',
  VALIDATION_ERROR: 'VALIDATION_ERROR',

  // Server errors (5xx)
  INTERNAL_ERROR: 'INTERNAL_ERROR',
  SERVICE_UNAVAILABLE: 'SERVICE_UNAVAILABLE',

  // Application errors
  STORAGE_ERROR: 'STORAGE_ERROR',
  NETWORK_ERROR: 'NETWORK_ERROR',
  TIMEOUT_ERROR: 'TIMEOUT_ERROR',
  FILE_ERROR: 'FILE_ERROR',
} as const;

/**
 * Handle errors and return user-friendly messages
 */
export const handleError = (error: unknown): string => {
  // AppError with message
  if (error instanceof AppError) {
    return error.message;
  }

  // Standard Error
  if (error instanceof Error) {
    // Log full error in development
    if (import.meta.env.DEV) {
      console.error('Application error:', error);
    }
    return error.message || ErrorMessages.UNKNOWN_ERROR;
  }

  // DOMException (for storage errors)
  if (error instanceof DOMException) {
    if (error.name === 'QuotaExceededError') {
      return ErrorMessages.STORAGE_QUOTA_EXCEEDED;
    }
    if (error.name === 'SecurityError') {
      return ErrorMessages.STORAGE_ACCESS_DENIED;
    }
  }

  // Unknown error type
  return ErrorMessages.UNKNOWN_ERROR;
};

/**
 * Create a standardized error object
 */
export const createError = (
  message: string,
  code: string,
  statusCode?: number,
  details?: unknown
): AppError => {
  return new AppError(message, code, statusCode, details);
};

/**
 * Check if error is a specific type
 */
export const isAppError = (error: unknown): error is AppError => {
  return error instanceof AppError;
};

/**
 * Log error to console (development) or service (production)
 */
export const logError = (error: Error | AppError, context?: string) => {
  const timestamp = new Date().toISOString();

  if (import.meta.env.DEV) {
    console.group(`🔴 Error ${context ? `in ${context}` : ''} - ${timestamp}`);
    console.error('Error:', error);
    if (isAppError(error)) {
      console.log('Code:', error.code);
      console.log('Status:', error.statusCode);
      console.log('Details:', error.details);
    }
    console.log('Stack:', error.stack);
    console.groupEnd();
  } else {
    // TODO: Send to error tracking service (Sentry, LogRocket, etc.)
    // errorTrackingService.log({
    //   message: error.message,
    //   stack: error.stack,
    //   context,
    //   timestamp,
    // });
  }
};

/**
 * Async error wrapper for try-catch blocks
 */
export const tryCatch = async <T>(
  fn: () => Promise<T>,
  errorMessage?: string
): Promise<[T | null, AppError | null]> => {
  try {
    const result = await fn();
    return [result, null];
  } catch (error) {
    const appError = isAppError(error)
      ? error
      : createError(errorMessage || handleError(error), ErrorCodes.INTERNAL_ERROR);

    logError(appError);
    return [null, appError];
  }
};

/**
 * Validate required fields
 */
export const validateRequired = (value: unknown, fieldName: string): void => {
  if (value === null || value === undefined || value === '') {
    throw createError(`${fieldName} ${ErrorMessages.REQUIRED_FIELD}`, ErrorCodes.VALIDATION_ERROR);
  }
};

/**
 * Validate file size
 */
export const validateFileSize = (file: File, maxSizeInBytes: number): void => {
  if (file.size > maxSizeInBytes) {
    throw createError(
      `${ErrorMessages.FILE_TOO_LARGE} (max: ${(maxSizeInBytes / 1024 / 1024).toFixed(0)}MB)`,
      ErrorCodes.FILE_ERROR,
      400,
      { fileSize: file.size, maxSize: maxSizeInBytes }
    );
  }
};

/**
 * Validate file type
 */
export const validateFileType = (file: File, allowedTypes: string[]): void => {
  if (!allowedTypes.includes(file.type)) {
    throw createError(ErrorMessages.INVALID_FILE_TYPE, ErrorCodes.FILE_ERROR, 400, {
      fileType: file.type,
      allowedTypes,
    });
  }
};
