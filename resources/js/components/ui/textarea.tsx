/**
 * TextArea Component
 * @author Leo Knudsen
 * @description A customizable textarea component that supports debugging and custom change handling.
 */
import React from 'react';
import { cn } from '@/lib/utils';

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    id: string;
    placeholder?: string;
    value?: string;
    className?: string;
    rows?: number;
    disabled?: boolean;
    isDebuggable?: boolean;
    onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

function TextArea({className, id, placeholder, value, rows, disabled, isDebuggable, onChange, ...props}: TextAreaProps) {

    // Default onChange handler that can be overridden
    const debuggableHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        console.log(`TextArea with ID: ${id} changed:`, event.target.value);
    };

    // if isDebuggale is True allways use the debuggable handler else use the passed onChange attribute
    const handleChangeEvent = (isDebuggable) ? debuggableHandler : onChange

    return (
        <textarea
            id={id}
            placeholder={placeholder}
            value={value}
            onChange={handleChangeEvent}
            className={cn(
                'border-input placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
                'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
                'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
                className
            )}
            rows={rows || 3}
            disabled={disabled}
            {...props}
        />
    );
}

export { TextArea };