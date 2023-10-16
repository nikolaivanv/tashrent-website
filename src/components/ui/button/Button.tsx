import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950 disabled:pointer-events-none disabled:opacity-50 dark:focus-visible:ring-slate-300',
  {
    variants: {
      variant: {
        default:
          'bg-mint-700 text-white shadow hover:bg-mint-800 dark:bg-mint-700 dark:text-white dark:hover:bg-mint-800',
        destructive:
          'bg-red-500 text-slate-50 shadow-sm hover:bg-red-500/90 dark:bg-red-900 dark:text-slate-50 dark:hover:bg-red-900/90',
        secondary:
          'bg-green-gray-600 text-white shadow-sm hover:bg-green-gray-700 dark:bg-green-gray-600 dark:hover:bg-green-gray-700',
        outline:
          'border text-green-gray-700 border-green-gray-700 bg-transparent shadow-sm hover:bg-green-gray-50 hover:border-green-gray-50 dark:border-green-gray-300 dark:text-green-gray-300 dark:hover:text-white dark:hover:bg-green-gray-700 dark:hover:border-green-gray-700',
        ghost: 'hover:bg-green-gray-50 text-green-gray-700 dark:hover:bg-green-gray-700 dark:text-green-gray-300',
        link: 'text-green-gray-700 underline-offset-4 hover:underline dark:text-green-gray-300',
      },
      size: {
        default: 'h-9 px-4 py-2',
        sm: 'h-8 rounded-md px-3 text-xs',
        lg: 'h-10 rounded-md px-8',
        icon: 'h-9 w-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({
    className, variant, size, asChild = false, ...props
  }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = 'Button';

export { Button, buttonVariants };
