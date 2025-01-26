import React, { forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: 'default' | 'outline';
  fullWidth?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant = 'default', fullWidth = false, ...props }, ref) => {
    return (
      <input
        ref={ref}
        type="text"
        className={cn(
          'rounded outline-none transition-colors',
          {
            'border border-gray-600 focus:border-blue-500': variant === 'default',
            grow: fullWidth,
          },
          className,
        )}
        {...props}
      />
    );
  },
);

Input.displayName = 'Input';

export default Input;
