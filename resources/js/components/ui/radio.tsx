import * as React from 'react';

import { cn } from '@/lib/utils';

function RadioButton({ className, ...props}: React.ComponentProps<'input'>){

const radioButtonStyles = "peer checked:bg-[#00027C] checked:text-white cursor-pointer hover:bg-blue-500 checked:border-[#00027C] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive shrink-0 transition-shadow outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 h-[35px] w-[35px] shadow-sm shadow-[#00027C]";
    return (
      <input
        type='radio'
        data-slot='radio'
        className={cn(
          radioButtonStyles,
          className
        )}
        {...props}
      />
    )
  }
export { RadioButton }