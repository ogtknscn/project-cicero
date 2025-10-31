import { InputHTMLAttributes, useRef } from 'react';
import { AlertCircle, CheckCircle2, Info } from 'lucide-react';
import { generateAriaId } from '../../utils/accessibility';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  success?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input = ({
  label,
  error,
  success,
  helperText,
  leftIcon,
  rightIcon,
  className = '',
  required,
  ...props
}: InputProps) => {
  const errorId = useRef(generateAriaId('input-error'));
  const helperId = useRef(generateAriaId('input-helper'));
  const inputId = useRef(props.id || generateAriaId('input'));

  const hasError = Boolean(error);
  const hasSuccess = Boolean(success) && !hasError;

  const borderColor = hasError
    ? 'border-danger-500 focus:ring-danger-500'
    : hasSuccess
      ? 'border-success-500 focus:ring-success-500'
      : 'border-neutral-300 dark:border-neutral-600 focus:ring-primary-500';

  const describedBy = [
    error ? errorId.current : undefined,
    success ? errorId.current : undefined,
    helperText ? helperId.current : undefined,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={inputId.current}
          className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5"
        >
          {label}
          {required && (
            <span className="text-danger-500 ml-1" aria-label="zorunlu alan">
              *
            </span>
          )}
        </label>
      )}

      <div className="relative">
        {leftIcon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 dark:text-neutral-500">
            {leftIcon}
          </div>
        )}

        <input
          id={inputId.current}
          className={`w-full px-4 py-2.5 border rounded-lg transition-all duration-normal
            focus:outline-none focus:ring-2 focus:border-transparent
            disabled:bg-neutral-50 disabled:text-neutral-500 disabled:cursor-not-allowed
            dark:bg-neutral-800 dark:text-white dark:disabled:bg-neutral-900
            ${leftIcon ? 'pl-10' : ''}
            ${rightIcon || hasError || hasSuccess ? 'pr-10' : ''}
            ${borderColor}
            ${className}`}
          aria-invalid={hasError ? 'true' : 'false'}
          aria-describedby={describedBy || undefined}
          aria-required={required}
          required={required}
          {...props}
        />

        {(rightIcon || hasError || hasSuccess) && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            {hasError && <AlertCircle className="w-5 h-5 text-danger-500" aria-hidden="true" />}
            {hasSuccess && <CheckCircle2 className="w-5 h-5 text-success-500" aria-hidden="true" />}
            {!hasError && !hasSuccess && rightIcon}
          </div>
        )}
      </div>

      {helperText && !error && !success && (
        <div
          id={helperId.current}
          className="flex items-start gap-1.5 text-neutral-600 dark:text-neutral-400 text-sm mt-1.5"
        >
          <Info className="w-4 h-4 mt-0.5 flex-shrink-0" aria-hidden="true" />
          <span>{helperText}</span>
        </div>
      )}

      {error && (
        <div
          id={errorId.current}
          className="flex items-start gap-1.5 text-danger-600 dark:text-danger-400 text-sm mt-1.5"
          role="alert"
        >
          <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" aria-hidden="true" />
          <span>{error}</span>
        </div>
      )}

      {success && !error && (
        <div
          id={errorId.current}
          className="flex items-start gap-1.5 text-success-600 dark:text-success-400 text-sm mt-1.5"
          role="status"
        >
          <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" aria-hidden="true" />
          <span>{success}</span>
        </div>
      )}
    </div>
  );
};
