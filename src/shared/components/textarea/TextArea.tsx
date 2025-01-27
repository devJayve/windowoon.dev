import { TextareaHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

type TextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement>;

function TextArea({ placeholder, className, ...props }: TextAreaProps) {
  return (
    <textarea
      className={cn(
        'w-full rounded-md border border-gray-600 p-3',
        'placeholder:text-gray-400',
        'focus:border-transparent focus:outline-none focus:ring-1 focus:ring-blue-500',
        'disabled:cursor-not-allowed disabled:opacity-50',
        className,
      )}
      placeholder={placeholder}
      {...props}
    />
  );
}

export default TextArea;
