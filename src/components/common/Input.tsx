import { InputHTMLAttributes, useRef } from 'react';
import { generateAriaId } from '../../utils/accessibility';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = ({ label, error, className = '', required, ...props }: InputProps) => {
  const errorId = useRef(generateAriaId('input-error'));
  const inputId = useRef(props.id || generateAriaId('input'));

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={inputId.current}
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          {label}
          {required && (
            <span className="text-red-500 ml-1" aria-label="zorunlu alan">
              *
            </span>
          )}
        </label>
      )}
      <input
        id={inputId.current}
        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-800 dark:text-white dark:border-gray-600 ${
          error ? 'border-red-500' : 'border-gray-300'
        } ${className}`}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={error ? errorId.current : undefined}
        aria-required={required}
        required={required}
        {...props}
      />
      {error && (
        <p id={errorId.current} className="text-red-500 text-sm mt-1" role="alert">
          {error}
        </p>
      )}
    </div>
  );
};
